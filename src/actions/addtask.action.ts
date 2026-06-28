'use server';
import { addTaskSchema } from '@/validations/addTask.validation';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import type { AddTaskFormState } from '@/types/addTask.types';
import { revalidatePath } from 'next/cache';

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function addTaskAction(prevState: AddTaskFormState, formData: FormData): Promise<AddTaskFormState> {
  const raw = {
    title: formData.get('title'),
    priorityId: formData.get('priorityId'),
    statusId: formData.get('statusId'),
    description: formData.get('description'),
    picture: formData.get('picture'),
  };

  const parsed = addTaskSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const res = await fetchWithAuth(`${backendUrl}/task`, {
      method: 'POST',
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      return { success: false, message: 'Server error' };
    }

    revalidatePath('/dashboard');

    return { success: true, message: 'Task has been added' };
  } catch (err) {
    return { success: false, message: 'Something went wrong' };
  }
}
