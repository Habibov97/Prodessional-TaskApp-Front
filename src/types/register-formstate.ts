export type RegisterFormState = {
  firstName?: FormDataEntryValue | null;
  lastName?: FormDataEntryValue | null;
  userName?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  password?: FormDataEntryValue | null;
  confirmPassword?: FormDataEntryValue | null;
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
