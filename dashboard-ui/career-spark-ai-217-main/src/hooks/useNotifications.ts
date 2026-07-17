import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { api } from "@/lib/api";

export function useNotifications() {
  const user = useUser();

  const [notifications, setNotifications] = useState<any[]>([]);

  const loadNotifications = async () => {
    if (!user?.id) return;

    try {
      const res = await api.get(`/notifications/${user.id}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed loading notifications", err);
    }
  };

  useEffect(() => {
    loadNotifications();

    // Auto refresh every 10 seconds
    const interval = setInterval(loadNotifications, 10000);

    return () => clearInterval(interval);
  }, [user]);

  return {
    notifications,

    unreadCount: notifications.filter((n) => !n.is_read).length,

    reload: loadNotifications,
  };
}