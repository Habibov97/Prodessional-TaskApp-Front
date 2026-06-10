import React from 'react';
import LoginBgPic from '@/assets/img/LoginBgPic.png';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authConstants } from '@/constants/auth.constants';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  return (
    <div className="h-screen border  flex items-center justify-center">
      <div className="w-[900px] h-[650px] border  bg-[#f5f5f5] flex flex-row-reverse justify-between">
        <div
          className="bg-contain bg-no-repeat bg-center h-[500px] w-[50%] self-end"
          style={{ backgroundImage: `url(${LoginBgPic.src})` }}
        ></div>
        <div className="w-[50%] py-[30px] pr-[25px] flex flex-col justify-center gap-[22px] pl-[30px]">
          <h1 className="text-3xl font-bold text-[#333]">{authConstants.SIGNUP}</h1>
          <Field>
            <div className="relative">
              <Input
                id="input-field-username"
                type="text"
                placeholder={authConstants.ENTERUSERNAME}
                className="h-[50px] rounded-lg border-black bg-[#f5f5f5]"
              />
              <FaUser className="absolute h-[25px] w-[25px] top-[12.5px] right-5" />
              {/* <FieldDescription>Choose a unique username for your account.</FieldDescription> */}
            </div>
          </Field>
          <Field>
            <div className="relative">
              <Input
                id="input-field-password"
                type="text"
                placeholder={authConstants.ENTERPASSWORD}
                className="h-[50px] rounded-lg border-black bg-[#f5f5f5]"
              />
              <RiLockPasswordFill className="absolute h-[25px] w-[25px] top-[12.5px] right-5" />
              {/* <FieldDescription>Choose a unique username for your account.</FieldDescription> */}
            </div>
          </Field>
          <Button variant="link" className="w-[130px] h-[50px] rounded-md bg-red-500 text-[#f5f5f5] cursor-pointer">
            {authConstants.LOGIN}
          </Button>
          <p className="flex items-center gap-2">
            Or, Login with <FcGoogle className="inline-block w-[25px] h-[25px] cursor-pointer" />
          </p>
          <p>
            {authConstants.DONTHAVEANACCOUNT} &nbsp;
            <Link className="text-blue-500" href="/register">
              {authConstants.CREATEONE}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
