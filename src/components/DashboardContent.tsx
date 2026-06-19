import ProgressDetails from './ProgressDetails';
import CompletedTask from './CompletedTask';
import ToDo from './ToDo';

export default function DashboardContent() {
  return (
    <main className="border shadow-[0_0_25px_rgba(0,0,0,0.08)] p-[26px] mt-[26px] mb-[26px] h-[76dvh]">
      <div className="grid grid-cols-2 grid-rows-5 gap-2 h-full">
        <ToDo />
        <ProgressDetails />
        <CompletedTask />
      </div>
    </main>
  );
}
