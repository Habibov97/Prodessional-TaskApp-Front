'use client';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { removeAvatarAction, uploadAvatarAction, type FormActionState } from '@/actions/user.actions';
import { IMAGE_TYPES } from '@/validations/addTask.validation';
import UserAvatar from '../UserAvatar';
import type { UserType } from '@/types/user.types';

export default function AvatarForm({ user }: { user: UserType | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<FormActionState>) {
    startTransition(async () => {
      const result = await action();
      if (result.success) toast.success(result.message);
      else toast.error(result.message ?? 'Something went wrong');
      if (inputRef.current) inputRef.current.value = '';
    });
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    run(() => uploadAvatarAction(formData));
  }

  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <UserAvatar
        user={user}
        className={`size-16 text-xl sm:size-[100px] sm:text-3xl ${isPending ? 'animate-pulse' : ''}`}
      />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="truncate text-lg font-semibold">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className="truncate text-muted-foreground">{user?.email}</p>
        <div className="mt-1 flex flex-wrap gap-3 text-sm">
          <input
            ref={inputRef}
            type="file"
            accept={IMAGE_TYPES.join(',')}
            className="hidden"
            onChange={handleFile}
            aria-label="Upload profile photo"
          />
          <button
            type="button"
            disabled={isPending}
            onClick={() => inputRef.current?.click()}
            className="cursor-pointer font-medium text-red-500 hover:underline disabled:opacity-50"
          >
            {isPending ? 'Saving...' : user?.avatar ? 'Change photo' : 'Upload photo'}
          </button>
          {user?.avatar && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => run(removeAvatarAction)}
              className="cursor-pointer text-muted-foreground hover:underline disabled:opacity-50"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
