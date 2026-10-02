'use client';
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';

type Status = 'checking' | 'waking' | 'ready' | 'hidden';

const SHOW_AFTER_MS = 1500;
const RETRY_DELAY_MS = 3000;
const GIVE_UP_AFTER_MS = 90_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Pings the backend as soon as an auth page opens. A quick answer shows
 * nothing; a slow one (the free host waking up) explains the wait.
 */
export default function ServerStatus() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    let cancelled = false;
    const slowTimer = setTimeout(() => !cancelled && setStatus('waking'), SHOW_AFTER_MS);

    async function wake() {
      const deadline = Date.now() + GIVE_UP_AFTER_MS;
      // A sleeping host may hold the request open or refuse it while it boots,
      // so keep asking until it answers.
      while (!cancelled && Date.now() < deadline) {
        try {
          const res = await fetch('/api/wake', { cache: 'no-store' });
          if (res.ok) break;
        } catch {
          // Network hiccup: try again.
        }
        await sleep(RETRY_DELAY_MS);
      }
      clearTimeout(slowTimer);
      if (cancelled) return;
      setStatus((current) => (current === 'waking' ? 'ready' : 'hidden'));
      setTimeout(() => !cancelled && setStatus('hidden'), 2500);
    }

    wake();
    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
    };
  }, []);

  if (status === 'checking' || status === 'hidden') return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-xl bg-card px-4 py-3 text-sm text-foreground shadow-xl ring-1 ring-foreground/10"
    >
      {status === 'waking' ? (
        <>
          <Loader2Icon className="mt-0.5 size-4 shrink-0 animate-spin text-red-500" aria-hidden />
          <p>
            <span className="font-medium">Waking up the server…</span>{' '}
            <span className="text-muted-foreground">
              It runs on a free plan that sleeps when idle, so the first request can take up to a minute.
            </span>
          </p>
        </>
      ) : (
        <p className="font-medium text-green-600">Server is ready ✓</p>
      )}
    </div>
  );
}
