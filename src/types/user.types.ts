export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
  isActive: boolean;
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
};
