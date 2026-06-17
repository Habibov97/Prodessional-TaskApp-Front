'use client';
import Link from 'next/link';

export default function Welcoming() {
  return (
    <section className="flex justify-between">
      <h1 className="text-3xl font-semibold text-[#333]">Welcome Najaf Habibov 👋</h1>
      <div className="flex gap-[20px] items-center">
        <div className="flex gap-1">
          <p className="w-[36px] h-[36px] rounded-xl  bg-stone-200"></p>
          <p className="w-[36px] h-[36px] rounded-xl  bg-stone-200"></p>
          <p className="w-[36px] h-[36px] rounded-xl  bg-stone-200"></p>
          <p className="w-[36px] h-[36px] rounded-xl  bg-stone-200"></p>
          <p className="w-[36px] h-[36px] rounded-xl  bg-stone-200"></p>
        </div>
        <div className="flex justify-center items-center  border border-green-500 rounded-md text-green-500 w-[100px] py-[10px]">
          <Link href="#">Invite</Link>
        </div>
      </div>
    </section>
  );
}
