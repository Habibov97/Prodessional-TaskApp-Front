import { HiOutlinePlusSmall } from 'react-icons/hi2';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Field, FieldGroup, FieldLabel, FieldDescription } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  taskPriority?: string;
  taskStatus?: string;
};

export default function TaskCategoriesActions({ taskPriority, taskStatus }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DialogTitle className="flex gap-1 items-center text-[14px] cursor-pointer">
          <span className="text-[23px]">
            <HiOutlinePlusSmall className="text-green-400" />
          </span>
          <span className="text-[14px] text-stone-400">
            {taskStatus && 'Add Task Status'} {taskPriority && 'Add Task Priority'}
          </span>
        </DialogTitle>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="self-start mb-2">
            <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-400">
              {taskStatus && 'Add Task Status'}
              {taskPriority && 'Add Task Priority'}
            </h2>
          </div>
        </DialogHeader>
        <form>
          <DialogDescription>
            {/* className="flex flex-col gap-4" */}
            <div className="border border-stone-200 p-6 flex justify-center gap-5">
              <FieldGroup className="w-2/3">
                <Field>
                  <Label htmlFor="title" className="font-bold text-[#333]">
                    Name
                  </Label>
                  <Input id="title" name="title" />
                </Field>
              </FieldGroup>
            </div>
          </DialogDescription>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
