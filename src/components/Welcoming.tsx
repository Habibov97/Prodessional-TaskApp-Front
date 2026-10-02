import Link from 'next/link';
import type { UserType } from '@/types/user.types';

export default function Welcoming({ user }: { user: UserType | null }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-[#333] sm:text-3xl">
        Welcome {user?.firstName} {user?.lastName} 👋
      </h1>
      <div className="flex items-center gap-5">
        <div className="hidden gap-1 sm:flex">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="size-9 rounded-xl bg-stone-200" />
          ))}
        </div>
        <Link
          href="#"
          className="flex w-[100px] items-center justify-center rounded-md border border-green-500 py-2 text-green-500"
        >
          Invite
        </Link>
      </div>
    </section>
  );
}
