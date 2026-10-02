'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border px-4 py-16 text-center">
      <h2 className="text-xl font-semibold text-[#333]">Something went wrong</h2>
      <p className="max-w-sm text-sm text-stone-500">
        We could not load this page. The server may be waking up, so trying again usually helps.
      </p>
      <div className="flex gap-2">
        <Button onClick={() => unstable_retry()} className="rounded-md bg-red-500 text-white hover:bg-red-600">
          Try again
        </Button>
        <Button asChild variant="outline" className="rounded-md">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
