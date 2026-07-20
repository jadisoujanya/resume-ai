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

export async function uploadResume(file: File, userId: number) {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("user_id", String(userId));

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


export async function getAnalytics(userId: number) {
  const response = await fetch(`${API}/analytics/${userId}`);
  return response.json();
}

export async function getLearning(userId: number) {

    const response = await fetch(
        `${API}/learning/${userId}`
    );

    return response.json();
}

export async function askCareerCoach(
  userId: number,
  message: string
) {

  const response = await fetch(`${API}/career-coach`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      user_id: userId,
      message,
    }),

  });

  return response.json();
}


export async function generateInterview(userId:number, role:string){

    const res = await axios.post(
        "http://127.0.0.1:8000/interview/generate",
        {
            user_id:userId,
            role,
            difficulty:"Medium"
        }
    );

    console.log(res.data);

    return res.data;
}

export async function getInterviewFeedback(
  question: string,
  answer: string
) {
  const res = await fetch(
    "http://localhost:8000/interview/feedback",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
      }),
    }
  );

  return await res.json();
}