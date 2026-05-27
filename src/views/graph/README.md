# Graph View

The Graph (`/graph`) is the **network** counterpart to the catalog Atlas. Where the Atlas argues a thesis through layout — two transmissions, side by side, no center — the Graph surfaces the topology underneath: which terms cluster, which kanji span fields, which curated neighbors form chains across the corpus.

## Intention

A reader who has met a term on its own page and wants to ask "what sits next to this in the broader web?" has, until now, only the neighbor list at the bottom of `TermView` — local, one-hop. The Graph shows the entire web at once, so the *shape* of adjacency is browsable rather than enumerated.

Terms are nodes (rendered as their kanji, not as circles — the glyph carries the visual weight, consistent with `.kanji-link` elsewhere). Edges are computed from four signals:

| Signal | Source | Default | Why |
|---|---|---|---|
| Curated neighbor | `term.neighbor_ids` | on | Editorially vetted; highest-signal adjacency. |
| Shared character | overlap in `term.characters` | on | Strong structural signal. Each shared kanji contributes `1 / log(1 + cohort)` so common kanji (神, 道) pull less than rare ones. |
| Shared semantic field | same `semantic_field_id` | off | Already encoded in the catalog grouping; off by default to avoid duplicating the Atlas. |
| Shared transmission wave | overlap in `transmission_waves` | off | Useful for lineage exploration (e.g. *xuanzang*, *meiji*); off by default to keep the initial view legible. |

Edges between the same pair from multiple signals merge — weights sum (clamped to 3) and the edge gets thicker.

## What it is *not*

- **Not a replacement for the Atlas.** The catalog still owns the two-flow thesis. Earlier in this project an Atlas-as-force-graph experiment was retired because organic clumping read as "one mass with sub-clumps" and hid the China→Japan vs. Japan→China split (see `src/views/atlas/README.md`). The Graph view earns the right to use force layout by being a *different surface with a different question*: not "what's the shape of the field?" but "what's adjacent to what?"
- **Not a hierarchy.** No parent/child, no breadcrumbs. Clicking a node hops to that term's page with a `← from graph` referrer strip — same model as the rest of the app (CLAUDE.md navigation model).
- **Not an editor or authoring tool.** The graph is read-only. Edge weights, layout parameters, and curated neighbors are tuned in code and data, not in the UI.

## Interaction

- **Click** a glyph → navigate to `/term/:chars` with `state: { fromGraph: true }`.
- **Hover** → 1-hop neighborhood stays at full opacity; the rest dims to 12%. This focused mode is what makes the graph readable at 186 nodes — without it the dense regions become a hairball.
- **Drag** a node → temporarily pin while held; releases on `dragend`.
- **Zoom and pan** → mouse wheel and click-drag on background. Constrained to [0.3×, 3×]. Zoom transform is preserved across filter changes; node positions are preserved across filter changes too (only newly-introduced nodes start at random positions).

## Filters

Above the canvas:
- **Edges** — four edge-type toggles. Defaults: neighbor + shared-character.
- **Flow** — classical / reverse-flow chips. Empty selection falls back to "all" so the user can't accidentally land on an empty graph by deselecting both.
- **Filter** — `Field ▾` and `Wave ▾` popovers, multi-select checkbox lists drawn from `semantic_fields.json` and `transmission_waves.json`. Empty = all. Combine to narrow (e.g. `Field: Emptiness and Negation` + `Wave: Chan/Zen`).
- **Labels** — `Romaji` and `English` chips. Off by default. When on, primary romaji and the first `translation_range[0].rendering` render in a smaller, dimmer text block below each glyph. The force simulation's collide radius grows when labels are visible so labels don't overlap.
- Read-out on the right: `N terms · M edges`.

Filter state is local to `GraphView`. Changing a filter rebuilds the model via `useGraphModel`, which is memoized on the joined filter keys (edge types, flows, fields, waves).

## Data contract

All content comes from `src/data.js` (`terms`, `primaryRomaji`). The view never fetches, never hardcodes. Missing optional fields (`transmission_waves`, `semantic_field_id`) are tolerated — terms simply don't contribute to those edge types.

## File layout

- `GraphView.jsx` — route shell, filter UI, container.
- `ForceGraph.jsx` — owns the SVG and the d3-force simulation. D3 owns its SVG entirely (CLAUDE.md component rule).
- `useGraphModel.js` — pure `({ edgeTypes, modules }) → { nodes, edges }`. No DOM, no D3.

## Future directions

- **Bipartite term↔character nodes.** Currently term-only with shared-character edges. A bipartite view would be more truthful to the many-to-many model but would roughly double node count; revisit if the current view feels reductive.
- **Search-driven focus.** A text input that fades non-matching nodes (by characters, romaji, or English rendering). Deferred.
- **Field/wave color encoding.** Glyphs are currently uncolored. A categorical palette by `semantic_field_id` or `transmission_waves` would add a second readable dimension; held until we see whether it adds signal or noise.
- **Persisting layout across reloads.** Positions persist within a session but reset on page reload. localStorage cache is a small addition once the layout feels good.
