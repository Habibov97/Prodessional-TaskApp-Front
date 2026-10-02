import type { Metadata } from 'next';
import GoBack from '@/components/GoBack';
import AvatarForm from '@/components/settings/AvatarForm';
import { getMe } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe();

  return (
    <section className="flex flex-col gap-5 rounded-2xl border p-4 shadow-[0_0_5px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="relative pb-1 text-xl font-bold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
          Account Information
        </h2>
        <GoBack />
      </div>
      <AvatarForm user={user} />
      {children}
    </section>
  );
}
