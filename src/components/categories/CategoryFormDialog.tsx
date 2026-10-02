'use client';
import { useActionState, useState } from 'react';
import { toast } from 'sonner';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { saveCategoryAction } from '@/actions/category.actions';
import type { FormActionState } from '@/actions/user.actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldError } from '../FieldError';
import { textValues } from '@/lib/form-values';

type Props = {
  /** "Status" or "Priority" */
  kind: string;
  parentId: string;
  category?: { id: string; title: string };
};

export default function CategoryFormDialog({ kind, parentId, category }: Props) {
  const [open, setOpen] = useState(false);
  const titleText = `${category ? 'Edit' : 'Add'} Task ${kind}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {category ? (
          <button
            type="button"
            className="flex h-9 w-[80px] shrink-0 cursor-pointer items-center justify-center rounded-md bg-red-500 text-sm text-white hover:bg-red-600"
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        {/* Mounted only while open, so each opening starts clean */}
        <CategoryForm kind={kind} parentId={parentId} category={category} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function CategoryForm({ kind, parentId, category, onSuccess }: Props & { onSuccess: () => void }) {
  const [state, action, isPending] = useActionState(async (prev: FormActionState, formData: FormData) => {
    const result = await saveCategoryAction(prev, formData);
    if (result.success) {
      toast.success(result.message);
      onSuccess();
      return result;
    }
    return { ...result, values: textValues(formData) };
  }, {});

  return (
    <form action={action} className="flex flex-col gap-6">
      {category && <input type="hidden" name="id" value={category.id} />}
      <input type="hidden" name="parentId" value={parentId} />
      <div className="rounded-xl border border-border p-4 sm:p-6">
        <Field>
          <Label htmlFor="category-title" className="font-bold text-foreground">
            Task {kind} Title
          </Label>
          <Input
            id="category-title"
            name="title"
            defaultValue={state.values?.title ?? category?.title ?? ''}
            autoFocus
            aria-invalid={!!state.errors?.title}
          />
          <FieldError errors={state.errors?.title} />
          {state.message && !state.success && <p className="text-sm text-red-500">{state.message}</p>}
        </Field>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending} className="rounded-md bg-red-500 text-white hover:bg-red-600">
          {isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  );
}
