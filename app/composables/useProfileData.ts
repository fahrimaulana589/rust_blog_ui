export const useProfileData = () => {
  return useState('profile', () => ({
    full_name: "Alex Devandra",
    headline: "Senior Fullstack Engineer & UI Designer",
    summary: "Mengubah ide kompleks menjadi solusi digital yang elegan. Berpengalaman 5+ tahun membangun aplikasi scalable.",
    role: "Fullstack Developer",
    location: "Jakarta, Indonesia",
    profile_image: "https://i.pravatar.cc/300",
    availability: "Open for Freelance",
    resume_url: "#",
    email: "alex@example.com",
    years_of_experience: 5,
    specializations: ["Web Development", "System Design", "Cloud Architecture"],
    tech_focus: ["React", "NestJS", "TypeScript", "Docker"],
    languages: [{ name: "Indonesian", level: "Native" }, { name: "English", level: "Professional" }]
  }))
}
