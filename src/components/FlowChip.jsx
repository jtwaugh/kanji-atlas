import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const MODULE_META = {
  classical: {
    flow: '🇨🇳 → 🇯🇵',
    label: 'Influence into Japanese',
    subtitle: 'China → Japan · Buddhist and Confucian transmission',
    description:
      'Classical transmission — Chinese Buddhist and Daoist vocabulary entering Japanese.',
  },
  'reverse-flow': {
    flow: '🇯🇵 → 🇨🇳',
    label: 'Influence from Japanese',
    subtitle: 'Japan → China · Meiji-era coinages for Western concepts',
    description:
      'Reverse flow — Meiji-era Japanese coinages flowing back into Chinese.',
  },
};

export default function FlowChip({ module, className }) {
  const meta = MODULE_META[module];
  if (!meta) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn('cursor-help font-serif text-sm', className)}
        >
          {meta.flow}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{meta.description}</TooltipContent>
    </Tooltip>
  );
}
