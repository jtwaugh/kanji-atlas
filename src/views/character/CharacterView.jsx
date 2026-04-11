import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCharacter, terms, primaryRomaji } from '@/data';
import { Badge } from '@/components/ui/badge';
import { kanaToRomaji } from '@/lib/romaji';

export default function CharacterView() {
  const { char: rawChar } = useParams();
  const char = decodeURIComponent(rawChar);
  const info = getCharacter(char);

  const relatedTerms = terms.filter(
    (t) => typeof t.characters === 'string' && t.characters.includes(char),
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <CharacterHeader char={char} info={info} />
      {info?.gloss && (
        <p className="mt-8 font-serif text-lg leading-relaxed text-foreground/90">
          {info.gloss}
        </p>
      )}
      <EvolutionTimeline stages={info?.graphic_evolution} />
      <JapaneseTransmission info={info} relatedTerms={relatedTerms} />
      <RelatedTerms char={char} relatedTerms={relatedTerms} />
    </div>
  );
}

function CharacterHeader({ char, info }) {
  const wiktionary = `https://en.wiktionary.org/wiki/${encodeURIComponent(char)}#Japanese`;
  const on = info?.on_readings ?? [];
  const kun = info?.kun_readings ?? [];

  return (
    <header className="grid gap-8 border-b border-border pb-10 md:grid-cols-[auto_1fr] md:items-start">
      <div className="font-serif text-[12rem] leading-none text-foreground">
        {char}
      </div>

      <div className="space-y-5">
        <dl className="space-y-3 text-sm">
          {on.length > 0 && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
                On'yomi
              </dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1 text-base text-foreground">
                {on.map((r) => (
                  <ReadingWithRomaji key={r} kana={r} />
                ))}
              </dd>
            </div>
          )}
          {kun.length > 0 && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
                Kun'yomi
              </dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1 text-base text-foreground">
                {kun.map((r) => (
                  <ReadingWithRomaji key={r} kana={r} />
                ))}
              </dd>
            </div>
          )}
          {info?.pinyin && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
                Mandarin
              </dt>
              <dd className="font-serif text-base text-foreground">
                {info.pinyin}
              </dd>
            </div>
          )}
          {info?.strokes != null && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
                Strokes
              </dt>
              <dd className="text-base text-foreground">{info.strokes}</dd>
            </div>
          )}
          {info?.radical && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
                Radical
              </dt>
              <dd className="font-serif text-base text-foreground">
                {info.radical}
              </dd>
            </div>
          )}
        </dl>

        <a
          href={wiktionary}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400"
        >
          Wiktionary ↗
        </a>
      </div>
    </header>
  );
}

function EvolutionTimeline({ stages }) {
  const [open, setOpen] = useState(null);
  if (!stages || stages.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl">Graphic evolution</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        How the form shifts across scripts — tap a stage to read what that
        period's medium and hand reveal.
      </p>

      <ol className="mt-8 flex flex-wrap items-stretch gap-3">
        {stages.map((stage, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="flex min-w-[10rem] flex-1">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full flex-col gap-2 rounded-md border px-4 py-3 text-left transition-colors ${
                  isOpen
                    ? 'border-sky-500/70 bg-sky-50 dark:bg-sky-950/30'
                    : 'border-border hover:border-muted-foreground/50'
                }`}
              >
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Stage {i + 1}
                </span>
                <span className="font-serif text-base text-foreground">
                  {stage.period}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {open !== null && stages[open] && (
        <div className="mt-6 border-l-2 border-sky-500/60 pl-5">
          <p className="font-serif text-lg leading-relaxed text-foreground">
            {stages[open].form_description}
          </p>
          {stages[open].notes && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {stages[open].notes}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function ReadingWithRomaji({ kana }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-serif">{kana}</span>
      <span className="text-xs italic text-muted-foreground">
        {kanaToRomaji(kana)}
      </span>
    </span>
  );
}

function JapaneseTransmission({ info, relatedTerms }) {
  const prose = info?.japanese_transmission;
  const waves = Array.from(
    new Set(relatedTerms.map((t) => t.transmission_wave).filter(Boolean)),
  );
  if (!prose && waves.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl">Arrival in Japanese</h2>
      {prose && (
        <p className="mt-4 font-serif text-lg leading-relaxed text-foreground">
          {prose}
        </p>
      )}
      {waves.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {waves.map((w) => (
            <Badge key={w} variant="secondary">
              {w.replace(/-/g, ' ')}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}

function RelatedTerms({ char, relatedTerms }) {
  if (relatedTerms.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="font-serif text-2xl">Terms using {char}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Every entry in the atlas where this character does conceptual work.
      </p>
      <ul className="mt-6 space-y-4">
        {relatedTerms.map((t) => (
          <li key={t.id} className="group flex items-baseline gap-4">
            <Link
              to={`/term/${encodeURIComponent(t.characters)}`}
              state={{ fromCharacter: { char } }}
              className="kanji-link shrink-0 font-serif text-3xl leading-none"
            >
              {t.characters}
            </Link>
            <div className="min-w-0">
              <Link
                to={`/term/${encodeURIComponent(t.characters)}`}
                state={{ fromCharacter: { char } }}
                className="text-sm italic text-muted-foreground group-hover:text-foreground"
              >
                {primaryRomaji(t)}
              </Link>
              {t.on_reading && (
                <span className="ml-2 font-serif text-sm text-muted-foreground">
                  {t.on_reading}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
