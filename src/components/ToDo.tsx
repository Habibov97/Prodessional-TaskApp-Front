import { GrDocumentTime } from 'react-icons/gr';

import AddTaskModal from './AddTaskModal';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { ApiResponse } from '@/types/task.types';
import Task from './Task';

export default async function ToDo() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task`);
  const tasks: ApiResponse = await res.json();

  const filterTaskByStatus = tasks?.data.filter((item) => item.status.title !== 'Completed');

  return (
    <div className="row-span-6 shadow-[0_0_25px_rgba(0,0,0,0.08)] flex flex-col items-center h-full min-h-0 rounded-xl text-xl pt-[12px] pb-[20px] px-10">
      <div className="mb-[20px] text-green-500 w-full flex gap-[10px] justify-between items-center shrink-0">
        <div className="flex gap-[10px] items-center">
          <GrDocumentTime className="text-[23px] text-stone-300" />
          <div className="text-[14px]">To-Do</div>
        </div>
        <div>
          <AddTaskModal />
        </div>
      </div>
      <div className="self-start text-xs pb-[10px] ">20 June Today</div>

      <div className="overflow-y-auto w-full flex-1 flex flex-col gap-3 pr-5 custom-scrollbar">
        {filterTaskByStatus?.map((task) => {
          return <Task key={task.id} completed={false} task={{ ...task }} />;
        })}
      </div>
    </div>
  );
}
