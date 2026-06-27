'use client';
import { useEffect, useState } from 'react';
import type { CategoryEntity } from '@/types/category.types';

interface UseCategoriesResult {
  priorities: CategoryEntity[];
  statuses: CategoryEntity[];
  isLoading: boolean;
  error: string | null;
}

export function useCategories(enabled: boolean): UseCategoriesResult {
  const [priorities, setPriorities] = useState<CategoryEntity[]>([]);
  const [statuses, setStatuses] = useState<CategoryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/category', {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('Failed to load categories');

        const data: CategoryEntity[] = await res.json();

        const statusRoot = data.find((c) => c.title === 'Task Status');
        const priorityRoot = data.find((c) => c.title === 'Task Priority');

        if (controller.signal.aborted) return;
        setStatuses(statusRoot?.children ?? []);
        setPriorities(priorityRoot?.children ?? []);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [enabled]);

  return { priorities, statuses, isLoading, error };
}
