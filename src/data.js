import termsJson from '../data/terms.json';
import charactersJson from '../data/characters.json';
import semanticFieldsJson from '../data/semantic_fields.json';
import sourceConceptsJson from '../data/source_concepts.json';
import sourcesJson from '../data/sources.json';
import literaryInstancesJson from '../data/literary_instances.json';

export const terms = termsJson;
export const characters = charactersJson;
export const semanticFields = semanticFieldsJson;
export const sourceConcepts = sourceConceptsJson;
export const sources = sourcesJson;
export const literaryInstances = literaryInstancesJson;

export function getTerm(id) {
  return terms.find((t) => t.id === id);
}

export function getTermByCharacters(chars) {
  return terms.find((t) => t.characters === chars);
}

export function getCharacter(char) {
  return characters.find((c) => c.character === char || c.char === char);
}

export function getSemanticField(id) {
  return semanticFields.find((f) => f.id === id);
}

export function primaryRomaji(term) {
  if (!term) return null;
  // The term's id is its conventional romanization — use it to pick which
  // reading is dominant, so 無 shows "mu" not "nai" and 悟 shows "satori".
  if (term.id === term.romaji_on) return term.romaji_on;
  if (term.id === term.romaji_kun) return term.romaji_kun;
  return term.romaji_on ?? term.romaji_kun ?? null;
}
