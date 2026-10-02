import DashboardContent from '@/components/DashboardContent';
import Welcoming from '@/components/Welcoming';
import { getCategories, getMe, getTasks } from '@/lib/api';

export default async function Home() {
  const [user, tasks, categories] = await Promise.all([getMe(), getTasks(), getCategories()]);

  return (
    <div className="flex flex-col gap-6 lg:h-full lg:min-h-[600px]">
      <Welcoming user={user} />
      <DashboardContent tasks={tasks} categories={categories} />
    </div>
  );
}
