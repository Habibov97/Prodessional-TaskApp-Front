'use client';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { PiNotePencilDuotone } from 'react-icons/pi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { FieldError } from './FieldError';
import { taskFormAction } from '@/actions/task.actions';
import { NOT_STARTED, priorityTone, statusTone, titleKey, type Tone } from '@/constants/task.constants';
import { cn } from '@/lib/utils';
import type { TaskCategories } from '@/lib/api';
import type { CategoryEntity } from '@/types/category.types';
import type { TaskType } from '@/types/task.types';

type Props = {
  categories: TaskCategories;
  updateTask?: TaskType;
};

export default function AddTaskModal({ categories, updateTask }: Props) {
  const isUpdate = !!updateTask;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isUpdate ? (
          <button
            type="button"
            aria-label="Edit task"
            className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-red-500 text-white transition-colors hover:bg-red-600"
          >
            <PiNotePencilDuotone className="size-5" />
          </button>
        ) : (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 rounded-md px-1 text-sm text-stone-500 transition-colors hover:text-red-500"
          >
            <HiOutlinePlusSmall className="size-5 text-red-500" />
            <span>Add Task</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="relative mb-2 self-start pb-1 font-semibold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-400">
            {isUpdate ? 'Update Task' : 'Add New Task'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {isUpdate ? 'Update the task details below.' : 'Fill out the form below to add a new task.'}
          </DialogDescription>
        </DialogHeader>

        {/* Mounted only while the dialog is open, so every opening starts with a fresh form */}
        <TaskForm categories={categories} updateTask={updateTask} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function defaultPriorityId(priorities: CategoryEntity[]) {
  return (priorities.find((p) => titleKey(p.title) === 'moderate') ?? priorities[0])?.id ?? '';
}

function TaskForm({ categories, updateTask, onSuccess }: Props & { onSuccess: () => void }) {
  const isUpdate = !!updateTask;
  const { priorities, statuses } = categories;
  const notStarted = statuses.find((s) => titleKey(s.title) === NOT_STARTED);

  const [priorityId, setPriorityId] = useState(updateTask?.priorityId ?? defaultPriorityId(priorities));
  const [statusId, setStatusId] = useState(updateTask?.statusId ?? notStarted?.id ?? '');

  const [state, action, isPending] = useActionState(async (prevState: Parameters<typeof taskFormAction>[0], formData: FormData) => {
    const result = await taskFormAction(prevState, formData);
    if (result.success) {
      toast.success(result.message);
      onSuccess();
    }
    return result;
  }, {});

  const categoriesMissing = priorities.length === 0 || statuses.length === 0;
  const canSubmit = !isPending && !!priorityId && !!statusId;

  return (
    <form action={action} className="flex flex-col gap-6">
      {isUpdate && <input type="hidden" name="taskId" value={updateTask.id} />}

      {categoriesMissing && <p className="text-sm text-red-500">Could not load priority/status options.</p>}
      {state.message && !state.success && <p className="text-sm text-red-500">{state.message}</p>}

      <FieldGroup className="gap-5 rounded-xl border border-stone-200 p-4 sm:p-6">
        <Field>
          <Label htmlFor="title" className="font-bold text-[#333]">
            Name
          </Label>
          <Input id="title" name="title" defaultValue={updateTask?.title ?? ''} aria-invalid={!!state.errors?.title} />
          <FieldError errors={state.errors?.title} />
        </Field>

        <Field>
          <Label className="font-bold text-[#333]">Priority</Label>
          <CategoryRadioGroup
            name="priorityId"
            label="Priority"
            items={priorities}
            value={priorityId}
            onChange={setPriorityId}
            toneOf={priorityTone}
          />
          <FieldError errors={state.errors?.priorityId} />
        </Field>

        <Field>
          <Label className="font-bold text-[#333]">Status</Label>
          {isUpdate ? (
            <CategoryRadioGroup
              name="statusId"
              label="Status"
              items={statuses}
              value={statusId}
              onChange={setStatusId}
              toneOf={statusTone}
            />
          ) : (
            // New tasks always start as "Not Started"
            <div className="flex items-center gap-1.5 text-xs">
              <span className={cn('size-2 rounded-full', statusTone(NOT_STARTED).dot)} />
              <span>{notStarted?.title ?? 'Not Started'}</span>
              <input type="hidden" name="statusId" value={statusId} />
            </div>
          )}
          <FieldError errors={state.errors?.statusId} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description" className="font-bold text-[#333]">
            Task Description
          </FieldLabel>
          <Textarea
            id="description"
            name="description"
            className="custom-scrollbar h-[160px] resize-none pr-3"
            placeholder="Start writing here..."
            defaultValue={updateTask?.description ?? ''}
            aria-invalid={!!state.errors?.description}
          />
          <FieldError errors={state.errors?.description} />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <Button type="submit" className="rounded-md bg-red-500 text-white hover:bg-red-600" disabled={!canSubmit}>
          {isPending ? 'Saving...' : isUpdate ? 'Update Task' : 'Save Task'}
        </Button>
      </DialogFooter>
    </form>
  );
}

function CategoryRadioGroup({
  name,
  label,
  items,
  value,
  onChange,
  toneOf,
}: {
  name: string;
  label: string;
  items: CategoryEntity[];
  value: string;
  onChange: (id: string) => void;
  toneOf: (title?: string | null) => Tone;
}) {
  return (
    <RadioGroup name={name} value={value} onValueChange={onChange} aria-label={label} className="flex flex-wrap gap-x-5 gap-y-2">
      {items.map((item) => {
        const tone = toneOf(item.title);
        const id = `${name}-${item.id}`;
        return (
          <div key={item.id} className="flex items-center gap-1.5">
            <span className={cn('size-2 rounded-full', tone.dot)} />
            <label htmlFor={id} className="cursor-pointer text-xs">
              {item.title}
            </label>
            <RadioGroupItem id={id} value={item.id} className={tone.radio} />
          </div>
        );
      })}
    </RadioGroup>
  );
}
