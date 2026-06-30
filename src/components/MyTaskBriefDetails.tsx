'use client';
import { TaskType } from '@/types/task.types';
import { format } from 'date-fns';
import Link from 'next/link';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';

export default function MyTaskBriefDetails({ activeTask }: { activeTask: TaskType | undefined }) {
  if (!activeTask) {
    return (
      <div className="flex h-full items-center justify-center text-stone-400 text-sm">
        Tap on any task to view brief details
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 gap-6">
      {/* Fixed: image + meta */}
      <div className="shrink-0 flex gap-5">
        <div className="shrink-0 w-[170px] h-[170px] rounded-xl bg-stone-200" />
        <div className="flex flex-col gap-3 justify-end">
          <h2 className="text-sm font-semibold">{activeTask.title}</h2>
          <div className="text-xs flex gap-1">
            <span className="text-stone-500">Priority:</span>
            <span className="text-red-500">{activeTask.priority.title}</span>
          </div>
          <div className="text-xs flex gap-1">
            <span className="text-stone-500">Status:</span>
            <span className="text-red-500">{activeTask.status.title}</span>
          </div>
          <div className="text-xs flex gap-1 text-stone-400">
            <span>Created on</span>
            <span>{format(new Date(activeTask.createdAt), 'dd/MM/yyyy')}</span>
          </div>
        </div>
      </div>

      {/* Scrollable: description */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <p className="text-sm leading-relaxed text-stone-600 break-words">{activeTask.description}</p>
      </div>

      {/* Fixed: action buttons */}
      <div className="shrink-0 flex gap-3 justify-end">
        <button
          type="button"
          className="w-9 h-9 rounded-md bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <FaTrash className="w-4 h-4 text-white" />
        </button>
        <Link
          href={`/dashboard/mytask/${activeTask.id}`}
          className="w-9 h-9 rounded-md bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <CgDetailsMore className="w-4 h-4 text-white" />
        </Link>
      </div>
    </div>
  );
}
