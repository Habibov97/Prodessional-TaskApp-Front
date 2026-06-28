'use client';
import { TaskType } from '@/types/task.types';
import { ActionState, isVitalTask } from '@/actions/taskupdatebypopup.action';
import { useActionState } from 'react';
import { deleteTaskAction } from '@/actions/taskdelete.action.';

export default function PopAction({ task }: { task: TaskType }) {
  const initialState: ActionState = { vitalTask: undefined, success: false, error: null };
  const [state, action, isPending] = useActionState(isVitalTask, initialState);

  return (
    <div className="py-3 pr-5 pl-2 absolute top-5 right-1 text-sm flex flex-col gap-2 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] items-start">
      <form action={action} className="cursor-pointer">
        <input type="hidden" name="vitalTask" value={String(task.vitalTask)} />
        <input type="hidden" name="taskId" value={String(task.id)} />

        <button disabled={isPending} className="cursor-pointer" type="submit">
          {task.vitalTask ? 'Unmark as Vital' : 'Mark as Vital'}
        </button>
      </form>
      {state?.error && <p className="text-red-500 text-xs">{state.error}</p>}

      <form action={deleteTaskAction} className="cursor-pointer">
        <input hidden name="taskId" value={String(task.id)} type="text" />
        <button className="cursor-pointer" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
