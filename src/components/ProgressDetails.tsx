import ProgressBar from '@/components/ProgressBar';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { TaskType } from '@/types/task.types';
import { MdOutlineInventory } from 'react-icons/md';

const STROKE_COLOR = ['stroke-green-500', 'stroke-purple-500', 'stroke-red-500'];
const STATUS_COLOR = ['bg-green-500', 'bg-purple-500', 'bg-red-500'];
const STATUS_KEYS = ['completed', 'in progress', 'not started'] as const;
const STATUS_LABELS = ['Completed', 'In Progress', 'Not Started'];

export default async function ProgressDetails() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task`);
  const { data: tasks }: { data: TaskType[] } = await res.json();

  const total = tasks?.length ?? 0;

  const counts = { completed: 0, 'in progress': 0, 'not started': 0 };

  tasks?.forEach((task) => {
    const key = task.status?.title?.trim().toLowerCase() as keyof typeof counts;
    if (key in counts) counts[key]++;
  });

  const percentages = STATUS_KEYS.map((key) => (total > 0 ? Math.round((counts[key] / total) * 100) : 0));

  return (
    <div className="row-span-2 flex flex-col items-center border-stone-200 shadow-[0_0_25px_rgba(0,0,0,0.1)] h-full rounded-xl text-xl pt-[10px] pb-[20px] px-10">
      <div className="mb-[20px] mr-auto text-green-500 flex gap-[5px] items-center">
        <MdOutlineInventory className="text-[25px] text-stone-300" />
        <div className="text-[14px]">Task Status</div>
      </div>

      <div className="flex justify-between gap-[15px] w-full max-w-[600px]">
        {STATUS_LABELS.map((label, index) => (
          <div key={label} className="flex flex-col gap-[10px]">
            <ProgressBar strokeColor={STROKE_COLOR[index]} percentage={percentages[index]} />
            <div className="flex items-center gap-[5px]">
              <div className={`w-[10px] h-[10px] rounded-full ${STATUS_COLOR[index]}`} />
              <div className="text-sm font-semibold">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
