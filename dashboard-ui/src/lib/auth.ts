const API = "http://127.0.0.1:8000";

export async function signup(data: any) {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.detail || "Signup Failed");
  }

  return result;
}

export async function login(data: any) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.detail || "Login Failed");
  }

  return result;
}