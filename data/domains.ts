import type { Domain } from "./projects";

// Hero system map: six domains, each traced to the work that lives there.
export type MapNode = {
  id: Domain;
  label: string;
  title: string;
  blurb: string;
  projects: { slug: string; name: string }[];
  angle: number; // degrees, 0 = right, -90 = top
};

export const mapNodes: MapNode[] = [
  {
    id: "energy",
    label: "Energy",
    title: "Energy systems",
    blurb: "Forecasting, market design and cryptographic settlement for rooftop solar.",
    projects: [{ slug: "local-energy-market", name: "Local Energy Market (Solar-Trading)" }],
    angle: -90,
  },
  {
    id: "industry",
    label: "Industry",
    title: "Industrial intelligence",
    blurb: "Maintenance workflows, reliability analytics and failure-cause models for plants.",
    projects: [
      { slug: "plantdesk", name: "PlantDesk CMMS" },
      { slug: "field-device-predictive-maintenance", name: "Field-device predictive maintenance" },
    ],
    angle: -30,
  },
  {
    id: "radar",
    label: "Radar",
    title: "Signal & sensing",
    blurb: "RF returns, time-frequency analysis and micro-Doppler signatures.",
    projects: [{ slug: "radar-micro-motion", name: "Micro-motion radar" }],
    angle: 30,
  },
  {
    id: "data",
    label: "Data",
    title: "Data & financial systems",
    blurb: "ETL, data quality, analytics, screening and dashboards.",
    projects: [
      { slug: "nifty100-financial-intelligence", name: "Nifty 100 Financial Intelligence" },
      { slug: "mutual-fund-analytics", name: "Mutual Fund Analytics" },
    ],
    angle: 90,
  },
  {
    id: "ai",
    label: "AI",
    title: "AI infrastructure & ML",
    blurb: "LLM metering infrastructure, and entity resolution over 22M records.",
    projects: [
      { slug: "tokengrid", name: "TokenGrid" },
      { slug: "doppelganger-entity-resolution", name: "Doppelgänger entity resolution" },
    ],
    angle: 150,
  },
  {
    id: "software",
    label: "Software",
    title: "Software systems",
    blurb: "Queues, realtime, multi-tenant backends and product software.",
    projects: [
      { slug: "whatsapp-crm", name: "WhatsApp CRM" },
      { slug: "rescuegrid", name: "RescueGrid" },
      { slug: "bizforce-crm", name: "BizForce CRM" },
      { slug: "codebreaker-symbols-api", name: "CodeBreaker API" },
    ],
    angle: 210,
  },
];

// "What I build": the six domains as the brief lays them out.
export const buildDomains = [
  {
    n: "01",
    title: "Energy systems",
    icon: "sun",
    line: "Forecast household solar, clear a local market, settle it verifiably.",
    projects: [{ slug: "local-energy-market", name: "Local Energy Market" }],
  },
  {
    n: "02",
    title: "Industrial intelligence",
    icon: "factory",
    line: "Turn maintenance records and delay logs into reliability decisions.",
    projects: [
      { slug: "plantdesk", name: "PlantDesk" },
      { slug: "field-device-predictive-maintenance", name: "Predictive maintenance" },
    ],
  },
  {
    n: "03",
    title: "Signal & sensing",
    icon: "radar",
    line: "From RF returns to time-frequency maps to micro-Doppler signatures.",
    projects: [{ slug: "radar-micro-motion", name: "Radar" }],
  },
  {
    n: "04",
    title: "AI infrastructure",
    icon: "network",
    line: "Meter every LLM call exactly, without slowing a single response.",
    projects: [{ slug: "tokengrid", name: "TokenGrid" }],
  },
  {
    n: "05",
    title: "Machine learning",
    icon: "brain",
    line: "Models judged by the metric that matters, on data they have never seen.",
    projects: [{ slug: "doppelganger-entity-resolution", name: "Entity resolution" }],
  },
  {
    n: "06",
    title: "Data & financial systems",
    icon: "database",
    line: "Validated pipelines feeding screens, peer analysis and dashboards.",
    projects: [
      { slug: "nifty100-financial-intelligence", name: "Nifty 100" },
      { slug: "mutual-fund-analytics", name: "Mutual Fund Analytics" },
    ],
  },
] as const;
