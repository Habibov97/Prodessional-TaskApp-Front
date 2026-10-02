'use client';
import { useActionState } from 'react';
import { SparklesIcon } from 'lucide-react';
import { demoLoginAction, type DemoLoginState } from '@/actions/auth.actions';

export default function DemoLoginButton() {
  const [state, action, isPending] = useActionState<DemoLoginState>(demoLoginAction, {});

  return (
    <form action={action} className="flex flex-col gap-2">
      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-red-500 font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-500/10"
      >
        <SparklesIcon className="size-4" aria-hidden />
        {isPending ? 'Preparing your demo…' : 'Try the demo'}
      </button>
      <p className="text-xs text-muted-foreground">No sign-up needed. You get your own sample tasks to play with.</p>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
    </form>
  );
}
