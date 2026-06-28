'use client';
import { useState } from 'react';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import { TaskType } from '@/types/task.types';
import Task from './Task';

export default function VitalTaskContent({ vitalTasks }: { vitalTasks: TaskType[] }) {
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(vitalTasks[0]?.id);

  const activeTask = vitalTasks.find((t) => t.id === activeTaskId);

  return (
    <section className="px-[76px] flex-1">
      <main className="rounded-xl h-[75dvh]">
        <div className="flex max-w-[1000px] justify-center  gap-2 h-full">
          <div className="flex w-1/2 flex-col gap-2 items-center h-full   rounded-xl text-xl pt-[15px] pb-[20px] px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
            <div className="self-start mb-2">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                Vital Tasks
              </h2>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {vitalTasks.map((task) => {
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
