import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { terms, semanticFields } from '@/data';

const MODULE_COLORS = {
  classical: '#c2410c',
  'reverse-flow': '#0e7490',
};

const COMPLETENESS_FIELDS = [
  'components',
  'translation_range',
  'conceptual_remainder',
  'doctrinal_weight',
  'false_friends',
  'literary_instances',
  'neighbor_ids',
  'on_reading',
  'kun_reading',
  'source_concept_id',
];

function completeness(term) {
  let filled = 0;
  for (const key of COMPLETENESS_FIELDS) {
    const v = term[key];
    if (v == null) continue;
    if (Array.isArray(v) ? v.length > 0 : String(v).trim() !== '') filled += 1;
  }
  return filled / COMPLETENESS_FIELDS.length;
}

export default function AtlasView() {
  const svgRef = useRef(null);
  const navigate = useNavigate();

  const fieldIndex = useMemo(() => {
    const map = new Map();
    for (const f of semanticFields) map.set(f.id, f);
    return map;
  }, []);

  const nodes = useMemo(
    () =>
      terms.map((t) => ({
        id: t.id,
        label: t.characters,
        romaji: t.romaji,
        module: t.module,
        fieldId: t.semantic_field_id,
        fieldLabel: fieldIndex.get(t.semantic_field_id)?.label ?? t.semantic_field_id,
        completeness: completeness(t),
      })),
    [fieldIndex],
  );

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const width = svgEl.clientWidth || 960;
    const height = svgEl.clientHeight || 640;

    const svg = d3.select(svgEl).attr('viewBox', [0, 0, width, height]);
    svg.selectAll('*').remove();

    const root = svg.append('g');

    svg.call(
      d3
        .zoom()
        .scaleExtent([0.4, 4])
        .on('zoom', (event) => root.attr('transform', event.transform)),
    );

    const fieldIds = Array.from(new Set(nodes.map((n) => n.fieldId)));
    const angleStep = (2 * Math.PI) / Math.max(fieldIds.length, 1);
    const clusterRadius = Math.min(width, height) * 0.32;
    const clusterCenters = new Map(
      fieldIds.map((id, i) => [
        id,
        {
          x: width / 2 + Math.cos(i * angleStep - Math.PI / 2) * clusterRadius,
          y: height / 2 + Math.sin(i * angleStep - Math.PI / 2) * clusterRadius,
        },
      ]),
    );

    const sim = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-80))
      .force(
        'x',
        d3.forceX((d) => clusterCenters.get(d.fieldId)?.x ?? width / 2).strength(0.18),
      )
      .force(
        'y',
        d3.forceY((d) => clusterCenters.get(d.fieldId)?.y ?? height / 2).strength(0.18),
      )
      .force(
        'collide',
        d3.forceCollide((d) => 18 + d.completeness * 18),
      );

    const labelLayer = root.append('g').attr('class', 'cluster-labels');
    for (const [id, c] of clusterCenters) {
      const field = fieldIndex.get(id);
      labelLayer
        .append('text')
        .attr('x', c.x)
        .attr('y', c.y - clusterRadius * 0.5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#6b7280')
        .attr('font-size', 12)
        .attr('font-weight', 600)
        .attr('letter-spacing', '0.04em')
        .attr('text-transform', 'uppercase')
        .text(field?.label ?? id);
    }

    const node = root
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('click', (_, d) => navigate(`/term/${d.id}`));

    node.append('title').text((d) => `${d.label} · ${d.romaji}\n${d.fieldLabel}`);

    node
      .append('circle')
      .attr('r', (d) => 16 + d.completeness * 16)
      .attr('fill', (d) => MODULE_COLORS[d.module] ?? '#6b7280')
      .attr('fill-opacity', 0.15)
      .attr('stroke', (d) => MODULE_COLORS[d.module] ?? '#6b7280')
      .attr('stroke-width', 1.5);

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.1em')
      .attr('font-size', (d) => 16 + d.completeness * 10)
      .attr('fill', '#111827')
      .attr('font-family', '"Noto Serif JP", "Hiragino Mincho ProN", serif')
      .text((d) => d.label);

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => 16 + d.completeness * 16 + 12)
      .attr('font-size', 10)
      .attr('fill', '#4b5563')
      .attr('font-style', 'italic')
      .text((d) => d.romaji);

    sim.on('tick', () => {
      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      sim.stop();
    };
  }, [nodes, fieldIndex, navigate]);

  return (
    <div className="relative h-full w-full">
      <svg ref={svgRef} className="h-full w-full" />
      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: MODULE_COLORS.classical }}
          />
          Classical flow
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: MODULE_COLORS['reverse-flow'] }}
          />
          Reverse flow
        </div>
      </div>
    </div>
  );
}
