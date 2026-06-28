import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { TaskType } from '@/types/task.types';
import MyTaskContent from '@/components/MyTaskContent';

export default async function MyTaskPage() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task`);
  const tasks = await res.json();

  const myTasks = tasks?.data.filter((item: TaskType) => item.vitalTask === false);

  return <MyTaskContent myTasks={myTasks} />;
}
