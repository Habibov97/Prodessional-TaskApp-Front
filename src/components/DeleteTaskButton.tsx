'use client';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

export default function DeleteTaskButton({
  taskId,
  taskTitle,
  redirectTo,
}: {
  taskId: string;
  taskTitle: string;
  redirectTo?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Delete task"
        className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-red-500 transition-colors hover:bg-red-600"
      >
        <FaTrash className="size-4 text-white" />
      </button>
      <ConfirmDeleteDialog
        taskId={taskId}
        taskTitle={taskTitle}
        open={open}
        onOpenChange={setOpen}
        redirectTo={redirectTo}
      />
    </>
  );
}
