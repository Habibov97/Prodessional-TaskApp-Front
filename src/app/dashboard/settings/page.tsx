import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getMe } from '@/lib/api';

export default async function AccountInfo() {
  const user = await getMe();

  return (
    <div className="rounded-xl border border-stone-200 p-4 sm:p-6">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Label htmlFor="firstName" className="font-bold">
          First Name
        </Label>
        <Input id="firstName" className="rounded-sm" defaultValue={user?.firstName} />
        <Label htmlFor="lastName" className="font-bold">
          Last Name
        </Label>
        <Input id="lastName" className="rounded-sm" defaultValue={user?.lastName} />
        <Label htmlFor="email" className="font-bold">
          Email Address
        </Label>
        <Input id="email" type="email" className="rounded-sm" defaultValue={user?.email} />
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          className="flex items-center justify-center rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          href="#"
        >
          Update Info
        </Link>

        <Link
          className="flex items-center justify-center rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          href="/dashboard/settings/changepassword"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}
