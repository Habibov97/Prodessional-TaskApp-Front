'use client';
import { useTransition } from 'react';
import { unstable_rethrow } from 'next/navigation';
import { toast } from 'sonner';
import { deleteTaskAction } from '@/actions/task.actions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

function isRouterError(error: unknown) {
  try {
    unstable_rethrow(error);
    return false;
  } catch {
    return true;
  }
}

type Props = {
  taskId: string;
  taskTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectTo?: string;
};

export default function ConfirmDeleteDialog({ taskId, taskTitle, open, onOpenChange, redirectTo }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      let result;
      try {
        result = await deleteTaskAction(taskId, redirectTo);
      } catch (error) {
        // With redirectTo, a successful delete ends in a Next.js redirect that
        // surfaces here as a router error; it must be rethrown to navigate.
        if (isRouterError(error)) toast.success('Task has been deleted');
        unstable_rethrow(error);
        toast.error('Something went wrong');
        return;
      }

      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && onOpenChange(next)}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete task?</DialogTitle>
          <DialogDescription>
            &quot;<span className="font-medium break-words">{taskTitle}</span>&quot; will be permanently deleted.
          </DialogDescription>
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
