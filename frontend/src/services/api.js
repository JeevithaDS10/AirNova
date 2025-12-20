const BASE_URL = "http://127.0.0.1:9000";

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}
