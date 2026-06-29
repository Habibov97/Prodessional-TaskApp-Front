'use client';
import { TaskType } from '@/types/task.types';
import { format } from 'date-fns';
import Link from 'next/link';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';

export default function MyTaskBriefDetails({ activeTask }: { activeTask: TaskType | undefined }) {
  return (
    // w-full md:flex-1 və h-1/2 md:h-full əlavə edildi
    <div className="flex w-full md:flex-1 min-w-0 flex-col gap-5 md:gap-7 h-1/2 md:h-full rounded-xl text-xl pt-[15px] pb-[20px] px-4 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-y-auto">
      {activeTask ? (
        <>
          {/* Çox kiçik ekranlarda (sm-dən aşağı) şəkil və yazını alt-alta yığır */}
          <div className="w-full flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {/* Şəklin ölçüsünü mobildə biraz kiçiltdik və shrink-0 verdik ki, sıxılmasın */}
            <div className="w-[100px] h-[100px] sm:w-[170px] sm:h-[170px] shrink-0 rounded-xl bg-stone-200"></div>

            <div className="flex flex-col gap-2 sm:gap-4 justify-start w-full">
              <h2 className="text-md font-semibold text-center sm:text-left">{activeTask?.title}</h2>
              <div className="text-sm flex gap-1 justify-center sm:justify-start">
                <div>Priority:</div>
                <div className="text-red-500">{activeTask?.priority.title}</div>
              </div>
              <div className="text-sm flex gap-1 justify-center sm:justify-start">
                <div>Status:</div>
                <div className="text-red-500">{activeTask?.status.title}</div>
              </div>
              <div className="text-sm flex gap-1 text-stone-400 justify-center sm:justify-start">
                <div>Created on</div>
                <div>{activeTask?.createdAt && format(new Date(activeTask?.createdAt), 'dd/MM/yyyy')}</div>
              </div>
            </div>
          </div>

          <div className="text-[16px] md:text-[18px] leading-[1.7] text-stone-600 overflow-y-auto">
            {activeTask?.description}
          </div>

          {/* mt-auto sayəsində düymələr həmişə ən aşağıda qalacaq */}
          <div className="flex gap-3 mt-auto justify-end pt-4">
            <div
              role="button"
              className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center transition-colors hover:bg-red-600"
            >
              <FaTrash className="w-[18px] h-[18px] text-white" />
            </div>
            <Link
              href={`/dashboard/mytask/${activeTask?.id}`}
              className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center transition-colors hover:bg-red-600"
            >
              <CgDetailsMore className="w-[18px] h-[18px] text-white" />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-stone-400 text-[16px]">
          Tap on any task to view brief details
        </div>
      )}
    </div>
  );
}
