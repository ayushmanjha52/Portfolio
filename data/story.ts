// The central portfolio story: real-world problem → … → decision, told five times.
// Each value is taken from the linked project's repository.

export const stages = [
  "Real-world problem",
  "Data / signal",
  "Analysis",
  "Intelligence",
  "System design",
  "Software",
  "Decision / impact",
] as const;

export type StoryExample = {
  id: string;
  label: string;
  project: { slug: string; name: string };
  values: [string, string, string, string, string, string, string];
};

export const storyExamples: StoryExample[] = [
  {
    id: "solar",
    label: "Solar energy",
    project: { slug: "local-energy-market", name: "Local Energy Market" },
    values: [
      "Rooftop surplus exported at the feed-in tariff while neighbours buy at retail",
      "Ausgrid half-hourly household meters + ERA5 weather",
      "Net-load features with a leakage test; persistence and seasonal baselines",
      "XGBoost P10 / P50 / P90 forecasts, two slots ahead",
      "30-minute uniform-price auction; commit before settle",
      "Python engine · Solidity contracts · Next.js control room",
      "Newsvendor bids: ₹1,933 per household-year in simulation",
    ],
  },
  {
    id: "maintenance",
    label: "Industrial maintenance",
    project: { slug: "plantdesk", name: "PlantDesk + field-device PdM" },
    values: [
      "Breakdowns and field-device delays on the shop floor",
      "Work orders, failure codes and free-text delay logs",
      "Device Pareto, area red zones, MTBF / MTTR",
      "Cause classifier validated on unseen months",
      "Multi-tenant CMMS with a work-order state machine",
      "Spring Boot + React · FastAPI dashboard",
      "Reliability trend and a human review queue",
    ],
  },
  {
    id: "disaster",
    label: "Disaster response",
    project: { slug: "rescuegrid", name: "RescueGrid" },
    values: [
      "Victims can't reach responders; volunteers duplicate effort",
      "SOS reports, volunteer GPS pings and mission updates",
      "Triage by report type: rescue and medical → critical",
      "AI agent answering questions over live data (read-only MCP)",
      "Three front ends, one database; RLS-filtered realtime",
      "Next.js 16 · Supabase · Mapbox",
      "Missions assigned and tracked to completion",
    ],
  },
  {
    id: "ai",
    label: "AI usage",
    project: { slug: "tokengrid", name: "TokenGrid" },
    values: [
      "AI spend that no one can attribute or act on",
      "Streaming API responses and their usage blocks",
      "Priced by timestamp, hourly rollups, retry fingerprints",
      "Efficiency score and lint findings from measured inputs",
      "Streaming gateway → Redis Stream → ingestion worker",
      "Fastify · Drizzle / PostgreSQL · Next.js",
      "Budgets, coaching and daily reconciliation",
    ],
  },
  {
    id: "business",
    label: "Business data",
    project: { slug: "doppelganger-entity-resolution", name: "Doppelgänger" },
    values: [
      "One business, many noisy records — and decoys next door",
      "~22M records from three sources",
      "Normalisation and blocking at 0.979 pair recall",
      "Two-stage LightGBM with rival-aware features",
      "Entity ownership + expected-F0.5 list per entity",
      "pyarrow pipeline · FastAPI evidence explorer",
      "Resolved entities at 0.975 F0.5 on held-out test",
    ],
  },
];
