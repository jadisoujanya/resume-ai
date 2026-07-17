import axios from "axios";

const API = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API,
});

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}

export async function signupUser(data: any) {
  const response = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API}/upload-resume/`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}


export async function getNotifications(userId: number) {
    const response = await fetch(`${API}/notifications/${userId}`);
    return response.json();
}

export async function markNotificationRead(id: number) {
    await fetch(`${API}/notifications/read/${id}`, {
        method: "PUT",
    });
}

export async function markAllNotificationsRead(userId: number) {
  await fetch(`${API}/notifications/read-all/${userId}`, {
    method: "PUT",
  });
}