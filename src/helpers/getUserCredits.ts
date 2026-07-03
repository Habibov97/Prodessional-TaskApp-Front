import { fetchWithAuth } from '@/lib/fetchWithAuth.server';

export const getUser = async () => {
  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);
    if (!res) throw new Error('Cannot get user');

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
};
