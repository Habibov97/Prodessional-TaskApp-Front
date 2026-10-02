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
import { Field, FieldGroup } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
  edit?: boolean;
  taskPriority?: boolean;
  taskStatus?: boolean;
};

export default function TaskCategoriesActions({ taskPriority, taskStatus, edit = false }: Props) {
  const kind = taskStatus ? 'Status' : taskPriority ? 'Priority' : '';
  const titleText = `${edit ? 'Edit' : 'Add'} Task ${kind}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {edit ? (
          <button
            type="button"
            className="flex h-9 w-[80px] shrink-0 cursor-pointer items-center justify-center rounded-md bg-red-500 text-sm text-white hover:bg-red-600"
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-700"
          >
            <HiOutlinePlusSmall className="size-5 text-green-500" />
            {titleText}
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="relative mb-2 self-start pb-1 font-semibold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-400">
            {titleText}
          </DialogTitle>
          <DialogDescription className="sr-only">Form to manage task categories.</DialogDescription>
        </DialogHeader>

        <form>
          <div className="rounded-xl border border-stone-200 p-4 sm:p-6">
            <FieldGroup>
              <Field>
                <Label htmlFor="category-title" className="font-bold text-[#333]">
                  Task {kind} Title
                </Label>
                <Input id="category-title" name="title" />
              </Field>
            </FieldGroup>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="rounded-md bg-red-500 text-white hover:bg-red-600">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
