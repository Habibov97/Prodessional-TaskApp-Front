import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to load categories' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
