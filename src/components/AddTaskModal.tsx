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

export default function AddTaskModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center text-[14px] cursor-pointer">
          <span className="text-[23px]">
            <HiOutlinePlusSmall />
          </span>
          <span>Add Task</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-400 self-start mb-2">
            Add New Task
          </DialogTitle>
          <DialogDescription className="sr-only">Fill out the form below to add a new task.</DialogDescription>
        </DialogHeader>

        <form>
          <div className="border border-stone-200 p-6 flex justify-center gap-5">
            <FieldGroup className="w-2/3">
              <Field>
                <Label htmlFor="title" className="font-bold text-[#333]">
                  Name
                </Label>
                <Input id="title" name="title" />
              </Field>
              <Field>
                <Label htmlFor="priority" className="font-bold text-[#333]">
                  Priority
                </Label>
                <div className="flex gap-5">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-[8px] h-[8px] rounded-full bg-red-500"></div>
                    <div className="text-xs">Extreme</div>
                    <Checkbox id="terms-checkbox-extreme" name="priority" />
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-[8px] h-[8px] rounded-full bg-blue-500"></div>
                    <div className="text-xs">Moderate</div>
                    <Checkbox id="terms-checkbox-moderate" name="priority" />
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
                    <div className="text-xs">Low</div>
                    <Checkbox id="terms-checkbox-low" name="priority" />
                  </div>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="textarea-message" className="font-bold text-[#333]">
                  Task Description
                </FieldLabel>
                <Textarea
                  id="textarea-message"
                  className="h-[160px] resize-none pr-3 custom-scrollbar"
                  placeholder="Start writing here..."
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="w-1/3 ">
              <Field>
                <FieldLabel htmlFor="picture" className="font-bold text-[#333] ">
                  Upload Image
                </FieldLabel>
                <FieldDescription>Select a picture to upload.</FieldDescription>
                <Input id="picture" type="file" />
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
