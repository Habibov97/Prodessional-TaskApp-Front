'use client';
import Task from './Task';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import { TaskType } from '@/types/task.types';
import { useState } from 'react';

export default function MyTaskContent({ myTasks }: { myTasks: TaskType[] }) {
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(myTasks[0]?.id);

  const activeTask = myTasks.find((t) => t.id === activeTaskId);
  return (
    <section className="px-[76px] flex-1 ">
      <main className="rounded-xl h-[75dvh]">
        <div className="flex max-w-[1000px] xl:max-w-[1400px] justify-center gap-2 h-full">
          <div className="flex w-1/2 xl:w-[700px] flex-col gap-2 items-center h-full   rounded-xl text-xl pt-[15px] pb-[20px] px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
            <div className="self-start mb-2">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                My Tasks
              </h2>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
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
          <MyTaskBriefDetails activeTask={activeTask} />
        </div>
      </main>
    </section>
  );
}
