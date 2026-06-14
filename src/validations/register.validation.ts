import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),

    lastName: z.string().min(2, 'Last name must be at least 2 characters'),

    userName: z.string().min(3, 'Username must be at least 3 characters'),

    email: z.email('Invalid email address'),

    password: z.string().min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords are not same!',
  });
