'use client';

import Task from '@/components/Task';
import { FaTrash } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ApiResponse, TaskType } from '@/types/task.types';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import MyTaskBriefDetails from '@/components/MyTaskBriefDetails';

export default function VitalTaskPage() {
  const [tasks, setTasks] = useState<ApiResponse>({ data: [] });
  const [activeTask, setActiveTask] = useState<TaskType>(tasks?.data[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task`)
      .then((res) => res.json())
      .then(setTasks)
      .finally(() => setIsLoading(false));
  }, []);

  const vitalTasks = tasks?.data.filter((item: TaskType) => item.vitalTask === true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-[76px] flex-1">
      <main className="rounded-xl h-[75dvh]">
        <div className="flex gap-2 h-full">
          <div className="row-span-5 flex flex-1 flex-col gap-2 items-center h-full min-h-0 rounded-xl text-xl pt-[15px] pb-[20px] px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-y-auto">
            <div className="self-start mb-2">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                Vital Tasks
              </h2>
            </div>
            {vitalTasks.map((task) => {
              return <Task key={task.id} completed={false} onActiveTask={setActiveTask} task={{ ...task }} />;
            })}
          </div>
          <MyTaskBriefDetails activeTask={activeTask} />
        </div>
      </main>
    </section>
  );
}
