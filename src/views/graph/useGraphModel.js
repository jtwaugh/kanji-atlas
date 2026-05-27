import { useMemo } from 'react';
import { terms, primaryRomaji } from '@/data';

const WEIGHTS = {
  neighbor: 1.0,
  'shared-field': 0.3,
  'shared-wave': 0.5,
};
const MAX_WEIGHT = 3;

function pairKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function buildGraph({ edgeTypes, modules, fields, waves }) {
  const enabled = new Set(edgeTypes);

  const visibleTerms = terms.filter((t) => {
    const matchesModule = modules.length === 0 || modules.includes(t.module);
    const matchesField =
      fields.length === 0 || fields.includes(t.semantic_field_id);
    const matchesWave =
      waves.length === 0 ||
      (t.transmission_waves ?? []).some((w) => waves.includes(w));
    return matchesModule && matchesField && matchesWave;
  });
  const visibleIds = new Set(visibleTerms.map((t) => t.id));

  const nodes = visibleTerms.map((t) => ({
    id: t.id,
    characters: t.characters,
    romaji: primaryRomaji(t),
    english: t.translation_range?.[0]?.rendering ?? null,
    module: t.module,
    semanticFieldId: t.semantic_field_id,
  }));

  const edgeMap = new Map();
  const addEdge = (a, b, type, weight) => {
    if (a === b) return;
    if (!visibleIds.has(a) || !visibleIds.has(b)) return;
    const key = pairKey(a, b);
    let edge = edgeMap.get(key);
    if (!edge) {
      const [source, target] = a < b ? [a, b] : [b, a];
      edge = { source, target, weight: 0, types: new Set() };
      edgeMap.set(key, edge);
    }
    edge.weight = Math.min(MAX_WEIGHT, edge.weight + weight);
    edge.types.add(type);
  };

  if (enabled.has('neighbor')) {
    for (const t of visibleTerms) {
      for (const nid of t.neighbor_ids ?? []) {
        addEdge(t.id, nid, 'neighbor', WEIGHTS.neighbor);
      }
    }
  }

  if (enabled.has('shared-char')) {
    const charCohorts = new Map();
    for (const t of visibleTerms) {
      for (const ch of t.characters) {
        if (!charCohorts.has(ch)) charCohorts.set(ch, []);
        charCohorts.get(ch).push(t.id);
      }
    }
    for (const [, cohort] of charCohorts) {
      if (cohort.length < 2) continue;
      const w = 1 / Math.log(1 + cohort.length);
      for (let i = 0; i < cohort.length; i++) {
        for (let j = i + 1; j < cohort.length; j++) {
          addEdge(cohort[i], cohort[j], 'shared-char', w);
        }
      }
    }
  }

  if (enabled.has('shared-field')) {
    const fieldCohorts = new Map();
    for (const t of visibleTerms) {
      const fid = t.semantic_field_id;
      if (!fid) continue;
      if (!fieldCohorts.has(fid)) fieldCohorts.set(fid, []);
      fieldCohorts.get(fid).push(t.id);
    }
    for (const [, cohort] of fieldCohorts) {
      for (let i = 0; i < cohort.length; i++) {
        for (let j = i + 1; j < cohort.length; j++) {
          addEdge(cohort[i], cohort[j], 'shared-field', WEIGHTS['shared-field']);
        }
      }
    }
  }

  if (enabled.has('shared-wave')) {
    const waveCohorts = new Map();
    for (const t of visibleTerms) {
      for (const w of t.transmission_waves ?? []) {
        if (!waveCohorts.has(w)) waveCohorts.set(w, []);
        waveCohorts.get(w).push(t.id);
      }
    }
    for (const [, cohort] of waveCohorts) {
      for (let i = 0; i < cohort.length; i++) {
        for (let j = i + 1; j < cohort.length; j++) {
          addEdge(cohort[i], cohort[j], 'shared-wave', WEIGHTS['shared-wave']);
        }
      }
    }
  }

  const edges = Array.from(edgeMap.values()).map((e) => ({
    source: e.source,
    target: e.target,
    weight: e.weight,
    types: Array.from(e.types),
  }));

  return { nodes, edges };
}

export default function useGraphModel({ edgeTypes, modules, fields, waves }) {
  const edgeKey = [...edgeTypes].sort().join(',');
  const moduleKey = [...modules].sort().join(',');
  const fieldKey = [...fields].sort().join(',');
  const waveKey = [...waves].sort().join(',');
  return useMemo(
    () => buildGraph({ edgeTypes, modules, fields, waves }),
    [edgeKey, moduleKey, fieldKey, waveKey], // eslint-disable-line react-hooks/exhaustive-deps
  );
}
