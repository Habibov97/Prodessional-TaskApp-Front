'use client';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteCategoryAction } from '@/actions/category.actions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

export default function DeleteCategoryButton({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteCategoryAction(id);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && setOpen(next)}>
      <DialogTrigger asChild>
        <Button className="h-9 w-[80px] shrink-0 rounded-md bg-red-500 text-white hover:bg-red-600">Delete</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete &quot;{title}&quot;?</DialogTitle>
          <DialogDescription>Categories that are still used by tasks cannot be deleted.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-md" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button className="rounded-md bg-red-500 text-white hover:bg-red-600" onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
