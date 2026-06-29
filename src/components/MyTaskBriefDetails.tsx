'use client';
import { TaskType } from '@/types/task.types';
import { format } from 'date-fns';
import Link from 'next/link';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';

export default function MyTaskBriefDetails({ activeTask }: { activeTask: TaskType | undefined }) {
  return (
    <div className="flex flex-1 flex-col gap-7 h-full  rounded-xl text-xl pt-[15px] pb-[20px] px-4 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      {activeTask ? (
        <>
          <div className="w-full flex gap-5">
            <div className="w-[170px] h-[170px] rounded-xl bg-stone-200"></div>
            <div className="flex flex-col gap-4 justify-start">
              <h2 className="text-md font-semibold">{activeTask?.title}</h2>
              <div className="text-sm flex gap-1">
                <div>Priority:</div>
                <div className="text-red-500">{activeTask?.priority.title}</div>
              </div>
              <div className="text-sm flex gap-1">
                <div>Status:</div>
                <div className="text-red-500">{activeTask?.status.title}</div>
              </div>
              <div className="text-sm flex gap-1 text-stone-400">
                <div>Created on</div>
                <div>{activeTask?.createdAt && format(new Date(activeTask?.createdAt), 'dd/MM/yyyy')}</div>
              </div>
            </div>
          </div>
          <div className="text-[18px] leading-[1.7] text-stone-600 overflow-y-auto">{activeTask?.description}</div>
          <div className="flex gap-3 mt-auto justify-end">
            <div role="button" className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center">
              <FaTrash className="w-[18px] h-[18px] text-white" />
            </div>
            <Link
              href={`/dashboard/mytask/${activeTask?.id}`}
              className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center"
            >
              <CgDetailsMore className="w-[18px] h-[18px] text-white" />
            </Link>
          </div>
        </>
      ) : (
        'Tap on any task to view brief details'
      )}
    </div>
  );
}
