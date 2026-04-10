import { Link, Route, Routes } from 'react-router-dom';
import AtlasView from './views/atlas/AtlasView.jsx';
import TermView from './views/term/TermView.jsx';
import CharacterView from './views/character/CharacterView.jsx';
import QuizView from './views/quiz/QuizView.jsx';
import DebugView from './views/debug/DebugView.jsx';

export default function App() {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <Link to="/" className="font-serif text-lg font-semibold">
          Zen Kanji Atlas
        </Link>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/">Atlas</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/debug">Debug</Link>
        </nav>
      </header>
      <main className="min-h-0 flex-1">
        <Routes>
          <Route path="/" element={<AtlasView />} />
          <Route path="/term/:id" element={<TermView />} />
          <Route path="/character/:char" element={<CharacterView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/debug" element={<DebugView />} />
        </Routes>
      </main>
    </div>
  );
}
