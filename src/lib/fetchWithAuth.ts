let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRerfreshsed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem('accessToken');

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          resolve(
            fetch(url, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'application/json',
              },
            }),
          );
        });
      });
    }

    isRefreshing = true;

    const refreshRes = await fetch(`/api/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!refreshRes.ok) {
      isRefreshing = false;
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return res;
    }

    const { accessToken: newToken } = await refreshRes.json();
    localStorage.setItem('accessToken', newToken);

    isRefreshing = false;
    onRerfreshsed(newToken); // Digər gözləyən sorğulara yeni tokeni göndər

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return res;
}
