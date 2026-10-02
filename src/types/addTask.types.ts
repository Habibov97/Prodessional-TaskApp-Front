export type AddTaskFormState = {
  errors?: {
    title?: string[];
    priorityId?: string[];
    statusId?: string[];
    description?: string[];
    dueDate?: string[];
    image?: string[];
  };
  message?: string;
  success?: boolean;
  /** Saved, but something optional (the image) failed */
  warning?: boolean;
  /** Submitted text values, restored after a failed attempt */
  values?: Record<string, string>;
  /** Increments on every failed attempt; remounts the image picker */
  attempt?: number;
};
