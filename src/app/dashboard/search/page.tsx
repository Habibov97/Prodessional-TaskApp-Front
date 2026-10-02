import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchBar from '@/components/SearchBar';
import Task from '@/components/Task';
import EmptyState from '@/components/EmptyState';
import { getTasks } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Search',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100) ?? '';
  const tasks = query ? await getTasks(query) : [];

  return (
    <section className="flex flex-col gap-5 rounded-2xl border p-4 shadow-[0_0_5px_rgba(0,0,0,0.08)] sm:p-6">
      <h1 className="relative self-start pb-1 text-xl font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
        Search
      </h1>

      <Suspense>
        <SearchBar className="md:hidden" />
      </Suspense>

      {!query ? (
        <EmptyState title="Search your tasks" description="Type a word from a task title or description." />
      ) : (
        <>
          <p className="text-sm text-stone-500">
            {`${tasks.length} result${tasks.length === 1 ? '' : 's'} for `}&quot;
            <span className="font-medium text-[#333]">{query}</span>&quot;
          </p>
          {tasks.length === 0 ? (
            <EmptyState title="No tasks found" description="Try a different word." />
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
