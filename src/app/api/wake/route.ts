import { API_URL } from '@/lib/config';

// The free backend host sleeps when idle and needs up to a minute to start.
export const maxDuration = 60;

/** Wakes the backend up; the auth pages call this while the visitor is reading. */
export async function GET() {
  try {
    const res = await fetch(`${API_URL}/health`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(55_000),
    });
    return Response.json({ ready: res.ok }, { status: res.ok ? 200 : 503 });
  } catch {
    return Response.json({ ready: false }, { status: 503 });
  }
}
