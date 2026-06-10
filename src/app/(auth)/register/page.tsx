import RegisterBgPic from '@/assets/img/R-2.png';
import { authConstants } from '@/constants/auth.constants';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function Register() {
  return (
    <div className="h-screen border  flex items-center justify-center">
      <div className="w-[900px] h-[650px] border  bg-[#f5f5f5] flex justify-between">
        <div
          className="bg-contain bg-no-repeat bg-center h-[500px] w-[40%] self-end"
          style={{ backgroundImage: `url(${RegisterBgPic.src})` }}
        ></div>
        <div className="w-[50%] py-[30px] pr-[25px] flex flex-col gap-[22px]">
          <h1 className="text-3xl font-bold text-[#333]">{authConstants.SIGNUP}</h1>
          <Field>
            <div className="relative">
              <Input
                id="input-field-firstname"
                type="text"
                placeholder={authConstants.ENTERFIRSTNAME}
                className="h-[50px] rounded-lg border-black bg-[#f5f5f5]"
              />
              <FaRegUser className="absolute h-[25px] w-[25px] top-[12.5px] right-5" />
              {/* <FieldDescription>Choose a unique username for your account.</FieldDescription> */}
            </div>
          </Field>
          <Field>
            <div className="relative">
              <Input
                id="input-field-lastname"
                type="text"
                placeholder={authConstants.ENTERLASTNAME}
                className="h-[50px] rounded-lg border-black bg-[#f5f5f5]"
              />
              <FaRegUser className="absolute h-[25px] w-[25px] top-[12.5px] right-5" />
              {/* <FieldDescription>Choose a unique username for your account.</FieldDescription> */}
            </div>
          </Field>
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
                id="input-field-email"
                type="text"
                placeholder={authConstants.ENTEREMAIL}
                className="h-[50px] rounded-lg border-black bg-[#f5f5f5]"
              />
              <MdEmail className="absolute h-[25px] w-[25px] top-[12.5px] right-5" />
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
          <Field>
            <div className="relative">
              <Input
                id="input-field-confirm-password"
                type="text"
                placeholder={authConstants.CONFIRMPASSWORD}
                className="h-[50px] rounded-lg border-black bg-[#f5f5f5]"
              />
              <RiLockPasswordLine className="absolute h-[25px] w-[25px] top-[12.5px] right-5" />
              {/* <FieldDescription>Choose a unique username for your account.</FieldDescription> */}
            </div>
          </Field>

          <Button variant="link" className="w-[130px] h-[50px] rounded-md bg-red-500 text-[#f5f5f5] cursor-pointer">
            {authConstants.REGISTER}
          </Button>

          <p>
            {authConstants.ALREADYHAVEACCOUNT} &nbsp;
            <Link className="text-blue-500" href="/login">
              {authConstants.SIGNIN}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
