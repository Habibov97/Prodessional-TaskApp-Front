'use client';
import RegisterBgPic from '@/assets/img/R-2.png';
import { authConstants } from '@/constants/auth.constants';
import { Button } from '@/components/ui/button';
import AuthInput from '@/components/AuthInput';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { FaUser, FaRegUser } from 'react-icons/fa';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { submitRegisterForm } from '@/actions/auth.actions';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RegisterFormState } from '@/types/register-formstate';

export default function Register() {
  const router = useRouter();
  const [state, action, isLoading] = useActionState<RegisterFormState, FormData>(async (prevState, formData) => {
    const result = await submitRegisterForm(prevState, formData);
    if (result.success) {
      toast.success('Registration completed! You can log in now');
      router.replace('/login');
    } else if (result.errors?.message) {
      toast.error('Registration failed!');
    }
    return result;
  }, {});

  return (
    <div className="flex w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-2xl md:min-h-[650px] md:flex-row">
      <div
        className="hidden bg-contain bg-center bg-no-repeat md:block md:h-[460px] md:w-[40%] md:self-end"
        style={{ backgroundImage: `url(${RegisterBgPic.src})` }}
      />
      <div className="flex w-full flex-col justify-center gap-6 p-6 sm:p-10 md:w-[60%] md:pl-4">
        <h1 className="text-3xl font-bold text-[#333]">{authConstants.SIGNUP}</h1>
        <form action={action} className="flex flex-col gap-4">
          <AuthInput
            id="firstname"
            name="firstname"
            type="text"
            icon={FaRegUser}
            autoComplete="given-name"
            placeholder={authConstants.ENTERFIRSTNAME}
            defaultValue={(state.firstName as string) ?? ''}
            error={state.errors?.firstName?.[0]}
          />
          <AuthInput
            id="lastname"
            name="lastname"
            type="text"
            icon={FaRegUser}
            autoComplete="family-name"
            placeholder={authConstants.ENTERLASTNAME}
            defaultValue={(state.lastName as string) ?? ''}
            error={state.errors?.lastName?.[0]}
          />
          <AuthInput
            id="username"
            name="username"
            type="text"
            icon={FaUser}
            autoComplete="username"
            placeholder={authConstants.ENTERUSERNAME}
            defaultValue={(state.userName as string) ?? ''}
            error={state.errors?.userName?.[0]}
          />
          <AuthInput
            id="email"
            name="email"
            type="email"
            icon={MdEmail}
            autoComplete="email"
            placeholder={authConstants.ENTEREMAIL}
            defaultValue={(state.email as string) ?? ''}
            error={state.errors?.email?.[0]}
          />
          <AuthInput
            id="password"
            name="password"
            type="password"
            icon={RiLockPasswordLine}
            autoComplete="new-password"
            placeholder={authConstants.ENTERPASSWORD}
            error={state.errors?.password?.[0]}
          />
          <AuthInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            icon={RiLockPasswordFill}
            autoComplete="new-password"
            placeholder={authConstants.CONFIRMPASSWORD}
            error={state.errors?.confirmPassword?.[0]}
          />
          {state.errors?.message && <p className="text-sm text-red-500">{state.errors.message}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-[130px] rounded-md bg-red-500 text-[#f5f5f5] hover:bg-red-600"
          >
            {isLoading ? 'Registering...' : authConstants.REGISTER}
          </Button>
        </form>

        <p>
          {authConstants.ALREADYHAVEACCOUNT}{' '}
          <Link className="text-blue-500 hover:underline" href="/login">
            {authConstants.SIGNIN}
          </Link>
        </p>
      </div>
    </div>
  );
}
