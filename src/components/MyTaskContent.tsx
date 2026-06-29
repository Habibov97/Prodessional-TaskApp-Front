'use client';
import Task from './Task';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import { TaskType } from '@/types/task.types';
import { useState } from 'react';

export default function MyTaskContent({ myTasks }: { myTasks: TaskType[] }) {
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(myTasks[0]?.id);

  const activeTask = myTasks.find((t) => t.id === activeTaskId);
  return (
    <section className="px-[76px] ">
      <main className="grid grid-cols-[1fr_2fr] grid-rows-5 gap-2 w-full h-[80dvh]   ">
        <div className="row-span-5 rounded-xl p-5 shadow-[0_0_15px_rgba(0,0,0,0.1)] flex flex-col gap-2 items-center h-full text-xl px-8 border border-stone-200">
          <div className="">
            <div className="mb-4">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                My Tasks
              </h2>
            </div>
            <div className="flex h-[67dvh] flex-col gap-3 overflow-y-auto m-3 pr-5">
              {myTasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    completed={false}
                    onActiveTask={(selectedTask) => setActiveTaskId(selectedTask.id)}
                    task={{ ...task }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="row-span-5 rounded-xl border p-5 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          <MyTaskBriefDetails activeTask={activeTask} />
        </div>
      </main>
    </section>
  );
}

// 'SolTEREF':

// <div className="flex flex-col gap-2 items-center h-full rounded-xl text-xl pt-[15px] pb-[20px] px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
//
//

//           </div>

// SAGTEREF

//
