import { z } from 'zod';

// Mirrors the backend RegisterDto so users see these errors before submitting.
const alphanumeric = /^[a-zA-Z0-9]+$/;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, 'First name must be at least 3 characters')
      .regex(alphanumeric, 'First name can only contain letters and numbers'),

    lastName: z
      .string()
      .trim()
      .min(3, 'Last name must be at least 3 characters')
      .regex(alphanumeric, 'Last name can only contain letters and numbers'),

    userName: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot be more than 20 characters')
      .regex(alphanumeric, 'Username can only contain letters and numbers'),

    email: z.string().trim().toLowerCase().pipe(z.email('Invalid email address')),

    password: z.string().min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords are not same!',
  });
