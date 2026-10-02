'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TaskType } from '@/types/task.types';
import Task from './Task';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import EmptyState from './EmptyState';
import TaskFiltersBar from './TaskFiltersBar';
import { useToday } from '@/hooks/useToday';
import { applyTaskFilters, DEFAULT_FILTERS, type TaskFilters } from '@/lib/task-filters';
import type { TaskCategories } from '@/lib/api';

const LARGE_SCREEN_QUERY = '(min-width: 1024px)';

type Props = {
  title: string;
  tasks: TaskType[];
  categories: TaskCategories;
  emptyTitle: string;
  emptyDescription?: string;
};

export default function TaskListView({ title, tasks, categories, emptyTitle, emptyDescription }: Props) {
  const router = useRouter();
  const today = useToday();
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const visibleTasks = applyTaskFilters(tasks, filters, today);

  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(tasks[0]?.id);
  // Falls back to the first visible task when the selected one was deleted or filtered out.
  const activeTask = visibleTasks.find((t) => t.id === activeTaskId) ?? visibleTasks[0];

  function handleSelect(task: TaskType) {
    // The side panel only exists on large screens; smaller ones open the task page.
    if (window.matchMedia(LARGE_SCREEN_QUERY).matches) {
      setActiveTaskId(task.id);
    } else {
      router.push(`/dashboard/mytask/${task.id}`);
    }
  }

  return (
    <div className="grid gap-4 lg:h-full lg:min-h-[520px] lg:grid-cols-2">
      <section className="flex min-h-0 flex-col rounded-xl border border-border shadow-[0_0_15px_rgba(0,0,0,0.08)]">
        <div className="flex shrink-0 flex-col gap-4 px-4 pt-5 pb-3 sm:px-6">
          <h2 className="relative self-start pb-1 text-sm font-semibold after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
            {title}
          </h2>
          {tasks.length > 0 && (
            <TaskFiltersBar
              filters={filters}
              onChange={setFilters}
              categories={categories}
              shown={visibleTasks.length}
              total={tasks.length}
            />
          )}
        </div>
        <div className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-3 px-4 pb-5 sm:px-6 lg:overflow-y-auto">
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => (
              <Task key={task.id} task={task} onSelect={handleSelect} active={task.id === activeTask?.id} />
            ))
          ) : tasks.length > 0 ? (
            <EmptyState title="No tasks match these filters" description="Try another filter or clear them." />
          ) : (
            <EmptyState title={emptyTitle} description={emptyDescription} />
          )}
        </div>
      </section>

      <section className="hidden min-h-0 overflow-hidden rounded-xl border border-border shadow-[0_0_15px_rgba(0,0,0,0.08)] lg:block">
        <MyTaskBriefDetails key={activeTask?.id} activeTask={activeTask} />
      </section>
    </div>
  );
}
