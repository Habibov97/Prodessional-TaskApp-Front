import ProgressDetails from './ProgressDetails';
import CompletedTask from './CompletedTask';
import ToDo from './ToDo';
import { isCompletedStatus } from '@/constants/task.constants';
import type { TaskCategories } from '@/lib/api';
import type { TaskType } from '@/types/task.types';

export default function DashboardContent({ tasks, categories }: { tasks: TaskType[]; categories: TaskCategories }) {
  const todo = tasks.filter((task) => !isCompletedStatus(task.status?.title));
  const completed = tasks.filter((task) => isCompletedStatus(task.status?.title));

  return (
    <div className="grid gap-4 rounded-2xl border p-4 shadow-[0_0_25px_rgba(0,0,0,0.08)] sm:p-6 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:grid-rows-[auto_minmax(0,1fr)]">
      <ToDo tasks={todo} categories={categories} />
      <ProgressDetails tasks={tasks} />
      <CompletedTask tasks={completed} />
    </div>
  );
}
