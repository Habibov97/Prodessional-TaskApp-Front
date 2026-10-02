import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import DashboardNavigation from '@/components/DashboardNavigation';
import { getMe, getTasks } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, tasks] = await Promise.all([getMe(), getTasks()]);

  return (
    // On large screens the shell is exactly one viewport tall and only <main>
    // scrolls, so pages can use h-full to fill the remaining space.
    <div className="flex min-h-dvh flex-col bg-white lg:h-dvh">
      <Navbar user={user} tasks={tasks} />
      <div className="flex flex-1 lg:min-h-0">
        <aside className="hidden w-[260px] shrink-0 pt-4 lg:block xl:w-[280px]">
          <DashboardNavigation user={user} />
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:overflow-y-auto xl:px-10">{children}</main>
      </div>
    </div>
  );
}
