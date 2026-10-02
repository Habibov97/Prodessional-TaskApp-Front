import { z } from 'zod';

const alphanumeric = /^[a-zA-Z0-9]+$/;

// Mirrors the backend UpdateProfileDto
export const profileSchema = z.object({
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
  email: z.string().trim().toLowerCase().pipe(z.email('Invalid email address')),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(72, 'Password cannot be more than 72 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords are not same!',
  });
