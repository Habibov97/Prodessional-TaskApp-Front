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

type Props = {
  edit?: boolean;
  taskPriority?: boolean;
  taskStatus?: boolean;
};

export default function TaskCategoriesActions({ taskPriority, taskStatus, edit = false }: Props) {
  const titleText = `${!edit ? 'Add' : 'Edit'} Task ${taskStatus ? 'Status' : taskPriority ? 'Priority' : ''}`;

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className={`${!edit && 'flex text-stone-400 text-[14px] items-center'} `}>
          {!edit && (
            <span className="text-[23px]">
              <HiOutlinePlusSmall className="text-green-400" />
            </span>
          )}
          <span
            className={`${edit && 'text-white bg-red-500 hover:bg-red-600 rounded-md w-[80px] h-8.5 shrink-0 flex items-center justify-center'}`}
          >
            {!edit && taskStatus && 'Add Task Status'}
            {!edit && taskPriority && 'Add Task Priority'}
            {edit && 'Edit'}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-400 self-start mb-2">
            {titleText}
          </DialogTitle>
          {/* Brauzer xətası olmasın deyə gizli təsvir */}
          <DialogDescription className="sr-only">Form to manage task categories.</DialogDescription>
        </DialogHeader>

        <form>
          <div className="border border-stone-200 p-6 flex justify-center gap-5">
            <FieldGroup className="w-2/3">
              <Field>
                <Label htmlFor="title" className="font-bold text-[#333]">
                  {taskStatus && 'Task Status Name'}
                  {taskPriority && 'Task Priority Name'}
                </Label>
                <Input id="title" name="title" />
              </Field>
            </FieldGroup>
          </div>
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
