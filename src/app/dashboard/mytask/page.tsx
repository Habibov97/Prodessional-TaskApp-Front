import type { Metadata } from 'next';
import TaskListView from '@/components/TaskListView';
import { getTasks } from '@/lib/api';

export const metadata: Metadata = {
  title: 'My Task',
};

export default async function MyTaskPage() {
  const tasks = await getTasks();
  const myTasks = tasks.filter((task) => !task.vitalTask);

  return (
    <TaskListView
      title="My Tasks"
      tasks={myTasks}
      emptyTitle="No tasks yet"
      emptyDescription="Tasks you add from the dashboard will show up here."
    />
  );
}
