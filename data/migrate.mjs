// One-shot migration script. Run with: node data/migrate.mjs
// Transforms:
//   terms.transmission_wave (string)  → terms.transmission_waves (string[]) + terms.transmission_notes? (string)
//   terms.coinage_agent (string)      → terms.coiners (string[]) + terms.coinage_notes (string)
//   sources.period (string)           → sources.period_start_year (int) + sources.period_end_year (int) + sources.period_notes (string)
//   source_concepts.language (string) → source_concepts.languages (string[])
//
// Parses each file, applies transformations to the data structure, and rewrites
// with standard 2-space JSON.stringify. This normalizes the existing mixed
// indentation (155/23/8 split across three regimes) as a side effect.
//
// Idempotent: detects already-migrated rows and leaves them alone.

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(join(__dirname, f), 'utf8');
const write = (f, obj) => writeFileSync(join(__dirname, f), JSON.stringify(obj, null, 2) + '\n');

// ---------------------------------------------------------------------
// transmission_wave migration table
// ---------------------------------------------------------------------
const TRANSMISSION_MIGRATION = {
  'chan-zen':       { waves: ['chan-zen'],       notes: null },
  'first-wave':     { waves: ['first-wave'],     notes: null },
  'abhidharma':     { waves: ['abhidharma'],     notes: null },
  'tendai':         { waves: ['tendai'],         notes: null },
  'prajnaparamita': { waves: ['prajnaparamita'], notes: null },
  'xuanzang':       { waves: ['xuanzang'],       notes: null },
  'japanese-zen':   { waves: ['japanese-zen'],   notes: null },
  'Kamakura Sōtō transmission': { waves: ['kamakura-soto'], notes: null },
  'Kamakura Sōtō transmission (mediating Tang-dynasty Yaoshan dialogue)': {
    waves: ['chan-zen', 'kamakura-soto'],
    notes: 'Kamakura Sōtō transmission mediating Tang-dynasty Yaoshan dialogue.',
  },
  'Kamakura Sōtō transmission (appropriating Tang/Song Chan recorded-sayings construction)': {
    waves: ['chan-zen', 'kamakura-soto'],
    notes: 'Kamakura Sōtō transmission appropriating Tang/Song Chan recorded-sayings construction.',
  },
  'Tang-dynasty Caodong articulation; transmitted to Japan in Kamakura Sōtō; reintegrated into Rinzai koan curriculum by Hakuin': {
    waves: ['chan-zen', 'kamakura-soto', 'japanese-zen'],
    notes: 'Tang-dynasty Caodong articulation; transmitted to Japan in Kamakura Sōtō; reintegrated into the Rinzai koan curriculum by Hakuin.',
  },
  'Tang-dynasty Yangshan-Guishan circle-figure tradition; Caodong elaboration; Kamakura transmission to Japan; Edo-period calligraphic flowering under Hakuin and Sengai': {
    waves: ['chan-zen', 'kamakura-soto', 'japanese-zen'],
    notes: 'Tang-dynasty Yangshan-Guishan circle-figure tradition; Caodong elaboration; Kamakura transmission to Japan; Edo-period calligraphic flowering under Hakuin and Sengai.',
  },
};

// ---------------------------------------------------------------------
// Agent-name patterns. Each agent's patterns are tried independently; multiple
// agents can match a single prose string. Order within a single agent's pattern
// list matters only for which substring wins ties (we take earliest index).
// ---------------------------------------------------------------------
const AGENT_PATTERNS = [
  { id: 'dogen',              patterns: ['Dōgen', '道元'] },
  { id: 'tiantong-rujing',    patterns: ['Tiantong Rujing', '天童如浄'] },
  { id: 'yaoshan-weiyan',     patterns: ['Yaoshan Weiyan'] },
  { id: 'dongshan-liangjie',  patterns: ['Dongshan Liangjie'] },
  { id: 'caoshan-benji',      patterns: ['Caoshan Benji'] },
  { id: 'yangshan-huiji',     patterns: ['Yangshan Huiji'] },
  { id: 'hakuin-ekaku',       patterns: ['Hakuin Ekaku', 'Hakuin'] },
  { id: 'sengai-gibon',       patterns: ['Sengai Gibon', 'Sengai'] },
  { id: 'sugita-genpaku',     patterns: ['Sugita Genpaku', '杉田玄白'] },
  { id: 'udagawa-yoan',       patterns: ['Udagawa Yōan', '宇田川榕菴'] },
  { id: 'kawamoto-komin',     patterns: ['Kawamoto Kōmin', '川本幸民'] },
  { id: 'mitsukuri-shogo',    patterns: ['Mitsukuri Shōgo', '箕作省吾'] },
  { id: 'fukuzawa-yukichi',   patterns: ['Fukuzawa Yukichi', 'Fukuzawa', '福澤諭吉'] },
  { id: 'nishi-amane',        patterns: ['Nishi Amane', '西周'] },
  { id: 'tsuda-mamichi',      patterns: ['Tsuda Mamichi'] },
  { id: 'mitsukuri-rinsho',   patterns: ['Mitsukuri Rinshō', '箕作麟祥'] },
  { id: 'katayama-junkichi',  patterns: ['Katayama Junkichi', '片山淳吉'] },
  { id: 'nakae-chomin',       patterns: ['Nakae Chōmin', '中江兆民'] },
  { id: 'nagayo-sensai',      patterns: ['Nagayo Sensai', '長與專齋'] },
  { id: 'ito-hirobumi',       patterns: ['Itō Hirobumi'] },
  { id: 'itagaki-taisuke',    patterns: ['Itagaki Taisuke'] },
  { id: 'liang-qichao',       patterns: ['Liang Qichao'] },
  { id: 'ishikawa-chiyomatsu',patterns: ['Ishikawa Chiyomatsu', '石川千代松'] },
  { id: 'inoue-tetsujiro',    patterns: ['Inoue Tetsujirō'] },
  { id: 'ariga-nagao',        patterns: ['Ariga Nagao'] },
];

function extractCoiners(prose) {
  const hits = [];
  for (const { id, patterns } of AGENT_PATTERNS) {
    let firstIdx = -1;
    for (const p of patterns) {
      const i = prose.indexOf(p);
      if (i !== -1 && (firstIdx === -1 || i < firstIdx)) firstIdx = i;
    }
    if (firstIdx !== -1) hits.push({ id, idx: firstIdx });
  }
  return hits.sort((a, b) => a.idx - b.idx).map((x) => x.id);
}

// Compute the new term object with consistent field ordering.
// Keys we produce always appear in this order; everything else is preserved.
const TERM_KEY_ORDER = [
  'id', 'characters',
  'romaji_on', 'romaji_kun',
  'on_reading', 'kun_reading',
  'module',
  'semantic_field_id', 'source_concept_id',
  'transmission_waves', 'transmission_notes',
  'coiners', 'coinage_notes',
  'neighbor_ids',
  'components',
  'translation_range',
  'conceptual_remainder',
  'doctrinal_weight',
  'false_friends',
];

function reorderKeys(obj, preferred) {
  const out = {};
  for (const k of preferred) {
    if (k in obj) out[k] = obj[k];
  }
  for (const k of Object.keys(obj)) {
    if (!(k in out)) out[k] = obj[k];
  }
  return out;
}

function migrateTerm(term) {
  const next = { ...term };

  // transmission_wave → transmission_waves + transmission_notes
  if (next.transmission_wave !== undefined) {
    const m = TRANSMISSION_MIGRATION[next.transmission_wave];
    if (!m) throw new Error(`Unknown transmission_wave on ${next.id}: ${next.transmission_wave}`);
    next.transmission_waves = m.waves;
    if (m.notes) next.transmission_notes = m.notes;
    delete next.transmission_wave;
  }

  // coinage_agent → coiners + coinage_notes
  if (next.coinage_agent !== undefined) {
    const coiners = extractCoiners(next.coinage_agent);
    next.coiners = coiners;
    next.coinage_notes = next.coinage_agent;
    delete next.coinage_agent;
  }

  return reorderKeys(next, TERM_KEY_ORDER);
}

function migrateTerms() {
  const data = JSON.parse(read('terms.json'));
  const out = data.map(migrateTerm);

  // Sanity
  const wavesSeen = new Set();
  const coinerCounts = {};
  for (const t of out) {
    if (t.transmission_wave !== undefined) throw new Error(`stale transmission_wave on ${t.id}`);
    if (t.coinage_agent !== undefined) throw new Error(`stale coinage_agent on ${t.id}`);
    for (const w of t.transmission_waves || []) wavesSeen.add(w);
    for (const c of t.coiners || []) coinerCounts[c] = (coinerCounts[c] || 0) + 1;
  }
  write('terms.json', out);
  console.log(`terms.json: ${out.length} terms`);
  console.log(`  transmission_waves seen: ${[...wavesSeen].sort().join(', ')}`);
  console.log(`  coiners frequency:`, coinerCounts);
}

// ---------------------------------------------------------------------
// sources.json: period → period_start_year + period_end_year + period_notes
// ---------------------------------------------------------------------
const PERIOD_MIGRATION = {
  'gateless-gate':                  { start: 1228, end: 1228 },
  'blue-cliff-record':              { start: 1125, end: 1125 },
  'platform-sutra':                 { start: 700,  end: 900  },
  'heart-sutra':                    { start: 100,  end: 649  },
  'nishi-hyakuichi':                { start: 1874, end: 1874 },
  'fukuzawa-gakumon':               { start: 1872, end: 1876 },
  'liang-xinmin':                   { start: 1902, end: 1906 },
  'liang-ouyou':                    { start: 1919, end: 1919 },
  'eihei-shingi':                   { start: 1237, end: 1249 },
  'dahui-shuzhuang':                { start: 1100, end: 1199 },
  'hongzhi-mokushomei':             { start: 1100, end: 1199 },
  'zenrin-kushu':                   { start: 1470, end: 1700 },
  'rinzai-roku':                    { start: 866,  end: 1120 },
  'shobogenzo':                     { start: 1231, end: 1253 },
  'mappo-tomyoki':                  { start: 800,  end: 900  },
  'heike-monogatari':               { start: 1240, end: 1240 },
  'eihei-koroku':                   { start: 1236, end: 1253 },
  'vimalakirti-sutra':              { start: 100,  end: 406  },
  'avatamsaka-sutra':               { start: 100,  end: 699  },
  'sandokai':                       { start: 700,  end: 790  },
  'fukanzazengi':                   { start: 1227, end: 1253 },
  'hokyo-zanmai':                   { start: 807,  end: 869  },
  'fukuzawa-seiyo-jijo':            { start: 1866, end: 1870 },
  'itoh-kenpou-gikai':              { start: 1889, end: 1889 },
  'itagaki-minsen-giin':            { start: 1874, end: 1874 },
  'bankoku-kohou':                  { start: 1865, end: 1865 },
  'kawakami-bimbo':                 { start: 1916, end: 1917 },
  'mitsukuri-fr-codes':             { start: 1870, end: 1874 },
  'kawaji-keisatsu-shugen':         { start: 1879, end: 1879 },
  'tetsugaku-jii':                  { start: 1881, end: 1912 },
  'nakae-ishi-bigaku':              { start: 1883, end: 1884 },
  'kawamoto-kagaku-shinsho':        { start: 1860, end: 1860 },
  'butsuri-kaitei':                 { start: 1872, end: 1872 },
  'fukuzawa-kyuri-zukai':           { start: 1868, end: 1868 },
  'meiji-telephone-service':        { start: 1890, end: 1890 },
  'udagawa-seimi-kaiso':            { start: 1837, end: 1847 },
  'udagawa-shokugaku-keigen':       { start: 1834, end: 1834 },
  'sugita-kaitai-shinsho':          { start: 1774, end: 1774 },
  'meiji-genshi-bunshi':            { start: 1880, end: 1900 },
  'morse-ishikawa-doubutsu-shinka': { start: 1883, end: 1883 },
  'fukuzawa-bunmeiron':             { start: 1875, end: 1875 },
  'kyoiku-chokugo':                 { start: 1890, end: 1890 },
  'nagayo-shoko-shishi':            { start: 1895, end: 1902 },
  'fukuzawa-kaigiben':              { start: 1874, end: 1874 },
  'meiji-newspaper-kokoku':         { start: 1871, end: 1900 },
  'wien-banpaku-bijutsu':           { start: 1872, end: 1872 },
  'tsubouchi-shosetsu-shinzui':     { start: 1885, end: 1886 },
  'naka-michiyo-shina-tsushi':      { start: 1888, end: 1890 },
  'nishi-shinrigaku':               { start: 1875, end: 1876 },
};

const SOURCE_KEY_ORDER = [
  'id', 'title', 'title_ja',
  'period_start_year', 'period_end_year', 'period_notes',
  'tradition', 'notes',
];

function migrateSources() {
  const data = JSON.parse(read('sources.json'));

  const out = data.map((src) => {
    const next = { ...src };
    if (next.period !== undefined) {
      const m = PERIOD_MIGRATION[next.id];
      if (!m) throw new Error(`No PERIOD_MIGRATION entry for ${next.id}`);
      next.period_start_year = m.start;
      next.period_end_year = m.end;
      next.period_notes = next.period;
      delete next.period;
    }
    return reorderKeys(next, SOURCE_KEY_ORDER);
  });

  for (const s of out) {
    if (s.period !== undefined) throw new Error(`stale period on ${s.id}`);
    if (typeof s.period_start_year !== 'number') throw new Error(`missing period_start_year on ${s.id}`);
    if (typeof s.period_end_year !== 'number') throw new Error(`missing period_end_year on ${s.id}`);
  }
  write('sources.json', out);
  console.log(`sources.json: ${out.length} sources`);
}

// ---------------------------------------------------------------------
// source_concepts.json: language → languages
// ---------------------------------------------------------------------
function splitLanguages(s) {
  return s
    .trim()
    .split(/\s*\/\s*/)
    .map((part) => part.replace(/\s*\([^)]+\)\s*$/, '').trim())
    .filter(Boolean);
}

const SOURCE_CONCEPT_KEY_ORDER = [
  'id', 'term', 'devanagari', 'languages', 'gloss', 'notes',
];

function migrateSourceConcepts() {
  const data = JSON.parse(read('source_concepts.json'));
  const out = data.map((sc) => {
    const next = { ...sc };
    if (next.language !== undefined) {
      next.languages = splitLanguages(next.language);
      delete next.language;
    }
    return reorderKeys(next, SOURCE_CONCEPT_KEY_ORDER);
  });

  for (const sc of out) {
    if (sc.language !== undefined) throw new Error(`stale language on ${sc.id}`);
    if (!Array.isArray(sc.languages)) throw new Error(`missing languages array on ${sc.id}`);
  }
  write('source_concepts.json', out);
  console.log(`source_concepts.json: ${out.length} source_concepts`);
}

// ---------------------------------------------------------------------
migrateTerms();
migrateSources();
migrateSourceConcepts();
console.log('done.');
