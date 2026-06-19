import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function AccountInfo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-stone-200 p-[26px]">
        <div className="w-1/2 flex flex-col gap-4">
          <Label className="font-bold">First Name</Label>
          <Input className="rounded-sm" />
          <Label className="font-bold">Last Name</Label>
          <Input className="rounded-sm" />
          <Label className="font-bold">Email Address</Label>
          <Input className="rounded-sm" />
        </div>
        <div className="flex gap-2 mt-10">
          <Link
            className="bg-red-500 rounded-md hover:bg-red-600 flex items-center justify-center text-white p-2"
            href="/dashboard/account/changepassword"
          >
            Update Info
          </Link>

          <Link
            className="bg-red-500 rounded-md hover:bg-red-600 flex items-center justify-center text-white p-2"
            href="/dashboard/account/changepassword"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}
