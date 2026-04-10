# CLAUDE.md — Zen Kanji Atlas

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
Don't build game modes or stroke tracing until Phase 5+.