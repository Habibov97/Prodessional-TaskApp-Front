import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-6xl font-bold text-red-500">404</p>
      <h1 className="text-xl font-semibold text-[#333]">This page could not be found</h1>
      <Link href="/dashboard" className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
        Go to dashboard
      </Link>
    </main>
  );
}
