let accessToken: string | null = null;

export const tokenStorage = {
  getAccessToken: () => accessToken,

  setAccessToken: (token: string) => {
    accessToken = token;
  },

  clearToken: () => {
    accessToken = null;
  },
};
