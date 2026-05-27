// One-shot: make terms.json neighbor_ids symmetric.
// For every directed edge a → b, ensures b → a also exists.
// Preserves original neighbor order; appends new back-edges at the end.
// Idempotent: running twice is a no-op.

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(join(__dirname, f), 'utf8');
const write = (f, obj) => writeFileSync(join(__dirname, f), JSON.stringify(obj, null, 2) + '\n');

const data = JSON.parse(read('terms.json'));
const idSet = new Set(data.map((t) => t.id));
const sets = new Map(data.map((t) => [t.id, new Set(t.neighbor_ids || [])]));

// Count edges before
let edgesBefore = 0;
let reciprocatedBefore = 0;
for (const t of data) {
  for (const n of t.neighbor_ids || []) {
    edgesBefore++;
    if (sets.get(n)?.has(t.id)) reciprocatedBefore++;
  }
}

// Add reverse edges
for (const t of data) {
  for (const n of t.neighbor_ids || []) {
    if (idSet.has(n)) sets.get(n).add(t.id);
  }
}

// Write back, preserving original order and appending only the new entries
let totalAdded = 0;
let termsTouched = 0;
for (const t of data) {
  const existing = t.neighbor_ids || [];
  const existingSet = new Set(existing);
  const full = sets.get(t.id);
  const additions = [...full].filter((x) => !existingSet.has(x));
  if (additions.length) {
    termsTouched++;
    totalAdded += additions.length;
  }
  t.neighbor_ids = [...existing, ...additions];
}

write('terms.json', data);

// Re-verify
const reparsed = JSON.parse(read('terms.json'));
const reparsedSets = new Map(reparsed.map((t) => [t.id, new Set(t.neighbor_ids || [])]));
let asymCount = 0;
for (const t of reparsed) {
  for (const n of t.neighbor_ids || []) {
    if (idSet.has(n) && !reparsedSets.get(n).has(t.id)) asymCount++;
  }
}

console.log(`before: ${edgesBefore} edges, ${reciprocatedBefore} reciprocated (${(100 * reciprocatedBefore / edgesBefore).toFixed(1)}%)`);
console.log(`added: ${totalAdded} back-edges across ${termsTouched} terms`);
console.log(`after: ${asymCount} asymmetric edges remaining (should be 0)`);
