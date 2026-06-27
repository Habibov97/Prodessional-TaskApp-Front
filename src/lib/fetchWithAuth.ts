let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch('/api/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) return null;

        const { accessToken } = await res.json();
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const isFormData = options.body instanceof FormData;
  const buildHeaders = (token: string | null) => ({
    ...options.headers,
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  });

  const accessToken = localStorage.getItem('accessToken');
  let res = await fetch(url, { ...options, headers: buildHeaders(accessToken) });

  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return res;
    }

    res = await fetch(url, { ...options, headers: buildHeaders(newToken) });
  }

  return res;
}
