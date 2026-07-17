import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { useUser } from "@/hooks/useUser";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllNotificationsRead,
} from "@/lib/api";

import {
  Briefcase,
  User,
  Bell as BellIcon,
  Calendar,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [{ title: "Notifications · Career Intelligence" }],
  }),
  component: Page,
});

const iconFor = (type: string) => {
  if (type === "match") return Briefcase;
  if (type === "recruiter") return User;
  if (type === "interview") return Calendar;
  return BellIcon;
};

function Page() {
  const user = useUser();

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/notifications/${user.id}`)
      .then((res) => {
        setNotifications(res.data);
      })
      .catch(console.error);
  }, [user]);



  const unreadNotifications = notifications.filter(
  (n: any) => !n.is_read
);

const readNotifications = notifications.filter(
  (n: any) => n.is_read
);


console.log(notifications);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        subtitle="Everything from AI Coach, recruiters, and the system in one place."
        actions={
          <button
            onClick={async () => {
              if (!user?.id) return;
               await markAllNotificationsRead(user.id);

              const res = await api.get(`/notifications/${user.id}`);
              
              setNotifications(res.data);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-sm"
          >
            <Check className="w-4 h-4" />
            Mark all read
          </button>
        }
      />

    <GlassCard padded={false}>
  <ul className="divide-y divide-border/50">

    {notifications.length === 0 ? (

      <li className="p-6 text-center text-muted-foreground text-sm">
        No notifications yet.
      </li>

    ) : (

      <>
        {/* ---------------- UNREAD ---------------- */}

        {unreadNotifications.map((n: any) => {
          const Icon = iconFor(n.type);

          return (
            <li
              key={n.id}
              className="p-4 flex items-center gap-4 hover:bg-white/[0.02]"
            >
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-primary/15 text-primary">
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <div className="text-sm font-medium">
                  {n.title}
                </div>

                <div className="text-xs text-muted-foreground">
                  {n.message}
                </div>

                <div className="text-[11px] text-muted-foreground mt-1">
                  {new Date(n.created_at).toLocaleTimeString()}
                </div>
              </div>

              <Badge tone="primary">
                New
              </Badge>
            </li>
          );
        })}

        {/* ---------------- READ SECTION ---------------- */}

        {readNotifications.length > 0 && (
          <li className="px-4 py-2 bg-white/[0.02] text-xs uppercase tracking-wider text-muted-foreground">
            Earlier
          </li>
        )}

        {readNotifications.map((n: any) => {
          const Icon = iconFor(n.type);

          return (
            <li
              key={n.id}
              className="p-4 flex items-center gap-4 opacity-60 hover:bg-white/[0.02]"
            >
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-white/[0.04] text-muted-foreground">
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <div className="text-sm font-medium">
                  {n.title}
                </div>

                <div className="text-xs text-muted-foreground">
                  {n.message}
                </div>

                <div className="text-[11px] text-muted-foreground mt-1">
                  {new Date(n.created_at).toLocaleTimeString()}
                </div>
              </div>
            </li>
          );
        })}
      </>

    )}

  </ul>
</GlassCard>
    </AppLayout>
  );
}