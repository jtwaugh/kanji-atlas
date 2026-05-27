import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag,
  zoom,
  zoomIdentity,
} from 'd3';

const WIDTH = 1400;
const HEIGHT = 900;

export default function ForceGraph({ nodes, edges, showRomaji, showEnglish }) {
  const svgRef = useRef(null);
  const positionsRef = useRef(new Map());
  const zoomTransformRef = useRef(zoomIdentity);
  const navigate = useNavigate();

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const svg = select(svgEl);
    svg.selectAll('*').remove();
    svg.attr('viewBox', [-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT]);

    const root = svg.append('g').attr('class', 'graph-root');

    const zoomBehavior = zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        root.attr('transform', event.transform);
        zoomTransformRef.current = event.transform;
      });
    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, zoomTransformRef.current);

    const positions = positionsRef.current;
    const simNodes = nodes.map((n) => {
      const prev = positions.get(n.id);
      return prev ? { ...n, x: prev.x, y: prev.y } : { ...n };
    });
    const simEdges = edges.map((e) => ({ ...e }));

    const adj = new Map();
    for (const e of edges) {
      if (!adj.has(e.source)) adj.set(e.source, new Set());
      if (!adj.has(e.target)) adj.set(e.target, new Set());
      adj.get(e.source).add(e.target);
      adj.get(e.target).add(e.source);
    }

    const linkSel = root
      .append('g')
      .attr('class', 'graph-links')
      .attr('stroke', 'currentColor')
      .attr('stroke-linecap', 'round')
      .selectAll('line')
      .data(simEdges)
      .join('line')
      .attr('stroke-opacity', (d) => Math.min(0.45, 0.08 + 0.12 * d.weight))
      .attr('stroke-width', (d) => 0.5 + Math.min(2, d.weight * 0.8));

    const nodeSel = root
      .append('g')
      .attr('class', 'graph-nodes')
      .selectAll('g.graph-node')
      .data(simNodes, (d) => d.id)
      .join('g')
      .attr('class', 'kanji-link graph-node')
      .attr('cursor', 'pointer');

    nodeSel
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-family', '"Noto Serif JP", "Hiragino Mincho ProN", serif')
      .attr('font-size', 24)
      .attr('fill', 'currentColor')
      .text((d) => d.characters);

    if (showRomaji) {
      nodeSel
        .filter((d) => !!d.romaji)
        .append('text')
        .attr('class', 'graph-node-romaji')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'hanging')
        .attr('y', 18)
        .attr('font-size', 11)
        .attr('font-style', 'italic')
        .attr('fill', 'currentColor')
        .attr('opacity', 0.65)
        .text((d) => d.romaji);
    }

    if (showEnglish) {
      const englishY = showRomaji ? 32 : 18;
      nodeSel
        .filter((d) => !!d.english)
        .append('text')
        .attr('class', 'graph-node-english')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'hanging')
        .attr('y', englishY)
        .attr('font-size', 11)
        .attr('fill', 'currentColor')
        .attr('opacity', 0.75)
        .text((d) => d.english);
    }

    nodeSel.append('title').text((d) => {
      const parts = [d.characters];
      if (d.romaji) parts.push(d.romaji);
      if (d.english) parts.push(d.english);
      return parts.join(' · ');
    });

    nodeSel
      .on('click', (event, d) => {
        navigate(`/term/${encodeURIComponent(d.characters)}`, {
          state: { fromGraph: true },
        });
      })
      .on('mouseenter', (event, d) => {
        const hot = new Set(adj.get(d.id) ?? []);
        hot.add(d.id);
        nodeSel.attr('opacity', (n) => (hot.has(n.id) ? 1 : 0.12));
        linkSel.attr('stroke-opacity', (e) => {
          const a = typeof e.source === 'object' ? e.source.id : e.source;
          const b = typeof e.target === 'object' ? e.target.id : e.target;
          return a === d.id || b === d.id
            ? Math.min(0.9, 0.4 + 0.2 * e.weight)
            : 0.03;
        });
      })
      .on('mouseleave', () => {
        nodeSel.attr('opacity', 1);
        linkSel.attr('stroke-opacity', (d) => Math.min(0.45, 0.08 + 0.12 * d.weight));
      });

    const collideRadius =
      showRomaji && showEnglish ? 44 : showRomaji || showEnglish ? 30 : 20;

    const sim = forceSimulation(simNodes)
      .force(
        'link',
        forceLink(simEdges)
          .id((d) => d.id)
          .distance((d) => 70 / Math.max(0.5, d.weight))
          .strength((d) => Math.min(1, 0.25 * d.weight)),
      )
      .force('charge', forceManyBody().strength(-220))
      .force('center', forceCenter(0, 0).strength(0.05))
      .force('collide', forceCollide(collideRadius))
      .on('tick', () => {
        linkSel
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
        nodeSel.attr('transform', (d) => `translate(${d.x},${d.y})`);
      });

    nodeSel.call(
      drag()
        .on('start', (event, d) => {
          if (!event.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }),
    );

    return () => {
      for (const n of simNodes) {
        if (Number.isFinite(n.x) && Number.isFinite(n.y)) {
          positionsRef.current.set(n.id, { x: n.x, y: n.y });
        }
      }
      sim.stop();
    };
  }, [nodes, edges, navigate, showRomaji, showEnglish]);

  return (
    <svg
      ref={svgRef}
      role="img"
      aria-label="Term network graph"
      className="h-full w-full text-foreground"
    />
  );
}
