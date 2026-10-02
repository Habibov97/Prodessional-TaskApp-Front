export type TaskType = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  /** Calendar date, YYYY-MM-DD */
  dueDate: string | null;
  completedAt: string | null;
  vitalTask: boolean;
  priorityId: string;
  priority: {
    createdAt: string;
    id: string;
    parentId: string;
    title: string;
    updatedAt: string;
  };
  statusId: string;
  status: {
    createdAt: string;
    id: string;
    parentId: string;
    title: string;
    updatedAt: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse = {
  data: TaskType[];
};
