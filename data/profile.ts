// Personal facts shown on the site. Source: resume (resume__Ay.pdf, 1 Oct 2026)
// and the public GitHub profile. Nothing here is inferred.

export const profile = {
  name: "Ayushman Jha",
  headline: "Engineering Intelligent Systems",
  disciplines: ["Electrical Engineering", "AI/ML", "Data", "Software"],
  pitch:
    "I build intelligent systems that turn real-world engineering and business problems into measurable software solutions.",
  closing: [
    "I don't just build applications.",
    "I build systems that connect real-world problems, data, intelligence and engineering decisions.",
  ],
  email: "ayushmanjha77@gmail.com",
  phone: "+91 62062 48741",
  phoneHref: "tel:+916206248741",
  photo: { src: "/profile/ayushman-jha.jpeg", width: 706, height: 766 },
  github: "https://github.com/ayushmanjha52",
  githubHandle: "ayushmanjha52",
  linkedin: "https://www.linkedin.com/in/ayushman-jha-36a4a82a6",
  resumePdf: "/resume/Ayushman_Jha_Resume.pdf",
  location: "Dhanbad, India",
  availableFor: [
    "Software Engineering",
    "AI/ML",
    "Data",
    "Electrical / Electronics",
    "Industrial AI",
    "Engineering Systems",
  ],
} as const;

export const education = [
  {
    degree: "B.Tech, Electrical Engineering",
    institution: "Birsa Institute of Technology, Sindri",
    period: "2023 – 2027",
    location: "Dhanbad, India",
    detail: "CGPA: 8.04",
  },
  {
    degree: "Senior Secondary (XII), CBSE",
    institution: "DAV Public School, Koylanagar",
    period: "2021 – 2023",
    location: "Dhanbad, India",
    detail: "Percentage: 86%",
  },
] as const;

// Wording follows the resume line for line.
export const achievements = [
  {
    kind: "Winner",
    title: "TEXcelerate'25",
    detail: "Organised by IIC 7.0 and TEXMiN Hub, IIT (ISM) Dhanbad",
  },
  {
    kind: "Winner",
    title: "Hackatron 3.0",
    detail: "Organised by the Hackathon and Coding Club, BIT Sindri",
  },
  {
    kind: "Finalist",
    title: "Kerala Innovation Festival, MSME Idea Hackathon 4.0 and Yukti Innovation Program 2025",
    detail: null,
  },
] as const;

/** Skills exactly as listed on the resume (used on /resume). */
export const resumeSkills = [
  { group: "Computer languages", items: ["Python", "JavaScript", "C++"] },
  {
    group: "Libraries and frameworks",
    items: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "TensorFlow", "NLTK", "OpenCV", "Next.js", "HTML", "CSS"],
  },
  { group: "Backend", items: ["Django", "Node.js", "Spring Boot"] },
  {
    group: "Developer tools",
    items: ["VS Code", "GitHub", "Google Colab", "Kaggle", "Langflow", "Hugging Face"],
  },
  { group: "Operating systems", items: ["Windows", "Linux"] },
] as const;
