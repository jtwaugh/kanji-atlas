import { useState } from 'react';
import { MessageSquareWarning } from 'lucide-react';
import FeedbackDialog from './FeedbackDialog.jsx';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Report a bug"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-colors hover:text-sky-600 dark:hover:text-sky-400 md:bottom-4 md:right-4"
      >
        <MessageSquareWarning className="h-5 w-5" aria-hidden="true" />
      </button>
      <FeedbackDialog
        open={open}
        onOpenChange={setOpen}
        kind="bug"
        contextId={null}
        contextLabel={null}
      />
    </>
  );
}
