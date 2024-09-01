export const login = async (email, password) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  const result = await response.json();
  return result;
};

export const logout = async (access, refresh) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/auth/logout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: access,
        refresh_token: refresh,
      }),
    }
  );
  const result = response.status;

  return result;
};

export const getProfile = async (token) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh_token: token }),
    }
  );
  const result = await response.json();

  return result;
};
