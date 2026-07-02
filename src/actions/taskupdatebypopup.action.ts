'use server';

import { fetchWithAuth } from '@/lib/fetchWithAuth.server';
import { revalidatePath } from 'next/cache';

export interface ActionStateVital {
  vitalTask?: boolean;
  success?: boolean;
  error?: string | null;
}

export interface ActionStateCompleted {
  completed?: boolean;
  success?: boolean;
  error?: string | null;
}

export async function isVitalTask(prevState: ActionStateVital, formData: FormData): Promise<ActionStateVital> {
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

export async function isCompleted(prevState: ActionStateCompleted, formData: FormData): Promise<ActionStateCompleted> {
  const statusId = formData.get('statusId');
  const taskId = formData.get('taskId');

  // kategoriyalari cagir
  // ordan completedin idsini gotur
  // taskId ile taski tap
  // Eger taskin id-si completed deyilse deye yoxla
  // taskin statusIdsini completedin idsi ile patchle

  try {
    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
    if (!categoryRes) throw new Error('Invalid category response');

    const categoryArr = await categoryRes.json();

    const category = categoryArr?.map((item: any) => item.children);
    const completedId = category.flat().find((item: any) => item.title === 'Completed')?.id;

    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ statusId: completedId }),
    });

    if (!res) {
      return {
        success: false,
        error: 'Cannot update isCompleted',
      };
    }

    const data = await res.json();

    revalidatePath('/dashboard');

    return {
      success: true,
      completed: data.data.completed,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Some error happend',
    };
  }
}
