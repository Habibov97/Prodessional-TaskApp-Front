'use server';

import { revalidatePath } from 'next/cache';
import { unstable_rethrow } from 'next/navigation';
import { API_URL } from '@/lib/config';
import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { passwordSchema, profileSchema } from '@/validations/user.validation';
import { imageSchema } from '@/validations/addTask.validation';

export type FormActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  /** Submitted text values, restored after a failed attempt */
  values?: Record<string, string>;
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

async function send(path: string, init: RequestInit, fallback: string): Promise<FormActionState> {
  try {
    const res = await fetchWithAuth(`${API_URL}${path}`, init);
    if (!res.ok) return { success: false, message: await readErrorMessage(res, fallback) };
    const data = await res.json();
    // The user is shown in the sidebar and navbar, so refresh the whole dashboard.
    revalidatePath('/dashboard', 'layout');
    return { success: true, message: data.message };
  } catch (error) {
    unstable_rethrow(error);
    return { success: false, message: 'Something went wrong' };
  }
}

export async function updateProfileAction(prevState: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = profileSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  return send('/user/me', { method: 'PATCH', body: JSON.stringify(parsed.data) }, 'Could not update the profile');
}

export async function changePasswordAction(prevState: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  const { currentPassword, newPassword } = parsed.data;
  return send(
    '/user/me/password',
    { method: 'PATCH', body: JSON.stringify({ currentPassword, newPassword }) },
    'Could not change the password',
  );
}

export async function uploadAvatarAction(formData: FormData): Promise<FormActionState> {
  const image = imageSchema.safeParse(formData.get('avatar'));
  if (!image.success) return { success: false, message: image.error.issues[0]?.message };
  if (!image.data) return { success: false, message: 'Choose an image first' };

  const body = new FormData();
  body.append('file', image.data);
  return send('/user/me/avatar', { method: 'POST', body }, 'Could not upload the photo');
}

export async function removeAvatarAction(): Promise<FormActionState> {
  return send('/user/me/avatar', { method: 'DELETE' }, 'Could not remove the photo');
}
