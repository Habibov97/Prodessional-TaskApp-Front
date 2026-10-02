'use client';
import { useSyncExternalStore } from 'react';
import { toDateKey } from '@/constants/due-date';

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

/**
 * Today's date (YYYY-MM-DD) from the user's clock. Empty during server
 * rendering, so anything depending on it appears after hydration.
 */
export function useToday() {
  return useSyncExternalStore(
    subscribe,
    () => toDateKey(new Date()),
    () => '',
  );
}
