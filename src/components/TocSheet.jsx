import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

const OPEN_MS = 250;
const CLOSE_MS = 200;

function slugify(text, i) {
  const slug = (text || '')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return `toc-${i}-${slug || 'heading'}`;
}

export default function TocSheet({ scrollContainerRef }) {
  const location = useLocation();
  const [headings, setHeadings] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const triggerRef = useRef(null);
  const sheetRef = useRef(null);
  const firstItemRef = useRef(null);
  const prevOpenRef = useRef(false);

  const dragStartY = useRef(null);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const raf = requestAnimationFrame(() => {
      const nodes = Array.from(container.querySelectorAll('h2, h3'));
      const next = nodes.map((el, i) => {
        if (!el.id) el.id = slugify(el.textContent, i);
        return {
          id: el.id,
          text: (el.textContent || '').trim(),
          level: el.tagName === 'H2' ? 2 : 3,
          el,
        };
      });
      setHeadings(next);
      setActiveId(next[0]?.id ?? null);
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { root: container, rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h.el));
    return () => observer.disconnect();
  }, [headings, scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !open) return;
    const prev = container.style.overflow;
    container.style.overflow = 'hidden';
    return () => {
      container.style.overflow = prev;
    };
  }, [open, scrollContainerRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const sheet = sheetRef.current;
      if (!sheet) return;
      const focusable = sheet.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const raf = requestAnimationFrame(() => firstItemRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  useEffect(() => {
    if (prevOpenRef.current && !open) triggerRef.current?.focus();
    prevOpenRef.current = open;
  }, [open]);

  const onTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e) => {
    if (dragStartY.current == null) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    if (dy > 0) setDragY(dy);
  };
  const onTouchEnd = () => {
    if (dragY > 80) setOpen(false);
    setDragY(0);
    dragStartY.current = null;
  };

  const jumpTo = useCallback(
    (h) => {
      h.el?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      setActiveId(h.id);
      setOpen(false);
    },
    [reducedMotion],
  );

  if (headings.length < 2) return null;

  const dragging = dragStartY.current != null;
  const sheetTransform = open
    ? `translateY(${dragY}px)`
    : 'translateY(100%)';
  const backdropOpacity = open ? Math.max(0, 1 - dragY / 300) : 0;
  const transitionDisabled = reducedMotion || dragging;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="toc-sheet"
        aria-label="Open table of contents"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="9" y1="6" x2="21" y2="6" />
          <line x1="9" y1="12" x2="21" y2="12" />
          <line x1="9" y1="18" x2="21" y2="18" />
          <circle cx="4.5" cy="6" r="1" />
          <circle cx="4.5" cy="12" r="1" />
          <circle cx="4.5" cy="18" r="1" />
        </svg>
      </button>

      <div
        className="fixed inset-0 z-50 md:hidden"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40"
          style={{
            opacity: backdropOpacity,
            transition: transitionDisabled
              ? 'none'
              : `opacity ${open ? OPEN_MS : CLOSE_MS}ms ease`,
          }}
        />
        <div
          id="toc-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="toc-sheet-label"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="absolute inset-x-0 bottom-0 flex max-h-[70vh] flex-col border-t border-border bg-background shadow-2xl"
          style={{
            borderRadius: '16px 16px 0 0',
            transform: sheetTransform,
            transition: transitionDisabled
              ? 'none'
              : `transform ${open ? OPEN_MS : CLOSE_MS}ms ${
                  open ? 'ease-out' : 'ease-in'
                }`,
          }}
        >
          <div className="flex items-center justify-center pb-1 pt-2">
            <span
              aria-hidden="true"
              className="h-1 w-10 rounded-full bg-border"
            />
          </div>
          <div className="px-5 pb-2 pt-1">
            <p
              id="toc-sheet-label"
              className="font-serif text-xs uppercase tracking-wider text-muted-foreground"
            >
              Contents
            </p>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto pb-6">
            <ul>
              {headings.map((h, i) => {
                const isActive = h.id === activeId;
                return (
                  <li key={h.id}>
                    <button
                      type="button"
                      ref={i === 0 ? firstItemRef : null}
                      onClick={() => jumpTo(h)}
                      className={`block w-full border-l-2 py-3 pr-5 text-left font-serif text-base ${
                        h.level === 3 ? 'pl-9' : 'pl-5'
                      } ${
                        isActive
                          ? 'border-sky-500 bg-sky-500/10 text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {h.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
