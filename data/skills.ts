// Skill groups. `where` names the public work that uses the skill; empty means it comes
// from the resume or internship rather than a public repository.

export type Skill = { name: string; where?: string };
export type SkillGroup = { id: string; title: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    skills: [
      { name: "Python", where: "Local Energy Market · Doppelgänger · PdM · Nifty 100" },
      { name: "TypeScript", where: "TokenGrid · PlantDesk UI · WhatsApp CRM · RescueGrid" },
      { name: "Java", where: "PlantDesk" },
      { name: "JavaScript", where: "BizForce" },
      { name: "C++" },
      { name: "Solidity", where: "Local Energy Market" },
    ],
  },
  {
    id: "ml",
    title: "AI / ML",
    skills: [
      { name: "scikit-learn", where: "PdM · Nifty 100" },
      { name: "LightGBM", where: "Doppelgänger" },
      { name: "XGBoost", where: "Local Energy Market" },
      { name: "CatBoost", where: "PdM model comparison" },
      { name: "PyTorch", where: "LSTM forecaster · VectraVision internship" },
      { name: "LLM agents (Agents SDK, MCP)", where: "RescueGrid" },
      { name: "TensorFlow" },
      { name: "pandas", where: "Most Python work" },
      { name: "NumPy", where: "Most Python work" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Spring Boot", where: "PlantDesk" },
      { name: "FastAPI", where: "PdM · Nifty 100 · Local Energy Market · CodeBreaker" },
      { name: "Fastify", where: "TokenGrid · WhatsApp CRM" },
      { name: "Node.js", where: "TokenGrid · BizForce" },
      { name: "Express", where: "BizForce" },
      { name: "BullMQ", where: "WhatsApp CRM" },
      { name: "Socket.IO", where: "WhatsApp CRM" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", where: "PlantDesk · WhatsApp CRM · BizForce" },
      { name: "Next.js", where: "TokenGrid · Local Energy Market · RescueGrid" },
      { name: "Vite", where: "PlantDesk · WhatsApp CRM · BizForce" },
      { name: "Tailwind", where: "PlantDesk · WhatsApp CRM · RescueGrid" },
    ],
  },
  {
    id: "database",
    title: "Database",
    skills: [
      { name: "PostgreSQL", where: "PlantDesk · TokenGrid · WhatsApp CRM · RescueGrid" },
      { name: "Supabase", where: "WhatsApp CRM · RescueGrid" },
      { name: "SQLite", where: "Nifty 100" },
      { name: "MongoDB", where: "BizForce" },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    skills: [
      { name: "Redis", where: "TokenGrid Streams · WhatsApp CRM (BullMQ)" },
      { name: "Docker", where: "PlantDesk · TokenGrid · Local Energy Market" },
      { name: "REST APIs", where: "Most projects" },
      { name: "JWT", where: "PlantDesk · BizForce" },
      { name: "Row-level security", where: "PlantDesk · WhatsApp CRM · RescueGrid" },
      { name: "Testcontainers", where: "PlantDesk" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering domains",
    skills: [
      { name: "Signal processing", where: "STFT · SVD features (VectraVision internship)" },
      { name: "Micro-Doppler classification", where: "VectraVision internship" },
      { name: "Energy systems", where: "Local Energy Market" },
      { name: "Predictive maintenance", where: "PdM · PlantDesk" },
      { name: "Reliability analytics", where: "PlantDesk (MTBF / MTTR)" },
    ],
  },
];
