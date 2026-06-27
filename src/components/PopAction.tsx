import { TaskType } from '@/types/task.types';

export default function PopAction({ task }: { task: TaskType }) {
  return (
    <div className="py-3 pr-5 pl-2 absolute top-5 right-1 text-sm flex flex-col gap-2 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] items-start">
      <button className="cursor-pointer">Vital</button>
      <button className="cursor-pointer">Delete</button>
      <button className="cursor-pointer">Finish</button>
    </div>
  );
}
