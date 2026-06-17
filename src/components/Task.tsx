import React from 'react';

export default function Task() {
  return (
    <div className="relative border border-stone-400 rounded-xl shrink-0 min-h-[140px] px-[16px] py-[10px] flex gap-3 ">
      <div className="w-3.75 h-3.75 rounded-full border-2 border-purple-400 bg-white "></div>
      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold">Walk the dog</p>
        <p className="text-sm text-stone-400 w-[200px]">Take the dog to the park and Take the dog to the park.</p>
        <div className="flex gap-1 text-xs">
          <span>Status:</span>
          <span className="text-green-500">Completed</span>
        </div>
        <p className="text-xs text-stone-400">Completed 2 days ago</p>
      </div>
      <div className="w-[88px] h-[88px] rounded-xl bg-stone-200 self-center "></div>
      <div className="absolute top-2 right-2 flex gap-[1.1px] cursor-pointer">
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
        <span className="w-[5px] h-[5px] bg-stone-400 rounded-full"></span>
      </div>
    </div>
  );
}
