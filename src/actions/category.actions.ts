'use server';

import { revalidatePath } from 'next/cache';
import { unstable_rethrow } from 'next/navigation';
import { z } from 'zod';
import { API_URL } from '@/lib/config';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import type { FormActionState } from './user.actions';

const titleSchema = z
  .string()
  .trim()
  .min(3, 'Title must be at least 3 characters')
  .max(30, 'Title cannot be more than 30 characters');

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

async function send(path: string, init: RequestInit, fallback: string): Promise<FormActionState> {
  try {
    const res = await fetchWithAuth(`${API_URL}${path}`, init);
    if (!res.ok) return { success: false, message: await readErrorMessage(res, fallback) };
    const data = await res.json();
    // Categories feed the task forms on every dashboard page.
    revalidatePath('/dashboard', 'layout');
    return { success: true, message: data.message };
  } catch (error) {
    unstable_rethrow(error);
    return { success: false, message: 'Something went wrong' };
  }
}

/** Creates a category when `id` is empty, otherwise renames it. */
export async function saveCategoryAction(prevState: FormActionState, formData: FormData): Promise<FormActionState> {
  const title = titleSchema.safeParse(formData.get('title'));
  if (!title.success) return { success: false, errors: { title: title.error.issues.map((i) => i.message) } };

  const id = (formData.get('id') as string) || null;
  if (id) {
    return send(
      `/category/${encodeURIComponent(id)}`,
      { method: 'PATCH', body: JSON.stringify({ title: title.data }) },
      'Could not rename the category',
    );
  }

  const parentId = formData.get('parentId') as string;
  return send(
    '/category',
    { method: 'POST', body: JSON.stringify({ title: title.data, parentId }) },
    'Could not create the category',
  );
}

export async function deleteCategoryAction(id: string): Promise<FormActionState> {
  return send(`/category/${encodeURIComponent(id)}`, { method: 'DELETE' }, 'Could not delete the category');
}
