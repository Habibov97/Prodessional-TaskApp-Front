import ProgressBar from '@/components/ProgressBar';
import { MdOutlineInventory } from 'react-icons/md';
export default function ProgressDetails() {
  const strokeColor = ['stroke-green-500', 'stroke-purple-500', 'stroke-red-500'];
  const statusColor = ['bg-green-500', 'bg-purple-500', 'bg-red-500'];
  const statusTitle = ['Completed', 'In Progress', 'Not Started'];

  const percentages = '';

  return (
    <div className="row-span-2  flex flex-col items-center border-stone-200 shadow-[0_0_25px_rgba(0,0,0,0.1)] h-full rounded-xl text-xl pt-[10px] pb-[20px] px-10">
      <div className="mb-[20px] mr-auto text-green-500 flex gap-[5px] items-center">
        <div className="text-md">
          <MdOutlineInventory className="text-[25px] text-stone-300" />
        </div>
        <div className="text-[14px]">Task Status</div>
      </div>
      <div className="flex justify-between gap-[15px] w-full max-w-[600px]">
        {Array.from({ length: 3 }, (_, index) => {
          return (
            <div key={statusTitle[index]} className="flex flex-col gap-[10px]">
              <ProgressBar strokeColor={strokeColor[index]} />
              <div className="flex items-center gap-[5px]">
                <div className={`w-[10px] h-[10px] rounded-full ${statusColor[index]}`}></div>
                <div className="text-sm font-semibold">{statusTitle[index]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
