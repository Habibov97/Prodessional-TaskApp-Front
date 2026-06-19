import GoBack from '@/components/GoBack';

export default function TaskCategories() {
  return (
    <section className="px-[76px] flex-1">
      <main className="flex flex-col gap-5 border shadow-[0_0_5px_rgba(0,0,0,0.08)] p-[26px] mb-[26px] h-[76dvh]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="relative text-xl font-bold pb-1 after:absolute after:bottom-0 after:left-1 after:h-[2px] after:w-1/2 after:bg-green-500">
            Task Categories
          </h2>
          <GoBack />
        </div>
      </main>
    </section>
  );
}
