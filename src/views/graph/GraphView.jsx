import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { semanticFields, transmissionWaves } from '@/data';
import useGraphModel from './useGraphModel';
import ForceGraph from './ForceGraph';

const EDGE_OPTIONS = [
  { id: 'neighbor', label: 'Neighbors' },
  { id: 'shared-char', label: 'Shared character' },
  { id: 'shared-field', label: 'Shared field' },
  { id: 'shared-wave', label: 'Shared wave' },
];

const FLOW_OPTIONS = [
  { id: 'classical', label: 'Classical' },
  { id: 'reverse-flow', label: 'Reverse flow' },
];

const LABEL_OPTIONS = [
  { id: 'romaji', label: 'Romaji' },
  { id: 'english', label: 'English' },
];

function toggle(arr, id) {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

function ChipGroup({ label, options, value, onToggle }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground">{label}</span>
      {options.map((opt) => {
        const on = value.includes(opt.id);
        return (
          <Button
            key={opt.id}
            type="button"
            variant={on ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToggle(opt.id)}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}

function MultiSelectPopover({ label, options, value, onChange }) {
  const count = value.length;
  const triggerLabel = count > 0 ? `${label} · ${count}` : label;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          {triggerLabel}
          <ChevronDown className="size-3.5 opacity-70" data-icon="inline-end" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[28rem] overflow-y-auto">
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs text-muted-foreground">
            {count > 0 ? `${count} selected` : 'All shown'}
          </span>
          {count > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
        <ul className="flex flex-col gap-1">
          {options.map((opt) => {
            const checked = value.includes(opt.id);
            return (
              <li key={opt.id}>
                <label className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 hover:bg-muted">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() =>
                      onChange(
                        checked
                          ? value.filter((v) => v !== opt.id)
                          : [...value, opt.id],
                      )
                    }
                    className="mt-0.5"
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm text-foreground">{opt.label}</span>
                    {opt.description && (
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {opt.description}
                      </span>
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

const FIELD_OPTIONS = semanticFields.map((f) => ({
  id: f.id,
  label: f.label,
  description: f.description,
}));

const WAVE_OPTIONS = transmissionWaves.map((w) => ({
  id: w.id,
  label: w.label,
  description: w.period
    ? `${w.period}${w.description ? ' — ' + w.description : ''}`
    : w.description,
}));

export default function GraphView() {
  const [searchParams] = useSearchParams();
  const initialField = searchParams.get('field');
  const seededFields =
    initialField && semanticFields.some((f) => f.id === initialField)
      ? [initialField]
      : [];

  const [edgeTypes, setEdgeTypes] = useState(['neighbor', 'shared-char']);
  const [flows, setFlows] = useState(['classical', 'reverse-flow']);
  const [fields, setFields] = useState(seededFields);
  const [waves, setWaves] = useState([]);
  const [labels, setLabels] = useState([]);

  const { nodes, edges } = useGraphModel({
    edgeTypes,
    modules: flows,
    fields,
    waves,
  });

  const showRomaji = labels.includes('romaji');
  const showEnglish = labels.includes('english');

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-6 py-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <ChipGroup
            label="Edges"
            options={EDGE_OPTIONS}
            value={edgeTypes}
            onToggle={(id) => setEdgeTypes((prev) => toggle(prev, id))}
          />
          <ChipGroup
            label="Flow"
            options={FLOW_OPTIONS}
            value={flows}
            onToggle={(id) => setFlows((prev) => toggle(prev, id))}
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Filter</span>
            <MultiSelectPopover
              label="Field"
              options={FIELD_OPTIONS}
              value={fields}
              onChange={setFields}
            />
            <MultiSelectPopover
              label="Wave"
              options={WAVE_OPTIONS}
              value={waves}
              onChange={setWaves}
            />
          </div>
          <ChipGroup
            label="Labels"
            options={LABEL_OPTIONS}
            value={labels}
            onToggle={(id) => setLabels((prev) => toggle(prev, id))}
          />
          <span className="ml-auto text-xs text-muted-foreground">
            {nodes.length} terms · {edges.length} edges
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        {nodes.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No terms match the current filters.
          </div>
        ) : (
          <ForceGraph
            nodes={nodes}
            edges={edges}
            showRomaji={showRomaji}
            showEnglish={showEnglish}
          />
        )}
      </div>
    </div>
  );
}
