// data/validate.js
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const load = f => JSON.parse(readFileSync(join(__dirname, f), 'utf8'))

const terms = load('terms.json')
const characters = load('characters.json')
const sources = load('sources.json')
const sourceConcepts = load('source_concepts.json')
const semanticFields = load('semantic_fields.json')
const literaryInstances = load('literary_instances.json')
const transmissionWaves = load('transmission_waves.json')
const agents = load('agents.json')

const errors = []
const ids = {
  terms: new Set(terms.map(t => t.id)),
  characters: new Set(characters.map(c => c.char)),
  sources: new Set(sources.map(s => s.id)),
  sourceConcepts: new Set(sourceConcepts.map(s => s.id)),
  semanticFields: new Set(semanticFields.map(s => s.id)),
  transmissionWaves: new Set(transmissionWaves.map(w => w.id)),
  agents: new Set(agents.map(a => a.id)),
}

const neighborSets = new Map(terms.map(t => [t.id, new Set(t.neighbor_ids || [])]))

// Required fields on terms
const TERM_REQUIRED = [
  'id', 'characters', 'on_reading', 'module',
  'semantic_field_id', 'source_concept_id', 'neighbor_ids', 'components'
]

for (const term of terms) {
  const p = `terms[${term.id}]`

  // Required fields
  for (const f of TERM_REQUIRED) {
    if (term[f] === undefined) errors.push(`${p}: missing required field '${f}'`)
  }

  // Valid module
  if (!['classical', 'reverse-flow'].includes(term.module))
    errors.push(`${p}: invalid module '${term.module}'`)

  // Foreign keys — semantic field, source concept
  if (term.semantic_field_id && !ids.semanticFields.has(term.semantic_field_id))
    errors.push(`${p}: semantic_field_id '${term.semantic_field_id}' not found`)

  if (term.source_concept_id && !ids.sourceConcepts.has(term.source_concept_id))
    errors.push(`${p}: source_concept_id '${term.source_concept_id}' not found`)

  for (const nid of (term.neighbor_ids || [])) {
    if (!ids.terms.has(nid)) {
      errors.push(`${p}: neighbor_id '${nid}' not found in terms`)
      continue
    }
    if (!neighborSets.get(nid).has(term.id))
      errors.push(`${p}: neighbor '${nid}' does not list '${term.id}' back — neighbor_ids must be symmetric`)
  }

  // Characters exist in characters.json
  for (const char of term.characters) {
    if (!ids.characters.has(char))
      errors.push(`${p}: character '${char}' not found in characters.json`)
  }

  // Romaji must pair with a reading of the same kind
  if (term.romaji_on && !term.on_reading)
    errors.push(`${p}: romaji_on present but on_reading is missing`)
  if (term.romaji_kun && !term.kun_reading)
    errors.push(`${p}: romaji_kun present but kun_reading is missing`)

  // transmission_waves must be array of valid IDs; transmission_notes is optional string
  if (term.transmission_wave !== undefined)
    errors.push(`${p}: legacy 'transmission_wave' field still present; use 'transmission_waves' (array)`)
  if (term.transmission_waves !== undefined) {
    if (!Array.isArray(term.transmission_waves))
      errors.push(`${p}: 'transmission_waves' must be an array`)
    else for (const w of term.transmission_waves) {
      if (!ids.transmissionWaves.has(w))
        errors.push(`${p}: transmission_wave '${w}' not found in transmission_waves.json`)
    }
  }
  if (term.transmission_notes !== undefined && typeof term.transmission_notes !== 'string')
    errors.push(`${p}: 'transmission_notes' must be a string`)

  // coiners must be array of valid agent IDs; coinage_notes is optional string
  if (term.coinage_agent !== undefined)
    errors.push(`${p}: legacy 'coinage_agent' field still present; use 'coiners' (array) + 'coinage_notes'`)
  if (term.coiners !== undefined) {
    if (!Array.isArray(term.coiners))
      errors.push(`${p}: 'coiners' must be an array`)
    else for (const c of term.coiners) {
      if (!ids.agents.has(c))
        errors.push(`${p}: coiner '${c}' not found in agents.json`)
    }
  }
  if (term.coinage_notes !== undefined && typeof term.coinage_notes !== 'string')
    errors.push(`${p}: 'coinage_notes' must be a string`)
}

// Sources
for (const src of sources) {
  const p = `sources[${src.id}]`
  if (src.period !== undefined)
    errors.push(`${p}: legacy 'period' field still present; use 'period_start_year' + 'period_end_year' + 'period_notes'`)
  if (typeof src.period_start_year !== 'number')
    errors.push(`${p}: missing or non-numeric 'period_start_year'`)
  if (typeof src.period_end_year !== 'number')
    errors.push(`${p}: missing or non-numeric 'period_end_year'`)
  if (typeof src.period_start_year === 'number' && typeof src.period_end_year === 'number'
      && src.period_start_year > src.period_end_year)
    errors.push(`${p}: period_start_year (${src.period_start_year}) > period_end_year (${src.period_end_year})`)
  if (src.period_notes !== undefined && typeof src.period_notes !== 'string')
    errors.push(`${p}: 'period_notes' must be a string`)
}

// Source concepts
for (const sc of sourceConcepts) {
  const p = `source_concepts[${sc.id}]`
  if (sc.language !== undefined)
    errors.push(`${p}: legacy 'language' field still present; use 'languages' (array)`)
  if (sc.languages !== undefined && !Array.isArray(sc.languages))
    errors.push(`${p}: 'languages' must be an array`)
}

// Transmission waves — each must have id and label
for (const w of transmissionWaves) {
  const p = `transmission_waves[${w.id}]`
  if (!w.id) errors.push(`${p}: missing id`)
  if (!w.label) errors.push(`${p}: missing label`)
}

// Agents — each must have id and name_en
for (const a of agents) {
  const p = `agents[${a.id}]`
  if (!a.id) errors.push(`${p}: missing id`)
  if (!a.name_en) errors.push(`${p}: missing name_en`)
}

// Literary instances
for (const inst of literaryInstances) {
  const p = `literary_instances[${inst.id}]`
  if (!inst.term_id) errors.push(`${p}: missing term_id`)
  if (!inst.source_id) errors.push(`${p}: missing source_id`)
  if (!inst.passage) errors.push(`${p}: missing passage`)
  if (!inst.notes) errors.push(`${p}: missing notes`)
  if (inst.term_id && !ids.terms.has(inst.term_id))
    errors.push(`${p}: term_id '${inst.term_id}' not found`)
  if (inst.source_id && !ids.sources.has(inst.source_id))
    errors.push(`${p}: source_id '${inst.source_id}' not found`)
}

// Duplicate ID check
const termIds = terms.map(t => t.id)
const dupes = termIds.filter((id, i) => termIds.indexOf(id) !== i)
if (dupes.length) errors.push(`Duplicate term IDs: ${dupes.join(', ')}`)

// Report
if (errors.length === 0) {
  console.log(`✓ Valid — ${terms.length} terms, ${characters.length} characters, ` +
    `${literaryInstances.length} instances, ${sources.length} sources, ` +
    `${sourceConcepts.length} source_concepts, ${transmissionWaves.length} waves, ${agents.length} agents`)
} else {
  console.log(`✗ ${errors.length} error(s):\n`)
  errors.forEach(e => console.log(`  ${e}`))
  process.exit(1)
}
