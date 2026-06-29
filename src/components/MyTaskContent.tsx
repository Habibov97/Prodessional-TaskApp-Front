'use client';
import Task from './Task';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import { TaskType } from '@/types/task.types';
import { useState } from 'react';

export default function MyTaskContent({ myTasks }: { myTasks: TaskType[] }) {
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(myTasks[0]?.id);

  const activeTask = myTasks.find((t) => t.id === activeTaskId);
  return (
    <section className="px-4 md:px-[76px]">
      {/* Mobildə hündürlüyü biraz artırırıq ki, iki yerə bölünəndə çox daralmasın */}
      <main className="rounded-xl h-[85dvh] md:h-[75dvh]">
        {/* flex-col md:flex-row: Mobildə alt-alta, desktopda yan-yana */}
        <div className="flex flex-col md:flex-row w-full max-w-[1000px] mx-auto justify-center gap-4 md:gap-2 h-full">
          {/* Sol tərəf - Tasklar */}
          {/* w-full md:w-1/2 və h-1/2 md:h-full əlavə edildi */}
          <div className="flex w-full md:w-1/2 flex-col gap-2 items-center h-1/2 md:h-full rounded-xl text-xl pt-[15px] pb-[20px] px-4 md:px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
            <div className="self-start mb-2">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                My Tasks
              </h2>
            </div>
            {/* Task containerinə w-full verdik ki, parent-i tam doldursun */}
            <div className="flex flex-col gap-2 overflow-y-auto w-full">
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

          {/* Sağ tərəf - Detallar */}
          <MyTaskBriefDetails activeTask={activeTask} />
        </div>
      </main>
    </section>
  );
}
