// One-shot: strip same-field pairs from neighbor_ids.
// Neighbors are now editorial juxtapositions the graph can't derive; the
// shared-field cohort is already drawn by the graph's shared-field edge type
// (src/views/graph/useGraphModel.js), and a term's own field is shown by the
// field badge on TermView.
//
// Removes a↔b from neighbor_ids when both terms share semantic_field_id,
// UNLESS one term lists the other in false_friends (matching by characters).
// Those pairs render through the divergence branch in TermView and stay.
//
// Symmetric by construction. Idempotent: running twice is a no-op.

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(join(__dirname, f), 'utf8');
const write = (f, obj) => writeFileSync(join(__dirname, f), JSON.stringify(obj, null, 2) + '\n');

const data = JSON.parse(read('terms.json'));
const byId = new Map(data.map((t) => [t.id, t]));

const isFalseFriend = (a, b) => {
  const aFF = a.false_friends || [];
  const bFF = b.false_friends || [];
  return (
    aFF.some((f) => f.char === b.characters) ||
    bFF.some((f) => f.char === a.characters)
  );
};

let edgesBefore = 0;
let edgesAfter = 0;
let termsTouched = 0;

for (const t of data) {
  const original = t.neighbor_ids || [];
  edgesBefore += original.length;

  const kept = original.filter((nid) => {
    const n = byId.get(nid);
    if (!n) return true; // unknown id — validate.js will catch it; don't drop silently
    if (n.semantic_field_id !== t.semantic_field_id) return true;
    if (isFalseFriend(t, n)) return true;
    return false;
  });

  if (kept.length !== original.length) termsTouched++;
  edgesAfter += kept.length;
  t.neighbor_ids = kept;
}

write('terms.json', data);

console.log(`before: ${edgesBefore} neighbor edges`);
console.log(`after:  ${edgesAfter} neighbor edges`);
console.log(`removed: ${edgesBefore - edgesAfter} across ${termsTouched} terms`);
