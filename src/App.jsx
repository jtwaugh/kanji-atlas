import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AtlasView from './views/atlas/AtlasView.jsx';
import TermView from './views/term/TermView.jsx';
import CharacterView from './views/character/CharacterView.jsx';
import QuizView from './views/quiz/QuizView.jsx';
import DebugView from './views/debug/DebugView.jsx';

function ReferrerStrip() {
  const location = useLocation();
  const fromTerm = location.state?.fromTerm;
  const fromCharacter = location.state?.fromCharacter;

  if (!fromTerm && !fromCharacter) return null;

  const to = fromTerm
    ? `/term/${encodeURIComponent(fromTerm.characters)}`
    : `/character/${encodeURIComponent(fromCharacter.char)}`;

  return (
    <div className="border-b border-border px-6 py-2">
      <Link
        to={to}
        className="inline-flex items-baseline gap-2 text-sm text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400"
      >
        <span aria-hidden="true">←</span>
        <span className="text-muted-foreground">from</span>
        {fromTerm ? (
          <>
            <span className="font-serif text-base text-foreground">
              {fromTerm.characters}
            </span>
            {fromTerm.romaji && (
              <span className="italic">{fromTerm.romaji}</span>
            )}
          </>
        ) : (
          <span className="font-serif text-base text-foreground">
            {fromCharacter.char}
          </span>
        )}
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <Link to="/" className="font-serif text-lg font-semibold">
          Kanji Atlas
        </Link>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/">Atlas</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/debug">Debug</Link>
        </nav>
      </header>
      <ReferrerStrip />
      <main className="min-h-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AtlasView />} />
          <Route path="/term/:chars" element={<TermView />} />
          <Route path="/character/:char" element={<CharacterView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/debug" element={<DebugView />} />
        </Routes>
      </main>
    </div>
  );
}
