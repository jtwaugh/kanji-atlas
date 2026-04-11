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
// const agents = load('agents.json')  // uncomment when ready

const errors = []
const ids = {
  terms: new Set(terms.map(t => t.id)),
  characters: new Set(characters.map(c => c.char)),
  sources: new Set(sources.map(s => s.id)),
  sourceConcepts: new Set(sourceConcepts.map(s => s.id)),
  semanticFields: new Set(semanticFields.map(s => s.id)),
}

// Required fields on terms
const TERM_REQUIRED = [
  'id', 'characters', 'romaji', 'on_reading', 'module',
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

  // Foreign keys
  if (term.semantic_field_id && !ids.semanticFields.has(term.semantic_field_id))
    errors.push(`${p}: semantic_field_id '${term.semantic_field_id}' not found`)

  if (term.source_concept_id && !ids.sourceConcepts.has(term.source_concept_id))
    errors.push(`${p}: source_concept_id '${term.source_concept_id}' not found`)

  for (const nid of (term.neighbor_ids || [])) {
    if (!ids.terms.has(nid))
      errors.push(`${p}: neighbor_id '${nid}' not found in terms`)
  }

  // Characters exist in characters.json
  for (const char of term.characters) {
    if (!ids.characters.has(char))
      errors.push(`${p}: character '${char}' not found in characters.json`)
  }
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
    `${literaryInstances.length} instances, ${sources.length} sources`)
} else {
  console.log(`✗ ${errors.length} error(s):\n`)
  errors.forEach(e => console.log(`  ${e}`))
  process.exit(1)
}