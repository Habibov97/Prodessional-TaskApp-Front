import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns';

export type DueState = 'overdue' | 'today' | 'tomorrow' | 'upcoming';

/** Today's date as YYYY-MM-DD in the user's timezone. */
export const toDateKey = (date: Date) => format(date, 'yyyy-MM-dd');

export const formatDueDate = (dueDate: string) => format(parseISO(dueDate), 'dd/MM/yyyy');

/**
 * `today` must be a YYYY-MM-DD string from the client clock, so due dates are
 * compared in the user's timezone. Returns null when there is nothing to flag.
 */
export function getDueState(dueDate: string | null, today: string): DueState | null {
  if (!dueDate || !today) return null;
  const days = differenceInCalendarDays(parseISO(dueDate), parseISO(today));
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  return 'upcoming';
}

export const DUE_LABELS: Record<DueState, string> = {
  overdue: 'Overdue',
  today: 'Due today',
  tomorrow: 'Due tomorrow',
  upcoming: 'Due',
};

export const DUE_STYLES: Record<DueState, string> = {
  overdue: 'bg-red-50 text-red-600 ring-red-200 dark:bg-red-500/15 dark:text-red-400 dark:ring-red-500/30',
  today: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30',
  tomorrow: 'bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30',
  upcoming: 'bg-muted text-muted-foreground ring-border',
};

export const tomorrowKey = (today: string) => toDateKey(addDays(parseISO(today), 1));
