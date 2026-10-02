import { GrDocumentTime } from 'react-icons/gr';
import AddTaskModal from './AddTaskModal';
import DashboardCard from './DashboardCard';
import EmptyState from './EmptyState';
import Task from './Task';
import TodayDate from './TodayDate';
import type { TaskCategories } from '@/lib/api';
import type { TaskType } from '@/types/task.types';

export default function ToDo({ tasks, categories }: { tasks: TaskType[]; categories: TaskCategories }) {
  return (
    <DashboardCard
      icon={<GrDocumentTime />}
      title="To-Do"
      action={<AddTaskModal categories={categories} />}
      className="lg:row-span-2"
      bodyClassName="flex flex-col"
    >
      <p className="shrink-0 pb-3 text-xs text-muted-foreground">
        <TodayDate pattern="d MMMM" /> <span className="text-muted-foreground">· Today</span>
      </p>
      <div className="custom-scrollbar flex max-h-[60dvh] min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-2 lg:max-h-none">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} />)
        ) : (
          <EmptyState title="Nothing to do" description="Add a task to get started." />
        )}
      </div>
    </DashboardCard>
  );
}
