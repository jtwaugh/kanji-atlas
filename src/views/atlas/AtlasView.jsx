import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { terms, semanticFields, primaryRomaji } from '@/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import FlowChip, { MODULE_META } from '@/components/FlowChip';

const FLOW_ORDER = ['classical', 'reverse-flow'];

function groupByFlow() {
  const byModule = new Map();
  for (const field of semanticFields) {
    if (!byModule.has(field.module)) byModule.set(field.module, []);
    byModule.get(field.module).push({ ...field, terms: [] });
  }
  const fieldIndex = new Map();
  for (const fields of byModule.values()) {
    for (const f of fields) fieldIndex.set(f.id, f);
  }
  for (const term of terms) {
    const field = fieldIndex.get(term.semantic_field_id);
    if (field) field.terms.push(term);
  }
  return byModule;
}

export default function AtlasView() {
  const navigate = useNavigate();
  const byModule = useMemo(groupByFlow, []);

  return (
    <TooltipProvider delayDuration={150}>
    <div className="grid w-full grid-cols-1 gap-6 p-6 lg:h-full lg:grid-cols-2">
      {FLOW_ORDER.map((moduleId) => {
        const meta = MODULE_META[moduleId];
        const fields = byModule.get(moduleId) ?? [];
        return (
          <section key={moduleId} className="flex min-h-0 flex-col gap-4">
            <header className="px-2">
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-2xl font-medium">{meta.label}</h2>
                <FlowChip module={moduleId} />
              </div>
            </header>
            <div className="grid flex-1 grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2">
              {fields.map((field) => (
                <Card key={field.id} size="sm" className="min-h-0">
                  <CardHeader>
                    <CardTitle>
                      {field.description ? (
                        <Tooltip>
                          <TooltipTrigger className="cursor-help decoration-dotted decoration-muted-foreground/60 underline-offset-4 hover:underline focus-visible:outline-none">
                            {field.label}
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs text-balance">
                            {field.description}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        field.label
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    {field.terms.map((term) => {
                      const gloss = term.translation_range?.[0]?.rendering;
                      return (
                      <button
                        key={term.id}
                        type="button"
                        onClick={() => navigate(`/term/${encodeURIComponent(term.characters)}`)}
                        className="group flex flex-col items-center rounded-2xl px-3 py-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
                      >
                        <span
                          className="kanji-link text-3xl leading-none"
                          style={{ fontFamily: '"Noto Serif JP", "Hiragino Mincho ProN", serif' }}
                        >
                          {term.characters}
                        </span>
                        <span className="mt-1 text-xs italic text-muted-foreground">
                          {primaryRomaji(term)}
                        </span>
                        {gloss && (
                          <span className="mt-0.5 max-w-[10rem] line-clamp-1 text-xs text-foreground/80">
                            {gloss}
                          </span>
                        )}
                      </button>
                      );
                    })}
                    {field.terms.length === 0 && (
                      <span className="text-xs text-muted-foreground">No terms yet</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
    </TooltipProvider>
  );
}
