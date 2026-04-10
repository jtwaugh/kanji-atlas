# Zen Kanji Conceptual Atlas — Full Project Specification

## Overview

This tool is a conceptual atlas of Sino-Japanese and Sino-Japanese-to-modern vocabulary, designed for a linguistically sophisticated reader who has working knowledge of kana and wants to build meaningful recognition of kanji — not through rote memorization but through etymological, compositional, and doctrinal depth. It is organized around two epochal transmission events — the classical Buddhist-Confucian flow from China into Japan (roughly 5th–13th centuries CE), and the Meiji-era reverse flow of modernization vocabulary from Japan back into Chinese (roughly 1868–1920) — and treats each term as a node in a network rather than an item in a list.

The model is closer to how a classicist approaches Latin or Greek than how a language learner approaches a spoken tongue. The target user can read hiragana and katakana, understands that katakana marks foreignness and otherness rather than merely formality, and has enough structural intuition about Japanese to know what they're looking at — but lacks the textual layer: the classical Sino-Japanese Buddhist and intellectual conceptual vocabulary that Zen literature and modern East Asian thought actually run on. The goal is recognition and meaningful association, not production or conversational fluency. The tool trains an eye, and gives that eye a grip.

---

## The Two Epochal Schemata

The atlas is organized around two distinct but parallel transmission events. Each has its own module, its own term set, and its own explanatory logic — but they share a unified data structure, because the fundamental questions being asked are the same: *Where did this word come from? What was being translated, and what did the translation choose? What does the character's composition reveal? And how did the concept move?*

The table below defines the parallel structure. Every term entry in both modules answers the same set of questions, mapped onto the appropriate historical context.

| Field | Classical Flow (China → Japan) | Modern Reverse Flow (Japan → China) |
|---|---|---|
| **Term** | Sino-Japanese Buddhist or Confucian compound | Wasei-kango (和製漢語): Japanese-coined Chinese-character word |
| **Period of transmission** | Roughly 5th–13th century CE, peaking with Buddhist transmission waves | Roughly 1868–1912 (Meiji era), concentrated in a ~50-year window |
| **Source concept** | Sanskrit or Pali Buddhist/Indian philosophical term | Western European concept (typically English, French, or German) |
| **Source language form** | Sanskrit/Pali original with romanization and meaning | European source word with language of origin and meaning |
| **Translation interpretation** | How Chinese translators rendered Sanskrit into Classical Chinese — what they emphasized, what they suppressed | How Meiji Japanese translators rendered Western concepts into Chinese characters — what they chose to name, what they left unnamed |
| **Character composition** | Semantic and phonetic components of the kanji, with each component's classical meaning | Same — the characters used are classical Chinese, but assembled in Japan for a new purpose |
| **Date of coinage / transmission** | Approximate century and Buddhist textual tradition in which the term entered Chinese, then Japanese | Named coiner and approximate year where known (e.g., Nishi Amane coins 哲学 in 1874) |
| **Agent of transmission** | Translation schools, individual monk-translators (Xuanzang, Kumārajīva), transmission lineages | Named Meiji intellectuals and translators (Nishi Amane, Fukuzawa Yukichi, Nishimura Shigeki, Liang Qichao as return agent) |
| **Graphic evolution** | Oracle bone → bronze → seal → clerical → modern forms, with the ability to click into each | Same graphic evolution, but the *coinage moment* is modern — emphasis on what classical components were recruited and why |
| **Translation range** | Spectrum of English renderings with notes on what each emphasizes or suppresses | Spectrum of how the term has been rendered back into English from Chinese and Japanese — and whether the two languages have since diverged |
| **Conceptual remainder** | What the Sanskrit term meant that the Chinese translation could not fully carry | What the Western concept meant that the Japanese coinage could not fully carry — the untranslated residue |
| **Return journey** | How the Chinese Buddhist term entered Japanese (via Korean peninsula, direct sea routes, particular lineages) | How the Meiji coinage entered Mandarin Chinese and Korean — usually via Japanese-educated intellectuals returning home |
| **Doctrinal / ideological weight** | Why this term matters, what debates it sits inside, which lineages or texts it is central to | Why this coinage matters ideologically — what worldview it imported, what it enabled or foreclosed in East Asian intellectual life |
| **Neighbors** | Related terms that compound with it, oppose it, or are frequently confused with it | Other coinages from the same intellectual cluster (e.g., 民主, 自由, 権利, 社会 arrive together as liberal political vocabulary) |
| **Literary instances** | Curated appearances in koan collections, Dogen, Platform Sutra, etc. — not exhaustive citation but *significant* appearances that show the term doing real work in a real argument | Significant appearances in Meiji intellectual texts, key moments of Chinese adoption, contemporary usage showing semantic drift — the term caught in the act of meaning something |
| **False friends / drift** | Cases where the Japanese and Chinese readings of the same character have diverged in meaning | Cases where the Japanese coinage and its Chinese adoption have since diverged semantically |

---

## Module One: Classical Flow (China → Japan)

### What This Module Is About

The classical flow module covers the approximately 1,500-year transmission of Buddhist, Taoist, and Confucian vocabulary from Classical Chinese into Japanese. This is the etymological bedrock of Zen literature. Every term in this module is a frozen piece of Classical Chinese that entered Japanese riding a wave of religious and philosophical transmission, and has been carrying that freight ever since.

The cognitive experience this module aims to produce: sitting with a Cleary translation of a koan or a Dogen fascicle, encountering a term like 本心 or 般若, and having an immediate felt sense of what characters it is made of, what the Chinese root is doing, what the Sanskrit background is, and what the English translation is choosing to emphasize.

### Transmission Waves

Terms should be tagged by the transmission wave they arrived in, since this shapes their doctrinal coloring:

**First wave (5th–6th century):** Early Buddhist sutras, largely via Central Asian translators. Terms tend to be transliterations of Sanskrit rather than semantic translations — 般若 (*prajñā*), 涅槃 (*nirvāṇa*), 菩薩 (*bodhisattva*). The Sanskrit original is still audible in the Chinese.

**Xuanzang wave (7th century):** The great translator-monk's systematic project, which preferred semantic translation over transliteration and set the standard for Buddhist Chinese for centuries. Many of the most philosophically precise terms date from this period.

**Chan/Zen wave (8th–13th century):** Terms that emerged from or were sharpened by the Chinese Chan tradition before transmission to Japan. These are often more paradoxical, more vernacular, more deliberately resistant to systematic definition. 公案, 無, 坐禅 in their Zen senses are largely products of this period.

**Dogen wave (13th century):** Terms that Dogen himself reinterpreted, sometimes against their received meanings. His readings of 有時, 山水, 正法眼蔵 are not standard Buddhist usage — they are philosophical interventions. These should be flagged separately.

### Core Term Set

Drawn from the intersection of: terms that appear most frequently across major Zen texts (Blue Cliff Record, Gateless Gate, Shobogenzo, Platform Sutra of Huineng); terms that are most frequently mistranslated or flattened by English translators; and terms whose kanji composition is itself philosophically instructive.

**Emptiness and negation:** 無, 空, 虚, 滅

**Mind and consciousness:** 心, 識, 念, 意, 覚

**Nature and ground:** 性, 本, 体, 真, 如

**The path and practice:** 道, 行, 禅, 坐禅, 修

**Awakening and its terms:** 悟, 覚, 見, 証, 妙

**Teaching and transmission:** 法, 教, 宗, 公案, 語

**Being and phenomena:** 有, 物, 色, 相, 縁

**Buddha and lineage:** 佛, 菩薩, 祖, 師

**Compounds requiring special treatment:** 般若, 涅槃, 本心, 自性, 無心, 不二, 如来, 実相, 有時, 山水経

---

## Module Two: Modern Reverse Flow (Japan → China)

### What This Module Is About

The reverse flow module covers a much shorter, much more concentrated transmission event: the approximately fifty-year window (roughly 1868–1920) during which Japanese Meiji-era intellectuals coined thousands of new Chinese-character compounds to translate Western concepts, which then flowed back into Chinese and Korean and became the vocabulary of East Asian modernity.

This module is not about doctrine. It is about ideology, rupture, and the pressure of modernization. The terms here look Chinese — they are written in Chinese characters, they follow Chinese compounding logic — but they think Japanese. A classically educated Chinese reader of 1850 would not have recognized most of them in their modern senses. By 1920 they were indispensable, and Chinese speakers had largely forgotten they were Japanese coinages at all.

The cognitive experience this module aims to produce: recognizing that when a contemporary Chinese intellectual discusses 社会, 科学, 哲学, or 民主, they are using vocabulary coined in Tokyo in the 1870s–1890s to translate concepts that originated in European thought. The flow goes: Greek or Latin concept → English or German → Meiji Japanese coinage in Chinese characters → back into Chinese. Seeing that chain changes what you can see in modern East Asian intellectual history.

### The Coinage Moment

Unlike classical Buddhist terms, whose transmission was largely anonymous and gradual, many wasei-kango coinages are datable and attributable. This specificity should be foregrounded. The human act of coinage — a scholar sitting with a Western text, deciding what Chinese characters can carry this concept — is historically visible and philosophically significant.

Key figures whose coinages should be explicitly attributed:

**Nishi Amane (西周, 1829–1897):** The most systematic Meiji coiner of philosophical vocabulary. Responsible for 哲学 (philosophy), 概念 (concept), 主観/客観 (subjective/objective), 帰納/演繹 (induction/deduction), among many others. Studied in the Netherlands; his coinages reflect engagement with Dutch and German philosophy.

**Fukuzawa Yukichi (福沢諭吉, 1835–1901):** More politically oriented coinages, including work on 自由 (liberty/freedom) and 権利 (rights). His translations of Mill and engagement with liberal political thought shaped the political vocabulary cluster.

**Yanagita Kunio and others:** Later coinages for social science concepts.

**Liang Qichao (梁啓超, 1873–1929):** The crucial return agent — the Chinese intellectual who spent years in Japan, absorbed the wasei-kango vocabulary, and brought it systematically back into Chinese intellectual discourse. He is the primary vector of the reverse flow into Mandarin.

### Thematic Clusters

The reverse flow module should be organized by the Western intellectual tradition being translated, because the clusters reveal the shape of Western thought as Meiji intellectuals encountered it — what they thought needed naming that previously had no name.

**Liberal political philosophy:** 民主 (democracy), 自由 (liberty), 社会 (society), 権利 (rights), 革命 (revolution), 共和 (republic), 憲法 (constitution)

**Western philosophy and logic:** 哲学 (philosophy), 概念 (concept), 抽象 (abstraction), 主観 (subjective), 客観 (objective), 矛盾 (contradiction), 理性 (reason), 帰納 (induction), 演繹 (deduction)

**Natural science and method:** 科学 (science), 物理 (physics), 化学 (chemistry), 進化 (evolution), 実験 (experiment), 仮説 (hypothesis), 原子 (atom)

**Economics:** 経済 (economy), 資本 (capital), 市場 (market), 競争 (competition), 生産 (production)

**Medicine and the body:** 神経 (nerve), 細胞 (cell), 器官 (organ), 手術 (surgery), 心理 (psychology)

**Culture and civilization:** 文化 (culture), 文明 (civilization), 社会 (society), 宗教 (religion), 芸術 (art/fine arts)

### The Untranslated Remainder

Every entry in this module should identify what the Western concept meant that the Japanese coinage could not fully carry. This is the reverse-flow equivalent of the classical module's "conceptual remainder" field, and it is often where the most intellectually interesting material lives.

Examples of how this works:

進化 renders "evolution" but introduces a directionality — the character 進 means to advance or progress — that Darwin's term does not require. East Asian debates about evolution were shaped partly by this progressive coloring embedded in the coinage.

自由 renders "liberty" or "freedom" but the characters mean something closer to "self-directed" or "as one pleases" — which captures individual autonomy but loses the specifically political and negative-liberty sense (freedom *from* interference) that Mill was articulating. The coinage shaped how liberal political theory was received.

革命 recruits characters that in classical Chinese meant the withdrawal of Heaven's Mandate from a failed dynasty — a specific Confucian political cosmology. Using these characters to translate "revolution" creates a word that carries both the Western sense and the classical Chinese one simultaneously, producing a concept of revolution inflected by ideas of cosmic legitimacy that the Western term does not have.

社会 renders "society" but the concept being translated — an abstract collective distinct from the state, from the family, from mere population — is a specifically modern Western sociological idea. Classical Chinese thought had no need for this term, and its absence was not an oversight but a reflection of a different way of organizing social reality.

---

## The Character Evolution Component

Every term in both modules, regardless of which directional flow it belongs to, links to a full graphic evolution display. This is one of the most distinctive features of the atlas and should be treated as a first-class interface element, not an appendix.

### The Forms

For each character, the evolution display shows every major historical form in sequence, with the ability to click into each:

**Oracle bone script (甲骨文, jiǎgǔwén):** The earliest form, inscribed on turtle shells and ox scapulae for divination, dating to the Shang dynasty (roughly 1250–1050 BCE). These forms are often pictographic or highly iconic — 心 looks like an anatomical heart, 水 looks like flowing water, 木 looks like a tree with roots and branches. Seeing the oracle bone form often makes the character's logic immediately visible in a way the modern form obscures.

**Bronze script (金文, jīnwén):** Cast into ritual bronze vessels, Zhou dynasty (roughly 1050–221 BCE). Slightly more stylized than oracle bone, but still largely iconic. Often more elaborate and decorative.

**Seal script (篆書, zhuànshū):** Standardized under the Qin dynasty (221–206 BCE) as part of the unification of writing across China. More abstract and regularized than bronze script, but the pictographic origins are often still visible. This is the form used in traditional seals and stamps, and it appears frequently in classical calligraphy.

**Clerical script (隷書, lìshū):** The major transition form, developed during the Han dynasty (206 BCE–220 CE). This is where the brush replaces the stylus as the primary writing instrument, and the rounded iconic forms begin flattening into the angular strokes of modern characters. The shift from seal to clerical script is the single biggest rupture in the visual history of Chinese writing.

**Regular script (楷書, kǎishū):** The standard modern form, stabilized roughly in the Tang dynasty (618–907 CE) and essentially unchanged since. This is what appears in printed texts and is what the atlas displays as the primary form.

**Cursive / grass script (草書, cǎoshū):** Included not as a primary form but as context — showing how the character is abbreviated in rapid handwriting reveals which strokes are structurally essential and which are secondary.

**Simplified Chinese form:** Where the mainland simplified form (简体字) differs significantly from the traditional form (繁體字), both should be shown. For many terms in both modules, the simplification removed components that carry semantic information, and noting this is itself instructive.

### What the Evolution Display Should Do

The display is not a static gallery. Each form should be clickable, opening a brief note on: the period and medium it comes from; what the form reveals about the character's original meaning; and what is gained or lost in the transition to the next form.

For oracle bone and bronze forms, an overlay showing the pictographic interpretation — what real-world thing or action the image depicts — should be available. This is where characters that now seem arbitrary become suddenly legible. 明 (bright/clear) is the sun 日 and the moon 月 side by side. 休 (rest) is a person 人 leaning against a tree 木. Seeing these is a different kind of knowing than reading about them.

The evolution display should also note, where applicable, the difference between the *semantic component* (部首, bushou — the "radical" that indicates meaning category) and the *phonetic component* (the part that originally indicated pronunciation in Old Chinese). Many characters that look purely semantic are actually semantic-phonetic compounds, and knowing which part is which changes how you read the character's history.

---

## The Stroke Order Practice Component

The stroke component is integrated into every term entry in both modules. It is not a separate app or a gamified exercise — it is a way of encoding the character in a different sensory register from visual recognition alone.

### The Pedagogical Goal

For this user, the value of stroke practice is proprioceptive and mnemonic, not performative. The hand remembers differently than the eye. Tracing a character slowly, understanding what each stroke is building, encodes it in a way that looking at it does not. The goal is not handwriting acquisition — it is felt architectural knowledge of the character's construction.

### Component Revelation Mode

The primary mode. Rather than showing the complete character and asking the user to trace it, the character assembles itself component by component as the user draws.

The user draws the first semantic or structural component. It snaps into place and is labeled — not with a stroke number but with its meaning. For 空 (*kū*, emptiness), the first component is 穴 (*ana*, cave or hole). The interface labels it: "穴 — cave, opening, hollow." Then the user draws 工 (*kō*, craft or work). It joins, the character is complete, and the interface shows both components labeled simultaneously, with a brief note: "emptiness as the hollow worked open, the cave that is also a crafted space."

This makes the compositional logic visceral. The user is not tracing an abstract shape — they are assembling an argument.

### Annotation During Tracing

As each stroke is drawn, the interface notes which component it belongs to and what that component contributes. Where a stroke is part of the phonetic rather than semantic component, this is noted. Where the stroke order reflects a historical convention about which component is laid down first, that convention is briefly explained.

### Oracle Bone Tracing Mode

For selected characters where the oracle bone form is strikingly different from the modern form, a second tracing mode lets the user trace the ancient form. This is not about historical accuracy — users are not becoming paleographers. It is about accessing the pictographic logic of the character through the hand.

Tracing the oracle bone form of 心 — which looks like a heart with chambers and vessels — before tracing the modern abstract form creates a layered understanding that neither form alone provides. The hand has felt both the image and its abstraction.

### Historical Form Overlay

After completing a tracing, the interface shows a classical calligraphic exemplar of the character alongside the user's trace — not to grade the user but to let them see the relationship between the idealized brush form and their own mark. The calligraphic form should be drawn from a historically significant source where possible: a Tang dynasty stele, a Song dynasty woodblock, a piece of Zen calligraphy from the relevant lineage.

### The "Why This Order" Annotation

For each character, a brief note on what the stroke order reveals. Some characters have stroke orders that seem counterintuitive until you understand they reflect the semantic component being laid down before the phonetic, or a historical convention about how the brush moved. Making this explicit turns a rote sequence into an argument about the character's structure.

### Slow Decomposition Animation

For users who want the proprioceptive benefit of watching rather than tracing — on desktop without a stylus, for instance — the character draws itself at human speed, stroke by stroke, with each component labeled as it appears. Slower than standard stroke order animations, annotated throughout, and pausable at any point.

---

## Interface Architecture

### Data Model: JSON-First

The atlas is data-driven from the start. The entire term set lives in a single JSON file — one large array of term objects, one per entry, covering both modules. There is no database, no CMS, no backend to stand up before the tool is useful. The JSON is the source of truth. The interface reads it, renders it, and exposes it to any game or mnemonic layer built on top.

This is a deliberate architectural choice. It means:

The content can be edited, extended, and versioned independently of the interface. Adding a term means adding an object to the array. Correcting a field means editing a value. No migrations, no schema changes required in v1.

The game and mnemonic layer (see below) can consume the same JSON directly. Games are not a separate content system — they are alternate renderings of the same data.

The JSON schema is intentionally loose in v1. Fields are present where known and absent where not. The renderer should handle missing fields gracefully — displaying what exists, not breaking on what doesn't. Schema enforcement and validation can be added later when the content stabilizes.

A term object contains at minimum: the character(s), the readings (on'yomi, kun'yomi where applicable), the module tag (classical or reverse-flow), the semantic field or thematic cluster, the source concept, the component breakdown, and at least one literary instance. All other fields are optional in v1.

### The Kana Layer

The user is kana-competent. This shapes several interface decisions.

Readings are displayed in kana first, romaji second (or optionally hidden). The tool does not treat kana as an obstacle to be translated away — it treats kana as the user's actual entry point into the phonological shape of a term. Hearing and seeing 般若 as *はんにゃ* before encountering "Hannya" or "prajñā" grounds the term in its Japanese sound, which is itself historically significant (the kana spelling encodes the history of how Sanskrit was heard through Chinese).

Okurigana — the hiragana that attach to kanji in running text to supply grammatical endings — should be shown in context examples. The user who knows kana can see how a character like 悟 becomes 悟る (*satoru*, to awaken) in verbal use, which is a different kind of knowing than seeing only the standalone character.

Katakana appearances of related terms should be flagged as marked — foreign, technical, other. When a term like サンスクリット (Sanskrit) or ニルヴァーナ (nirvāṇa) appears in katakana in a modern Japanese context, the interface notes that the katakana signals deliberate foreignness — the term is being held at a distance, not naturalized. This is the kind of reframe that reorganizes how a kana-competent reader sees text.

### Two Entry Points, One Data Structure

The atlas can be entered through either module — classical flow or reverse flow — or through direct character lookup. All three routes lead to the same term entry structure. The parallel table above is not just a design document; it is the data model. Every term answers every field, with appropriate content for its module.

### Browsing by Semantic Field vs. Lookup by Character

The tool supports both modes. Semantic field browsing is organized differently in each module:

Classical flow semantic fields: mind and consciousness, emptiness and negation, nature and ground, path and practice, awakening and its terms, teaching and transmission, being and phenomena.

Reverse flow thematic clusters: liberal political philosophy, Western philosophy and logic, natural science, economics, medicine, culture and civilization.

Character lookup searches across both modules simultaneously. A character like 心 (*kokoro/xīn*) appears in the classical module as a primary term (heart-mind) and in the reverse flow module as a component of 心理 (psychology) and 心臓 (heart as anatomical organ). The lookup should surface both and make the relationship between them visible.

### Network View

Each term entry shows its neighbors as a navigable network, not just a list. Terms that compound together, oppose each other, or are historically linked should be visually connected. The goal is to build a felt sense of semantic fields — understanding that 無, 空, 虚, 滅 are all doing related but distinct work around negation and emptiness, that 民主, 自由, 権利, 社会 arrived as a conceptual package and should be understood together.

### The Literary Instance as Organizing Principle

The atlas is not trying to be Wiktionary. Wiktionary is exhaustive, neutral, and organized around definitions. This tool is organized around *significant moments* — instances where a term is doing real philosophical or historical work in a real text, and where understanding the term changes what you can see in the passage.

Every term entry includes at least one literary instance, and the selection is curatorial, not comprehensive. The criterion is not "this term appears here" but "this appearance is worth sitting with." A good literary instance does several things simultaneously: it shows the term in syntactic context (which for a kana-competent user means something — they can see how the character sits in the sentence), it demonstrates the term's doctrinal or ideological weight in action, and it creates a memorable anchor that the mnemonic layer can build on.

For the classical module, instances should be drawn primarily from: the Blue Cliff Record (碧巌録), the Gateless Gate (無門関), the Platform Sutra of Huineng (六祖壇経), Dogen's Shobogenzo fascicles (especially Genjokoan, Uji, Sansuikyo), and the Vimalakirti Sutra. For Dogen-wave terms especially, the instance should show his reinterpretation against the received meaning — which means sometimes including two instances, one showing the standard usage and one showing what Dogen does to it.

For the reverse flow module, instances should be drawn from: Nishi Amane's original coinage texts where accessible, Fukuzawa Yukichi's essays, Liang Qichao's writing showing the term's arrival in Chinese discourse, and at least one contemporary usage showing where the term stands now.

The literary instance field is the primary differentiator between this tool and a reference dictionary. It is where the atlas makes an argument about what matters.

### The Game and Mnemonic Layer

The atlas is designed from the start to be a platform, not just a reference. The JSON data structure and the term entry schema are the API. Any mnemonic game or practice mode is a consumer of that API, not a separate content system.

This has concrete architectural implications: the term object should expose every field that a game might need — character forms, component breakdown, readings, literary instances, neighbors, source concept, translation range — in a consistent, addressable way. Games should be able to filter the term set by module, semantic field, or any other tag without knowing anything about how the reference interface works.

Some example game modes that the data architecture should support without requiring data changes:

**Component assembly:** The user is shown a character's components separately and must drag them into correct configuration. The data needed — component list with meanings and positions — already lives in the term object.

**Translation range identification:** The user is shown a passage containing a term and must identify which English translation choice is in use and what it is emphasizing. The data needed — translation range with notes on each choice's emphasis — already lives in the term object.

**Literary context matching:** The user is shown a literary instance with the key term blanked out and must identify which term belongs there, from a set of neighbors. The data needed — literary instances and neighbor lists — already lives in the term object.

**Radical reconstruction:** The user is shown the oracle bone or seal script form of a character and must identify the modern form, or vice versa. The data needed — graphic evolution with all historical forms — already lives in the term object.

**Epochal sorting:** The user is shown a set of terms and must sort them by transmission wave or coinage period. The data needed — module tag and transmission wave — already lives in the term object.

**Conceptual remainder identification:** The user is shown a Western source concept and a set of possible Japanese coinages and must identify which coinage was actually used — and then explain what the chosen coinage loses. This is a harder game, suitable for users with more context, and it requires the untranslated remainder field to be well populated.

None of these games require new content. They are reconfigurations of the reference data. The architectural principle is: populate the term objects richly and consistently, and the game layer writes itself.

### Density and Depth as Features

The reference interface should feel like a scholar's environment, not a learning app. It is not gamified in its primary presentation, not progress-tracked, not optimized for streaks or completion. Entries are dense. Fields are complete. The user is trusted to know what they need and to navigate accordingly.

The game layer sits alongside the reference interface, not on top of it. A user should be able to move fluidly between reading a full term entry and playing a component assembly game on the same term — the two modes inform each other. The reference deepens the game; the game motivates a return to the reference.

The aesthetic model is: more Warburg Atlas than Duolingo, more annotated critical edition than language app. The term entry is the center of gravity. Everything else orbits it.

---

## What Success Looks Like

After working with this tool across both modules, the user should be able to:

Sit with a Cleary translation of a koan or a Dogen fascicle, encounter a term like 本心 or 般若, read the kana rendering, and have an immediate felt sense of what characters it is made of, what the Chinese root is doing, what the Sanskrit background is, and what the English translation is choosing to emphasize or suppress. The kana is the phonological entry point; the atlas provides the depth behind it.

Read a text of modern Chinese political philosophy or intellectual history, encounter terms like 民主, 自由, or 社会, and recognize them as Japanese coinages — feel the seam where the Western concept was fitted into Chinese characters in Tokyo in the 1870s, and know something about what that fitting chose and what it left out.

Look at a character in any context — in running Japanese text, in a koan title, on a temple gate — and have immediate intuition about which part is semantic, which is phonetic, and what the historical forms might look like. Not as a scholar of paleography, but as someone who has traced the oracle bone form with their hand and felt the pictographic logic underneath the modern abstraction.

Evaluate translation choices as choices. When one translator renders 空 as "emptiness" and another renders it as "openness," know enough about the term's Sanskrit root (*śūnyatā*), its Chinese compounding logic (穴 + 工), and its doctrinal context to feel what each choice is betting on and what it is giving up.

Return to a literary instance — a line from the Gateless Gate, a sentence from Genjokoan, a passage from Fukuzawa — and see it differently than before. Not just comprehend it but feel its grain. Know which words are doing the heavy lifting, what tradition they are drawing on, and what the translator had to decide.

The user will not achieve conversational fluency. But they will no longer be blind, and more importantly, they will have a grip — a felt structural sense of the vocabulary that makes kanji stop being opaque marks and start being legible arguments.


# Implementation Plan

## Overview

This tool is a conceptual atlas of Sino-Japanese and Sino-Japanese-to-modern vocabulary, designed for a linguistically sophisticated reader who wants to build meaningful recognition of kanji through etymological, compositional, and doctrinal depth. The full product specification lives in `SPEC.md`.

This document covers repo structure, module relationships, and build order.

---

## Guiding Principles

Static app, runs locally, no backend. The JSON data layer is the only shared state between modules. Agents populate data; the debug dashboard visualizes coverage. Each screen module iterates independently against the same schema contract.

The one non-negotiable toolchain decision is Vite + ShadCN from day one. ShadCN requires a build pipeline and its component primitives are load-bearing enough that retrofitting it later is painful. Everything else stays as simple as possible.

---

## Repo Structure

```
zen-kanji-atlas/
│
├── data/
│   ├── terms.json              # Term objects — compounds, readings, metadata
│   ├── characters.json         # Individual kanji — strokes, evolution, readings
│   ├── sources.json            # Source texts — title, tradition, period
│   ├── source_concepts.json    # Sanskrit/Pali/Western source terms — defined once, referenced by id
│   ├── semantic_fields.json    # Enum of valid fields with module tag and description
│   ├── literary_instances.json # Passages — join between terms and sources
│   ├── schema.md               # Human-readable description of all files and fields
│   └── validate.js             # Validates referential integrity across all files
│
├── src/
│   ├── main.jsx              # Vite entry point; mounts React root; defines routes
│   ├── data.js               # Shared data loader; imports terms.json directly as a module
│   │
│   ├── views/
│   │   ├── atlas/
│   │   │   └── AtlasView.jsx         # D3 thematic network — entry point
│   │   ├── term/
│   │   │   └── TermView.jsx          # Term detail screen
│   │   ├── character/
│   │   │   └── CharacterView.jsx     # Character screen — stroke order, evolution timeline
│   │   ├── quiz/
│   │   │   └── QuizView.jsx          # Quiz mode — romaji typing, speed scoring
│   │   └── debug/
│   │       └── DebugView.jsx         # Data dashboard — field coverage matrix, term counts
│   │
│   ├── components/                   # Shared UI components used across views
│   │   ├── KanjiDisplay.jsx          # Large character rendering with readings
│   │   ├── ComponentBreakdown.jsx    # Visual decomposition of a term's kanji components
│   │   ├── LiteraryInstance.jsx      # Formatted passage + source + notes
│   │   ├── NeighborLinks.jsx         # Neighbor term navigation
│   │   └── FieldBadge.jsx            # Module / semantic field label pill
│   │
│   └── lib/
│       └── utils.js                  # ShadCN utility (cn() helper); do not put app logic here
│
├── public/                           # Static assets served as-is by Vite
│
├── components.json                   # ShadCN configuration
├── vite.config.js
├── tsconfig.json
├── package.json
├── SPEC.md                           # Full product specification
├── PLAN.md                           # This document
└── README.md                         # How to run locally
```

---

## Frontend Stack

**Vite + React + JavaScript.** `npm run dev` starts a local dev server with hot module reload. `npm run build` produces a static bundle in `dist/` that can be opened from the filesystem or served by any static host. No backend required at any stage.

```bash
# Scaffold
npm create vite@latest zen-kanji-atlas -- --template react-ts
cd zen-kanji-atlas

# ShadCN
npx shadcn@latest init

# Other dependencies
npm install react-router-dom d3 hanzi-writer
npm install --save-dev @types/d3
```

**ShadCN.** Installed properly via CLI, not faked with CSS variables. Components are copied into `src/components/ui/` and owned by the project — they are editable source, not a dependency to import from npm. Use ShadCN components for all chrome: buttons, badges, cards, inputs, tooltips, dialogs. This is the correct scope — ShadCN for structural UI primitives, custom components for domain-specific display (kanji rendering, stroke order, evolution timeline, D3 atlas).

**Routing: react-router-dom.** Routes are defined in `main.jsx`. The character route uses `encodeURIComponent` / `decodeURIComponent` on the kanji param — browsers handle CJK in URLs but be explicit.

```tsx
// src/main.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/',                element: <AtlasView /> },
  { path: '/term/:id',        element: <TermView /> },
  { path: '/character/:char', element: <CharacterView /> },
  { path: '/quiz',            element: <QuizView /> },
  { path: '/debug',           element: <DebugView /> },
])
```

**Data loading: direct import, multiple files.** All data files are imported as modules in `data.js`. Vite handles JSON imports natively. Hot reload works — editing any data file while the dev server is running updates the UI immediately. `data.js` loads all files and resolves references in memory, so views receive fully hydrated objects rather than raw IDs.

```ts
// src/data.js
import termsRaw from '../data/terms.json'
import charactersRaw from '../data/characters.json'
import sourcesRaw from '../data/sources.json'
import sourceConceptsRaw from '../data/source_concepts.json'
import literaryInstancesRaw from '../data/literary_instances.json'
import type { Term, Character, Source, SourceConcept, LiteraryInstance } from './types'

export const terms: Term[] = termsRaw as Term[]
export const characters: Character[] = charactersRaw as Character[]
export const sources: Source[] = sourcesRaw as Source[]
export const sourceConcepts: SourceConcept[] = sourceConceptsRaw as SourceConcept[]
export const literaryInstances: LiteraryInstance[] = literaryInstancesRaw as LiteraryInstance[]

// Resolved accessors — views use these, not the raw arrays
export function getTermById(id: string): Term | undefined {
  return terms.find(t => t.id === id)
}

export function getTermsByCharacter(char: string): Term[] {
  return terms.filter(t => t.characters.includes(char))
}

export function getCharacter(char: string): Character | undefined {
  return characters.find(c => c.char === char)
}

export function getInstancesForTerm(termId: string): LiteraryInstance[] {
  return literaryInstances.filter(i => i.term_id === termId).map(i => ({
    ...i,
    source: sources.find(s => s.id === i.source_id)
  }))
}

export function getSourceConcept(id: string): SourceConcept | undefined {
  return sourceConcepts.find(c => c.id === id)
}

export function getNeighbors(term: Term): Term[] {
  return term.neighbor_ids.map(id => terms.find(t => t.id === id)).filter(Boolean) as Term[]
}
```

This stays sufficient until the corpus is large enough to hurt bundle size — at that point, move all data files to `public/data/` and switch to `fetch()`. Only `data.js` changes; no view code changes.

**JavaScript.** The schema lives as `data/schema.md` (agent-facing, human-readable) and once as `src/types.js` (compiler-facing, enforced).  Do not use TypeScript because it is evil.

---

## Module Relationships

Data flows in one direction: `data.js` imports all JSON files, resolves cross-references in memory, and exposes typed accessor functions. Views import from `data.js` only. Views never import from each other — they communicate through navigation only.

```
data/terms.json
data/characters.json
data/sources.json
data/source_concepts.json
data/literary_instances.json
    │
    ▼ (all imported as modules, joins resolved in memory)
src/data.js             typed accessors: getTermById(), getTermsByCharacter(),
    │                   getCharacter(), getInstancesForTerm(), getNeighbors(), etc.
    │
    ├──▶ AtlasView       imports terms[]; renders D3 cluster; navigates to /term/:id
    ├──▶ TermView         getTermById(), getInstancesForTerm(), getNeighbors()
    ├──▶ CharacterView    getCharacter(), getTermsByCharacter()
    ├──▶ QuizView         imports terms[]; filters by module/semantic_field_id
    └──▶ DebugView        imports all arrays; renders coverage matrix across all files
```

**URL conventions:**

- `/` — Atlas view (entry point)
- `/term/:id` — Term detail, where `:id` is the term's `id` field in terms.json
- `/character/:char` — Character detail, where `:char` is a single encoded kanji (e.g. `%E5%BF%83` for 心)
- `/quiz` — Quiz mode
- `/debug` — Debug dashboard

**Linking rules:**

- Term screens link to character screens for each character in the compound.
- Character screens surface related terms dynamically (any term whose `characters` field contains this kanji) — no hardcoded relationships.
- The atlas links to term screens only. It does not link to character screens.
- The quiz links to term screens for post-answer review. It does not link to character screens.

---

## The Data Layer

The data layer is split across six JSON files in `data/`. Each file is a flat array of objects. Cross-references use string IDs — `validate.js` checks that every referenced ID exists in its target file. `data.js` loads all files at startup and resolves references in memory before views ever touch the data.

**What normalizes and why:**

`characters.json` — a kanji like 心 appears in multiple terms (心, 本心, 無心, 心理). Its stroke count, graphic evolution, and oracle bone history are the same regardless of which term it appears in. Define it once, reference it everywhere via `term_characters` (the `characters` string field on each term, from which individual kanji are extracted at runtime).

`source_concepts.json` — Sanskrit terms like prajñā underlie multiple compounds. Define the concept once with its gloss and notes; terms reference it by `source_concept_id`. Western concepts for the reverse-flow module are mostly 1:1 but follow the same pattern for consistency.

`sources.json` — the Blue Cliff Record, Gateless Gate, Platform Sutra, and a handful of Meiji texts are referenced repeatedly. Define each source once with its metadata; `literary_instances` references by `source_id`.

`literary_instances.json` — the join between terms and sources. Each instance has a `term_id`, a `source_id`, a passage, and notes. Keeping instances separate means a single passage can theoretically be associated with multiple terms without duplication.

`semantic_fields.json` — a lookup table of valid field IDs with labels, module tags, and descriptions. Enforces valid values on `term.semantic_field_id` and gives the atlas view the metadata it needs to label and color clusters.

**What stays on the term object:**

`components` (the decomposition of this specific compound — term-specific, not shared), `translation_range`, `conceptual_remainder`, `coinage_agent`, `transmission_wave`, `doctrinal_weight`, `false_friends`. These are genuinely term-specific and do not normalize cleanly.

**Minimal valid objects per file:**

```json
// terms.json
{
  "id": "ku",
  "characters": "空",
  "romaji": "ku",
  "on_reading": "くう",
  "kun_reading": "そら",
  "module": "classical",
  "semantic_field_id": "emptiness-and-negation",
  "source_concept_id": "sunyata",
  "neighbor_ids": ["mu", "shiki", "hannya"],
  "components": [
    { "char": "穴", "meaning": "cave, opening, hollow" },
    { "char": "工", "meaning": "craft, work" }
  ]
}

// characters.json
{
  "char": "空",
  "strokes": 8,
  "radical": "穴",
  "on_readings": ["くう"],
  "kun_readings": ["そら", "あ.く", "から"]
}

// source_concepts.json
{
  "id": "sunyata",
  "term": "śūnyatā",
  "language": "Sanskrit",
  "gloss": "emptiness — the absence of inherent self-existence in all phenomena"
}

// sources.json
{
  "id": "heart-sutra",
  "title": "Heart Sutra",
  "title_ja": "般若心経",
  "tradition": "Prajnaparamita / Zen",
  "period": "7th century CE (Chinese translation)"
}

// literary_instances.json
{
  "id": "ku-heart-sutra-1",
  "term_id": "ku",
  "source_id": "heart-sutra",
  "passage": "色即是空、空即是色。",
  "notes": "Form is precisely emptiness, emptiness precisely form..."
}

// semantic_fields.json
{
  "id": "emptiness-and-negation",
  "label": "Emptiness and Negation",
  "module": "classical",
  "description": "Terms that work around negation, void, and the absence of inherent existence"
}
```

Agents write to any of these files. `validate.js` checks referential integrity — every `source_concept_id` on a term must exist in `source_concepts.json`, every `source_id` in a literary instance must exist in `sources.json`, and so on. The debug dashboard shows coverage across all files simultaneously.

**Future path:** if the corpus grows large or agents need full-text search, the natural next step is SQLite with the same schema. The table structure maps directly from these files. `data.js` becomes a thin wrapper over better-sqlite3 queries; no view code changes.

---

## Build Order

### Phase 0 — Schema and seed data

Write `data/schema.md` describing all six files and their fields. Populate each file with enough seed objects to represent both modules: 6–8 terms, the individual characters they contain, their source concepts, 2–3 sources, a handful of literary instances, and all semantic fields. Write `validate.js` to check referential integrity across files — every foreign ID must resolve. Do not build UI until `validate.js` passes cleanly and the seed data feels editorially correct.

**Exit condition:** `node data/validate.js` passes with no errors. Schema covers every field described in the spec's parallel table. At least one term per module has `literary_instances`, `conceptual_remainder`, and `translation_range` fully populated.

### Phase 1 — Vite scaffold and data wiring

Run the Vite + React + JavaScript scaffold, init ShadCN, install `react-router-dom`, `d3`, and `hanzi-writer`. Define routes in `main.jsx`. Write `src/types.js` with all six interfaces (`Term`, `Character`, `SourceConcept`, `Source`, `LiteraryInstance`, `SemanticField`). Write `src/data.js` importing all six JSON files and exposing typed accessor functions. Stub all five view components so they render a placeholder and confirm routing works end to end.

**Exit condition:** `npm run dev` starts cleanly. All routes resolve. `data.js` exports correctly typed data from all six files. No JavaScript errors.

### Phase 2 — Debug dashboard (`DebugView`)

Build `DebugView` as the first real UI. Imports all arrays from `data.js` and renders: total counts per file, breakdown of terms by module and semantic field, and a field-coverage matrix — a grid of terms vs. optional fields, colored by population status. Also shows referential integrity warnings (terms whose `source_concept_id` has no matching entry in `source_concepts`, etc.) so agents can spot gaps without running `validate.js` manually.

**Exit condition:** Coverage matrix renders correctly against seed data. All optional term fields appear as columns. Cross-file gaps are surfaced visually.

### Phase 3 — Atlas view (`AtlasView`)

Build `AtlasView` as the app entry point. `terms` from `data.js` feeds into a D3 force-directed or radial cluster layout. Nodes are kanji characters labeled with the term's romaji; they cluster by semantic field. Color-codes by module (classical warm, reverse-flow cool). Node size reflects field population completeness — a live quality that rewards the agents' work. Clicking a node navigates to `/term/:id` via `react-router-dom`'s `useNavigate`.

D3 attaches to a `<div>` via `useRef` inside the React component. D3 owns the SVG; React owns nothing inside it. This is the correct division — do not try to make D3 nodes into React components.

**Exit condition:** All seed terms visible, correctly clustered and colored. Click-through to term screen works. Network re-renders correctly if terms data changes.

### Phase 4 — Term screen (`TermView`)

Build `TermView` as the core reading environment. Extracts `:id` from params via `useParams()`, calls `getTermById(id)` from `data.js`. Renders: characters large via `KanjiDisplay`, readings in kana first then romaji, module badge via `FieldBadge`, source concept with language and gloss, component breakdown via `ComponentBreakdown`, translation range if present, conceptual remainder if present, literary instances via `LiteraryInstance`, neighbor links via `NeighborLinks`. Each character in `term.characters` renders as a `Link` to `/character/:char`.

This is the center of gravity. Dense, scholarly, no progress bars or gamification chrome.

**Exit condition:** All seed terms render fully with all populated fields. Component and neighbor links navigate correctly. Characters link to their character screens.

### Phase 5 — Character screen (`CharacterView`)

Build `CharacterView` as a standalone screen. Extracts `:char` from params via `useParams()` (URL-decoded). Calls `getTermsByCharacter(char)` from `data.js` to surface related terms — no hardcoded relationships. Renders: the character large, all readings, the related terms list, stroke order animation via HanziWriter (attach to a `<div>` via `useRef`, call `HanziWriter.create()` in a `useEffect`), and the evolution timeline as a horizontal sequence of historical form images sourced from `term.graphic_evolution` if populated.

**Exit condition:** Stroke order animation runs for all seed characters. Related terms surface correctly. Evolution timeline renders where data exists; field is absent gracefully where it doesn't.

### Phase 6 — Quiz mode (`QuizView`)

Build `QuizView` as a self-contained mode. On entry, user selects module and/or semantic field from a filtered list drawn from `useTerms()`. Quiz loop: show characters, accept romaji input, score on speed (time to correct answer) and accuracy (first-attempt vs. retry). After each answer, show source concept gloss and one literary instance. Link to `/#/term/:id` for users who want to go deeper. Score persists for the session in local component state.

**Exit condition:** Quiz runs against all seed terms in the selected filter. Scoring works. Post-answer review renders correctly. Session score resets on filter change.

---

## What Agents Do

Agents work exclusively in `data/`. Their job is to populate all six files richly and consistently. The debug dashboard shows coverage and cross-file gaps. Run `node data/validate.js` before committing — it checks that every foreign ID resolves.

**When adding a new term**, agents must also: add any new characters to `characters.json` if not already present; add the source concept to `source_concepts.json` if not already present; add the source text to `sources.json` if not already present; add literary instances to `literary_instances.json`; and verify the `semantic_field_id` exists in `semantic_fields.json`.

Priority order for field population:
1. Core required fields on `terms.json` (characters, romaji, on_reading, module, semantic_field_id, source_concept_id, neighbor_ids, components)
2. Corresponding entries in `characters.json`, `source_concepts.json`, `sources.json`
3. At least one entry in `literary_instances.json` per term
4. `translation_range` and `conceptual_remainder` on terms (primary differentiators)
5. `graphic_evolution` on characters (enables character screen timeline)
6. `transmission_wave` / `coinage_agent` on terms (enables epochal sorting)
7. `doctrinal_weight`, `false_friends` (enrichment)

Agents do not touch app code. App code does not hardcode content. The schema is the contract between them.

---

## What Does Not Exist in v1

- User accounts, progress tracking, streaks
- Backend, database, or CMS — the multi-file JSON structure maps directly to SQLite tables when the corpus warrants it; `data.js` is the only file that would change
- Server-side search (client-side filter over the loaded arrays is sufficient at this scale)
- The component revelation stroke mode (spec describes this; it's Phase 6+)
- Oracle bone tracing mode (same)
- Network graph with full neighbor visualization (Phase 6+; atlas view is sufficient for now)

These are not cut because they're unimportant — they're cut because the schema and reference interface need to stabilize first. Everything above is a reconfiguration of data that will already exist.