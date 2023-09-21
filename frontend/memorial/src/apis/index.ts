const BASE_URL = import.meta.env.VITE_APP_API_URL;

const request = async (path: string, init?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      const isAdminRequest = path.startsWith("/admin");
      const expiredTokenKey = isAdminRequest
        ? "admin-login-token"
        : "login-token";
      localStorage.setItem(expiredTokenKey, "");
      const redirectUrl = `${location.origin}${isAdminRequest ? "/admin" : ""}`;
      if (!location.pathname.endsWith("/login")) {
        location.href = `${redirectUrl}/login`;
      }
    }

    throw new Error(response.status.toString());
  }
  return response;
};

export const api = {
  get: <T = unknown>(path: string, init?: RequestInit) =>
    request(path, init).then<T>((response) => response.json()),

  put: <T = unknown>(path: string, init?: RequestInit, payload?: T) =>
    request(path, {
      headers: init?.headers,
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  post: <T = unknown>(path: string, init?: RequestInit, payload?: T) =>
    request(path, {
      headers: init?.headers,
      method: "POST",
      body: JSON.stringify(payload),
    }),

  delete: <T = unknown>(path: string, init?: RequestInit, payload?: T) =>
    request(path, {
      headers: init?.headers,
      method: "DELETE",
      body: JSON.stringify(payload),
    }),
};
