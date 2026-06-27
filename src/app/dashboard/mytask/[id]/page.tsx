'use client';

import GoBack from '@/components/GoBack';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { TaskType } from '@/types/task.types';
import { useEffect, useState, use } from 'react';
import { FaTrash } from 'react-icons/fa';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { format } from 'date-fns';

export default function TaskDetails({ params }: { params: Promise<{ id: string }> }) {
  const [data, setData] = useState<TaskType>();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = use(params);

  useEffect(() => {
    setIsLoading(true);

    fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data.data));

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-[76px] flex-1">
      <main className="flex flex-col gap-5 border rounded-md shadow-[0_0_5px_rgba(0,0,0,0.08)] p-[26px] mb-[26px] h-[76dvh]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-1 flex-col gap-7 h-full min-h-0 rounded-xl text-xl pt-[15px] pb-[20px] px-4 ">
            <div className="w-full flex justify-between items-start">
              <div className="w-full flex gap-5 items-start">
                <div className="w-[170px] h-[170px] rounded-xl bg-stone-200"></div>
                <div className="flex flex-col gap-4 justify-end">
                  <h2 className="text-3xl font-semibold">{data?.title}</h2>
                  <div className="text-sm flex gap-1">
                    <div>Priority:</div>
                    <div className="text-red-500">{data?.priority.title}</div>
                  </div>
                  <div className="text-sm flex gap-1">
                    <div>Status:</div>
                    <div className="text-red-500">{data?.status.title}</div>
                  </div>
                  <div className="text-sm flex gap-1 text-stone-400">
                    <div>Created on</div>
                    <div>{data?.createdAt && format(new Date(data?.createdAt), 'dd/MM/yyyy')}</div>
                  </div>
                </div>
              </div>
              <GoBack />
            </div>

            <div className="h-[230px] text-[16px] leading-[1.7] text-stone-600 overflow-y-scroll">
              {data?.description}
            </div>
            <div className="flex gap-3 mt-auto justify-end">
              <div role="button" className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center">
                <FaTrash className="w-[18px] h-[18px] text-white" />
              </div>
              <div className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center">
                <PiNotePencilDuotone className="w-[18px] h-[18px] text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
