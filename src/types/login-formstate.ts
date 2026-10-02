export type LoginFormState = {
  userName?: FormDataEntryValue | null;
  errors?: {
    userName?: string[];
    password?: string[];
    message?: string;
  };
  success?: boolean;
};
