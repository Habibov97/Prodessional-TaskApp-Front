import z from 'zod';

export const loginSchema = z.object({
  userName: z.string().min(3, 'Username cannot be less than 3 characters'),
  password: z.string().min(3, 'Password cannot be less than 3 characters'),
});
