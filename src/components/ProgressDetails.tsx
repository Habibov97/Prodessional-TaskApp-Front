import { MdOutlineInventory } from 'react-icons/md';
import ProgressBar from '@/components/ProgressBar';
import DashboardCard from './DashboardCard';
import { COMPLETED, IN_PROGRESS, NOT_STARTED, statusTone, titleKey } from '@/constants/task.constants';
import { cn } from '@/lib/utils';
import type { TaskType } from '@/types/task.types';

const STATUSES = [
  { key: COMPLETED, label: 'Completed' },
  { key: IN_PROGRESS, label: 'In Progress' },
  { key: NOT_STARTED, label: 'Not Started' },
];

export default function ProgressDetails({ tasks }: { tasks: TaskType[] }) {
  const total = tasks.length;

  return (
    <DashboardCard icon={<MdOutlineInventory />} title="Task Status">
      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        {STATUSES.map(({ key, label }) => {
          const count = tasks.filter((task) => titleKey(task.status?.title) === key).length;
          const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
          const tone = statusTone(key);

          return (
            <div key={key} className="flex flex-col items-center gap-2.5">
              <ProgressBar strokeColor={tone.stroke} percentage={percentage} />
              <div className="flex items-center gap-1.5">
                <span className={cn('size-2.5 shrink-0 rounded-full', tone.dot)} />
                <span className="text-xs font-semibold sm:text-sm">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
