import { TaskType } from '@/types/task.types';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import VitalTaskContent from '@/components/VitalTaskContent';

export default async function VitalTaskPage() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task`);
  const tasks = await res.json();

  const vitalTasks = tasks?.data.filter((item: TaskType) => item.vitalTask === true);

  return <VitalTaskContent vitalTasks={vitalTasks} />;
}
