'use client';
import Task from './Task';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import { TaskType } from '@/types/task.types';
import { useState } from 'react';

export default function MyTaskContent({ myTasks }: { myTasks: TaskType[] }) {
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(myTasks[0]?.id);

  const activeTask = myTasks.find((t) => t.id === activeTaskId);

  return (
    // Mobildə sağ-sol boşluğunu kiçiltdik (px-4)
    <section className="px-4 md:px-[76px]">
      {/* Mobildə hündürlüyü 85dvh edirik ki, hər iki qutuya yer çatsın */}
      <main className="rounded-xl h-[85dvh] md:h-[75dvh]">
        {/* GRID TƏTBIQ EDILDI: Mobildə alt-alta (2 sətir), desktopda yan-yana (2 sütun) */}
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 max-w-[1000px] mx-auto gap-4 md:gap-2 h-full">
          {/* w-1/2 silindi, çünki Grid onsuz da yarı-yarı bölür. min-h-0 vacibdir ki, içindəki scroll işləsin */}
          <div className="flex flex-col gap-2 items-center h-full min-h-0 rounded-xl text-xl pt-[15px] pb-[20px] px-4 md:px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <div className="self-start mb-2">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                My Tasks
              </h2>
            </div>

            {/* Taskların siyahısı üçün w-full əlavə edildi */}
            <div className="flex flex-col gap-2 overflow-y-auto w-full pr-1">
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
