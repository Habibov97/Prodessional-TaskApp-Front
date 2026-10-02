import { Suspense } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FaUserLarge } from 'react-icons/fa6';
import MobileNavigation from './MobileNavigation';
import NotificationsMenu from './NotificationsMenu';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import TodayDate from './TodayDate';
import type { TaskType } from '@/types/task.types';
import type { UserType } from '@/types/user.types';

export default function Navbar({ user, tasks }: { user: UserType | null; tasks: TaskType[] }) {
  return (
    <header className="sticky top-0 z-40 shrink-0 bg-muted shadow-md/10">
      <nav className="flex h-16 items-center gap-3 px-4 sm:px-6 xl:px-10">
        <MobileNavigation user={user} />

        <Link href="/dashboard" className="shrink-0 text-2xl font-bold text-red-500 sm:text-3xl">
          Dash<span className="text-foreground">board</span>
        </Link>

        <div className="mx-auto hidden w-full max-w-[600px] md:block">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
          <Link
            href="/dashboard/search"
            aria-label="Search tasks"
            className="flex size-9 items-center justify-center rounded-md bg-red-500 text-[#f3f3f3] hover:bg-red-600 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25 md:hidden"
          >
            <FaSearch className="text-sm" />
          </Link>
          <ThemeToggle />
          <NotificationsMenu tasks={tasks} />
          <Link
            href="/dashboard/settings"
            aria-label="Account settings"
            className="flex size-9 items-center justify-center rounded-md bg-red-500 text-[#f3f3f3] hover:bg-red-600 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25"
          >
            <FaUserLarge className="text-sm" />
          </Link>
        </div>

        <div className="hidden shrink-0 flex-col text-sm leading-tight sm:flex">
          <TodayDate pattern="EEEE" className="font-medium text-foreground" />
          <TodayDate pattern="dd/MM/yyyy" className="text-blue-500" />
        </div>
      </nav>
    </header>
  );
}
