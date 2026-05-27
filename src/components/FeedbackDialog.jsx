import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const API_URL = import.meta.env.VITE_FEEDBACK_API_URL;
const AUTO_CLOSE_MS = 1500;

const PLACEHOLDERS = {
  bug: 'What went wrong? Steps to reproduce help.',
  term: 'What should be corrected, added, or sharpened?',
  character: 'What should be corrected, added, or sharpened?',
};

const TITLES = {
  bug: 'Report a bug',
  term: 'Suggest a correction',
  character: 'Suggest a correction',
};

export default function FeedbackDialog({
  open,
  onOpenChange,
  kind,
  contextId,
  contextLabel,
}) {
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | 'ok' | 'err'

  const offline = !API_URL;
  const disabled = submitting || offline || !message.trim();

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setMessage('');
    setEmail('');
    setHp('');
    setStatus(null);
    setSubmitting(false);
    const raf = requestAnimationFrame(() => {
      const ta = dialogRef.current?.querySelector('textarea');
      ta?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      restoreFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const node = dialogRef.current;
      if (!node) return;
      const focusable = node.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
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
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind,
          context_id: contextId ?? null,
          context_url: window.location.href,
          message: message.trim(),
          email: email.trim() || null,
          hp,
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('ok');
      setTimeout(() => onOpenChange(false), AUTO_CLOSE_MS);
    } catch {
      setStatus('err');
      setSubmitting(false);
    }
  };

  const title = TITLES[kind] ?? 'Feedback';

  return (
    <div
      className="fixed inset-0 z-50"
      role="presentation"
    >
      <div
        onClick={() => !submitting && onOpenChange(false)}
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-background shadow-2xl md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[80vh] md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border"
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="min-w-0">
            <h2
              id="feedback-title"
              className="font-serif text-xl text-foreground"
            >
              {title}
            </h2>
            {contextLabel && (
              <p className="mt-1 truncate text-xs uppercase tracking-wider text-muted-foreground">
                {contextLabel}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => !submitting && onOpenChange(false)}
            aria-label="Close"
            className="-m-2 p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === 'ok' ? (
          <div className="px-6 pb-6 pt-4">
            <p className="text-sm text-muted-foreground">
              Thanks — logged.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col gap-3 px-6 py-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </span>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={PLACEHOLDERS[kind] ?? ''}
                  maxLength={4000}
                  rows={5}
                  required
                  disabled={submitting || offline}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email <span className="normal-case italic">(optional, for reply)</span>
                </span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={submitting || offline}
                />
              </label>
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              {offline && (
                <p className="text-xs text-muted-foreground">
                  Feedback is offline — submission endpoint is not configured.
                </p>
              )}
              {status === 'err' && (
                <p className="text-xs text-destructive">
                  Couldn't submit. Try again in a moment.
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={disabled}>
                {submitting ? 'Sending…' : 'Send'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
