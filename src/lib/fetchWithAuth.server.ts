import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect('/login');
  }

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    redirect('/login');
  }

  return res;
}
