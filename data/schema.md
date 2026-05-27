# Data shape

Informal field reference for the JSON files in `data/`. Fields marked optional may be absent — views must render what exists and render nothing where absent (never crash on missing optional fields).

## `terms.json`

Array of term entries. Fields marked **required** are enforced by `data/validate.js`; everything else is optional.

- `id` — **required**, string, stable slug used in URLs
- `characters` — **required**, string, one or more kanji (every char must have an entry in `characters.json`)
- `module` — **required**, string, one of `"classical"` or `"reverse-flow"`
- `semantic_field_id` — **required**, string, fk → `semantic_fields.json`
- `source_concept_id` — **required**, string, fk → `source_concepts.json`
- `neighbor_ids` — **required**, string[] (may be empty), each must reference an existing term `id`. **Symmetric**: if `a` lists `b`, then `b` must list `a`. `validate.js` enforces this.
- `components` — **required**, array, per-character breakdown with `char` and `meaning`
- `on_reading` — **required**, string, kana for the ON reading
- `kun_reading` — string, optional, kana for the KUN reading
- `romaji_on` — string, optional, Hepburn romanization of the on-reading (only valid when `on_reading` is present)
- `romaji_kun` — string, optional, Hepburn romanization of the kun-reading (only valid when `kun_reading` is present)
- `transmission_waves` — string[], optional, each entry must be an id in `transmission_waves.json`. A term can span multiple waves (e.g. a Tang Caodong formula re-popularized in Edo-period Rinzai); the set has no order semantics — chronology lives in `transmission_notes`
- `transmission_notes` — string, optional, prose narrative for terms whose wave history is more complex than a flat tag set
- `coiners` — string[], optional, each entry must be an id in `agents.json`. The named historical actors responsible for the term's coinage or stabilization
- `coinage_notes` — string, optional, the encyclopedic prose about who coined the term, when, in what text, and against what predecessor vocabulary. Collective/institutional agents that don't have an `agents.json` entry (e.g. "Meiji translators of the 1870s") live here
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
- `languages` — string[], optional, the languages this source concept lives across (e.g. `["English", "French", "German"]`, `["Sanskrit", "Classical Chinese", "Japanese"]`). For modern political/philosophical concepts the array is often long because the concept circulates across multiple European traditions. Earlier convention used a single slash-separated string `language`; that field is gone, use `languages`
- `gloss` — string, optional
- `notes` — string, optional. Cross-language parallels (e.g. "also French liberté for English liberty") and attribution shorthand (e.g. Dōgen-specific reactivations) live here

## `transmission_waves.json`

Enum of valid IDs for `term.transmission_waves`. Each entry:

- `id` — string, the slug used on terms
- `label` — string, display label
- `period` — string, rough historical range
- `description` — string, what the wave covers

Current waves: `first-wave`, `abhidharma`, `prajnaparamita`, `xuanzang`, `tendai`, `chan-zen`, `kamakura-soto`, `japanese-zen`.

## `agents.json`

Reference table of named historical actors referenced by `term.coiners`. Each entry:

- `id` — string, slug used in `coiners`
- `name_en` — string, Romanized name
- `name_kanji` — string, optional, the name in CJK characters
- `years` — string, optional, life dates (e.g. `"1829–1897"`)
- `role` — string, one-sentence role description in the atlas voice
- `notes` — string, optional

Collective or institutional agents ("Meiji translators of the 1870s–1880s", "Ministry of Communications") are NOT added here — they stay as prose in `coinage_notes`. The threshold for an `agents.json` entry is: a named individual whose coinage is attributable.

## Other files

- `semantic_fields.json` — `{ id, label, module, description }`. `module` matches the term `module` enum (`"classical"` | `"reverse-flow"`).
- `sources.json` — literary source metadata: `{ id, title, title_ja, period_start_year, period_end_year, period_notes, tradition, notes }`. `period_start_year` / `period_end_year` are integers (negative for BCE) suitable for chronological sorting; `period_notes` carries the full narrative ("Sanskrit original c. 1st–2nd century CE; Xuanzang's Chinese translation 649 CE"). The earlier single `period` string field is gone.
- `literary_instances.json` — `{ id, term_id, source_id, passage, notes }`. `validate.js` requires all five; `term_id` and `source_id` must resolve.

## Notes on field shape

A few fields are deliberately *not* enums even though they look enumerable:

- `term.coinage_notes`, `source.period_notes`, `source_concept.notes` — encyclopedic prose. Cite agents/sources/years inside this text; the structured fields (`coiners`, `period_start_year`, `languages`) handle the lookup-and-filter work. Don't try to compress the prose into structure or vice versa.
- `term.translation_range`, `term.false_friends`, `character.graphic_evolution` — arrays of small objects, not enums. Each entry is unique to its parent.
