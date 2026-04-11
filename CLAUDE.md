# CLAUDE.md — Kanji Atlas

## What this is (and isn't)
Kanji Atlas is a curated conceptual atlas of Sino-Japanese transmission vocabulary — terms as nodes in an etymological, doctrinal, and translational network. It is **not** a character dictionary (no exhaustive kanji lookup, no JLPT drill, no reading tables for their own sake) and **not** a stroke-order or handwriting tool (Hanzi Writer is used for compositional illustration, not tracing practice or handwriting acquisition). If a proposed feature would make sense in Jisho, WaniKani, or Skritter but not in a classicist's commentary, it probably doesn't belong here.

## Stack
Vite + React + JavaScript + ShadCN + react-router-dom + D3 + Hanzi Writer.
Run locally: `npm run dev`. No backend, no auth, no database.

## Data
`data/terms.json` is the source of truth. Import it via `src/data.js` — never fetch() it.
Do not hardcode content anywhere in the app. If it belongs in the UI, it belongs in the JSON.
Run `node data/validate.js` before committing changes to terms.json.

## Module boundaries
Views do not import from each other. They communicate through navigation only.
All data access goes through `src/data.js`. No view calls fetch() directly.
`data/schema.md` documents the shape of `terms.json` — keep it in sync with the data.

## Routing
react-router-dom, clean paths. Five routes: / /term/:id /character/:char /quiz /debug.
Character params are URL-encoded kanji — use encodeURIComponent/decodeURIComponent explicitly.

## Component rules
ShadCN components for all chrome: buttons, badges, cards, inputs, tooltips.
Domain components (KanjiDisplay, ComponentBreakdown, etc.) are custom — live in src/components/.
D3 owns its SVG entirely. Never make D3 nodes into React components.
Hanzi Writer attaches to a div via useRef inside useEffect.

## Missing fields
Terms will have missing optional fields. Render what exists, render nothing where absent.
Never crash or show error UI for a missing optional field.

## Style
Don't add fields to `terms.json` without updating `data/schema.md`.
Don't add npm packages without a clear reason.
Don't build game modes until Phase 5+. Stroke tracing and handwriting practice are out of scope entirely — this is not a stroke-order tool.
Shared visual treatments live as CSS classes in `src/index.css` under `@layer components`, not as JS constants or repeated Tailwind strings. If two views share a look, define it once in CSS.

Clickable kanji use the `.kanji-link` class: plain foreground text, no underline, sky-blue on hover. The glyph carries the visual weight — hover color signals navigability without ornament competing with the character.