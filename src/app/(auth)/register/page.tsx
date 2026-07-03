'use client';
import RegisterBgPic from '@/assets/img/R-2.png';
import { authConstants } from '@/constants/auth.constants';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';
import { submitRegisterForm } from '@/actions/auth.actions';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RegisterFormState } from '@/types/register-formstate';

export default function Register() {
  const [toggleViewPassword, setToggleViewPassword] = useState(false);
  const router = useRouter();
  const [state, action, isLoading] = useActionState<RegisterFormState, FormData>(submitRegisterForm, {});

  useEffect(() => {
    if (state.success) {
      toast.success('Registration completed!', { position: 'top-right' });
      router.replace('/login');
    }
  }, [state.success]);

  useEffect(() => {
    if (state.errors?.message) {
      toast.error('Registration failed!', { position: 'top-right' });
    }
  }, [state.errors]);

  return (
    <div className="h-screen border  flex items-center justify-center">
      <div className="w-[900px] min-h-[650px] border  bg-[#f5f5f5] flex justify-between">
        <div
          className="bg-contain bg-no-repeat bg-center h-[500px] w-[40%] self-end"
          style={{ backgroundImage: `url(${RegisterBgPic.src})` }}
        ></div>
        <div className="w-[50%] py-[30px] pr-[25px] flex flex-col gap-[22px]">
          <h1 className="text-3xl font-bold text-[#333]">{authConstants.SIGNUP}</h1>
          <form action={action} className="flex flex-col gap-[15px] ">
            <Field>
              <div className="relative">
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="off"
                  placeholder={authConstants.ENTERFIRSTNAME}
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <FaRegUser className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
                {state.errors?.firstName && <p className="text-red-500 text-xs mt-1">{state.errors.firstName[0]}</p>}
              </div>
            </Field>
            <Field>
              <div className="relative">
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="off"
                  placeholder={authConstants.ENTERLASTNAME}
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <FaRegUser className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
                {state.errors?.lastName && <p className="text-red-500 text-xs mt-1">{state.errors.lastName[0]}</p>}
              </div>
            </Field>
            <Field>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  placeholder={authConstants.ENTERUSERNAME}
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <FaUser className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
                {state.errors?.userName && <p className="text-red-500 text-xs mt-1">{state.errors.userName[0]}</p>}
              </div>
            </Field>
            <Field>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="off"
                  placeholder={authConstants.ENTEREMAIL}
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <MdEmail className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
                {state.errors?.email && <p className="text-red-500 text-xs mt-1 ">{state.errors.email[0]}</p>}
              </div>
            </Field>
            <Field>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={toggleViewPassword ? 'text' : 'password'}
                  placeholder={authConstants.ENTERPASSWORD}
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <RiLockPasswordLine className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />
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

                {state.errors?.password && <p className="text-red-500 text-xs mt-1 ">{state.errors.password[0]}</p>}
              </div>
            </Field>
            <Field>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={toggleViewPassword ? 'text' : 'password'}
                  placeholder={authConstants.CONFIRMPASSWORD}
                  className="h-[50px] rounded-lg border-black bg-[#f5f5f5] pl-[47px]"
                />
                <RiLockPasswordFill className="absolute h-[23px] w-[23px] top-[12.5px] left-3" />

                {state.errors?.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword[0]}</p>
                )}
              </div>
            </Field>

            <Button type="submit" className="w-[130px] h-[50px] rounded-md bg-red-500 text-[#f5f5f5] cursor-pointer">
              {isLoading ? 'Registering...' : `${authConstants.REGISTER}`}
            </Button>
          </form>

          <p>
            {authConstants.ALREADYHAVEACCOUNT} &nbsp;
            <Link className="text-blue-500" href="/login">
              {authConstants.SIGNIN}
            </Link>
          </p>
          <div>
            {state.errors?.message &&
              (Array.isArray(state.errors.message) ? (
                state.errors?.message.map((m, index) => (
                  <p key={index} className="text-red-500 text-xs mt-1">
                    {m}
                  </p>
                ))
              ) : (
                <p className="text-red-500 text-xs mt-1">
                  {typeof state.errors.message === 'object'
                    ? state.errors.message || JSON.stringify(state.errors.message)
                    : state.errors.message}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
