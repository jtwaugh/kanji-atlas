# Kanji Atlas

A curated conceptual atlas of Sino-Japanese transmission vocabulary — terms as nodes in an etymological, doctrinal, and translational network. Not a kanji dictionary, not a stroke-order tool.

For the product vision: [`spec.md`](spec.md).
For code conventions and the navigation model: [`CLAUDE.md`](CLAUDE.md).
This README is for hacking on the data and the loader.

## Run locally

```bash
npm install
npm run dev          # Vite dev server with HMR
node data/validate.js  # run before committing data changes
npm run build        # production bundle into dist/
```

Five routes: `/`, `/term/:id`, `/character/:char`, `/quiz`, `/debug`.

## What's in the data

| File | Rows | Holds |
|---|---|---|
| `data/terms.json` | 186 | Compounds — the central object |
| `data/characters.json` | 237 | Individual kanji |
| `data/sources.json` | 49 | Source texts |
| `data/source_concepts.json` | 182 | Sanskrit/Pali/Western source concepts |
| `data/literary_instances.json` | 190 | Term × source × passage joins |
| `data/semantic_fields.json` | 7 | Thematic clusters (FK target) |
| `data/transmission_waves.json` | 8 | Transmission-wave enum (FK target) |
| `data/agents.json` | 25 | Named historical coiners (FK target) |

Schema reference: [`data/schema.md`](data/schema.md). Agent-facing rules for adding data: [`data/AGENT_INSTRUCTIONS.md`](data/AGENT_INSTRUCTIONS.md).

All data access in the app goes through `src/data.js`, which imports the JSON files and exposes resolved accessors (`getTermById`, `getNeighbors`, `getInstancesForTerm`, etc.). Views never `fetch()` data files directly.

## The shape of the graph

Three structural facts that aren't obvious from a single file:

- **Terms ↔ characters is many-to-many.** A term contains M kanji; a kanji belongs to N terms. 75 of 237 characters appear in 2+ terms (top: 心 ×11, 法 ×11, 主 ×9, 理 ×7, 学/義/性/禅/無 ×6). These are the lateral connective tissue.
- **`neighbor_ids` is symmetric.** ~1,470 edges, fully reciprocated — if `a` lists `b`, then `b` lists `a`. Enforced by `validate.js`. (Earlier the field was directed and ~89% one-way; that was authoring drift and has been backfilled.)
- **Cross-module bridges exist.** A few characters anchor both classical and reverse-flow terms (e.g. 心 appears in `kokoro`, `mushin`, `honshin`, and in `shinri`/`shinrigaku`). Not precomputed anywhere — query for it.

## Facetable vs. narrative fields

The schema is deliberately split into structure-for-querying and prose-for-reading. Don't try to compress prose into structure or vice versa.

**Facetable (enums and arrays):** `term.module` (`classical` | `reverse-flow`), `term.semantic_field_id`, `term.transmission_waves[]`, `term.coiners[]`, `source_concept.languages[]`.

**Numeric (sortable / filterable):** `source.period_start_year`, `source.period_end_year` (integers, negative for BCE).

**Narrative prose (search but don't aggregate):** `term.coinage_notes`, `term.transmission_notes`, `term.conceptual_remainder`, `term.doctrinal_weight`, `source.period_notes`, `source_concept.notes`, `character.japanese_transmission`, `character.doctrinal_notes`. These hold the encyclopedia content; lookup work lives in the structured fields next to them.

## Starter queries

Save as `scratch.mjs` at the project root, run with `node scratch.mjs`. The data files are plain JSON — no loader needed for ad-hoc analysis.

```js
import t from './data/terms.json' with { type: 'json' };
import s from './data/sources.json' with { type: 'json' };

// Most-connected characters (which kanji anchor the most terms?)
const m = new Map();
for (const x of t) for (const c of x.characters) m.set(c, (m.get(c) || 0) + 1);
console.log([...m].sort((a, b) => b[1] - a[1]).slice(0, 10));

// Cross-module characters (anchor both classical and reverse-flow terms)
const mods = new Map();
for (const x of t) for (const c of x.characters) {
  if (!mods.has(c)) mods.set(c, new Set());
  mods.get(c).add(x.module);
}
console.log([...mods].filter(([, s]) => s.size > 1).map(([c]) => c));

// Coiner frequency
const ag = {};
for (const x of t) for (const c of x.coiners || []) ag[c] = (ag[c] || 0) + 1;
console.log(Object.entries(ag).sort((a, b) => b[1] - a[1]));

// Sources by chronology
console.log(s.sort((a, b) => a.period_start_year - b.period_start_year)
             .map(x => [x.period_start_year, x.id]));

// All terms in a given wave
console.log(t.filter(x => (x.transmission_waves || []).includes('kamakura-soto'))
             .map(x => x.id));

// Most-connected terms (highest neighbor degree)
console.log(t.slice()
             .sort((a, b) => (b.neighbor_ids || []).length - (a.neighbor_ids || []).length)
             .slice(0, 10)
             .map(x => [x.id, x.neighbor_ids.length]));
```

## Where things live

```
data/
  terms.json                source of truth — start here
  characters.json
  sources.json
  source_concepts.json
  literary_instances.json
  semantic_fields.json      FK target — don't modify
  transmission_waves.json   FK target — don't modify
  agents.json               FK target — add entries before referencing
  schema.md                 field reference
  AGENT_INSTRUCTIONS.md     for agents extending the dataset
  validate.js               run before committing data changes
  QUEUE.md                  backlog of terms to add
src/
  data.js                   loader and resolved accessors
  views/                    one directory per route
  components/               custom domain components
  components/ui/            ShadCN primitives
spec.md                     full product specification
CLAUDE.md                   navigation model and code conventions
```
