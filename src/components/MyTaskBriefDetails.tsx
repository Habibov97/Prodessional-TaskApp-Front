'use client';
import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import { priorityTone, statusTone } from '@/constants/task.constants';
import type { TaskType } from '@/types/task.types';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import EmptyState from './EmptyState';
import TaskImage from './TaskImage';
import RichTextContent from './RichTextContent';
import DueBadge from './DueBadge';
import { isCompletedStatus } from '@/constants/task.constants';

export default function MyTaskBriefDetails({ activeTask }: { activeTask: TaskType | undefined }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!activeTask) {
    return <EmptyState className="h-full" title="Tap on any task to view brief details" />;
  }

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex shrink-0 gap-5">
        <TaskImage src={activeTask.avatar} alt={activeTask.title} className="size-32 xl:size-[170px]" />
        <div className="flex min-w-0 flex-col justify-end gap-3">
          <h2 className="text-base font-semibold break-words text-foreground">{activeTask.title}</h2>
          <div className="flex gap-1 text-xs">
            <span className="text-muted-foreground">Priority:</span>
            <span className={priorityTone(activeTask.priority?.title).text}>{activeTask.priority?.title}</span>
          </div>
          <div className="flex gap-1 text-xs">
            <span className="text-muted-foreground">Status:</span>
            <span className={statusTone(activeTask.status?.title).text}>{activeTask.status?.title}</span>
          </div>
          <div className="flex gap-1 text-xs text-muted-foreground">
            <span>Created on</span>
            <span>{format(new Date(activeTask.createdAt), 'dd/MM/yyyy')}</span>
          </div>
          <DueBadge
            dueDate={activeTask.dueDate}
            completed={isCompletedStatus(activeTask.status?.title)}
            className="self-start"
          />
        </div>
      </div>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
        <RichTextContent html={activeTask.description} />
      </div>

      <div className="flex shrink-0 justify-end gap-3">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          aria-label="Delete task"
          className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-red-500 transition-colors hover:bg-red-600"
        >
          <FaTrash className="size-4 text-white" />
        </button>
        <Link
          href={`/dashboard/mytask/${activeTask.id}`}
          aria-label="Open task details"
          className="flex size-9 items-center justify-center rounded-md bg-red-500 transition-colors hover:bg-red-600"
        >
          <CgDetailsMore className="size-4 text-white" />
        </Link>
      </div>

      <ConfirmDeleteDialog
        taskId={activeTask.id}
        taskTitle={activeTask.title}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
      />
    </div>
  );
}
