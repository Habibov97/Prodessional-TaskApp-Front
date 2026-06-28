import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { BiTask } from 'react-icons/bi';
import Task from './Task';
import { ApiResponse, TaskType } from '@/types/task.types';

export default async function CompletedTask() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task`);
  const tasks: ApiResponse = await res.json();

  const completedTasks = tasks?.data.filter((item: any) => item.status.title === 'Completed');

  return (
    <div className="col-start-2 row-start-3 row-span-3 shadow-[0_0_25px_rgba(0,0,0,0.08)] flex flex-col items-center h-full min-h-0 rounded-xl text-xl pt-[12px] pb-[20px] px-10">
      <div className="mb-[20px] mr-auto text-green-500 flex gap-[5px] items-center shrink-0">
        <div className="text-md">
          <BiTask className="text-[25px] text-stone-300" />
        </div>
        <div className="text-[14px]">Completed Task</div>
      </div>
      <div className="overflow-y-auto w-full flex-1 flex flex-col gap-3 pr-5 custom-scrollbar">
        {completedTasks?.map((task: TaskType) => (
          <Task key={task.id} task={{ ...task }} />
        ))}
      </div>
    </div>
  );
}
