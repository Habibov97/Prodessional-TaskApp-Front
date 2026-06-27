export type AddTaskFormState = {
  errors?: {
    title?: string[];
    priority?: string[];
    status?: string[];
    description?: string[];
    picture?: string[];
  };
  message?: string;
  success?: boolean;
};
