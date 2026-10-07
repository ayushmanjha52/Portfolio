// Public repositories on github.com/ayushmanjha52, checked 8 Oct 2026.
// Empty repositories (Text-to-CAD, nightangle-audio) are left out on purpose.

export type RepoGroup = "Featured" | "Engineering" | "ML" | "Data" | "Software" | "Experimental";

export type RepoEntry = {
  name: string;
  group: RepoGroup;
  language: string;
  description: string;
  project?: string; // slug in data/projects.ts
  note?: string;
};

export const repoGroups: { id: RepoGroup; blurb: string }[] = [
  { id: "Featured", blurb: "The three systems that best show how I work." },
  { id: "Engineering", blurb: "Physical systems: radar, power plants, field devices." },
  { id: "ML", blurb: "Models with honest validation." },
  { id: "Data", blurb: "Pipelines, analytics and dashboards." },
  { id: "Software", blurb: "Product software and backends." },
  { id: "Experimental", blurb: "Early prototypes, kept for the record." },
];

export const repos: RepoEntry[] = [
  { name: "CMMS", group: "Featured", language: "Java", project: "plantdesk", description: "PlantDesk — multi-tenant maintenance management with Hibernate filtering + PostgreSQL RLS." },
  { name: "Solar-Trading", group: "Featured", language: "Python · Solidity", project: "local-energy-market", description: "Local Energy Market — forecasting, uniform-price clearing and on-chain settlement (simulation-backed)." },
  { name: "Token-Saver", group: "Featured", language: "TypeScript", project: "tokengrid", description: "TokenGrid — streaming LLM metering gateway, Redis Streams ingestion and cost intelligence." },

  { name: "radar-system", group: "Engineering", language: "MATLAB", project: "radar-micro-motion", description: "Monostatic, bistatic and multistatic radar models; micro-Doppler prototype." },
  { name: "predictive-analysis-model", group: "Engineering", language: "Python", project: "field-device-predictive-maintenance", description: "Field-device PdM v2: Combi Mill + US power-fleet insights, rolling backtest.", note: "v2" },

  { name: "business-entity-resolution", group: "ML", language: "Python", project: "doppelganger-entity-resolution", description: "Doppelgänger — two-stage LightGBM entity resolution, test F0.5 0.9752." },
  { name: "predictive-maintenance-analysis", group: "ML", language: "Python", project: "field-device-predictive-maintenance", description: "Field-device cause classifier v1: Random Forest, 70.3 % time-based holdout.", note: "v1" },

  { name: "nifty100-financial-platform", group: "Data", language: "Python", project: "nifty100-financial-intelligence", description: "Nifty 100 ETL, KPIs, screener, peer percentiles, KMeans, Streamlit + FastAPI." },
  { name: "Mutual-Fund-Analysis", group: "Data", language: "Python", project: "mutual-fund-analytics", description: "Mutual-fund analytics pipeline and Power BI dashboard.", note: "same capstone as bluestock-mf" },
  { name: "bluestock-mf", group: "Data", language: "Python", project: "mutual-fund-analytics", description: "Snapshot of the same mutual-fund capstone with analytics outputs.", note: "same capstone as Mutual-Fund-Analysis" },

  { name: "Whatsapp-CRM", group: "Software", language: "TypeScript", project: "whatsapp-crm", description: "WhatsApp Cloud API CRM: Fastify gateway, BullMQ workers, Socket.IO inbox." },
  { name: "Rescue-Grid", group: "Software", language: "TypeScript", project: "rescuegrid", description: "Disaster-response coordination: victim / volunteer PWAs, DMA dashboard, Agents SDK assistant." },
  { name: "code_breaker_symbols_backend", group: "Software", language: "Python", project: "codebreaker-symbols-api", description: "FastAPI backend for editable symbols extracted from a PDF." },
  { name: "bizforce", group: "Software", language: "JavaScript", project: "bizforce-crm", description: "MERN CRM with lead scoring, Kanban pipeline and funnel analytics." },
  { name: "Portfolio", group: "Software", language: "TypeScript", description: "This website." },

  { name: "disaster-info", group: "Experimental", language: "JavaScript", project: "disaster-info", description: "2024 skeleton for a real-time disaster information platform.", note: "archived" },
  { name: "studyflow-frontend", group: "Experimental", language: "JavaScript", project: "studyflow", description: "Academic to-do front end." },
  { name: "todo-app", group: "Experimental", language: "JavaScript", project: "studyflow", description: "Academic to-do with an Express + MongoDB API." },
];

export const repoUrl = (name: string) => `https://github.com/ayushmanjha52/${name}`;
