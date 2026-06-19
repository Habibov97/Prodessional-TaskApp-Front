import Task from '@/components/Task';
import { FaTrash } from 'react-icons/fa';
import { PiNotePencilDuotone } from 'react-icons/pi';

export default function MyTaskPage() {
  return (
    <section className="px-[76px] flex-1 ">
      <main className="rounded-xl h-[75dvh]">
        <div className="flex gap-2 h-full">
          <div className="row-span-5 flex flex-1 flex-col gap-2 items-center h-full min-h-0 rounded-xl text-xl pt-[15px] pb-[20px] px-8 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-y-auto">
            <div className="self-start mb-2">
              <h2 className="relative text-md font-semibold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
                My Tasks
              </h2>
            </div>
            <Task completed={false} />
            <Task completed={false} />
          </div>
          <div className="row-span-5 flex flex-1 flex-col gap-7 h-full min-h-0 rounded-xl text-xl pt-[15px] pb-[20px] px-4 border border-stone-200 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <div className="w-full flex gap-5">
              <div className="w-[170px] h-[170px] rounded-xl bg-stone-200"></div>
              <div className="flex flex-col gap-4 justify-end">
                <h2 className="text-md font-semibold">Walk the dog</h2>
                <div className="text-sm flex gap-1">
                  <div>Priority:</div>
                  <div className="text-red-500">Extreme</div>
                </div>
                <div className="text-sm flex gap-1">
                  <div>Status:</div>
                  <div className="text-red-500">Not Started</div>
                </div>
                <div className="text-sm flex gap-1 text-stone-400">
                  <div>Created on</div>
                  <div>20/06/2026</div>
                </div>
              </div>
            </div>
            <div className="text-[18px] leading-[1.7] text-stone-600 overflow-y-auto">
              Take the dog to the park and bring treats as well.Take Luffy and Jiro for a leisurely stroll around the
              neighborhood. Enjoy the fresh air and give them the exercise and mental stimulation they need for a happy
              and healthy day. Don't forget to bring along squeaky and fluffy for some extra fun along the way!
            </div>
            <div className="flex gap-3 mt-auto justify-end">
              <div className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center">
                <FaTrash className="w-[18px] h-[18px] text-white" />
              </div>
              <div className="w-[36px] h-[36px] rounded-md bg-red-500 flex items-center justify-center">
                <PiNotePencilDuotone className="w-[18px] h-[18px] text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
