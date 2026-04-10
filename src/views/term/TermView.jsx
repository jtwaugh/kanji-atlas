import { useParams } from 'react-router-dom';
import { getTerm } from '@/data';

export default function TermView() {
  const { id } = useParams();
  const term = getTerm(id);
  if (!term) {
    return <div className="p-6 text-muted-foreground">Term not found: {id}</div>;
  }
  return (
    <div className="p-6">
      <h1 className="font-serif text-5xl">{term.characters}</h1>
      <p className="mt-2 italic text-muted-foreground">{term.romaji}</p>
    </div>
  );
}
