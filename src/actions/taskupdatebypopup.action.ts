'use server';

import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { revalidatePath } from 'next/cache';

export type ActionState = {
  vitalTask?: boolean;
  success?: boolean;
  error?: string | null;
};

export async function isVitalTask(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const vitalTaskValue = formData.get('vitalTask');
  const taskId = formData.get('taskId');

  const isVital = vitalTaskValue === 'true' ? false : true;

  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ vitalTask: isVital }),
    });

    if (!res) {
      return {
        success: false,
        error: 'Cannot update isVital',
      };
    }

    const data = await res.json();

    revalidatePath('/dashboard');

    return {
      success: true,
      vitalTask: data.data.vitalTask,
      error: null,
    };
  } catch {
    return {
      success: false,
      error: 'Some error happend',
    };
  }
}
