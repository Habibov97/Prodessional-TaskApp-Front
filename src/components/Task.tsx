import Link from 'next/link';

export default function Task({ completed = true }: { completed?: boolean }) {
  return (
    <div className="relative border border-stone-400 rounded-xl shrink-0 min-h-[150px] px-[16px] py-[10px] flex gap-3 w-full">
      <div className="w-3.75 h-3.75 rounded-full border-2 border-purple-400 bg-white "></div>
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <p className="text-[18px] font-semibold">Walk the dog</p>
        <p className="text-sm text-stone-400 w-full break-words ">
          Take the dog to the park and Take the dog to the park.
        </p>
        {completed && (
          <>
            <div className="flex gap-1 text-[10px] mt-auto">
              <span>Status:</span>
              <span className="text-green-500">Completed</span>
            </div>
            <p className="text-[10px] text-stone-400 ">Completed 2 days ago</p>
          </>
        )}
        {!completed && (
          <div className="absolute bottom-2 right-2 left-2 flex gap-3 text-[10px] mt-auto items-center">
            <div className="flex gap-1 text-nowrap ">
              <span className="text-[#333]">Priority:</span>
              <span className="text-blue-300">Moderate</span>
            </div>
            <div className="flex gap-1 text-nowrap">
              <span className="text-[#333]">Status:</span>
              <span className="text-purple-500">In Progress</span>
            </div>
            <div className="flex gap-1 text-nowrap text-stone-500">
              <span>Created on:</span>
              <span>20/06/2023</span>
            </div>
          </div>
        )}
      </div>
      <div className="w-[88px] h-[88px] rounded-xl bg-stone-200 self-center ml-auto shrink-0 mr-4"></div>
      <Link href="#" className="absolute top-2 right-2 flex gap-[1.1px] ">
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
      </Link>
    </div>
  );
}
