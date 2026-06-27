import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') ?? '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
  }

  const data = await res.json();

  return NextResponse.json({ accessToken: data.accessToken });
}
