import { NextRequest, NextResponse } from 'next/server';
import { extractCookieValue } from '@/helpers/extract-cookie';

function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof decoded.exp === 'number' ? decoded.exp : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const exp = accessToken ? decodeJwtExp(accessToken) : null;
  const isExpiredOrMissing = !exp || exp * 1000 < Date.now() + 5000; // 5s buffer

  if (!isExpiredOrMissing) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { cookie: `refreshToken=${refreshToken}` },
  });

  if (!refreshRes.ok) {
    const redirectRes = NextResponse.redirect(new URL('/login', request.url));
    redirectRes.cookies.delete('accessToken');
    redirectRes.cookies.delete('refreshToken');
    return redirectRes;
  }

  const setCookieHeader = refreshRes.headers.get('set-cookie') ?? '';
  const newRefreshToken = extractCookieValue(setCookieHeader, 'refreshToken');
  const newAccessToken = extractCookieValue(setCookieHeader, 'accessToken');

  // request.cookies.set('accessToken', data.accessToken);
  // if (newRefreshToken) {
  //   request.cookies.set('refreshToken', newRefreshToken);
  // }

  const response = NextResponse.next({ request });

  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1 * 24 * 60 * 60,
  });

  if (newRefreshToken) {
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 14 * 24 * 60 * 60,
    });
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
