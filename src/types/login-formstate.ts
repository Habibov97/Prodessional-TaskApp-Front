export type LoginFormState = {
  userName?: string;
  password?: string;
  errors?: {
    userName?: string[];
    password?: string[];
    message?: string[];
  };
  success?: string | string[] | object;
  accessToken?: string;
};
