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

## Navigation model
Terms and characters form a **many-to-many graph, not a tree**. A character belongs to N terms, a term contains M characters, and terms link laterally to other terms through shared characters, shared waves, and semantic neighbors. There is no parent/child relationship between any two nodes.

Consequences, which are binding:
- **No breadcrumbs.** No `Home / Term / Character` chrome, no `/` separators between route segments, no "parent" framing anywhere in the UI. A slash between route segments is a lie about the data model — don't render one.
- **The only legitimate back-affordance is a *referrer* link**, driven by `location.state`, not by route ancestry. It answers "what did I click to get here?" — which is the only question that has an answer on a graph.
- Referrer chrome lives in the **global `ReferrerStrip`** in `src/App.jsx` (the thin strip below the main header). It reads `location.state?.fromTerm` or `location.state?.fromCharacter` and renders nothing when absent, so pages reached directly by URL don't get a blank band.
- The `state` keys describe the *source* of the hop, not the destination. When adding a `<Link>` that leaves a node, pass the referrer in `state`:
  - Leaving a term → `state={{ fromTerm: { characters, romaji } }}` (used in `src/views/term/TermView.jsx` for term→character component links and term→term neighbor links).
  - Leaving a character → `state={{ fromCharacter: { char } }}` (used in `src/views/character/CharacterView.jsx` for character→term related-term links).
  - The strip renders whichever key is present, so the same `<Link>` target (e.g. a term page) can be reached from either source and the back label stays honest.
- Atlas (`/`) is the one node that does *not* need a referrer, because the wordmark in the main header already routes there. Don't set `fromAtlas` — it would just duplicate the logo.
- If you ever feel the urge to add a breadcrumb, a "back to parent" button, or a hierarchical nav, stop — you're modeling a tree that isn't there. Extend the referrer-strip shape instead.

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