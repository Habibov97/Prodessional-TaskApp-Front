export type AddTaskFormState = {
  errors?: {
    title?: string[];
    priorityId?: string[];
    statusId?: string[];
    description?: string[];
  };
  message?: string;
  success?: boolean;
};
