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

  if (loading) return <div>Yüklənir...</div>;

  const milleseconds = Date.now() - new Date(task.createdAt).getTime();
  const day = Math.floor(milleseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(milleseconds / (1000 * 60 * 60));
  const minutes = Math.floor(milleseconds / (1000 * 60));

  return (
    <div className="relative border max-w-[450px] w-full border-stone-400 rounded-xl min-h-[150px] px-[16px] py-[10px] flex gap-3 ">
      <div
        className={`w-3.75 h-3.75 rounded-full border-2  ${status === 'Not Started' ? 'border-red-500' : status === 'In Progress' ? 'border-purple-500' : 'border-green-500'} bg-white `}
      ></div>
      <div onClick={() => onActiveTask?.(task)} className="flex flex-col gap-1.5 flex-1 min-w-0 cursor-pointer">
        <p className="text-[18px] font-semibold">
          {' '}
          {task.title.length > 20 ? `${task.title.slice(0, 20)}...` : task.title}
        </p>
        <p className="text-sm text-stone-400 w-full break-words ">
          {task.description.length > 20 ? `${task.description.slice(0, 45)}...` : task.description}
        </p>
        {completed && (
          <>
            <div className="flex gap-1 text-[10px] mt-auto">
              <span>Status:</span>
              <span className="text-green-500">{status}</span>
            </div>
            <p className="text-[10px] text-stone-400 ">
              Completed {day === 1 ? `${day} days` : hours === 1 ? `${hours} hours` : `${minutes} minutes`} ago
            </p>
          </>
        )}
        {!completed && (
          <div className="absolute bottom-2 right-2 left-2 flex gap-3 text-[10px] mt-auto items-center">
            <div className="flex gap-1 text-nowrap ">
              <span className="text-[#333]">Priority:</span>
              <span
                className={`${priority === 'Low' ? 'text-green-500' : priority === 'Moderate' ? 'text-blue-500' : priority === 'Extreme' ? 'text-red-500' : ''}`}
              >
                {priority}
              </span>
            </div>
            <div className="flex gap-1 text-nowrap">
              <span className="text-[#333]">Status:</span>
              <span
                className={`${status === 'Not Started' ? 'text-red-500' : status === 'In Progress' ? 'text-purple-500' : ''}`}
              >
                {status}
              </span>
            </div>
            <div className="flex gap-1 text-nowrap text-stone-500">
              <span>Created on:</span>
              <span>{format(new Date(task.createdAt), 'dd/MM/yyyy')}</span>
            </div>
          </div>
        )}
      </div>
      <div className="w-[88px] h-[88px] rounded-xl bg-stone-200 self-center ml-auto shrink-0 mr-4"></div>
      <button
        onClick={() => setTogglePopAction(!togglePopAction)}
        className="absolute top-2 right-2 flex gap-[1.1px] cursor-pointer "
      >
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
      </button>

      {togglePopAction && <PopAction task={task} />}
    </div>
  );
}
