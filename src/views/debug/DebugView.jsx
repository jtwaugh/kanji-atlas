import { terms, semanticFields } from '@/data';

export default function DebugView() {
  return (
    <div className="p-6 text-sm">
      <p>{terms.length} terms</p>
      <p>{semanticFields.length} semantic fields</p>
    </div>
  );
}
