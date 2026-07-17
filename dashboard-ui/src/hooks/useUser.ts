import { useEffect, useState } from "react";

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return user;
}