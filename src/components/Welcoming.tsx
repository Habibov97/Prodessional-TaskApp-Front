import type { UserType } from '@/types/user.types';

export default function Welcoming({ user }: { user: UserType | null }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Welcome {user?.firstName} {user?.lastName} 👋
        </h1>
        {user?.isDemo && (
          <p className="text-sm text-muted-foreground">
            You are in a demo account: feel free to change anything, it is deleted after 24 hours.
          </p>
        )}
      </div>
      {/* Team invites are planned; the button stays visible as a teaser */}
      <button
        type="button"
        disabled
        title="Team invites are coming soon"
        className="flex cursor-not-allowed items-center gap-2 rounded-md border border-green-500/60 px-4 py-2 text-green-600/80"
      >
        Invite
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-green-700 uppercase dark:bg-green-500/15 dark:text-green-400">
          Soon
        </span>
      </button>
    </section>
  );
}
