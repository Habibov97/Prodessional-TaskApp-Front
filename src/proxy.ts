import { NextRequest, NextResponse } from 'next/server';
import { extractCookieValue } from '@/helpers/extract-cookie';
import { API_URL } from '@/lib/config';

const ACCESS_COOKIE_MAX_AGE = 1 * 24 * 60 * 60;
const REFRESH_COOKIE_MAX_AGE = 14 * 24 * 60 * 60;

function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof decoded.exp === 'number' ? decoded.exp : null;
  } catch {
    return null;
  }
}

function redirectToLogin(request: NextRequest, clearCookies: boolean) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  if (clearCookies) {
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
  }
  return response;
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
    return redirectToLogin(request, false);
  }

  let refreshRes: Response;
  try {
    refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { cookie: `refreshToken=${refreshToken}` },
    });
  } catch {
    // Backend unreachable: keep the session so the user is not logged out by a blip.
    return redirectToLogin(request, false);
  }

  const setCookieHeader = refreshRes.headers.get('set-cookie') ?? '';
  const newAccessToken = extractCookieValue(setCookieHeader, 'accessToken');
  const newRefreshToken = extractCookieValue(setCookieHeader, 'refreshToken');

  if (!refreshRes.ok || !newAccessToken) {
    return redirectToLogin(request, true);
  }

  // Update the incoming request too, so pages rendered for this same request
  // read the fresh token from cookies() instead of the expired one.
  request.cookies.set('accessToken', newAccessToken);
  if (newRefreshToken) request.cookies.set('refreshToken', newRefreshToken);

  const response = NextResponse.next({ request: { headers: request.headers } });

  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ACCESS_COOKIE_MAX_AGE,
  });

  if (newRefreshToken) {
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
