import GoBack from '@/components/GoBack';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { FaTrash } from 'react-icons/fa';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { format } from 'date-fns';

export default async function TaskDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task/${id}`);
  const { data } = await res.json();

  return (
    <section className="px-[76px]">
      <main className="grid grid-rows-[auto_minmax(0,1fr)_auto] gap-5 border rounded-md shadow-[0_0_5px_rgba(0,0,0,0.08)] p-[26px] mb-[26px] h-[76dvh]">
        <div className="flex gap-5 items-start">
          <div className="w-[170px] h-[170px] rounded-xl bg-stone-200 shrink-0" />
          <div className="flex flex-col gap-4 justify-end flex-1 min-w-0">
            <h2 className="text-3xl font-semibold">{data?.title}</h2>
            <div className="text-sm flex gap-1">
              <span>Priority:</span>
              <span className="text-red-500">{data?.priority?.title}</span>
            </div>
            <div className="text-sm flex gap-1">
              <span>Status:</span>
              <span className="text-red-500">{data?.status?.title}</span>
            </div>
            <div className="text-sm flex gap-1 text-stone-400">
              <span>Created on</span>
              <span>{data?.createdAt && format(new Date(data?.createdAt), 'dd/MM/yyyy')}</span>
            </div>
          </div>
          <GoBack />
        </div>

        <div className="overflow-y-auto pr-1 text-[16px] leading-[1.7] text-stone-600 break-words">
          {data?.description}
        </div>

        <div className="flex gap-3 justify-end">
          {/* <button
            type="button"
            className="w-9 h-9 rounded-md bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <FaTrash className="w-[18px] h-[18px] text-white" />
          </button> */}
          <button
            type="button"
            className="w-9 h-9 rounded-md bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <PiNotePencilDuotone className="w-[18px] h-[18px] text-white" />
          </button>
        </div>
      </main>
    </section>
  );
}
