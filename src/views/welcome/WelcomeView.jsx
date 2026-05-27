import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function WelcomeView() {
  useEffect(() => {
    localStorage.setItem('seenSplash', '1');
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-prose space-y-4">
        <h1 className="font-serif text-2xl sm:text-3xl">
          Welcome to the Kanji Atlas
        </h1>
        <p className="text-base text-foreground">
          This site navigates the transmission of characters and phrases
          between Chinese and Japanese, primarily focused on the flow of Zen
          and Confucian concepts into Japan and the later flow of technical
          vocabulary into China.
        </p>
        <p className="text-base text-foreground">
          Click a phrase to see its history, and click a character within a
          phrase to see the character.
        </p>
        <p className="text-sm text-muted-foreground">
          Written by Claude. Please double-check important facts.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <Link to="/">Start Exploring →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
