import { cache } from 'react';
import { API_URL } from '@/lib/config';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import type { CategoryEntity } from '@/types/category.types';
import type { TaskType } from '@/types/task.types';
import type { UserType } from '@/types/user.types';
import { toSafeHtml } from '@/lib/rich-text.server';

// Descriptions reach the browser as sanitized HTML, ready to render.
const withSafeDescription = (task: TaskType): TaskType => ({ ...task, description: toSafeHtml(task.description) });
import { PRIORITY_ORDER, STATUS_ORDER, sortByTitleOrder } from '@/constants/task.constants';

// Wrapped in React `cache` so several components rendering in the same
// request share one backend call instead of each fetching on their own.

export const getMe = cache(async (): Promise<UserType | null> => {
  const res = await fetchWithAuth(`${API_URL}/user/me`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
});

export const getTasks = cache(async (search?: string): Promise<TaskType[]> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetchWithAuth(`${API_URL}/task${query}`);
  if (!res.ok) return [];
  const data = await res.json();
  return ((data.data ?? []) as TaskType[]).map(withSafeDescription);
});

export const getTask = cache(async (id: string): Promise<TaskType | null> => {
  const res = await fetchWithAuth(`${API_URL}/task/${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data ? withSafeDescription(data.data) : null;
});

export type TaskCategories = {
  statuses: CategoryEntity[];
  priorities: CategoryEntity[];
  statusRootId: string | null;
  priorityRootId: string | null;
};

export const getCategories = cache(async (): Promise<TaskCategories> => {
  const res = await fetch(`${API_URL}/category`);
  if (!res.ok) return { statuses: [], priorities: [], statusRootId: null, priorityRootId: null };
  const data: CategoryEntity[] = await res.json();
  const statusRoot = data.find((c) => c.title === 'Task Status');
  const priorityRoot = data.find((c) => c.title === 'Task Priority');

  return {
    statuses: sortByTitleOrder(statusRoot?.children ?? [], STATUS_ORDER),
    priorities: sortByTitleOrder(priorityRoot?.children ?? [], PRIORITY_ORDER),
    statusRootId: statusRoot?.id ?? null,
    priorityRootId: priorityRoot?.id ?? null,
  };
});
