import { differenceInCalendarDays, parseISO } from 'date-fns';
import { PRIORITY_ORDER, titleKey } from '@/constants/task.constants';
import type { TaskType } from '@/types/task.types';

export type DueFilter = 'all' | 'overdue' | 'week' | 'none';
export type SortOrder = 'newest' | 'oldest' | 'due' | 'priority';

export type TaskFilters = {
  status: string;
  priority: string;
  due: DueFilter;
  sort: SortOrder;
};

export const DEFAULT_FILTERS: TaskFilters = { status: 'all', priority: 'all', due: 'all', sort: 'newest' };

export const isDefaultFilters = (filters: TaskFilters) =>
  filters.status === 'all' && filters.priority === 'all' && filters.due === 'all';

function matchesDue(task: TaskType, due: DueFilter, today: string) {
  if (due === 'all') return true;
  if (due === 'none') return !task.dueDate;
  // Before the client clock is known nothing can be overdue or due this week.
  if (!task.dueDate || !today) return false;

  const days = differenceInCalendarDays(parseISO(task.dueDate), parseISO(today));
  return due === 'overdue' ? days < 0 : days >= 0 && days <= 7;
}

const priorityRank = (task: TaskType) => {
  const index = PRIORITY_ORDER.indexOf(titleKey(task.priority?.title));
  return index === -1 ? PRIORITY_ORDER.length : index;
};

const SORTERS: Record<SortOrder, (a: TaskType, b: TaskType) => number> = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
  // Tasks without a due date go last.
  due: (a, b) => (a.dueDate ?? '9999').localeCompare(b.dueDate ?? '9999'),
  priority: (a, b) => priorityRank(a) - priorityRank(b),
};

/** `today` is YYYY-MM-DD from the client clock (see useToday). */
export function applyTaskFilters(tasks: TaskType[], filters: TaskFilters, today: string) {
  return tasks
    .filter((task) => filters.status === 'all' || task.statusId === filters.status)
    .filter((task) => filters.priority === 'all' || task.priorityId === filters.priority)
    .filter((task) => matchesDue(task, filters.due, today))
    .sort(SORTERS[filters.sort]);
}
