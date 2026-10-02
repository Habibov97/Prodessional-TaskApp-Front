import type { Metadata } from 'next';
import TaskListView from '@/components/TaskListView';
import { getCategories, getTasks } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Vital Task',
};

export default async function VitalTaskPage() {
  const [tasks, categories] = await Promise.all([getTasks(), getCategories()]);
  const vitalTasks = tasks.filter((task) => task.vitalTask);

  return (
    <TaskListView
      title="Vital Tasks"
      categories={categories}
      tasks={vitalTasks}
      emptyTitle="No vital tasks"
      emptyDescription='Use "Mark as Vital" in a task menu to pin it here.'
    />
  );
}
