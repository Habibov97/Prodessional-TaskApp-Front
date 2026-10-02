'use client';
import Link from 'next/link';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { DUE_LABELS, DUE_STYLES, formatDueDate, getDueState, type DueState } from '@/constants/due-date';
import { isCompletedStatus } from '@/constants/task.constants';
import { useToday } from '@/hooks/useToday';
import { cn } from '@/lib/utils';
import type { TaskType } from '@/types/task.types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const NOTIFY: DueState[] = ['overdue', 'today', 'tomorrow'];

// Notifications are derived from due dates: open tasks that are overdue or due
// today/tomorrow. Nothing is stored, so there is nothing to mark as read.
export default function NotificationsMenu({ tasks }: { tasks: TaskType[] }) {
  const today = useToday();

  const items = tasks
    .filter((task) => !isCompletedStatus(task.status?.title))
    .map((task) => ({ task, state: getDueState(task.dueDate, today) }))
    .filter((item): item is { task: TaskType; state: DueState } => !!item.state && NOTIFY.includes(item.state))
    .sort((a, b) => (a.task.dueDate ?? '').localeCompare(b.task.dueDate ?? ''));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={items.length ? `Notifications, ${items.length} due` : 'Notifications'}
          className="relative flex size-9 cursor-pointer items-center justify-center rounded-md bg-red-500 text-[#f3f3f3] hover:bg-red-600 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25"
        >
          <IoMdNotificationsOutline className="text-xl" />
          {items.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background ring-2 ring-muted">
              {items.length > 9 ? '9+' : items.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)] p-0">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <p className="text-xs text-muted-foreground">Open tasks that are overdue or due soon</p>
        </div>
        <div className="custom-scrollbar max-h-80 overflow-y-auto p-1">
          {items.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">You&apos;re all caught up 🎉</p>
          ) : (
            items.map(({ task, state }) => (
              <DropdownMenuItem key={task.id} asChild className="items-start">
                <Link href={`/dashboard/mytask/${task.id}`} className="flex flex-col gap-1">
                  <span className="w-full truncate font-medium">{task.title}</span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
                      DUE_STYLES[state],
                    )}
                  >
                    {DUE_LABELS[state]} · {formatDueDate(task.dueDate as string)}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
