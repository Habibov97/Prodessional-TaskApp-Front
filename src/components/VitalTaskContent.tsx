'use client';
import { useState } from 'react';
import MyTaskBriefDetails from './MyTaskBriefDetails';
import { TaskType } from '@/types/task.types';
import Task from './Task';

export default function VitalTaskContent({ vitalTasks }: { vitalTasks: TaskType[] }) {
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(vitalTasks[0]?.id);

  const activeTask = vitalTasks.find((t) => t.id === activeTaskId);

  return (
    <section className="px-[76px] py-6">
      <main className="grid grid-cols-[1fr_2fr] grid-rows-1 gap-4 h-[80dvh]">
        <div className="flex flex-col rounded-xl border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          <div className="shrink-0 px-6 pt-5 pb-3">
            <h2 className="relative text-sm font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
              My Tasks
            </h2>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-5 flex flex-col gap-3">
            {vitalTasks.map((task) => (
              <Task key={task.id} completed={false} onActiveTask={(t) => setActiveTaskId(t.id)} task={task} />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden">
          <MyTaskBriefDetails activeTask={activeTask} />
        </div>
      </main>
    </section>
  );
}
