import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, Palette, Globe, Mail, Volume2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Career Intelligence" }] }),
  component: Page,
});

const Row = ({ icon: Icon, title, desc, defaultChecked = false }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03]">
    <div className="w-9 h-9 rounded-lg bg-white/[0.05] grid place-items-center"><Icon className="w-4 h-4 text-muted-foreground" /></div>
    <div className="flex-1"><div className="text-sm font-medium">{title}</div><div className="text-[11px] text-muted-foreground">{desc}</div></div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Account" title="Settings" subtitle="Configure your account, notifications, appearance and AI preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard title="Notifications">
          <div className="space-y-1">
            <Row icon={Bell} title="Push notifications" desc="New matches, interview invites, coach nudges" defaultChecked />
            <Row icon={Mail} title="Weekly digest email" desc="Sunday summary of your career metrics" defaultChecked />
            <Row icon={Sparkles} title="AI insight alerts" desc="Realtime market signal and role opportunities" defaultChecked />
            <Row icon={Volume2} title="Sound effects" desc="Subtle audio for interactions" />
          </div>
        </GlassCard>

        <GlassCard title="Appearance & Language">
          <div className="space-y-1">
            <Row icon={Palette} title="Reduced motion" desc="Minimize animations and transitions" />
            <Row icon={Palette} title="High contrast" desc="Improved visibility for accessibility" />
            <Row icon={Globe} title="Auto-detect timezone" desc="Currently: Asia/Kolkata (IST)" defaultChecked />
          </div>
        </GlassCard>

        <GlassCard title="Privacy & Security">
          <div className="space-y-1">
            <Row icon={Shield} title="Two-factor authentication" desc="Extra security via authenticator app" defaultChecked />
            <Row icon={Shield} title="Recruiter discoverability" desc="Allow verified recruiters to find you" defaultChecked />
            <Row icon={Shield} title="Public profile" desc="A public share link for your resume" />
          </div>
        </GlassCard>

        <GlassCard title="AI Preferences">
          <div className="space-y-1">
            <Row icon={Sparkles} title="Auto-rewrite bullets" desc="AI improves resume phrasing on save" defaultChecked />
            <Row icon={Sparkles} title="Explainable AI decisions" desc="Show why the model made each recommendation" defaultChecked />
            <Row icon={Sparkles} title="Share anonymized data for research" desc="Helps improve the model — never identifies you" />
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Danger zone" className="mt-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium">Delete account</div>
            <div className="text-[11px] text-muted-foreground">Permanently removes your resumes, analytics history and coach memory.</div>
          </div>
          <button className="px-3.5 py-2 rounded-lg bg-destructive/15 text-destructive text-sm font-medium border border-destructive/30">Delete account</button>
        </div>
      </GlassCard>
    </AppLayout>
  );
}
