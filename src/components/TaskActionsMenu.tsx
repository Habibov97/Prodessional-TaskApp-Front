'use client';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { MoreHorizontalIcon } from 'lucide-react';
import { completeTaskAction, toggleVitalTaskAction, type TaskActionResult } from '@/actions/task.actions';
import { isCompletedStatus } from '@/constants/task.constants';
import { cn } from '@/lib/utils';
import type { TaskType } from '@/types/task.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

export default function TaskActionsMenu({ task, className }: { task: TaskType; className?: string }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function run(action: () => Promise<TaskActionResult>) {
    startTransition(async () => {
      const result = await action();
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <>
      {/* modal={false} lets the delete dialog open cleanly right after the menu closes */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Task actions"
            disabled={isPending}
            className={cn(
              'flex size-7 cursor-pointer items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 disabled:opacity-50',
              className,
            )}
          >
            <MoreHorizontalIcon className="size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => run(() => toggleVitalTaskAction(task.id, !task.vitalTask))}>
            {task.vitalTask ? 'Unmark as Vital' : 'Mark as Vital'}
          </DropdownMenuItem>
          {!isCompletedStatus(task.status?.title) && (
            <DropdownMenuItem onSelect={() => run(() => completeTaskAction(task.id))}>Mark as Completed</DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/mytask/${task.id}`}>View details</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        taskId={task.id}
        taskTitle={task.title}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
      />
    </>
  );
}
