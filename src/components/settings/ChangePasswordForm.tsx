'use client';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { changePasswordAction, type FormActionState } from '@/actions/user.actions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldError } from '../FieldError';

const FIELDS = [
  { name: 'currentPassword', label: 'Current Password', autoComplete: 'current-password' },
  { name: 'newPassword', label: 'New Password', autoComplete: 'new-password' },
  { name: 'confirmPassword', label: 'Confirm Password', autoComplete: 'new-password' },
] as const;

export default function ChangePasswordForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(async (prev: FormActionState, formData: FormData) => {
    const result = await changePasswordAction(prev, formData);
    if (result.success) {
      toast.success(result.message);
      router.push('/dashboard/settings');
    } else if (result.message) {
      toast.error(result.message);
    }
    return result;
  }, {});

  return (
    <form action={action} className="rounded-xl border border-stone-200 p-4 sm:p-6">
      <div className="flex w-full max-w-md flex-col gap-4">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <Label htmlFor={field.name} className="font-bold">
              {field.label}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type="password"
              autoComplete={field.autoComplete}
              className="rounded-sm"
              aria-invalid={!!state.errors?.[field.name]}
            />
            <FieldError errors={state.errors?.[field.name]} />
          </div>
        ))}
        {state.message && !state.success && <p className="text-sm text-red-500">{state.message}</p>}
      </div>
      <div className="mt-8 flex gap-2">
        <Button type="submit" disabled={isPending} className="h-10 rounded-md bg-red-500 px-4 text-white hover:bg-red-600">
          {isPending ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </form>
  );
}
