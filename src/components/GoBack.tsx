'use client';
import { useRouter } from 'next/navigation';

export default function GoBack() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm font-semibold text-foreground  transition-colors cursor-pointer underline whitespace-nowrap"
    >
      Go Back
    </button>
  );
}
