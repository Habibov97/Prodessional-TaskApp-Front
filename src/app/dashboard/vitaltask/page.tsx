import type { Metadata } from 'next';
import TaskListView from '@/components/TaskListView';
import { getTasks } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Vital Task',
};

export default async function VitalTaskPage() {
  const tasks = await getTasks();
  const vitalTasks = tasks.filter((task) => task.vitalTask);

  return (
    <TaskListView
      title="Vital Tasks"
      tasks={vitalTasks}
      emptyTitle="No vital tasks"
      emptyDescription='Use "Mark as Vital" in a task menu to pin it here.'
    />
  );
}
