'use client';
import { useSyncExternalStore } from 'react';
import { format } from 'date-fns';

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

// Rendered only on the client so the date follows the user's timezone,
// not the server's.
export default function TodayDate({ pattern, className }: { pattern: string; className?: string }) {
  const value = useSyncExternalStore(
    subscribe,
    () => format(new Date(), pattern),
    () => '',
  );

  return <span className={className}>{value || ' '}</span>;
}
