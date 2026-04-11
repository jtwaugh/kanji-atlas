# Agent Instructions — Zen Kanji Atlas Data Population

## Your job
Add new term entries to the dataset by writing well-formed JSON 
objects across the six data files. Read the existing files before 
writing anything. Never invent a foreign key ID that does not already 
exist in the target file.

## Files and their roles
- terms.json — one object per term/compound
- characters.json — one object per individual kanji (keyed by char)
- sources.json — source texts; add new ones as needed
- source_concepts.json — Sanskrit/Pali/Western concepts being translated
- literary_instances.json — passages; join between terms and sources
- semantic_fields.json — do not modify; use existing IDs only

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

## Rules
- Check characters.json before adding a term — every kanji in 
  term.characters must have an entry. Add missing characters first.
- Check source_concepts.json — add the source concept before the term.
- neighbor_ids must reference existing term IDs. If a neighbor 
  doesn't exist yet, either add it or leave neighbor_ids as `[]`.
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