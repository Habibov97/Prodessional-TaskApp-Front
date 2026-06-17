export type RegisterFormState = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  password?: string;
  confirmPassword?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    userName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    message?: string[];
  };
  success?: string;
};
