import { GrDocumentTime } from 'react-icons/gr';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import Link from 'next/link';
import Task from './Task';
export default function ToDo() {
  return (
    <div className="row-span-5 shadow-[0_0_25px_rgba(0,0,0,0.08)] flex flex-col items-center max-h-[625px] min-h-[625px]  rounded-xl text-xl pt-[12px] pb-[20px] px-10">
      <div className="mb-[20px] text-green-500 w-full flex gap-[10px] justify-between items-center shrink-0">
        <div className="flex gap-[10px] items-center">
          <GrDocumentTime className="text-[23px] text-stone-300" />
          <div className="text-[14px]">To-Do</div>
        </div>
        <Link href="ehaaaaaa" className="flex gap-[2px] items-center">
          <span className="text-[23px]">
            <HiOutlinePlusSmall />
          </span>
          <span className="text-[14px]">Add task</span>
        </Link>
      </div>
      <div className="self-start text-xs pb-[10px] ">20 June Today</div>
      <div className="overflow-y-auto w-full flex-1 flex flex-col gap-3 pr-5 custom-scrollbar">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
}
