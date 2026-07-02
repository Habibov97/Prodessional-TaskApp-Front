'use server';
import { addTaskSchema } from '@/validations/addTask.validation';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import type { AddTaskFormState } from '@/types/addTask.types';
import { revalidatePath } from 'next/cache';

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function taskFormAction(prevState: AddTaskFormState, formData: FormData): Promise<AddTaskFormState> {
  const taskId = (formData.get('taskId') as string) || null;
  const isUpdate = !!taskId;

  const raw = {
    title: formData.get('title'),
    priorityId: formData.get('priorityId'),
    statusId: formData.get('statusId'),
    description: formData.get('description'),
    picture: formData.get('picture'),
  };

  const parsed = addTaskSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, success: false };
  }

  try {
    const res = await fetchWithAuth(`${backendUrl}/task${isUpdate ? `/${taskId}` : ''}`, {
      method: isUpdate ? 'PATCH' : 'POST',
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) return { success: false, message: 'Server error' };

    revalidatePath('/dashboard', 'layout');
    return { success: true, message: isUpdate ? 'Task has been updated' : 'Task has been added' };
  } catch {
    return { success: false, message: 'Something went wrong' };
  }
}
