'use server';

import { revalidatePath } from 'next/cache';
import { redirect, unstable_rethrow } from 'next/navigation';
import { API_URL } from '@/lib/config';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { getCategories } from '@/lib/api';
import { COMPLETED, titleKey } from '@/constants/task.constants';
import { addTaskSchema, imageSchema } from '@/validations/addTask.validation';
import type { AddTaskFormState } from '@/types/addTask.types';

export type TaskActionResult = {
  success: boolean;
  message: string;
};

async function readErrorMessage(res: Response, fallback: string) {
  try {
    const body = await res.json();
    if (Array.isArray(body?.message)) return body.message.join(', ');
    if (typeof body?.message === 'string') return body.message;
  } catch {
    // Body was not JSON, use the fallback below.
  }
  return fallback;
}

function revalidateDashboard() {
  revalidatePath('/dashboard', 'layout');
}

async function patchTask(taskId: string, body: Record<string, unknown>, successMessage: string) {
  try {
    const res = await fetchWithAuth(`${API_URL}/task/${encodeURIComponent(taskId)}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return { success: false, message: await readErrorMessage(res, 'Could not update the task') };
    }
  } catch (error) {
    // Let the redirect to /login from fetchWithAuth through.
    unstable_rethrow(error);
    return { success: false, message: 'Something went wrong' };
  }

  revalidateDashboard();
  return { success: true, message: successMessage };
}

async function syncTaskImage(taskId: string, image: File | undefined, removeImage: boolean) {
  if (image) {
    const body = new FormData();
    body.append('file', image);
    const res = await fetchWithAuth(`${API_URL}/task/${encodeURIComponent(taskId)}/image`, { method: 'POST', body });
    if (!res.ok) return readErrorMessage(res, 'Image upload failed');
  } else if (removeImage) {
    const res = await fetchWithAuth(`${API_URL}/task/${encodeURIComponent(taskId)}/image`, { method: 'DELETE' });
    if (!res.ok) return readErrorMessage(res, 'Could not remove the image');
  }
  return null;
}

export async function taskFormAction(prevState: AddTaskFormState, formData: FormData): Promise<AddTaskFormState> {
  const taskId = (formData.get('taskId') as string) || null;
  const isUpdate = !!taskId;

  const parsed = addTaskSchema.safeParse({
    title: formData.get('title'),
    priorityId: formData.get('priorityId'),
    statusId: formData.get('statusId'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate') ?? '',
  });
  const image = imageSchema.safeParse(formData.get('image'));

  if (!parsed.success || !image.success) {
    return {
      errors: {
        ...(parsed.success ? {} : parsed.error.flatten().fieldErrors),
        ...(image.success ? {} : { image: image.error.issues.map((issue) => issue.message) }),
      },
      success: false,
    };
  }

  let savedTaskId = taskId;
  let imageError: string | null = null;

  try {
    const res = await fetchWithAuth(`${API_URL}/task${isUpdate ? `/${encodeURIComponent(taskId)}` : ''}`, {
      method: isUpdate ? 'PATCH' : 'POST',
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      return { success: false, message: await readErrorMessage(res, 'Server error') };
    }

    const { data } = await res.json();
    savedTaskId = data?.id ?? taskId;

    if (savedTaskId) {
      imageError = await syncTaskImage(savedTaskId, image.data, formData.get('removeImage') === 'on');
    }
  } catch (error) {
    unstable_rethrow(error);
    return { success: false, message: 'Something went wrong' };
  }

  revalidateDashboard();

  const message = isUpdate ? 'Task has been updated' : 'Task has been added';
  // The task itself is saved at this point, so report the image problem without failing.
  return imageError
    ? { success: true, message: `${message}, but the image was not saved: ${imageError}`, warning: true }
    : { success: true, message };
}

export async function toggleVitalTaskAction(taskId: string, vitalTask: boolean): Promise<TaskActionResult> {
  return patchTask(taskId, { vitalTask }, vitalTask ? 'Task marked as vital' : 'Task removed from vital tasks');
}

export async function completeTaskAction(taskId: string): Promise<TaskActionResult> {
  const { statuses } = await getCategories();
  const completed = statuses.find((status) => titleKey(status.title) === COMPLETED);

  if (!completed) {
    return { success: false, message: 'The "Completed" status does not exist' };
  }

  return patchTask(taskId, { statusId: completed.id }, 'Task marked as completed');
}

export async function deleteTaskAction(taskId: string, redirectTo?: string): Promise<TaskActionResult> {
  try {
    const res = await fetchWithAuth(`${API_URL}/task/${encodeURIComponent(taskId)}`, { method: 'DELETE' });
    if (!res.ok) {
      return { success: false, message: await readErrorMessage(res, 'Could not delete the task') };
    }
  } catch (error) {
    // Let the redirect to /login from fetchWithAuth through.
    unstable_rethrow(error);
    return { success: false, message: 'Something went wrong' };
  }

  revalidateDashboard();
  // Redirecting from the action avoids re-rendering a page whose task is gone.
  if (redirectTo) redirect(redirectTo);

  return { success: true, message: 'Task has been deleted' };
}
