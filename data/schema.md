# Data shape

Informal field reference for the JSON files in `data/`. Fields marked optional may be absent — views must render what exists and render nothing where absent (never crash on missing optional fields).

## `terms.json`

Array of term entries. Fields marked **required** are enforced by `data/validate.js`; everything else is optional.

- `id` — **required**, string, stable slug used in URLs
- `characters` — **required**, string, one or more kanji (every char must have an entry in `characters.json`)
- `module` — **required**, string, one of `"classical"` or `"reverse-flow"`
- `semantic_field_id` — **required**, string, fk → `semantic_fields.json`
- `source_concept_id` — **required**, string, fk → `source_concepts.json`
- `neighbor_ids` — **required**, string[] (may be empty), each must reference an existing term `id`
- `components` — **required**, array, per-character breakdown with `char` and `meaning`
- `on_reading` — **required**, string, kana for the ON reading
- `kun_reading` — string, optional, kana for the KUN reading
- `romaji_on` — string, optional, Hepburn romanization of the on-reading (only valid when `on_reading` is present)
- `romaji_kun` — string, optional, Hepburn romanization of the kun-reading (only valid when `kun_reading` is present)
- `transmission_wave` — string, optional
- `coinage_agent` — string, optional
- `translation_range` — array, optional, each entry `{ rendering, emphasis }`
- `conceptual_remainder` — string, optional, long-form prose
- `doctrinal_weight` — string, optional, long-form prose
- `false_friends` — array, optional, each entry `{ char, language, divergence }`

## `characters.json`

Array of individual character entries.

- `char` — string, single kanji
- `strokes` — number
- `radical` — string
- `gloss` — string, optional, one-sentence etymological/doctrinal essence of the character standalone. Not a dictionary gloss: curated in the atlas voice, phrased as essence rather than a list of senses. Rendered on `CharacterView` directly under the header
- `pinyin` — string, optional, tone-marked Mandarin (e.g. `"kōng"`). Displayed prominently on `CharacterView`, subdued on `TermView` component breakdowns, reflecting the Japanese-first framing
- `on_readings` — string[]
- `kun_readings` — string[]
- `components` — array, optional, per-component breakdown with `char`, `meaning`, `strokes`
- `graphic_evolution` — array, optional, each entry `{ period, form_description, notes }`
- `japanese_transmission` — string, optional, long-form prose. When and how the character came into Japanese use — first-wave Chinese script adoption, Buddhist transmission waves, Meiji coinage, etc. Written as 2–5 sentences, not a structured object. Rendered as the "Arrival in Japanese" section on `CharacterView`
- `doctrinal_notes` — string, optional

## `source_concepts.json`

Array of source concepts referenced by terms via `source_concept_id`.

- `id` — string
- `term` — string, the source-language term as commonly written in Latin transliteration (e.g. `"śūnyatā"`, `"philosophie"`)
- `devanagari` — string, optional, the term in Devanagari script. Only present for Sanskrit entries. When present, `TermView` renders it above the transliterated `term` to signal the original script tradition
- `language` — string, optional (e.g. `"Sanskrit"`, `"English / German"`)
- `gloss` — string, optional
- `notes` — string, optional

## Other files

- `semantic_fields.json` — `{ id, label, module, description }`. `module` matches the term `module` enum (`"classical"` | `"reverse-flow"`).
- `sources.json` — literary source metadata: `{ id, title, title_ja, period, tradition, notes }`
- `literary_instances.json` — `{ id, term_id, source_id, passage, notes }`. `validate.js` requires all five; `term_id` and `source_id` must resolve.
