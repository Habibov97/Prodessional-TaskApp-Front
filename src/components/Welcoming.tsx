import type { UserType } from '@/types/user.types';

export default function Welcoming({ user }: { user: UserType | null }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-[#333] sm:text-3xl">
        Welcome {user?.firstName} {user?.lastName} 👋
      </h1>
      {/* Team invites are planned; the button stays visible as a teaser */}
      <button
        type="button"
        disabled
        title="Team invites are coming soon"
        className="flex cursor-not-allowed items-center gap-2 rounded-md border border-green-500/60 px-4 py-2 text-green-600/80"
      >
        Invite
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-green-700 uppercase">
          Soon
        </span>
      </button>
    </section>
  );
}
