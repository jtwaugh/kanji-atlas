# Atlas View

The Atlas is the landing screen (`/`) and the map readers use to orient themselves in the Kanji Atlas. Its job is to make the *shape* of the vocabulary legible before any single term is opened.

## Intention

The atlas argues a thesis by its layout: East Asian philosophical vocabulary was shaped by **two transmissions**, running in opposite directions across roughly a millennium and a half.

- **Classical Flow** — China → Japan. Buddhist and Confucian terms carried along with the scriptures, roughly 5th–13th century CE. These terms arrived with doctrinal weight already attached.
- **Reverse Flow** — Japan → China. Meiji-era (1868–1920) coinages where Japanese intellectuals forged *wasei-kango* to translate Western philosophical, political, and scientific concepts, which were then re-exported to China.

The screen therefore splits cleanly in half. Left is the classical transmission; right is the reverse. There is no center, no merge — the visual separation *is* the argument. A reader should be able to glance at the atlas and feel the two epochs as distinct bodies of work before reading a word.

## Layout

- **Two halves**, side by side on wide screens, stacked on narrow ones. Each half is a `<section>` with a title and a one-line subtitle naming the direction and period.
- Within each half, semantic fields are laid out as a **rough grid of cards** (ShadCN `Card`). The grid is "rough" on purpose — not every flow has the same number of fields, and the grid should breathe rather than force symmetry.
- Each card is one semantic field (e.g. "emptiness and negation", "western philosophy and logic"). The card header names the field and carries its description; the body holds the terms that belong to it.
- Each term is a clickable tile showing the kanji (serif, large) and the romaji beneath it. Clicking navigates to `/term/:id`.

## What it is *not*

- **Not a force-directed graph.** The original prototype used a D3 force simulation clustering terms around semantic fields. That layout hid the two-flow thesis — terms drifted into organic clumps that read as "one mass with sub-clumps" rather than "two distinct transmissions". The grid is deliberately more editorial.
- **No legend.** Color-coded dots labeled "Classical flow / Reverse flow" are redundant when the screen already physically separates the two. The section headers do the work a legend would do, and they do it larger and earlier.
- **Not a search or filter surface.** The atlas shows *everything* at once on purpose. Search, filter, and quiz live on other routes.
- **Not a stroke-order or writing surface.** Hanzi Writer lives inside the term/character views. The atlas is a map, not a workbench.

## Data contract

All content comes from `src/data.js` (`terms`, `semanticFields`). The view groups:

1. Semantic fields by `module` (`classical` | `reverse-flow`).
2. Terms into their `semantic_field_id`.

A field with zero terms still renders a card (with a "No terms yet" placeholder), so authoring gaps in `data/terms.json` are visible rather than silently hidden. A term whose `semantic_field_id` has no matching field is dropped — the atlas trusts `data/validate.js` to catch that before it ships.

Per CLAUDE.md: the view never fetches, never hardcodes content, and renders gracefully around missing optional fields on each term.

## Future directions

Things explicitly held off for later phases:

- Connecting terms across flows via `neighbor_ids` (false friends, conceptual cousins). These deserve their own surface — likely a detail on the term view — and would muddy the two-flow split here.
- Source-concept provenance (Sanskrit, German, French origin tags). Belongs on the term view first; might surface here as a small icon row inside each tile once the vocabulary is large enough to need it.
- Density or completeness cues (the old prototype sized nodes by how many optional fields were filled). Useful as an authoring tool — worth revisiting once `terms.json` is large enough that authoring progress is worth visualizing. For now it's authoring noise the reader doesn't need.
- Stroke tracing, game modes: Phase 5+.
