'use client';
import LoginBgPic from '@/assets/img/LoginBgPic.png';
import { Button } from '@/components/ui/button';
import AuthInput from '@/components/AuthInput';
import { authConstants } from '@/constants/auth.constants';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useActionState } from 'react';
import { LoginFormState } from '@/types/login-formstate';
import { submitLoginForm } from '@/actions/auth.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DemoLoginButton from '@/components/DemoLoginButton';

export default function Login() {
  const router = useRouter();
  const [state, action, isLoading] = useActionState<LoginFormState, FormData>(async (prevState, formData) => {
    const result = await submitLoginForm(prevState, formData);
    if (result.success) {
      toast.success('Welcome to TaskAPP! You are successfully logged in');
      router.replace('/dashboard');
    } else if (result.errors?.message) {
      toast.error('Login failed!');
    }
    return result;
  }, {});

  return (
    <div className="flex w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl md:min-h-[600px] md:flex-row-reverse">
      <div
        className="hidden bg-contain bg-center bg-no-repeat md:block md:h-[460px] md:w-1/2 md:self-end"
        style={{ backgroundImage: `url(${LoginBgPic.src})` }}
      />
      <div className="flex w-full flex-col justify-center gap-6 p-6 sm:p-10 md:w-1/2">
        <h1 className="text-3xl font-bold text-foreground">{authConstants.SIGNINTITLE}</h1>
        <form action={action} className="flex flex-col gap-4">
          <AuthInput
            id="username"
            name="username"
            type="text"
            icon={FaUser}
            placeholder={authConstants.ENTERUSERNAME}
            autoComplete="username"
            defaultValue={(state.userName as string) ?? ''}
            error={state.errors?.userName?.[0]}
          />
          <AuthInput
            id="password"
            name="password"
            type="password"
            icon={RiLockPasswordFill}
            placeholder={authConstants.ENTERPASSWORD}
            autoComplete="current-password"
            error={state.errors?.password?.[0]}
          />
          {state.errors?.message && <p className="text-sm text-red-500">{state.errors.message}</p>}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-[130px] rounded-md bg-red-500 text-[#f5f5f5] hover:bg-red-600"
          >
            {isLoading ? 'Loading...' : authConstants.LOGIN}
          </Button>
        </form>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>
        <DemoLoginButton />
        <p>
          {authConstants.DONTHAVEANACCOUNT}{' '}
          <Link className="text-blue-500 hover:underline" href="/register">
            {authConstants.CREATEONE}
          </Link>
        </p>
      </div>
    </div>
  );
}
