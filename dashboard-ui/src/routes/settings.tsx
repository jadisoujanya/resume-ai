import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Volume2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/settings")({


  head: () => ({
    meta: [{ title: "Settings · Career Intelligence" }],
  }),
  component: Page,
});

const Row = ({
  icon: Icon,
  title,
  desc,
  value,
  onChange,
}: any) => (
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03]">
    <div className="w-9 h-9 rounded-lg bg-white/[0.05] grid place-items-center">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>

    <div className="flex-1">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-[11px] text-muted-foreground">
        {desc}
      </div>
    </div>

   <Switch
  checked={!!value}
  onCheckedChange={onChange}
/>
  </div>
);



function Page() {

  const defaultSettings = {
  push_notifications: true,
  weekly_email: true,
  ai_alerts: true,
  sound_effects: false,
  reduced_motion: false,
  high_contrast: false,
  auto_timezone: true,
  two_factor: false,
  recruiter_visibility: true,
  public_profile: false,
  auto_rewrite: true,
  explain_ai: true,
  share_data: false,
};


const [settings, setSettings] = useState(defaultSettings);


const updateSetting = async (
  key: keyof typeof defaultSettings,
  value: boolean
) => {
  const updated = {
    ...settings,
    [key]: value,
  };

  setSettings(updated);

  try {
    const res = await fetch("http://127.0.0.1:8000/settings/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    const result = await res.json();

    console.log("PUT STATUS:", res.status);
    console.log("PUT RESPONSE:", result);
  } catch (err) {
    console.error("PUT ERROR:", err);
  }
};


useEffect(() => {
  const loadSettings = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/settings/1");
      const data = await res.json();

      console.log("GET SETTINGS:", data);

      setSettings({
        push_notifications: data.push_notifications ?? true,
        weekly_email: data.weekly_email ?? true,
        ai_alerts: data.ai_alerts ?? true,
        sound_effects: data.sound_effects ?? false,
        reduced_motion: data.reduced_motion ?? false,
        high_contrast: data.high_contrast ?? false,
        auto_timezone: data.auto_timezone ?? true,
        two_factor: data.two_factor ?? false,
        recruiter_visibility: data.recruiter_visibility ?? true,
        public_profile: data.public_profile ?? false,
        auto_rewrite: data.auto_rewrite ?? true,
        explain_ai: data.explain_ai ?? true,
        share_data: data.share_data ?? false,
      });
    } catch (err) {
      console.error("GET ERROR:", err);
    }
  };

  loadSettings();
}, []);




  return (

    <AppLayout>
      <PageHeader eyebrow="Account" title="Settings" subtitle="Configure your account, notifications, appearance and AI preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


        <GlassCard title="Notifications">
          <div className="space-y-1">

            <Row
              icon={Bell}
              title="Push notifications"
              desc="New matches, interview invites, coach nudges"
              value={settings.push_notifications}
              onChange={(v: boolean) =>
                updateSetting("push_notifications", v)
              }
            />

            <Row
              icon={Mail}
              title="Weekly digest email"
              desc="Sunday summary of your career metrics"
              value={settings.weekly_email}
              onChange={(v: boolean) =>
                updateSetting("weekly_email", v)
              }
            />

            <Row
              icon={Sparkles}
              title="AI insight alerts"
              desc="Realtime market signal and role opportunities"
              value={settings.ai_alerts}
              onChange={(v: boolean) =>
                updateSetting("ai_alerts", v)
              }
              
            />

            <Row
              icon={Volume2}
              title="Sound effects"
              desc="Subtle audio for interactions"
              value={settings.sound_effects}
              onChange={(v: boolean) =>
                updateSetting("sound_effects", v)
              }
              
            />

          </div>
        </GlassCard>





        <GlassCard title="Appearance & Language">

          <div className="space-y-1">

            <Row
              icon={Palette}
              title="Reduced motion"
              desc="Minimize animations and transitions"
              value={settings.reduced_motion}
              onChange={(v: boolean) =>
                updateSetting("reduced_motion", v)
              }
              
            />

            <Row
              icon={Palette}
              title="High contrast"
              desc="Improved visibility for accessibility"
              value={settings.high_contrast}
              onChange={(v: boolean) =>
                updateSetting("high_contrast", v)
              }
              
            />

            <Row
              icon={Globe}
              title="Auto-detect timezone"
              desc="Currently: Asia/Kolkata (IST)"
              value={settings.auto_timezone}
              onChange={(v: boolean) =>
                updateSetting("auto_timezone", v)
              }
              
            />

          </div>

        </GlassCard>






        <GlassCard title="Privacy & Security">

          <div className="space-y-1">

            <Row
              icon={Shield}
              title="Two-factor authentication"
              desc="Extra security via authenticator app"
              value={settings.two_factor}
              onChange={(v: boolean) =>
                updateSetting("two_factor", v)
              }
              
            />

            <Row
              icon={Shield}
              title="Recruiter discoverability"
              desc="Allow verified recruiters to find you"
              value={settings.recruiter_visibility}
              onChange={(v: boolean) =>
                updateSetting("recruiter_visibility", v)
              }
              
            />

            <Row
              icon={Shield}
              title="Public profile"
              desc="A public share link for your resume"
              value={settings.public_profile}
              onChange={(v: boolean) =>
                updateSetting("public_profile", v)
              }
              
            />

          </div>

        </GlassCard>




        <GlassCard title="AI Preferences">

          <div className="space-y-1">

            <Row
              icon={Sparkles}
              title="Auto-rewrite bullets"
              desc="AI improves resume phrasing on save"
              value={settings.auto_rewrite}
              onChange={(v: boolean) =>
                updateSetting("auto_rewrite", v)
              }
              
            />

            <Row
              icon={Sparkles}
              title="Explainable AI decisions"
              desc="Show why the model made each recommendation"
              value={settings.explain_ai}
              onChange={(v: boolean) =>
                updateSetting("explain_ai", v)
              }
              
            />

            <Row
              icon={Sparkles}
              title="Share anonymized data for research"
              desc="Helps improve the model — never identifies you"
              value={settings.share_data}
              onChange={(v: boolean) =>
                updateSetting("share_data", v)
              }
              
            />

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