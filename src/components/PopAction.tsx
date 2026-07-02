'use client';
import { TaskType } from '@/types/task.types';
import { ActionStateCompleted, ActionStateVital, isCompleted, isVitalTask } from '@/actions/taskupdatebypopup.action';
import { useActionState } from 'react';
import { deleteTaskAction } from '@/actions/taskdelete.action.';

export default function PopAction({ task }: { task: TaskType }) {
  const initialStateVital: ActionStateVital = { vitalTask: undefined, success: false, error: null };
  const initialStateCompleted: ActionStateCompleted = { completed: undefined, success: false, error: null };

  const [stateVital, actionVital, isPendingVital] = useActionState(isVitalTask, initialStateVital);
  const [stateCompleted, actionCompleted, isPendingCompleted] = useActionState(isCompleted, initialStateCompleted);

  return (
    <div className="py-3 pr-5 pl-2 absolute top-5 right-1 text-sm flex flex-col gap-2 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] items-start">
      <form action={actionVital} className="cursor-pointer">
        <input type="hidden" name="vitalTask" defaultValue={String(task.vitalTask)} />
        <input type="hidden" name="taskId" defaultValue={String(task.id)} />

        <button disabled={isPendingVital} className="cursor-pointer" type="submit">
          {task.vitalTask ? 'Unmark as Vital' : 'Mark as Vital'}
        </button>
      </form>
      {stateVital?.error && <p className="text-red-500 text-xs">{stateVital.error}</p>}

      <form action={actionCompleted} className={`${task.status.title === 'Completed' && 'hidden'}`}>
        <input hidden name="statusId" defaultValue={String(task.statusId)} type="text" />
        <input hidden name="taskId" type="text" defaultValue={String(task.id)} />
        <button disabled={isPendingCompleted} className="cursor-pointer" type="submit">
          Completed
        </button>
      </form>
      {stateCompleted?.error && <p className="text-red-500 text-xs">{stateCompleted.error}</p>}

      <form action={deleteTaskAction} className="cursor-pointer">
        <input hidden name="taskId" defaultValue={String(task.id)} type="text" />
        <button className="cursor-pointer" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
