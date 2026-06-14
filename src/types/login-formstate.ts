export type LoginFormState = {
  userName?: FormDataEntryValue | null;
  password?: FormDataEntryValue | null;
  errors?: {
    userName?: string[];
    password?: string[];
    message?: string[];
  };
  success?: string | string[] | object;
};
