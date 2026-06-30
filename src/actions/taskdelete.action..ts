'use server';

import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { revalidatePath } from 'next/cache';

export async function deleteTaskAction(formData: FormData) {
  const taskId = formData.get('taskId');

  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task/${String(taskId)}`, {
      method: 'DELETE',
    });

    if (!res) throw new Error('Cannot procces the delete event');

    const data = await res.json();

    revalidatePath('/dashboard');

    return data;
  } catch (error) {
    console.log(error);
  }
}
