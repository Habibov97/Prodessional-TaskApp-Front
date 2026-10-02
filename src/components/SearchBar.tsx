'use client';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function SearchBar({ className }: { className?: string }) {
  const query = useSearchParams().get('q') ?? '';

  return (
    <Form action="/dashboard/search" role="search" className={cn('relative', className)}>
      <input
        key={query}
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Search your task here..."
        aria-label="Search tasks"
        maxLength={100}
        className="h-9 w-full rounded-md bg-card py-2 pr-11 pl-4 text-sm shadow-md outline-none focus-visible:ring-2 focus-visible:ring-red-300"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-0 right-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600"
      >
        <FaSearch className="size-3.5" />
      </button>
    </Form>
  );
}
