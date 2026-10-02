import { cache } from 'react';
import { API_URL } from '@/lib/config';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import type { CategoryEntity } from '@/types/category.types';
import type { TaskType } from '@/types/task.types';
import type { UserType } from '@/types/user.types';
import { PRIORITY_ORDER, STATUS_ORDER, sortByTitleOrder } from '@/constants/task.constants';

// Wrapped in React `cache` so several components rendering in the same
// request share one backend call instead of each fetching on their own.

export const getMe = cache(async (): Promise<UserType | null> => {
  const res = await fetchWithAuth(`${API_URL}/user/me`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
});

export const getTasks = cache(async (): Promise<TaskType[]> => {
  const res = await fetchWithAuth(`${API_URL}/task`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.data ?? [];
});

export const getTask = cache(async (id: string): Promise<TaskType | null> => {
  const res = await fetchWithAuth(`${API_URL}/task/${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data ?? null;
});

export type TaskCategories = {
  statuses: CategoryEntity[];
  priorities: CategoryEntity[];
};

export const getCategories = cache(async (): Promise<TaskCategories> => {
  const res = await fetch(`${API_URL}/category`);
  if (!res.ok) return { statuses: [], priorities: [] };
  const data: CategoryEntity[] = await res.json();

  return {
    statuses: sortByTitleOrder(data.find((c) => c.title === 'Task Status')?.children ?? [], STATUS_ORDER),
    priorities: sortByTitleOrder(data.find((c) => c.title === 'Task Priority')?.children ?? [], PRIORITY_ORDER),
  };
});
