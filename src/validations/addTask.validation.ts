import { z } from 'zod';

export const addTaskSchema = z.object({
  title: z.string().trim().min(5, 'Title must be minimum 5 symbol').max(100, 'Title 100 simvoldan çox ola bilməz'),

  priorityId: z.uuid('Must choose Priority'),

  statusId: z.uuid('Status seçilməlidir'),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be minimum 10 symbol')
    .max(2000, 'Description cannot be more than 2000 characters'),

  picture: z
    .any()
    .transform((val) => (val instanceof File && val.size > 0 ? val : undefined))
    .pipe(
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, 'Picture must be less than 5mb')
        .refine((file) => file.type.startsWith('image/'), 'File must be picture')
        .optional(),
    ),
});

export type AddTaskInput = z.infer<typeof addTaskSchema>;
