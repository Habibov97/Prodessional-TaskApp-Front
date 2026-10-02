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
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { FieldError } from './FieldError';
import { textValues } from '@/lib/form-values';
import TaskImage from './TaskImage';
import RichTextEditor from './RichTextEditor';
import { IMAGE_TYPES } from '@/validations/addTask.validation';
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
            className="flex cursor-pointer items-center gap-1 rounded-md px-1 text-sm text-muted-foreground transition-colors hover:text-red-500"
          >
            <HiOutlinePlusSmall className="size-5 text-red-500" />
            <span>Add Task</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl sm:max-w-3xl">
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

  const [state, action, isPending] = useActionState(
    async (prevState: Parameters<typeof taskFormAction>[0], formData: FormData) => {
      const result = await taskFormAction(prevState, formData);
      if (result.success) {
        if (result.warning) toast.warning(result.message);
        else toast.success(result.message);
        onSuccess();
        return result;
      }
      return { ...result, values: textValues(formData), attempt: (prevState.attempt ?? 0) + 1 };
    },
    {},
  );

  const categoriesMissing = priorities.length === 0 || statuses.length === 0;
  const canSubmit = !isPending && !!priorityId && !!statusId;

  return (
    <form action={action} className="flex flex-col gap-6">
      {isUpdate && <input type="hidden" name="taskId" value={updateTask.id} />}

      {categoriesMissing && <p className="text-sm text-red-500">Could not load priority/status options.</p>}
      {state.message && !state.success && <p className="text-sm text-red-500">{state.message}</p>}

      <div className="flex flex-col gap-6 rounded-xl border border-border p-4 sm:flex-row sm:p-6">
        <FieldGroup className="gap-5 sm:w-2/3">
          <Field>
            <Label htmlFor="title" className="font-bold text-foreground">
              Name
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={state.values?.title ?? updateTask?.title ?? ''}
              aria-invalid={!!state.errors?.title}
            />
            <FieldError errors={state.errors?.title} />
          </Field>

          <Field>
            <Label className="font-bold text-foreground">Priority</Label>
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
            <Label className="font-bold text-foreground">Status</Label>
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
            <FieldLabel id="description-label" className="font-bold text-foreground">
              Task Description
            </FieldLabel>
            <RichTextEditor
              name="description"
              labelId="description-label"
              placeholder="Start writing here..."
              defaultValue={state.values?.description ?? updateTask?.description ?? ''}
              invalid={!!state.errors?.description}
            />
            <FieldError errors={state.errors?.description} />
          </Field>
        </FieldGroup>

        <FieldGroup className="gap-5 sm:w-1/3">
          <Field>
            <Label htmlFor="dueDate" className="font-bold text-foreground">
              Due Date <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue={state.values?.dueDate ?? updateTask?.dueDate ?? ''}
              aria-invalid={!!state.errors?.dueDate}
            />
            <FieldError errors={state.errors?.dueDate} />
          </Field>

          <ImageField key={state.attempt ?? 0} currentImage={updateTask?.avatar ?? null} errors={state.errors?.image} />
        </FieldGroup>
      </div>

      <DialogFooter>
        <Button type="submit" className="rounded-md bg-red-500 text-white hover:bg-red-600" disabled={!canSubmit}>
          {isPending ? 'Saving...' : isUpdate ? 'Update Task' : 'Save Task'}
        </Button>
      </DialogFooter>
    </form>
  );
}

function ImageField({ currentImage, errors }: { currentImage: string | null; errors?: string[] }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [removeCurrent, setRemoveCurrent] = useState(false);
  const shown = preview ?? (removeCurrent ? null : currentImage);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <Field>
      <FieldLabel htmlFor="image" className="font-bold text-foreground">
        Image <span className="font-normal text-muted-foreground">(optional)</span>
      </FieldLabel>
      <TaskImage src={shown} alt="Task image preview" className="aspect-square w-full max-w-[200px]" />
      <Input id="image" name="image" type="file" accept={IMAGE_TYPES.join(',')} onChange={handleChange} />
      <FieldDescription>JPG, PNG, WEBP or GIF, up to 5MB.</FieldDescription>
      {currentImage && !preview && (
        <label className="flex cursor-pointer items-center gap-2 text-xs text-foreground/80">
          <input
            type="checkbox"
            name="removeImage"
            checked={removeCurrent}
            onChange={(event) => setRemoveCurrent(event.target.checked)}
            className="accent-red-500"
          />
          Remove current image
        </label>
      )}
      <FieldError errors={errors} />
    </Field>
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
    <RadioGroup
      name={name}
      value={value}
      onValueChange={onChange}
      aria-label={label}
      className="flex flex-wrap gap-x-5 gap-y-2"
    >
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
