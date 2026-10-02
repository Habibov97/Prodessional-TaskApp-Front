import { BiTask } from 'react-icons/bi';
import DashboardCard from './DashboardCard';
import EmptyState from './EmptyState';
import Task from './Task';
import type { TaskType } from '@/types/task.types';

export default function CompletedTask({ tasks }: { tasks: TaskType[] }) {
  return (
    <DashboardCard icon={<BiTask />} title="Completed Task" bodyClassName="flex flex-col">
      <div className="custom-scrollbar flex max-h-[50dvh] min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-2 lg:max-h-none">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} />)
        ) : (
          <EmptyState title="No completed tasks yet" />
        )}
      </div>
    </DashboardCard>
  );
}
