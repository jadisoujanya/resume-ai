import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EditProfileModal({
  open,
  onClose,
}: Props) {

  const user = useUser();

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    github: "",
    linkedin: "",
  });

  const [educations, setEducations] = useState([
    {
      degree: "",
      college: "",
      start_year: "",
      end_year: "",
    },
  ]);


  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  ]);


  const [internships, setInternships] = useState([
    {
      company: "",
      role: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  ]);



  const [certifications, setCertifications] = useState([
    {
      certificate_name: "",
      organization: "",
      year: "",
    },
  ]);


  const [allSkills, setAllSkills] = useState<string[]>([]);

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [skillInput, setSkillInput] = useState("");


  useEffect(() => {

    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("PROFILE =", data);
        setProfile(data);

      });

  }, [user]);


  useEffect(() => {

    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/education/${user.id}`)
      .then(res => res.json())
      .then(data => {

        if (data.length > 0) {

          setEducations(data);

        }

      });

  }, [user]);


  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/experience/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setExperiences(data);
          console.log(experiences);
        }
      });
  }, [user]);



  useEffect(() => {
    fetch("http://127.0.0.1:8000/skills")
      .then((res) => res.json())
      .then((data) => setAllSkills(data));
  }, []);


  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/internship/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setInternships(data);
        }
      });
  }, [user]);


  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://127.0.0.1:8000/certification/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCertifications(data);
        }
      });
  }, [user]);



  async function saveProfile() {

    // update profile

    await fetch(
      `http://127.0.0.1:8000/profile/${user?.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(profile),
      }
    );

    // remove old education

    const old = await fetch(
      `http://127.0.0.1:8000/education/${user?.id}`
    );

    const oldEducation = await old.json();

    if (Array.isArray(oldEducation)) {
      for (const edu of oldEducation) {
        await fetch(
          `http://127.0.0.1:8000/education/${edu.id}`,
          {
            method: "DELETE",
          }
        );
      }
    }

    // insert current education

    for (const edu of educations) {

      await fetch(
        "http://127.0.0.1:8000/education",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            user_id: user?.id,

            degree: edu.degree,

            college: edu.college,

            start_year: edu.start_year,

            end_year: edu.end_year,

          }),
        }
      );

    }




    // remove old experience

    const oldExp = await fetch(
      `http://127.0.0.1:8000/experience/${user?.id}`
    );

    const oldExperience = await oldExp.json();

    if (Array.isArray(oldExperience)) {
      for (const exp of oldExperience) {
        await fetch(
          `http://127.0.0.1:8000/experience/${exp.id}`,
          {
            method: "DELETE",
          }
        );
      }
    }

    // insert current experience

    for (const exp of experiences) {
      await fetch(
        "http://127.0.0.1:8000/experience",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user?.id,
            company: exp.company,
            role: exp.role,
            start_date: exp.start_date,
            end_date: exp.end_date,
            description: exp.description,
          }),
        }
      );
    }




    // remove old internships

    const oldIntern = await fetch(
      `http://127.0.0.1:8000/internship/${user?.id}`
    );

    const oldInternships = await oldIntern.json();

    if (Array.isArray(oldInternships)) {
      for (const intern of oldInternships) {
        await fetch(
          `http://127.0.0.1:8000/internship/${intern.id}`,
          {
            method: "DELETE",
          }
        );
      }
    }

    // insert current internships

    for (const intern of internships) {
      await fetch(
        "http://127.0.0.1:8000/internship",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: user?.id,
            company: intern.company,
            role: intern.role,
            start_date: intern.start_date,
            end_date: intern.end_date,
            description: intern.description,
          }),
        }
      );
    }

    // remove old certifications

    const oldCert = await fetch(
      `http://127.0.0.1:8000/certification/${user?.id}`
    );

    const oldCertifications = await oldCert.json();

    if (Array.isArray(oldCertifications)) {
      for (const cert of oldCertifications) {
        await fetch(
          `http://127.0.0.1:8000/certification/${cert.id}`,
          {
            method: "DELETE",
          }
        );
      }
    }

    // insert current certifications

    for (const cert of certifications) {
      await fetch(
        "http://127.0.0.1:8000/certification",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: user?.id,
            certificate_name: cert.certificate_name,
            organization: cert.organization,
            year: cert.year,
          }),
        }
      );
    }


    onClose();

    window.location.reload();

  }




  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50">

      {/* Background */}

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="absolute left-1/2 top-1/2 w-[900px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-border bg-background p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Edit Profile
        </h2>


        <div className="space-y-8">

          {/* BASIC INFO */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Basic Information
            </h3>



            {/* BASIC INFO */}

            <div className="grid grid-cols-2 gap-4">

              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                placeholder="Name"
                className="border rounded-lg p-3 bg-transparent"
              />

              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
                className="border rounded-lg p-3 bg-transparent"
              />

              <input
                value={profile.country}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    country: e.target.value,
                  })
                }
                placeholder="Country"
                className="border rounded-lg p-3 bg-transparent"
              />


              <input
                value={profile.state}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    state: e.target.value,
                  })
                }
                placeholder="State"
                className="border rounded-lg p-3 bg-transparent"
              />


              <input
                value={profile.city}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    city: e.target.value,
                  })
                }
                placeholder="City"
                className="border rounded-lg p-3 bg-transparent"
              />



              <input
                value={profile.github || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    github: e.target.value
                  })
                }
                placeholder="Github URL"
                className="border rounded-lg p-3 bg-transparent"
              />


              <input
                value={profile.linkedin || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    linkedin: e.target.value
                  })
                }
                placeholder="LinkedIn URL"
                className="border rounded-lg p-3 bg-transparent"
              />

              <select
                value={profile.gender}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    gender: e.target.value,
                  })
                }
                className="border rounded-lg p-3 bg-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

            </div>

          </div>

          {/* EDUCATION */}

          <div>

            <h3 className="text-lg font-semibold mb-5">

              Education

            </h3>

            {educations.map((edu, index) => (

              <div
                key={index}
                className="border rounded-xl p-5 mb-4 space-y-3"
              >

                <input
                  value={edu.degree}
                  onChange={(e) => {
                    const copy = [...educations];
                    copy[index].degree = e.target.value;
                    setEducations(copy);
                  }}
                  placeholder="Degree"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <input
                  value={edu.college}
                  onChange={(e) => {
                    const copy = [...educations];
                    copy[index].college = e.target.value;
                    setEducations(copy);
                  }}
                  placeholder="College"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <div className="grid grid-cols-2 gap-3">

                  <input
                    value={edu.start_year}
                    onChange={(e) => {
                      const copy = [...educations];
                      copy[index].start_year = e.target.value;
                      setEducations(copy);
                    }}
                    placeholder="Start Year"
                    className="border rounded-lg p-3 bg-transparent"
                  />

                  <input
                    value={edu.end_year}
                    onChange={(e) => {
                      const copy = [...educations];
                      copy[index].end_year = e.target.value;
                      setEducations(copy);
                    }}
                    placeholder="End Year"
                    className="border rounded-lg p-3 bg-transparent"
                  />

                  <div className="flex justify-end mt-3">

                    <button
                      onClick={() => {
                        const copy = [...educations];
                        copy.splice(index, 1);
                        setEducations(copy);
                      }}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete Education
                    </button>

                  </div>



                </div>

              </div>

            ))}

            <button

              onClick={() =>

                setEducations([

                  ...educations,

                  {

                    degree: "",

                    college: "",

                    start_year: "",

                    end_year: "",

                  },

                ])

              }

              className="gradient-primary-bg text-white px-4 py-2 rounded-lg"

            >

              + Add Education

            </button>

          </div>



          {/* EXPERIENCE */}

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Experience
            </h3>

            {experiences.map((exp, index) => (

              <div
                key={index}
                className="border rounded-xl p-5 mb-4 space-y-3"
              >

                <input
                  value={exp.company}
                  onChange={(e) => {
                    const copy = [...experiences];
                    copy[index].company = e.target.value;
                    setExperiences(copy);
                  }}
                  placeholder="Company"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <input
                  value={exp.role}
                  onChange={(e) => {
                    const copy = [...experiences];
                    copy[index].role = e.target.value;
                    setExperiences(copy);
                  }}
                  placeholder="Role"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <div className="grid grid-cols-2 gap-3">

                  <input
                    value={exp.start_date}
                    onChange={(e) => {
                      const copy = [...experiences];
                      copy[index].start_date = e.target.value;
                      setExperiences(copy);
                    }}
                    placeholder="Start Date"
                    className="border rounded-lg p-3 bg-transparent"
                  />

                  <input
                    value={exp.end_date}
                    onChange={(e) => {
                      const copy = [...experiences];
                      copy[index].end_date = e.target.value;
                      setExperiences(copy);
                    }}
                    placeholder="End Date"
                    className="border rounded-lg p-3 bg-transparent"
                  />

                </div>

                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const copy = [...experiences];
                    copy[index].description = e.target.value;
                    setExperiences(copy);
                  }}
                  placeholder="Description"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <div className="flex justify-end">

                  <button
                    onClick={() => {
                      const copy = [...experiences];
                      copy.splice(index, 1);
                      setExperiences(copy);
                    }}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete Experience
                  </button>

                </div>

              </div>

            ))}

            <button
              onClick={() =>
                setExperiences([
                  ...experiences,
                  {
                    company: "",
                    role: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                  },
                ])
              }
              className="gradient-primary-bg text-white px-4 py-2 rounded-lg"
            >
              + Add Experience
            </button>

          </div>

          {/* INTERNSHIPS */}

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Internships
            </h3>

            {internships.map((intern, index) => (

              <div
                key={index}
                className="border rounded-xl p-5 mb-4 space-y-3"
              >

                <input
                  value={intern.company}
                  onChange={(e) => {
                    const copy = [...internships];
                    copy[index].company = e.target.value;
                    setInternships(copy);
                  }}
                  placeholder="Company"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <input
                  value={intern.role}
                  onChange={(e) => {
                    const copy = [...internships];
                    copy[index].role = e.target.value;
                    setInternships(copy);
                  }}
                  placeholder="Role"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <div className="grid grid-cols-2 gap-3">

                  <input
                    value={intern.start_date}
                    onChange={(e) => {
                      const copy = [...internships];
                      copy[index].start_date = e.target.value;
                      setInternships(copy);
                    }}
                    placeholder="Start Date"
                    className="border rounded-lg p-3 bg-transparent"
                  />

                  <input
                    value={intern.end_date}
                    onChange={(e) => {
                      const copy = [...internships];
                      copy[index].end_date = e.target.value;
                      setInternships(copy);
                    }}
                    placeholder="End Date"
                    className="border rounded-lg p-3 bg-transparent"
                  />

                </div>

                <textarea
                  value={intern.description}
                  onChange={(e) => {
                    const copy = [...internships];
                    copy[index].description = e.target.value;
                    setInternships(copy);
                  }}
                  placeholder="Description"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <div className="flex justify-end">

                  <button
                    onClick={() => {
                      const copy = [...internships];
                      copy.splice(index, 1);
                      setInternships(copy);
                    }}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete Internship
                  </button>

                </div>

              </div>

            ))}

            <button
              onClick={() =>
                setInternships([
                  ...internships,
                  {
                    company: "",
                    role: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                  },
                ])
              }
              className="gradient-primary-bg text-white px-4 py-2 rounded-lg"
            >
              + Add Internship
            </button>

          </div>

          {/* CERTIFICATIONS */}

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Certifications
            </h3>

            {certifications.map((cert, index) => (

              <div
                key={index}
                className="border rounded-xl p-5 mb-4 space-y-3"
              >

                <input
                  value={cert.certificate_name}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[index].certificate_name = e.target.value;
                    setCertifications(copy);
                  }}
                  placeholder="Certificate Name"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <input
                  value={cert.organization}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[index].organization = e.target.value;
                    setCertifications(copy);
                  }}
                  placeholder="Organization"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <input
                  value={cert.year}
                  onChange={(e) => {
                    const copy = [...certifications];
                    copy[index].year = e.target.value;
                    setCertifications(copy);
                  }}
                  placeholder="Year"
                  className="w-full border rounded-lg p-3 bg-transparent"
                />

                <div className="flex justify-end">

                  <button
                    onClick={() => {
                      const copy = [...certifications];
                      copy.splice(index, 1);
                      setCertifications(copy);
                    }}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete Certification
                  </button>

                </div>

              </div>

            ))}

            <button
              onClick={() =>
                setCertifications([
                  ...certifications,
                  {
                    certificate_name: "",
                    organization: "",
                    year: "",
                  },
                ])
              }
              className="gradient-primary-bg text-white px-4 py-2 rounded-lg"
            >
              + Add Certification
            </button>

          </div>




          {/* SKILLS */}

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Skills
            </h3>

            <select
              value={skillInput}
              onChange={(e) => {

                const value = e.target.value;

                setSkillInput("");

                if (
                  value &&
                  !selectedSkills.includes(value)
                ) {

                  setSelectedSkills([
                    ...selectedSkills,
                    value,
                  ]);

                }

              }}
              className="w-full border rounded-lg p-3 bg-transparent"
            >

              <option value="">
                Select Skill
              </option>

              {allSkills.map((skill) => (

                <option
                  key={skill}
                  value={skill}
                >
                  {skill}
                </option>

              ))}

            </select>

            <div className="flex flex-wrap gap-2 mt-4">

              {selectedSkills.map((skill) => (

                <div
                  key={skill}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >

                  {skill}

                  <button

                    onClick={() =>
                      setSelectedSkills(

                        selectedSkills.filter(

                          (s) => s !== skill

                        )

                      )
                    }

                  >

                    ×

                  </button>

                </div>

              ))}

            </div>

          </div>


          <div className="mt-8 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              onClick={saveProfile}
              className="gradient-primary-bg text-white px-5 py-2 rounded-lg"
            >
              Save
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}