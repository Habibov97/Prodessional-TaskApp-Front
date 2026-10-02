'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavMocks } from '../mocks/dashboardNavigation.mocks';
import { logoutAction } from '@/actions/auth.actions';
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';
import type { UserType } from '@/types/user.types';

function isActive(pathName: string, href: string) {
  if (href === '/dashboard') return pathName === href;
  return pathName === href || pathName.startsWith(`${href}/`);
}

export default function DashboardNavigation({ user, onNavigate }: { user: UserType | null; onNavigate?: () => void }) {
  const pathName = usePathname();
  const links = dashboardNavMocks.filter((item) => item.key !== 'logout');
  const logout = dashboardNavMocks.find((item) => item.key === 'logout');
  const LogoutIcon = logout?.icon;

  return (
    <nav className="flex h-full flex-col gap-6 rounded-r-2xl bg-red-500/90 px-4 py-6 text-white xl:px-5 dark:border-r dark:border-border dark:bg-card dark:text-foreground">
      <div className="flex flex-col items-center gap-3 text-center">
        <UserAvatar user={user} className="size-20 text-2xl ring-4 ring-white/40 dark:ring-red-500/40" />
        <div className="min-w-0 max-w-full">
          <p className="truncate font-bold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="truncate text-sm text-white/80 dark:text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathName, item.href);
          return (
            <Link
              href={item.href}
              key={item.id}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-5 py-3 transition-colors',
                active
                  ? 'bg-white text-red-500 dark:bg-red-500/15 dark:text-red-400'
                  : 'hover:bg-white/15 dark:text-foreground/80 dark:hover:bg-muted dark:hover:text-foreground',
              )}
            >
              <Icon size={22} className="shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {logout && LogoutIcon && (
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-5 py-3 transition-colors hover:bg-white/15 dark:text-foreground/80 dark:hover:bg-muted dark:hover:text-foreground"
          >
            <LogoutIcon size={22} className="shrink-0" />
            <span>{logout.title}</span>
          </button>
        </form>
      )}
    </nav>
  );
}
