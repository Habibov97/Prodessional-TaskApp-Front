import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FaUserLarge } from 'react-icons/fa6';
import { IoMdNotificationsOutline } from 'react-icons/io';
import MobileNavigation from './MobileNavigation';
import TodayDate from './TodayDate';
import type { UserType } from '@/types/user.types';

export default function Navbar({ user }: { user: UserType | null }) {
  return (
    <header className="sticky top-0 z-40 shrink-0 bg-[#f8f8f8] shadow-md/10">
      <nav className="flex h-16 items-center gap-3 px-4 sm:px-6 xl:px-10">
        <MobileNavigation user={user} />

        <Link href="/dashboard" className="shrink-0 text-2xl font-bold text-red-500 sm:text-3xl">
          Dash<span className="text-[#333]">board</span>
        </Link>

        <div className="mx-auto hidden w-full max-w-[600px] md:block">
          <div className="relative">
            <input
              type="search"
              placeholder="Search your task here..."
              aria-label="Search tasks"
              className="h-9 w-full rounded-md bg-white py-2 pr-11 pl-4 text-sm shadow-md outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            />
            <div className="absolute top-0 right-0 flex h-full w-9 items-center justify-center rounded-md bg-red-500 text-white">
              <FaSearch className="size-3.5" />
            </div>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-red-500 text-[#f3f3f3] hover:bg-red-600"
          >
            <IoMdNotificationsOutline className="text-xl" />
          </button>
          <Link
            href="/dashboard/settings"
            aria-label="Account settings"
            className="flex size-9 items-center justify-center rounded-md bg-red-500 text-[#f3f3f3] hover:bg-red-600"
          >
            <FaUserLarge className="text-sm" />
          </Link>
        </div>

        <div className="hidden shrink-0 flex-col text-sm leading-tight sm:flex">
          <TodayDate pattern="EEEE" className="font-medium text-[#333]" />
          <TodayDate pattern="dd/MM/yyyy" className="text-blue-500" />
        </div>
      </nav>
    </header>
  );
}
