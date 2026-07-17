import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { Badge, Progress } from "@/components/ui-kit/atoms";

import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Camera,
  Edit3,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Profile · Career Intelligence" }],
  }),
  component: Page,
});

function Page() {
  const user = useUser();

  const [profile, setProfile] = useState<any>(null);

  const displayName =
    profile?.name ||
    user?.name ||
    "User";

  console.log("USER =", user);

  console.log("PROFILE STATE =", profile);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);




  // ---------------- PROFILE ----------------

  useEffect(() => {

    if (!user?.id) return;


    fetch(`http://127.0.0.1:8000/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {

        console.log("PROFILE API:", data);

        if (data.success === false) {
          console.log("PROFILE NOT FOUND");
          return;
        }

        setProfile(data);

      })
      .catch(err => {
        console.log(err);
      });


  }, [user]);



  // ---------------- PROFILE ----------------

  useEffect(() => {
    console.log("USER =", user);
  }, [user]);

  useEffect(() => {
    console.log("PROFILE =", profile);
  }, [profile]);



  // ---------------- EXPERIENCE ----------------

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/experience/${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setExperiences(Array.isArray(data) ? data : [])
      );
  }, [user]);

  // ---------------- EDUCATION ----------------

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/education/${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setEducations(Array.isArray(data) ? data : [])
      );
  }, [user]);

  // ---------------- INTERNSHIP ----------------

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/internship/${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setInternships(Array.isArray(data) ? data : [])
      );
  }, [user]);

  // ---------------- CERTIFICATIONS ----------------

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/certification/${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setCertifications(Array.isArray(data) ? data : [])
      );
  }, [user]);

  // ---------------- SKILLS ----------------

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/skill/${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setSkills(Array.isArray(data) ? data : [])
      );
  }, [user]);


  // Calculate Profile Completion

  const totalFields = 10;

  let completedFields = 0;

  if (profile?.name) completedFields++;
  if (profile?.email) completedFields++;
  if (profile?.city) completedFields++;
  if (profile?.country) completedFields++;
  if (skills.length > 0) completedFields++;
  if (experiences.length > 0) completedFields++;
  if (educations.length > 0) completedFields++;
  if (internships.length > 0) completedFields++;
  if (certifications.length > 0) completedFields++;
  if (profile?.github || profile?.linkedin) completedFields++;

  const completion = Math.round((completedFields / totalFields) * 100);





  return (
    <AppLayout>

      {/* ================= HEADER ================= */}

      <div className="relative rounded-3xl overflow-hidden mb-6 glass-strong">

        <div className="h-40 bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/30 relative">

          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, oklch(0.65 0.2 260 / 0.6), transparent 40%), radial-gradient(circle at 80% 60%, oklch(0.72 0.17 152 / 0.5), transparent 40%)",
            }}
          />

        </div>

        <div className="px-6 pb-6 -mt-14 relative">

          <div className="flex items-end gap-5">

            {/* Avatar */}

            <div className="relative">

              <div className="w-28 h-28 rounded-2xl overflow-hidden gradient-primary-bg flex items-center justify-center">

                {
                  imagePreview ?

                    <img
                      src={imagePreview}
                      className="w-full h-full object-cover"
                    />

                    :

                    <div className="text-3xl font-bold text-white">

                      {
                        displayName
                          .split(" ")
                          .map(n => n[0])
                          .join("")
                          .toUpperCase()
                      }

                    </div>

                }

              </div>

              <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-surface border border-border grid place-items-center cursor-pointer">

                <Camera className="w-4 h-4" />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {

                    const file = e.target.files?.[0];

                    if (file) {

                      setImagePreview(
                        URL.createObjectURL(file)
                      );

                    }

                  }}
                />

              </label>

            </div>

            {/* Profile Info */}

            <div className="pb-2 flex-1">

              <div className="flex items-center gap-2">

                <h1 className="text-2xl font-semibold tracking-tight">

                  {profile?.name || user?.name || user?.username || user?.email?.split("@")[0]}

                </h1>

              </div>

              <div className="text-sm text-muted-foreground mt-1">

                {user?.role || "Student"}

              </div>

              <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-4">

                <span className="inline-flex items-center gap-1">
  <MapPin className="w-3 h-3" />
  {user?.city}, {user?.country}
</span>

<span className="inline-flex items-center gap-1">
  <Mail className="w-3 h-3" />
  {user?.email}
</span>

                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  {profile?.github || "-"}
                </span>

                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" />
                  {profile?.linkedin || "-"}
                </span>

              </div>



            </div>

            {/* Edit Button */}

            <button
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary-bg text-white text-sm font-medium"
            >

              <Edit3 className="w-4 h-4" />

              Edit Profile

            </button>

          </div>

        </div>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* LEFT COLUMN */}

        <div className="lg:col-span-4 space-y-5">

          {/* Completion */}

          <GlassCard title="Profile Completion">

            <div className="flex justify-between mb-3">

              <span className="text-2xl font-semibold">

                {completion}%

              </span>

              <Badge tone="success">
                {completion === 100
                  ? "Completed"
                  : completion >= 80
                    ? "Almost There"
                    : completion >= 50
                      ? "Good Progress"
                      : "Getting Started"}
              </Badge>

            </div>

            <Progress value={completion} tone="success" />

          </GlassCard>

          {/* Skills */}

          <GlassCard title="Skills">

            {skills.length === 0 ? (

              <div className="text-center text-sm text-muted-foreground py-6">

                No skills added yet.

              </div>

            ) : (

              <div className="flex flex-wrap gap-2">

                {skills.map((skill: any, index) => (

                  <Badge key={index} tone="primary">

                    {typeof skill === "string"
                      ? skill
                      : skill.skill_name || skill.name}

                  </Badge>

                ))}

              </div>

            )}

          </GlassCard>

          {/* Certifications */}

          <GlassCard title="Certifications">

            {certifications.length === 0 ? (

              <div className="text-center text-sm text-muted-foreground py-6">

                No certifications added yet.

              </div>

            ) : (

              <div className="space-y-3">

                {certifications.map((cert: any, index) => (

                  <div
                    key={index}
                    className="p-3 rounded-xl bg-white/[0.03] border border-border/50 flex items-center gap-3"
                  >

                    <Award className="w-5 h-5 text-warning" />

                    <div>

                      <div className="font-medium text-sm">

                        {cert.certificate_name}

                      </div>

                      <div className="text-xs text-muted-foreground">

                        {cert.organization}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </GlassCard>

        </div>

        {/* RIGHT COLUMN */}

        <div className="lg:col-span-8 space-y-5">

          {/* ================= EXPERIENCE ================= */}

          <GlassCard title="Experience">

            {experiences.length === 0 ? (

              <div className="text-center text-sm text-muted-foreground py-6">
                No experience added yet.
              </div>

            ) : (

              <ol className="relative pl-5 border-l border-border/60 space-y-5">

                {experiences.map((exp: any, index) => (

                  <li key={index} className="relative">

                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

                    <div className="flex items-center gap-2">

                      <Briefcase className="w-4 h-4 text-muted-foreground" />

                      <div className="text-sm font-semibold">
                        {exp.role}
                      </div>

                      <span className="text-xs text-muted-foreground">
                        · {exp.company}
                      </span>

                    </div>

                    <div className="text-xs text-muted-foreground mt-1">

                      {exp.start_date}

                      {" — "}

                      {exp.end_date || "Present"}

                    </div>

                    {exp.description && (

                      <p className="text-sm mt-2 text-muted-foreground">
                        {exp.description}
                      </p>

                    )}

                  </li>

                ))}

              </ol>

            )}

          </GlassCard>


          {/* ================= EDUCATION ================= */}

          <GlassCard title="Education">

            {educations.length === 0 ? (

              <div className="text-center text-sm text-muted-foreground py-6">

                No education added yet.

              </div>

            ) : (

              <div className="space-y-3">

                {educations.map((edu: any, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-border/50"
                  >

                    <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent grid place-items-center">

                      <GraduationCap className="w-5 h-5" />

                    </div>

                    <div className="flex-1">

                      <div className="font-medium text-sm">

                        {edu.degree}

                      </div>

                      <div className="text-xs text-muted-foreground">

                        {edu.college}

                      </div>

                      <div className="text-xs text-muted-foreground">

                        {edu.start_year} - {edu.end_year}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </GlassCard>


          {/* ================= INTERNSHIPS ================= */}

          <GlassCard title="Internships">

            {internships.length === 0 ? (

              <div className="text-center text-sm text-muted-foreground py-6">

                No internships added yet.

              </div>

            ) : (

              <ol className="relative pl-5 border-l border-border/60 space-y-5">

                {internships.map((intern: any, index) => (

                  <li key={index} className="relative">

                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />

                    <div className="flex items-center gap-2">

                      <Briefcase className="w-4 h-4 text-muted-foreground" />

                      <div className="text-sm font-semibold">

                        {intern.role}

                      </div>

                      <span className="text-xs text-muted-foreground">

                        · {intern.company}

                      </span>

                    </div>

                    <div className="text-xs text-muted-foreground mt-1">

                      {intern.start_date}

                      {" — "}

                      {intern.end_date || "Present"}

                    </div>

                    {intern.description && (

                      <p className="text-sm mt-2 text-muted-foreground">

                        {intern.description}

                      </p>

                    )}

                  </li>

                ))}

              </ol>

            )}

          </GlassCard>

        </div>

      </div>

      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </AppLayout>

  );
}

