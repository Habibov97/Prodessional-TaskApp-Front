import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-16 text-center">
      <p className="text-5xl font-bold text-red-500">404</p>
      <h2 className="text-xl font-semibold text-[#333]">This page could not be found</h2>
      <p className="max-w-sm text-sm text-stone-500">The task may have been deleted, or the link is wrong.</p>
      <Link href="/dashboard/mytask" className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
        Back to my tasks
      </Link>
    </div>
  );
}
