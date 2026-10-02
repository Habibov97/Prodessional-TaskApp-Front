import { cn } from '@/lib/utils';
import type { UserType } from '@/types/user.types';

export default function UserAvatar({ user, className }: { user: UserType | null; className?: string }) {
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase() || '?';

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-stone-200 font-semibold text-stone-600 select-none',
        className,
      )}
      aria-hidden
    >
      {user?.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.avatar} alt="" className="size-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
