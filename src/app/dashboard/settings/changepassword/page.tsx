import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ChangePassword() {
  return (
    <div className="rounded-xl border border-stone-200 p-4 sm:p-6">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Label htmlFor="currentPassword" className="font-bold">
          Current Password
        </Label>
        <Input id="currentPassword" type="password" autoComplete="current-password" className="rounded-sm" />
        <Label htmlFor="newPassword" className="font-bold">
          New Password
        </Label>
        <Input id="newPassword" type="password" autoComplete="new-password" className="rounded-sm" />
        <Label htmlFor="confirmPassword" className="font-bold">
          Confirm Password
        </Label>
        <Input id="confirmPassword" type="password" autoComplete="new-password" className="rounded-sm" />
      </div>
      <div className="mt-8 flex gap-2">
        <Button className="rounded-md bg-red-500 text-white hover:bg-red-600">Update Password</Button>
      </div>
    </div>
  );
}
