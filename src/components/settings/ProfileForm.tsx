'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { updateProfileAction, type FormActionState } from '@/actions/user.actions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldError } from '../FieldError';
import { textValues } from '@/lib/form-values';
import type { UserType } from '@/types/user.types';

export default function ProfileForm({ user }: { user: UserType | null }) {
  const [state, action, isPending] = useActionState(async (prev: FormActionState, formData: FormData) => {
    const result = await updateProfileAction(prev, formData);
    if (result.success) {
      toast.success(result.message);
      return result;
    }
    if (result.message) toast.error(result.message);
    return { ...result, values: textValues(formData) };
  }, {});

  return (
    <form action={action} className="rounded-xl border border-stone-200 p-4 sm:p-6">
      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="font-bold">
            First Name
          </Label>
          <Input id="firstName" name="firstName" className="rounded-sm" defaultValue={state.values?.firstName ?? user?.firstName} />
          <FieldError errors={state.errors?.firstName} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="font-bold">
            Last Name
          </Label>
          <Input id="lastName" name="lastName" className="rounded-sm" defaultValue={state.values?.lastName ?? user?.lastName} />
          <FieldError errors={state.errors?.lastName} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-bold">
            Email Address
          </Label>
          <Input id="email" name="email" type="email" className="rounded-sm" defaultValue={state.values?.email ?? user?.email} />
          <FieldError errors={state.errors?.email} />
        </div>
        <p className="text-xs text-stone-400">Username: {user?.userName} (cannot be changed)</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        <Button type="submit" disabled={isPending} className="h-10 rounded-md bg-red-500 px-4 text-white hover:bg-red-600">
          {isPending ? 'Saving...' : 'Update Info'}
        </Button>
        <Link
          className="flex h-10 items-center justify-center rounded-md border border-red-500 px-4 text-sm font-medium text-red-500 hover:bg-red-50"
          href="/dashboard/settings/changepassword"
        >
          Change Password
        </Link>
      </div>
    </form>
  );
}
