'use server';

import { extractCookieValue } from '@/helpers/extract-cookie';
import { LoginFormState } from '@/types/login-formstate';
import { RegisterFormState } from '@/types/register-formstate';
import { loginSchema } from '@/validations/login.validation';
import { registerSchema } from '@/validations/register.validation';
import { cookies } from 'next/headers';

const backendUrl = process.env.API_URL;

export async function submitRegisterForm(previousState: RegisterFormState, formData: FormData) {
  const raw = {
    firstName: formData.get('firstname'),
    lastName: formData.get('lastname'),
    userName: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = registerSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      ...raw,
      password: undefined,
      confirmPassword: undefined,
      errors,
    };
  }

  const response = await fetch(`${backendUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...result.data, confirmPassword: undefined }),
  });

  if (!response.ok) {
    const errors = await response.json();

    return {
      ...raw,
      password: undefined,
      confirmPassword: undefined,
      errors,
    };
  }

  const data = await response.json();

  return { ...raw, password: undefined, confirmPassword: undefined, errors: {}, success: data.message };
}

export async function submitLoginForm(previousState: LoginFormState, formData: FormData) {
  const raw = {
    userName: formData.get('username'),
    password: formData.get('password'),
  };

  const result = loginSchema.safeParse(raw);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      ...raw,
      password: undefined,
      errors,
    };
  }

  const response = await fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result.data),
  });

  if (!response.ok) {
    const errors = await response.json();

    return {
      ...raw,
      password: undefined,
      errors,
    };
  }

  const data = await response.json();

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
  return { ...raw, password: undefined, errors: {}, success: data };
}

export async function logoutAction() {
  const cookieStorage = await cookies();
  cookieStorage.delete('refreshToken');
  cookieStorage.delete('accessToken');
  return true;
}
