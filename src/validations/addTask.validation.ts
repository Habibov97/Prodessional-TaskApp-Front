import { z } from 'zod';

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const addTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be minimum 5 symbol')
    .max(100, 'Title cannot be more then 100 characters'),

  priorityId: z.uuid('Priority must be selected'),

  statusId: z.uuid('Status must be selected'),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be minimum 10 symbol')
    .max(2000, 'Description cannot be more than 2000 characters'),

  // Empty input clears the due date
  dueDate: z
    .string()
    .trim()
    .transform((value) => value || null)
    .pipe(z.iso.date('Pick a valid date').nullable()),
});

// An empty file input submits a 0-byte File, which means "no new image".
export const imageSchema = z
  .any()
  .transform((value) => (value instanceof File && value.size > 0 ? value : undefined))
  .pipe(
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Image must be smaller than 5MB')
      .refine((file) => IMAGE_TYPES.includes(file.type), 'Image must be JPG, PNG, WEBP or GIF')
      .optional(),
  );

export type AddTaskInput = z.infer<typeof addTaskSchema>;
