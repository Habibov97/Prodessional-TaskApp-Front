import { z } from 'zod';

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
});

export type AddTaskInput = z.infer<typeof addTaskSchema>;
