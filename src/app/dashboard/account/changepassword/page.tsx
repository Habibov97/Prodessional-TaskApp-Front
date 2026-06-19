import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ChangePassword() {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-stone-200 p-[26px]">
        <div className="w-1/2 flex flex-col gap-4">
          <Label className="font-bold">Current Password</Label>
          <Input className="rounded-sm" />
          <Label className="font-bold">New Password</Label>
          <Input className="rounded-sm" />
          <Label className="font-bold">Confirm Password</Label>
          <Input className="rounded-sm" />
        </div>
        <div className="flex gap-2 mt-10">
          <Button className="bg-red-500 rounded-md hover:bg-red-600">Update Password</Button>
          {/* <Button className="bg-red-500 rounded-md hover:bg-red-600">Cancel</Button> */}
        </div>
      </div>
    </div>
  );
}
