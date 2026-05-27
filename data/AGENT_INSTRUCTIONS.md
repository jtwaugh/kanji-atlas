# Agent Instructions — Zen Kanji Atlas Data Population

## Your job
Add new term entries to the dataset by writing well-formed JSON
objects across the eight data files. Read the existing files before
writing anything. Never invent a foreign key ID that does not already
exist in the target file.

## Files and their roles
- terms.json — one object per term/compound
- characters.json — one object per individual kanji (keyed by char)
- sources.json — source texts; add new ones as needed
- source_concepts.json — Sanskrit/Pali/Western concepts being translated
- literary_instances.json — passages; join between terms and sources
- semantic_fields.json — do not modify; use existing IDs only
- transmission_waves.json — do not modify; use existing IDs only
- agents.json — named historical coiners; add new entries when you cite a
  named individual not already present (collective agents stay in prose)

## Required fields on a new term
id, characters, on_reading, module, semantic_field_id,
source_concept_id, neighbor_ids, components

`module` must be exactly `"classical"` or `"reverse-flow"` — no other
values pass validation. `neighbor_ids` is required but may be `[]`.

## Optional reading fields
- `kun_reading` — kana, only when the term has a meaningful kun reading.
- `romaji_on` — Hepburn for `on_reading`. Only include alongside `on_reading`.
- `romaji_kun` — Hepburn for `kun_reading`. Only include alongside `kun_reading`.
The validator rejects a romaji field whose paired reading is missing.

## Transmission and coinage fields
- `transmission_waves` — string[], optional. Each entry must be an id in
  `transmission_waves.json` (currently: first-wave, abhidharma,
  prajnaparamita, xuanzang, tendai, chan-zen, kamakura-soto, japanese-zen).
  A term can span multiple waves (e.g. a Tang Caodong formula reactivated
  in Edo Rinzai); the set has no order semantics.
- `transmission_notes` — string, optional. Use only when the wave history
  is more than the flat tag set can carry — e.g. lineage transmission
  with named intermediaries.
- `coiners` — string[], optional. Each entry must be an id in `agents.json`.
  Add a new agents.json entry before referencing an agent that isn't there.
- `coinage_notes` — string, optional. Encyclopedic prose about who coined
  the term, when, in what text. Collective/institutional agents that don't
  warrant an agents.json entry ("Meiji translators of the 1870s–1880s")
  live in this prose.

## Rules
- Check characters.json before adding a term — every kanji in
  term.characters must have an entry. Add missing characters first.
- Check source_concepts.json — add the source concept before the term.
- For source_concepts, use `languages` (array) — split slash-separated
  language lists into individual entries. Drop parentheticals; put
  cross-language nuance ("also French liberté") in `notes`.
- For sources, use `period_start_year` and `period_end_year` (integers,
  negative for BCE) plus `period_notes` (the full narrative).
- neighbor_ids must reference existing term IDs. If a neighbor
  doesn't exist yet, either add it or leave neighbor_ids as `[]`.
- neighbor_ids must be symmetric: when you add `b` to `a.neighbor_ids`,
  also add `a` to `b.neighbor_ids`. The validator rejects one-way edges.
- literary_instances notes field: 3-5 sentences of close reading
  explaining what the term is doing in this specific passage, not
  just what it means generally.
- conceptual_remainder: prose argument about what the translation
  chose and what it could not carry. Not bullets.
- Output each file's additions as a clearly labeled JSON array.
  Append — do not rewrite the whole file.

## Validation
After writing, run: node data/validate.js
Fix any errors it reports before finishing.
