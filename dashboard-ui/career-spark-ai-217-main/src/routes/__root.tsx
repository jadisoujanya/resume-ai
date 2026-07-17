import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ModeProvider } from "../lib/mode-store";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-2xl p-10">
        <div className="text-6xl font-semibold gradient-text tracking-tight">404</div>
        <h2 className="mt-3 text-lg font-semibold">Page not found</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-lg gradient-primary-bg px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-2xl p-10">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">We couldn't load this page. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-lg gradient-primary-bg px-4 py-2 text-sm font-medium text-white">Try again</button>
          <a href="/" className="rounded-lg border border-border bg-white/[0.03] px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Career Intelligence — Smart Hiring System" },
      { name: "description", content: "AI-powered resume analysis, ATS scoring, career prediction and recruiter intelligence — an enterprise-grade Career Intelligence platform." },
      { name: "author", content: "Career Intelligence" },
      { property: "og:title", content: "Career Intelligence — Smart Hiring System" },
      { property: "og:description", content: "AI-powered career guidance and smart hiring, in one platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ModeProvider>
        <Outlet />
        <Toaster />
      </ModeProvider>
    </QueryClientProvider>
  );
}
