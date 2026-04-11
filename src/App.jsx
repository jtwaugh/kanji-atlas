import { Link, Route, Routes, useMatch } from 'react-router-dom';
import AtlasView from './views/atlas/AtlasView.jsx';
import TermView from './views/term/TermView.jsx';
import CharacterView from './views/character/CharacterView.jsx';
import QuizView from './views/quiz/QuizView.jsx';
import DebugView from './views/debug/DebugView.jsx';
import { getTermByCharacters } from '@/data';

function HeaderCrumb() {
  const termMatch = useMatch('/term/:chars');
  const charMatch = useMatch('/character/:char');

  if (termMatch) {
    const chars = decodeURIComponent(termMatch.params.chars);
    const term = getTermByCharacters(chars);
    return (
      <>
        <span className="text-muted-foreground" aria-hidden="true">
          /
        </span>
        {term ? (
          <>
            <span
              className="text-foreground"
              style={{
                fontFamily: '"Noto Serif JP", "Hiragino Mincho ProN", serif',
              }}
            >
              {term.characters}
            </span>
            <span className="text-sm italic text-muted-foreground">
              {term.romaji}
            </span>
          </>
        ) : (
          <span className="text-sm italic text-muted-foreground">
            {chars}
          </span>
        )}
      </>
    );
  }

  if (charMatch) {
    const char = decodeURIComponent(charMatch.params.char);
    return (
      <>
        <span className="text-muted-foreground" aria-hidden="true">
          /
        </span>
        <span
          className="text-foreground"
          style={{
            fontFamily: '"Noto Serif JP", "Hiragino Mincho ProN", serif',
          }}
        >
          {char}
        </span>
      </>
    );
  }

  return null;
}

export default function App() {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-serif text-lg font-semibold">
            Kanji Atlas
          </Link>
          <HeaderCrumb />
        </div>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/">Atlas</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/debug">Debug</Link>
        </nav>
      </header>
      <main className="min-h-0 flex-1">
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
