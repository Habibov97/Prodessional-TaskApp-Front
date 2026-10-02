'use client';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { isCompletedStatus, priorityTone, statusTone } from '@/constants/task.constants';
import type { TaskType } from '@/types/task.types';
import TaskActionsMenu from './TaskActionsMenu';

type Props = {
  task: TaskType;
  /** When set, clicking selects the task instead of opening its page. */
  onSelect?: (task: TaskType) => void;
  active?: boolean;
};

export default function Task({ task, onSelect, active = false }: Props) {
  const completed = isCompletedStatus(task.status?.title);
  const status = statusTone(task.status?.title);
  const priority = priorityTone(task.priority?.title);

  const body = (
    <>
      <div className="flex items-start gap-3">
        <span className={cn('mt-1 size-3.5 shrink-0 rounded-full border-2 bg-white', status.border)} />

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-sm font-semibold text-[#333]">{task.title}</p>
          <p className="line-clamp-2 text-xs break-words text-stone-400">{task.description}</p>
        </div>

        <div className="hidden size-16 shrink-0 rounded-lg bg-stone-200 sm:block" />
      </div>

      {completed ? (
        <div className="flex flex-col gap-0.5 pl-6.5 text-[11px]">
          <div className="flex gap-1">
            <span className="text-stone-600">Status:</span>
            <span className={status.text}>{task.status?.title}</span>
          </div>
          {/* updatedAt is the closest thing to a completion date until the backend tracks one */}
          <p className="text-stone-400" suppressHydrationWarning>
            Completed {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-3 gap-y-1 pl-6.5 text-[11px]">
          <div className="flex gap-1">
            <span className="text-stone-600">Priority:</span>
            <span className={priority.text}>{task.priority?.title}</span>
          </div>
          <div className="flex gap-1">
            <span className="text-stone-600">Status:</span>
            <span className={status.text}>{task.status?.title}</span>
          </div>
          <div className="flex gap-1 text-stone-400">
            <span>Created on:</span>
            <span>{format(new Date(task.createdAt), 'dd/MM/yyyy')}</span>
          </div>
        </div>
      )}
    </>
  );

  const bodyClassName = 'flex w-full flex-col gap-2 rounded-xl p-3 pr-10 text-left outline-none focus-visible:ring-2 focus-visible:ring-red-300';

  return (
    <article
      className={cn(
        'relative shrink-0 rounded-xl border bg-white transition-colors hover:border-stone-300',
        active ? 'border-red-300 ring-1 ring-red-200' : 'border-stone-200',
      )}
    >
      {onSelect ? (
        <button type="button" onClick={() => onSelect(task)} aria-pressed={active} className={cn(bodyClassName, 'cursor-pointer')}>
          {body}
        </button>
      ) : (
        <Link href={`/dashboard/mytask/${task.id}`} className={bodyClassName}>
          {body}
        </Link>
      )}

      <TaskActionsMenu task={task} className="absolute top-2 right-2" />
    </article>
  );
}
