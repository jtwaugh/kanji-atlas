import { useParams } from 'react-router-dom';

export default function CharacterView() {
  const { char } = useParams();
  return (
    <div className="p-6">
      <h1 className="font-serif text-5xl">{decodeURIComponent(char)}</h1>
    </div>
  );
}
