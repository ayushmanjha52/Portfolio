// Experience is taken from the resume (1 Oct 2026). Bullets are the resume's own claims.
// `related` links point at public repositories whose content matches the work described.

export type Experience = {
  role: string;
  company: string;
  period: string;
  mode: string;
  bullets: string[];
  stack: string[];
  related?: { label: string; href: string };
};

export const experience: Experience[] = [
  {
    role: "AI/ML Intern",
    company: "VectraVision Technologies Pvt. Ltd.",
    period: "Feb 10 – Aug 10, 2026",
    mode: "Work from home",
    bullets: [
      "Built a micro-Doppler CNN classifying humans, crawls and drones.",
      "Engineered an STFT, centroid and SVD feature-extraction pipeline.",
      "Deployed real-time inference on a Jetson Nano edge device.",
    ],
    stack: ["Python", "PyTorch", "GNU Radio", "HackRF SDR", "NumPy", "SciPy"],
    related: { label: "Earlier radar prototype", href: "/projects/radar-micro-motion" },
  },
  {
    role: "Data Intern",
    company: "Bluestock Fintech",
    period: "May 28 – Jul 28, 2026",
    mode: "Work from home",
    bullets: [
      "Built an ETL pipeline ingesting 92 companies' financials.",
      "Enforced 16 data-quality rules across 1,000+ records.",
      "Shipped a screener, ratio engine and KMeans peer clustering.",
    ],
    stack: ["Python", "pandas", "SQLite", "Streamlit", "FastAPI", "scikit-learn", "ReportLab"],
    related: { label: "Nifty 100 platform", href: "/projects/nifty100-financial-intelligence" },
  },
];

export type JourneyStage = {
  id: string;
  title: string;
  period: string;
  thesis: string;
  evidence: { label: string; href?: string }[];
};

// The narrative arc. Each stage cites work that exists, dated by the repository history.
export const journey: JourneyStage[] = [
  {
    id: "ee",
    title: "Electrical Engineering",
    period: "2023 →",
    thesis: "B.Tech at BIT Sindri. Power, signals and physical systems are the layer every later project sits on.",
    evidence: [{ label: "B.Tech EE, BIT Sindri (2023 – 2027)" }],
  },
  {
    id: "signal",
    title: "Signal Processing",
    period: "2025 – 2026",
    thesis: "RF returns, Doppler and time-frequency analysis: turning raw signal into features a model can use.",
    evidence: [
      { label: "Radar micro-motion prototype (MATLAB / Simulink)", href: "/projects/radar-micro-motion" },
      { label: "Micro-Doppler CNN at VectraVision", href: "/#experience" },
    ],
  },
  {
    id: "data",
    title: "Data Analytics",
    period: "2026",
    thesis: "ETL, data-quality checks, SQL and risk analytics on financial data.",
    evidence: [
      { label: "Nifty 100 Financial Intelligence", href: "/projects/nifty100-financial-intelligence" },
      { label: "Mutual Fund Analytics", href: "/projects/mutual-fund-analytics" },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    period: "2026",
    thesis: "Models judged by honest validation: time-based holdouts, frozen decision rules, synthetic hard negatives.",
    evidence: [
      { label: "Field-device predictive maintenance", href: "/projects/field-device-predictive-maintenance" },
      { label: "Doppelgänger entity resolution", href: "/projects/doppelganger-entity-resolution" },
    ],
  },
  {
    id: "software",
    title: "Software Systems",
    period: "2026",
    thesis: "Multi-tenant isolation, queues, state machines and tests that prove the guarantees hold.",
    evidence: [
      { label: "PlantDesk CMMS", href: "/projects/plantdesk" },
      { label: "TokenGrid", href: "/projects/tokengrid" },
      { label: "WhatsApp CRM", href: "/projects/whatsapp-crm" },
      { label: "RescueGrid", href: "/projects/rescuegrid" },
    ],
  },
  {
    id: "intelligent",
    title: "Intelligent Engineering",
    period: "Now",
    thesis: "All of it in one system: forecasting, market design, cryptographic settlement and a control-room interface.",
    evidence: [{ label: "Local Energy Market (Solar-Trading)", href: "/projects/local-energy-market" }],
  },
];
