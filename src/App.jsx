import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Info, Menu, X } from 'lucide-react';
import AtlasView from './views/atlas/AtlasView.jsx';
import TermView from './views/term/TermView.jsx';
import CharacterView from './views/character/CharacterView.jsx';
import GraphView from './views/graph/GraphView.jsx';
import QuizView from './views/quiz/QuizView.jsx';
import DebugView from './views/debug/DebugView.jsx';
import WelcomeView from './views/welcome/WelcomeView.jsx';
import TocSheet from './components/TocSheet.jsx';
import FeedbackButton from './components/FeedbackButton.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Atlas' },
  { to: '/graph', label: 'Graph' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/debug', label: 'Debug' },
];

function ReferrerStrip() {
  const location = useLocation();
  const fromTerm = location.state?.fromTerm;
  const fromCharacter = location.state?.fromCharacter;
  const fromGraph = location.state?.fromGraph;

  if (!fromTerm && !fromCharacter && !fromGraph) return null;

  let to;
  if (fromTerm) to = `/term/${encodeURIComponent(fromTerm.characters)}`;
  else if (fromCharacter) to = `/character/${encodeURIComponent(fromCharacter.char)}`;
  else to = '/graph';

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
        ) : fromCharacter ? (
          <span className="font-serif text-base text-foreground">
            {fromCharacter.char}
          </span>
        ) : (
          <span className="text-foreground">graph</span>
        )}
      </Link>
    </div>
  );
}

export default function App() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  return (
    <div className="flex h-full w-full flex-col">
      <header className="relative flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-serif text-lg font-semibold">
            Kanji Atlas
          </Link>
          <Link
            to="/welcome"
            aria-label="About the Kanji Atlas"
            className="-m-1 p-1 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400"
          >
            <Info className="h-4 w-4" />
          </Link>
        </div>
        <nav className="hidden gap-4 text-sm text-muted-foreground sm:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="-m-2 p-2 text-muted-foreground hover:text-foreground sm:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
        {menuOpen && (
          <>
            <div
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 sm:hidden"
            />
            <nav
              id="header-menu"
              className="absolute right-4 top-full z-50 mt-1 flex min-w-32 flex-col rounded-md border border-border bg-background p-1 text-sm shadow-lg sm:hidden"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </>
        )}
      </header>
      <ReferrerStrip />
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AtlasView />} />
          <Route path="/welcome" element={<WelcomeView />} />
          <Route path="/term/:chars" element={<TermView />} />
          <Route path="/character/:char" element={<CharacterView />} />
          <Route path="/graph" element={<GraphView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/debug" element={<DebugView />} />
        </Routes>
      </main>
      <TocSheet scrollContainerRef={mainRef} />
      <FeedbackButton />
    </div>
  );
}
