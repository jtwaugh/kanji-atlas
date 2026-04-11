import { Link, useParams } from 'react-router-dom';
import {
  getTermByCharacters,
  terms,
  characters,
  sourceConcepts,
  semanticFields,
  literaryInstances,
  sources,
} from '@/data';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import FlowChip from '@/components/FlowChip';
import ReadingRow from '@/components/ReadingRow';

export default function TermView() {
  const { chars: charsParam } = useParams();
  const decoded = decodeURIComponent(charsParam);
  const term = getTermByCharacters(decoded);
  if (!term) {
    return <div className="p-6 text-muted-foreground">Term not found: {decoded}</div>;
  }

  const field = semanticFields.find((f) => f.id === term.semantic_field_id);
  const source = sourceConcepts.find((c) => c.id === term.source_concept_id);
  const instances = literaryInstances.filter((i) => i.term_id === term.id);
  const neighbors = (term.neighbor_ids ?? [])
    .map((nid) => terms.find((t) => t.id === nid))
    .filter(Boolean);

  const chars = Array.from(term.characters);

  const charOnReadings = chars.map((c) => {
    const info = characters.find((x) => x.char === c);
    return info?.on_readings?.[0] ?? null;
  });
  const onAligned =
    term.on_reading &&
    charOnReadings.every(Boolean) &&
    charOnReadings.join('') === term.on_reading;

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
            {chars.map((c, i) => (
              <div key={`${c}-${i}`} className="flex flex-col items-center">
                <span
                  className={`font-serif text-base leading-none text-muted-foreground ${onAligned ? '' : 'invisible'}`}
                  aria-hidden={!onAligned}
                >
                  {onAligned ? charOnReadings[i] : '\u00a0'}
                </span>
                <Link
                  to={`/character/${encodeURIComponent(c)}`}
                  state={{ fromTerm: { characters: term.characters, romaji: term.romaji } }}
                  className="kanji-link mt-1 font-serif text-7xl leading-none"
                >
                  {c}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-0">
            {!onAligned && term.on_reading && (
              <ReadingRow label="音" values={term.on_reading} />
            )}
            {term.kun_reading && (
              <ReadingRow label="訓" values={term.kun_reading} />
            )}
            {term.romaji && (
              <p className="mt-2 text-sm italic text-muted-foreground">
                {term.romaji}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {term.module && <FlowChip module={term.module} />}
            {field && <Badge variant="secondary">{field.label}</Badge>}
            {term.transmission_wave && (
              <Badge variant="ghost" className="text-muted-foreground">
                {term.transmission_wave.replace('-', ' ')}
              </Badge>
            )}
          </div>
        </header>

        <section className="mt-10 grid gap-10 md:grid-cols-2">
          {source && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Source
              </p>
              {source.devanagari && (
                <p className="mt-2 font-serif text-4xl leading-tight text-foreground">
                  {source.devanagari}
                </p>
              )}
              <p
                className={
                  source.devanagari
                    ? 'mt-1 font-serif text-xl italic text-muted-foreground'
                    : 'mt-2 font-serif text-2xl text-foreground'
                }
              >
                {source.term}
              </p>
              {source.language && (
                <p className="text-xs italic text-muted-foreground">
                  {source.language}
                </p>
              )}
              {source.gloss && (
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  {source.gloss}
                </p>
              )}
              {source.notes && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {source.notes}
                </p>
              )}
              {term.coinage_agent && (
                <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Coinage: </span>
                  {term.coinage_agent}
                </p>
              )}
            </div>
          )}

          {term.components && term.components.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Components
              </p>
              <ul className="mt-2">
                {term.components.map((comp, i) => {
                  const info = characters.find((x) => x.char === comp.char);
                  return (
                    <li
                      key={`${comp.char}-${i}`}
                      className="flex gap-4 border-b border-border/40 py-4 first:pt-2 last:border-0"
                    >
                      <Link
                        to={`/character/${encodeURIComponent(comp.char)}`}
                        state={{ fromTerm: { characters: term.characters, romaji: term.romaji } }}
                        className="kanji-link shrink-0 font-serif text-4xl leading-none"
                      >
                        {comp.char}
                      </Link>
                      <div className="min-w-0">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {comp.meaning}
                        </p>
                        {info?.pinyin && (
                          <p className="mt-1 text-xs text-muted-foreground/70">
                            🇨🇳 <i>{info.pinyin}</i>
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {term.translation_range && term.translation_range.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl">Translation range</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              How the term resolves into English across registers — each
              rendering captures one facet, none captures all.
            </p>
            <dl className="mt-6 space-y-5">
              {term.translation_range.map((tr, i) => (
                <div
                  key={`${tr.rendering}-${i}`}
                  className="grid gap-2 border-l-2 border-border pl-4 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-6"
                >
                  <dt className="font-serif text-lg text-foreground">
                    {tr.rendering}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">
                    {tr.emphasis}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {instances.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl">Literary instances</h2>
            <div className="mt-6 space-y-8">
              {instances.map((inst) => {
                const src = sources.find((s) => s.id === inst.source_id);
                return (
                  <article
                    key={inst.id}
                    className="border-l-2 border-primary/40 pl-5"
                  >
                    <blockquote className="font-serif text-xl leading-relaxed text-foreground">
                      {inst.passage}
                    </blockquote>
                    {src && (
                      <cite className="mt-2 block text-xs not-italic text-muted-foreground">
                        — {src.title}
                        {src.title_ja && (
                          <span className="font-serif"> ({src.title_ja})</span>
                        )}
                        {src.period && <span> · {src.period}</span>}
                        {src.tradition && <span> · {src.tradition}</span>}
                      </cite>
                    )}
                    {inst.notes && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {inst.notes}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {(term.conceptual_remainder || term.doctrinal_weight) && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl">Commentary</h2>
            <div className="mt-6 space-y-8">
              {term.conceptual_remainder && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Conceptual remainder
                  </p>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/90">
                    {term.conceptual_remainder}
                  </p>
                </div>
              )}
              {term.doctrinal_weight && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Doctrinal weight
                  </p>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/90">
                    {term.doctrinal_weight}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {neighbors.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-serif text-2xl">Neighbors</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Terms that sit near this one in the atlas — through shared field,
              deliberate contrast, or the conflations teachers play against.
            </p>
            <ul className="mt-6 space-y-4">
              {neighbors.map((n) => {
                const ff = term.false_friends?.find(
                  (f) => f.char === n.characters,
                );
                const nField = semanticFields.find(
                  (f) => f.id === n.semantic_field_id,
                );
                const relation =
                  ff?.divergence ??
                  (nField && nField.id === term.semantic_field_id
                    ? `Shares the field of ${nField.label.toLowerCase()}.`
                    : nField
                      ? `From ${nField.label.toLowerCase()}.`
                      : null);
                return (
                  <li key={n.id} className="flex gap-4">
                    <Link
                      to={`/term/${encodeURIComponent(n.characters)}`}
                      className="kanji-link shrink-0 font-serif text-3xl leading-none"
                    >
                      {n.characters}
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to={`/term/${encodeURIComponent(n.characters)}`}
                        className="text-sm italic text-muted-foreground hover:text-foreground"
                      >
                        {n.romaji}
                      </Link>
                      {relation && (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {relation}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </TooltipProvider>
  );
}
