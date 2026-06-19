'use client';
import LoginBgPic from '@/assets/img/LoginBgPic.png';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authConstants } from '@/constants/auth.constants';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { useActionState, useEffect, useState } from 'react';
import { LoginFormState } from '@/types/login-formstate';
import { submitLoginForm } from '@/actions/auth.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [toggleViewPassword, setToggleViewPassword] = useState(false);
  const router = useRouter();
  const [state, action, isLoading] = useActionState<LoginFormState, FormData>(submitLoginForm, {});

  useEffect(() => {
    if (state.accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(state.accessToken));
    }
  }, [state.accessToken]);

  useEffect(() => {
    if (state.errors?.message) {
      toast.error('Login failed!', { position: 'top-right' });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.success('Welcome to TaskAPP! You are successfully logged in', { position: 'top-right' });
      new Promise((resolve) =>
        setTimeout(() => {
          resolve(router.replace('/dashboard'));
        }, 2000),
      );
    }
  }, [state.success, state.accessToken]);

  return (
    <div className="h-screen border  flex items-center justify-center">
      <div className="w-[900px] h-[650px] border  bg-[#f5f5f5] flex flex-row-reverse justify-between">
        <div
          className="bg-contain bg-no-repeat bg-center h-[500px] w-[50%] self-end"
          style={{ backgroundImage: `url(${LoginBgPic.src})` }}
        ></div>
        <div className="w-[50%] py-[30px] pr-[25px] flex flex-col justify-center gap-[22px] pl-[30px]">
          <h1 className="text-3xl font-bold text-[#333]">{authConstants.SIGNUP}</h1>
          <form action={action} className="flex flex-col gap-[15px] ">
            <Field>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={authConstants.ENTERUSERNAME}
                  autoComplete="off"
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <FaUser className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
                {state.errors?.userName && <p className="text-red-500 text-xs mt-1">{state.errors.userName[0]}</p>}
              </div>
            </Field>
            <Field>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={toggleViewPassword ? 'text' : 'password'}
                  placeholder={authConstants.ENTERPASSWORD}
                  autoComplete="off"
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <RiLockPasswordFill className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
                {toggleViewPassword ? (
                  <FaRegEye
                    onClick={() => setToggleViewPassword(!toggleViewPassword)}
                    className="absolute h-[23px] w-[23px] top-[12.5px] right-5"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setToggleViewPassword(!toggleViewPassword)}
                    className="absolute h-[23px] w-[23px] top-[12.5px] right-5"
                  />
                )}
                {state.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>}
              </div>
            </Field>
            <Button
              type="submit"
              variant="link"
              className="w-[130px] h-[50px] rounded-md bg-red-500 text-[#f5f5f5] cursor-pointer"
            >
              {isLoading ? 'Loading...' : `${authConstants.LOGIN}`}
            </Button>
          </form>
          <p className="flex items-center gap-2">
            Or, Login with <FcGoogle className="inline-block w-[25px] h-[25px] cursor-pointer" />
          </p>
          <p>
            {authConstants.DONTHAVEANACCOUNT} &nbsp;
            <Link className="text-blue-500" href="/register">
              {authConstants.CREATEONE}
            </Link>
          </p>
          {state.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message}</p>}
        </div>
      </div>
    </div>
  );
}
