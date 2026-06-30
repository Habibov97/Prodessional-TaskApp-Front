'use client';
import { TaskType } from '@/types/task.types';
import { useState, useEffect } from 'react';
import { format, formatDistance, subDays } from 'date-fns';
import PopAction from './PopAction';

export default function Task({
  task,
  completed = true,
  onActiveTask,
}: {
  task: TaskType;
  completed?: boolean;
  myTask?: boolean;
  onActiveTask?: (task: TaskType) => void;
}) {
  const [status, setStatus] = useState<string>('Not Started');
  const [priority, setPriority] = useState<string>('Low');
  const [togglePopAction, setTogglePopAction] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDataStatusPriority() {
      setLoading(true);

      const statusInf = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${task.statusId}`).then((res) =>
        res.json(),
      );

      const priorityInf = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${task.priorityId}`).then((res) =>
        res.json(),
      );

      setStatus(statusInf.data.title);
      setPriority(priorityInf.data.title);
      setLoading(false);
    }

    getDataStatusPriority();
  }, []);

  if (loading) return <div>Loading...</div>;

  const milleseconds = Date.now() - new Date(task.createdAt).getTime();
  const day = Math.floor(milleseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(milleseconds / (1000 * 60 * 60));
  const minutes = Math.floor(milleseconds / (1000 * 60));

  return (
    <div className="relative w-full border border-stone-300 rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <div
          className={`mt-1 shrink-0 w-3.5 h-3.5 rounded-full border-2 bg-white
          ${status === 'Not Started' ? 'border-red-500' : status === 'In Progress' ? 'border-purple-500' : 'border-green-500'}`}
        />

        <div onClick={() => onActiveTask?.(task)} className="flex-1 min-w-0 cursor-pointer flex flex-col gap-1">
          <p className="text-sm font-semibold truncate">
            {task.title.length > 20 ? `${task.title.slice(0, 20)}...` : task.title}
          </p>
          <p className="text-xs text-stone-400 break-words">
            {task.description.length > 45 ? `${task.description.slice(0, 45)}...` : task.description}
          </p>
        </div>

        <div className="shrink-0 w-20 h-20 rounded-xl bg-stone-200 mr-5" />
      </div>

      {completed && (
        <div className="flex flex-col gap-0.5 pl-5 text-[10px]">
          <div className="flex gap-1">
            <span>Status:</span>
            <span className="text-green-500">{status}</span>
          </div>
          <p className="text-stone-400">
            Completed{' '}
            {day >= 1
              ? `${day} day${day !== 1 ? 's' : ''}`
              : hours >= 1
                ? `${hours} hour${hours !== 1 ? 's' : ''}`
                : `${minutes} minutes`}{' '}
            ago
          </p>
        </div>
      )}

      {!completed && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 pl-5 text-[10px]">
          <div className="flex gap-1">
            <span className="text-stone-600">Priority:</span>
            <span
              className={
                priority === 'Low'
                  ? 'text-green-500'
                  : priority === 'Moderate'
                    ? 'text-blue-500'
                    : priority === 'Extreme'
                      ? 'text-red-500'
                      : ''
              }
            >
              {priority}
            </span>
          </div>
          <div className="flex gap-1">
            <span className="text-stone-600">Status:</span>
            <span
              className={status === 'Not Started' ? 'text-red-500' : status === 'In Progress' ? 'text-purple-500' : ''}
            >
              {status}
            </span>
          </div>
          <div className="flex gap-1 text-stone-400">
            <span>Created on:</span>
            <span>{format(new Date(task.createdAt), 'dd/MM/yyyy')}</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setTogglePopAction(!togglePopAction)}
        className="absolute top-2 right-2 flex gap-[1.1px] cursor-pointer"
      >
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full" />
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full" />
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full" />
      </button>

      {togglePopAction && <PopAction task={task} />}
    </div>
  );
}
