'use server';

import { extractCookieValue } from '@/helpers/extract-cookie';
import { API_URL } from '@/lib/config';
import { LoginFormState } from '@/types/login-formstate';
import { RegisterFormState } from '@/types/register-formstate';
import { loginSchema } from '@/validations/login.validation';
import { registerSchema } from '@/validations/register.validation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function readFormError(response: Response) {
  try {
    const body = await response.json();
    if (Array.isArray(body?.message)) return body.message.join(', ');
    if (typeof body?.message === 'string') return body.message;
  } catch {
    // Body was not JSON, use the fallback below.
  }
  return 'Something went wrong, please try again';
}

export async function submitRegisterForm(previousState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const raw = {
    firstName: formData.get('firstname'),
    lastName: formData.get('lastname'),
    userName: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const values = { firstName: raw.firstName, lastName: raw.lastName, userName: raw.userName, email: raw.email };

  const result = registerSchema.safeParse(raw);

  if (!result.success) {
    return { ...values, errors: result.error.flatten().fieldErrors };
  }

  try {
    const { firstName, lastName, userName, email, password } = result.data;
    const body = { firstName, lastName, userName, email, password };
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return { ...values, errors: { message: await readFormError(response) } };
    }

    const data = await response.json();
    return { ...values, errors: {}, success: data.message };
  } catch {
    return { ...values, errors: { message: 'Could not reach the server, please try again' } };
  }
}

export async function submitLoginForm(previousState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const raw = {
    userName: formData.get('username'),
    password: formData.get('password'),
  };

  const result = loginSchema.safeParse(raw);

  if (!result.success) {
    return { userName: raw.userName, errors: result.error.flatten().fieldErrors };
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    });
  } catch {
    return { userName: raw.userName, errors: { message: 'Could not reach the server, please try again' } };
  }

  if (!response.ok) {
    return { userName: raw.userName, errors: { message: await readFormError(response) } };
  }

  const cookieStore = await cookies();
  const setCookie = response.headers.get('set-cookie');

  if (setCookie) {
    cookieStore.set('refreshToken', extractCookieValue(setCookie, 'refreshToken'), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 14 * 24 * 60 * 60,
    });

    cookieStore.set('accessToken', extractCookieValue(setCookie, 'accessToken'), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1 * 24 * 60 * 60,
    });
  }

  return { userName: raw.userName, errors: {}, success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // Revoke the refresh token on the backend; local cookies are cleared either way.
  if (accessToken) {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch {
      // Backend unreachable: still log the user out locally.
    }
  }

  cookieStore.delete('refreshToken');
  cookieStore.delete('accessToken');
  redirect('/login');
}
