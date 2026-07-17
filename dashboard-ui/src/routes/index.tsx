import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user) {
      navigate({ to: "/welcome" });
      return;
    }

    if (role === "recruiter") {
      navigate({ to: "/recruiter" });
    } else {
      navigate({ to: "/candidate" });
    }
  }, [navigate]);

  return null;
}