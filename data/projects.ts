// Every claim in this file was checked against the public repository it links to
// (README, docs, model cards, source and tests) on 8 Oct 2026. If a repository does not
// say it, it is not here. Numbers are quoted as the repository reports them.

export type Tier = "large" | "medium" | "small" | "listed";

/** Maturity label. `null` means a normal, working project. */
export type Maturity = "prototype" | "experimental" | "in-development" | "archived" | null;

export type Category =
  | "featured"
  | "industrial"
  | "energy"
  | "ai-ml"
  | "data"
  | "software"
  | "engineering"
  | "experimental";

export type Domain = "energy" | "industry" | "radar" | "data" | "ai" | "software";

export type Metric = { value: string; label: string };
export type Step = { label: string; detail?: string };
export type Flow = { title: string; steps: Step[] };
export type Decision = { title: string; detail: string };
export type QA = { q: string; a: string; evidence?: string };
export type Repo = { name: string; url: string; note?: string };
export type Media = { src: string; alt: string; caption: string; width: number; height: number };

export type HonestyRow = { label: string; value: string; headline?: boolean };
export type ModelHonesty = {
  title: string;
  columns: { heading: string; rows: HonestyRow[] }[];
  reason: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  rank: number;
  tier: Tier;
  maturity: Maturity;
  maturityNote?: string;
  categories: Category[];
  domains: Domain[];
  period: string;
  /** One engineer-to-engineer sentence. */
  summary: string;
  /** What a recruiter needs in one line. */
  recruiterLine: string;
  /** Statement shown prominently when the project could be misread (e.g. simulation). */
  callout?: string;
  metrics: Metric[];
  problem: string;
  whyItMatters: string;
  system: string[];
  architecture: Flow;
  dataFlow: Flow;
  decisions: Decision[];
  results: string[];
  limitations: string[];
  stack: string[];
  repos: Repo[];
  live?: { url: string; note?: string };
  media?: Media[];
  honesty?: ModelHonesty;
  interview: QA[];
};

const gh = (repo: string) => `https://github.com/ayushmanjha52/${repo}`;

export const projects: Project[] = [
  // ───────────────────────────────────────────────────────────── 1 · PlantDesk
  {
    slug: "plantdesk",
    title: "PlantDesk",
    subtitle: "Multi-Tenant Industrial Maintenance Management System",
    rank: 1,
    tier: "large",
    maturity: null,
    categories: ["featured", "industrial", "software"],
    domains: ["industry", "software"],
    period: "2026",
    summary:
      "An industrial reliability and maintenance platform engineered around multi-tenant isolation, maintenance workflows and reliability analytics.",
    recruiterLine:
      "Spring Boot + React CMMS where every plant is an isolated tenant, enforced twice (Hibernate filter and PostgreSQL row-level security) and proven by 62 tests on real PostgreSQL.",
    metrics: [
      { value: "62", label: "tests, isolation suites on real PostgreSQL 16" },
      { value: "2", label: "independent tenant-isolation layers" },
      { value: "1", label: "SQL statement loads a 50-asset tree" },
      { value: "≤ 2", label: "statements per work-order page (24 before)" },
    ],
    problem:
      "Small and mid-size plants keep breakdowns, preventive maintenance and spares in spreadsheets and paper job cards, so failure history rarely becomes MTBF, MTTR or a PM plan. A shared system for many plants adds a harder requirement: one plant must never see another plant's assets, work orders or reliability data.",
    whyItMatters:
      "Maintenance data only supports reliability decisions when it is structured as asset → failure → repair and can be trusted. In a multi-tenant system one forgotten tenant check is a data leak, so isolation cannot depend on every query remembering a WHERE clause.",
    system: [
      "Each plant is a tenant with an asset hierarchy. Tags such as PLT-01/AREA-03/LN-05/MTR-005 come from atomic per-plant counters and are stored as a materialised path, so the whole tree loads in one indexed query.",
      "Breakdown and preventive work orders move through an explicit state machine. Technicians log labour, spare parts are issued from stock, and money is BigDecimal rounded once to paise.",
      "PM schedules trigger on calendar time or running hours, whichever comes first, generated a tenth of the interval early so shutdowns and spares can be planned.",
      "Reliability analytics per asset: MTBF, MTTR, availability and a degrading / stable trend.",
      "Roles: plant admin, maintenance manager, technician, viewer. Swagger API docs. Live demo with seeded plants.",
    ],
    architecture: {
      title: "Request path",
      steps: [
        { label: "User", detail: "Plant admin, manager, technician or viewer" },
        { label: "React 18", detail: "Vite · TypeScript · TanStack Query; access token in memory, single-flight refresh" },
        { label: "Spring Boot 3.3", detail: "Java 21 REST API" },
        { label: "Security / JWT", detail: "JwtAuthenticationFilter resolves the tenant from the signed tid claim" },
        { label: "Tenant context", detail: "TenantAwareJpaTransactionManager enables the filter and sets app.tenant_id per transaction" },
        { label: "JPA / Hibernate", detail: "Tenant filter on every Session; findById routed through JPQL" },
        { label: "PostgreSQL 16 + RLS", detail: "Policy on every tenant table; app role has no BYPASSRLS" },
        { label: "Reliability data", detail: "Assets, work orders, PM schedules, stock, MTBF / MTTR" },
      ],
    },
    dataFlow: {
      title: "From failure to reliability decision",
      steps: [
        { label: "Asset", detail: "A node in the plant hierarchy" },
        { label: "Failure", detail: "Breakdown raised with a failure code" },
        { label: "Work order", detail: "OPEN → IN_PROGRESS → COMPLETED → CLOSED" },
        { label: "Technician", detail: "Assigned before start; logs labour" },
        { label: "Repair", detail: "Parts issued atomically; returned to service" },
        { label: "MTBF / MTTR", detail: "Uptime ÷ failures; repair time ÷ restored failures" },
        { label: "Reliability decision", detail: "Recent gaps below 75 % of older gaps ⇒ DEGRADING" },
      ],
    },
    decisions: [
      {
        title: "Two independent isolation layers",
        detail:
          "A Hibernate filter enabled per transaction, and PostgreSQL row-level security keyed on a transaction-local app.tenant_id. Each layer has its own test with the other switched off.",
      },
      {
        title: "Filter enabled at transaction start, not in the servlet filter",
        detail:
          "With open-in-view off, no Session exists when the request filter runs. The transaction hook also covers the PM scheduler, which never goes through HTTP.",
      },
      {
        title: "findById is overridden",
        detail:
          "Hibernate filters do not apply to EntityManager.find, so Spring Data's findById would skip layer 1. TenantAwareJpaRepository routes by-id lookups through JPQL.",
      },
      {
        title: "The app never connects as the table owner",
        detail:
          "Owners and superusers bypass RLS. Flyway runs as owner; the app connects as plantdesk_app (no superuser, no BYPASSRLS), and the tests connect the same way.",
      },
      {
        title: "Composite foreign keys (tenant_id, x_id)",
        detail:
          "FK checks bypass RLS. Without composite keys a raw insert could point plant A's work order at plant B's asset.",
      },
      {
        title: "Refresh-token rotation with reuse detection",
        detail:
          "Refresh tokens are 256 random bits in an HttpOnly, SameSite=Strict cookie, stored only as SHA-256 hashes. Presenting a rotated token revokes the whole family, and the revocation commits before the 401.",
      },
      {
        title: "Clients send actions, never statuses",
        detail:
          "WorkOrder has no status setter. Each action declares its allowed source states; CLOSE, REWORK and CANCEL are manager-only. DB CHECK constraints back the guards.",
      },
      {
        title: "Atomic stock issue",
        detail: "Stock is issued with a single conditional UPDATE, so two technicians cannot both draw the last bearing.",
      },
    ],
    results: [
      "TenantIsolationIT: authenticated as plant A, plant B's work orders, assets and analytics are 404 or absent — by id, in lists, in mutations, and with ?tenantId= or X-Tenant-Id sent.",
      "RowLevelSecurityIT: with raw JDBC, no tenant means zero rows, a cross-tenant insert is rejected, and session variables do not leak across pooled transactions.",
      "AuthFlowIT: refresh rotates; reusing a rotated token revokes the family; logout and deactivation revoke; 15-minute access-token expiry.",
      "QueryCountIT: a 50-asset tree is 1 statement; a work-order page is ≤ 2 (measured 24 without the entity graph).",
      "PmGenerationIT: with a hand-advanced clock, a PM order is generated exactly once in the lead window, never duplicated, and re-baselined on completion.",
      "ReliabilityIT reproduces a worked example: MTBF 576.0 h, MTTR 4.8 h, availability 99.17 %, trend DEGRADING.",
    ],
    limitations: [
      "Reliability is calculated on a calendar basis. Failure code X01 (external supply interruption) is excluded by design.",
      "RLS is ENABLEd, not FORCEd: the owner must bypass it for the SECURITY DEFINER login lookup. The app role can never become the owner.",
      "Redis caching is optional and off unless CACHE_TYPE=redis is set.",
      "The live demo runs on seeded demo plants, not real plant data.",
    ],
    stack: [
      "Java 21",
      "Spring Boot 3.3",
      "Spring Security 6",
      "Spring Data JPA",
      "PostgreSQL 16",
      "Flyway",
      "Redis",
      "React 18",
      "Vite",
      "TypeScript",
      "TanStack Query",
      "Tailwind",
      "JUnit 5",
      "Testcontainers",
      "Docker",
    ],
    repos: [{ name: "CMMS", url: gh("CMMS") }],
    live: {
      url: "https://plantdesk-production.up.railway.app",
      note: "Plant code DEMO · one-click role buttons on the login page",
    },
    interview: [
      {
        q: "Why PostgreSQL row-level security?",
        a: "Application-level filtering fails open: any query path that forgets the tenant predicate leaks. RLS enforces the policy inside the database for every statement, including raw JDBC. Here it is the second layer, keyed on app.tenant_id set with set_config(…, is_local => true) when each transaction begins.",
        evidence: "README › Tenant isolation · isolation/RowLevelSecurityIT",
      },
      {
        q: "Why Hibernate filtering and RLS?",
        a: "Defence in depth with independent failure modes. The filter keeps queries correct inside the app; RLS catches anything that bypasses the ORM. Each is tested alone: HibernateTenantFilterIT runs with RLS switched off, RowLevelSecurityIT uses raw JDBC.",
        evidence: "isolation/HibernateTenantFilterIT · isolation/RowLevelSecurityIT",
      },
      {
        q: "Why override findById?",
        a: "Hibernate filters do not apply to EntityManager.find, which Spring Data's findById uses, so by-id lookups would skip layer 1. TenantAwareJpaRepository routes them through JPQL, and the filter test shows the leak with the override removed.",
        evidence: "TenantAwareJpaRepository · HibernateTenantFilterIT",
      },
      {
        q: "Why tenant-aware transaction management?",
        a: "With open-in-view off there is no Session when the servlet filter runs. Enabling the filter and setting the RLS variable at transaction start scopes every unit of work — including the PM scheduler, which never passes through HTTP. Transaction-local variables vanish at commit, so a pooled connection cannot carry one plant into the next request.",
        evidence: "TenantAwareJpaTransactionManager",
      },
      {
        q: "How does refresh-token reuse detection work?",
        a: "Each refresh issues a new token in the same family and retires the old one. If a retired token is presented again it has been replayed, so the whole family is revoked. The revocation commits before the 401 is thrown so it is not rolled back. The frontend refreshes single-flight so parallel 401s or React StrictMode cannot trigger it by accident.",
        evidence: "auth/AuthFlowIT",
      },
      {
        q: "Why Testcontainers instead of H2?",
        a: "Isolation is a database property and H2 has no row-level security, so tests against it would pass while proving nothing. The integration tests use real PostgreSQL 16 and connect as the restricted app role, not the container's superuser.",
        evidence: "README › Tests",
      },
      {
        q: "How does the work-order state machine work?",
        a: "WorkOrderAction is an enum where each action declares allowed source states, a target and whether it is manager-only: START (OPEN, ON_HOLD → IN_PROGRESS), HOLD, RETURN_TO_SERVICE (→ COMPLETED), CLOSE, REWORK (COMPLETED → IN_PROGRESS) and CANCEL. Invalid transitions return 409 with a sentence an engineer can act on. Guards: an assignee before start, labour before return to service, a failure code on breakdowns.",
        evidence: "WorkOrderAction · workorder/WorkOrderLifecycleTest",
      },
      {
        q: "How is MTBF calculated?",
        a: "Calendar basis: MTBF = uptime ÷ failures and MTTR = repair time ÷ restored failures. X01 trips (external supply) are excluded — a motor that tripped on a grid dip did not fail. The trend compares the older half of the gaps between failures with the recent half; recent below 75 % of older counts as degrading.",
        evidence: "ReliabilityCalculatorTest · analytics/ReliabilityIT",
      },
      {
        q: "How do you prevent cross-tenant access?",
        a: "The tenant comes only from the signed JWT, never from a parameter, header or body. Then: Hibernate filter, RLS policies, composite (tenant_id, x_id) foreign keys, a non-owner database role, and 404 for foreign ids so probing reveals nothing. TenantIsolationIT attacks each path, including sending ?tenantId= and X-Tenant-Id.",
        evidence: "isolation/TenantIsolationIT",
      },
    ],
  },

  // ───────────────────────────────────────────────────── 2 · Local Energy Market
  {
    slug: "local-energy-market",
    title: "Local Energy Market",
    subtitle: "Simulation-backed peer-to-peer solar trading on a residential LV feeder",
    rank: 2,
    tier: "large",
    maturity: null,
    categories: ["featured", "energy", "ai-ml", "engineering"],
    domains: ["energy", "ai"],
    period: "2026",
    summary:
      "Rooftop-solar households sell surplus to neighbours in a half-hourly uniform-price market, settled against cryptographically signed meter readings and anchored on-chain.",
    recruiterLine:
      "Forecasting (XGBoost, 30 % better than persistence), market design and smart-contract settlement in one system, built on real household energy data with 980 Python and 19 Solidity tests.",
    callout:
      "Simulation-backed on real data. There is no physical microgrid: meters are simulated processes holding real ECDSA keys, and load and generation come from Ausgrid's Solar Home Electricity dataset.",
    metrics: [
      { value: "159 Wh", label: "forecast MAE vs 226 Wh for persistence" },
      { value: "₹1,933", label: "per household-year, newsvendor bidding (simulated)" },
      { value: "980 + 19", label: "Python tests + Foundry tests" },
      { value: "~520k", label: "gas per settlement of 24 signed readings" },
    ],
    problem:
      "Households with rooftop solar export surplus at the feed-in tariff while neighbours on the same feeder import at the retail tariff. A local market could let both trade inside that band — but only if clearing is fair, trades are fixed before anyone sees the outcome, and settlement can be checked by someone other than the operator.",
    whyItMatters:
      "A local energy market is three problems at once: forecasting (how much will I have to sell an hour from now?), market design (what price, which rules?) and trust (who checks the operator?). This project builds all three on real household data and measures what each bidding strategy is worth.",
    system: [
      "The book clears every 30 minutes at one uniform price strictly inside the feed-in / retail band.",
      "Agents bid from out-of-sample P10 / P50 / P90 forecasts. On the Trade page a person can act for any household and replace its agent.",
      "keccak256 of the cleared trades is committed at gate closure, before any meter reports.",
      "Simulated meters sign readings with ECDSA keys. Settlement is two-pass and is checked on-chain by EnergyMarket.sol against MeterRegistry.sol.",
      "Next.js control room: 48-slot settlement ruler, feeder mimic, cleared and open books, per-household evidence, and a ‘Verify in this browser’ check that recomputes the hash and recovers every signature with viem.",
    ],
    architecture: {
      title: "System",
      steps: [
        { label: "Solar generation + household load", detail: "Ausgrid Solar Home data (Sydney, 2010–13) + ERA5 weather via Open-Meteo" },
        { label: "Forecast", detail: "XGBoost with calibrated quantiles; LSTM and baselines compared" },
        { label: "Local energy market", detail: "Orders band-checked in the web route, the engine and the contract" },
        { label: "Market clearing", detail: "Uniform-price double auction; I²R losses along each trade path" },
        { label: "Signed meter reading", detail: "ECDSA-signed readings; two-pass settlement in integer milli-paise" },
        { label: "Blockchain anchor", detail: "EnergyMarket.sol verifies the commitment and recovers 24 signatures" },
      ],
    },
    dataFlow: {
      title: "Commit before settle",
      steps: [
        { label: "Orders", detail: "Web API route · band check 1" },
        { label: "Python engine", detail: "Band check 2 · uniform-price auction · flows + losses" },
        { label: "Commit", detail: "keccak256(trades) → commit(slot, hash) at gate closure" },
        { label: "Meters sign", detail: "Readings signed after delivery" },
        { label: "Two-pass settlement", detail: "Contracted energy at the cleared price; deviations at grid tariffs" },
        { label: "EnergyMarket.sol", detail: "Band check 3 · verify commitment · recover signatures · emit events" },
      ],
    },
    decisions: [
      {
        title: "Matching off-chain, settlement on-chain",
        detail:
          "The contract never walks an order book. It checks that settled quantities match the commitment and what the meters signed.",
      },
      {
        title: "Commit before settle",
        detail:
          "The cleared trades' hash is published before any meter reports, so a restated trade fails the check — in Python, in the browser and in the contract. All three are tested.",
      },
      {
        title: "Uniform price, inside the band by construction",
        detail:
          "The price is the midpoint of the last matched bid and ask, both of which are inside the band. It is still checked in three layers, because each can be called without the others.",
      },
      {
        title: "Newsvendor bidding",
        detail:
          "The optimal contract is the forecast quantile at (p − feed-in) / (retail − feed-in). Under truthful bidding the price is the band midpoint, so that level is exactly 0.5.",
      },
      {
        title: "Integer money, exact conservation",
        detail:
          "Pass 1 pays the cleared price on contracted energy; pass 2 settles each household's deviation at retail (short) or feed-in (long). Money is integer milli-paise, so conservation is exact.",
      },
      {
        title: "Python and Solidity must agree byte for byte",
        detail:
          "Two Foundry tests consume a commitment and a meter signature produced by the Python code, proving the encodings match.",
      },
      {
        title: "Pinned data provenance",
        detail:
          "Ausgrid withdrew the download, so an archive copy is pinned by SHA-256. The parser must reproduce Ausgrid's published annual means and medians to the kWh or the build fails.",
      },
    ],
    results: [
      "Forecasting (net energy two half-hours ahead, test window Oct 2012 – Jun 2013, never used for fitting): XGBoost MAE 159 Wh vs 226 Wh for persistence (+30 %, day-block 95 % CIs do not overlap). The LSTM loses to it by 20 % but has better-calibrated bands.",
      "Giving the model the target slot's actual weather (an oracle) improves it by under 1 %: at this horizon the household's own last reading already carries what reanalysis knows.",
      "Strategies over six months and 24 households, against billing the same meters with no market: seasonal-naive volumes save ₹1,077 per household-year (43 % of perfect foresight), the learned median ₹1,786 (71 %), the newsvendor quantile ₹1,933 (77 %).",
      "Wheeling charge: households stop gaining at ₹2.33/kWh with naive forecasts and at ₹5.15/kWh with newsvendor bidding, just below the band's closure at ₹5.50.",
      "Incentive compatibility: 8 of 10 PV sellers gain by shading their offer 40 %; no buyer gains. The auction is not strategy-proof here, but the effect is a transfer from buyers to sellers rather than lost welfare.",
      "Property tests over hundreds of random books: the price is strictly inside the band, every Wh bought was sold, nobody trades worse than their limit, and money is conserved exactly.",
    ],
    limitations: [
      "No physical microgrid. The contract verifies which key signed a reading, not that the reading is true — the oracle problem is relocated, not solved.",
      "The feeder topology is synthetic, and 14 of 24 households have their PV removed so the feeder has buyers at noon.",
      "No weather-forecast archive covers 2012–13, so forecasts use no weather.",
      "XGBoost quantiles come from a calibrated error model; native quantile regression did not converge in practical time.",
      "Losses are I²R on conductors only — no load flow, voltage, thermal or phase effects.",
      "Settlement runs on a local Anvil chain; a Polygon Amoy deployment needs a funded key. History lives in the engine's memory.",
      "Prices are in rupees on an Indian tariff band applied to Australian households.",
    ],
    stack: [
      "Python 3.11",
      "XGBoost",
      "PyTorch (LSTM)",
      "pandas",
      "FastAPI",
      "Solidity",
      "Foundry",
      "Next.js 14",
      "TypeScript",
      "viem",
      "Docker",
    ],
    repos: [{ name: "Solar-Trading", url: gh("Solar-Trading") }],
    live: {
      url: "https://local-energy-market.onrender.com",
      note: "Free instance — the first load can take about a minute to wake",
    },
    media: [
      {
        src: "/projects/solar/forecast-fan.png",
        alt: "Line chart of net kWh per half hour for Ausgrid customer 280 from 11 to 14 November 2012, showing the P50 forecast tracking the metered line inside a shaded P10–P90 band, with the seasonal-naive baseline diverging on the last day.",
        caption: "Forecast two slots ahead vs the meter, test window (from reports/forecasting).",
        width: 1680,
        height: 588,
      },
      {
        src: "/projects/solar/wheeling.png",
        alt: "Line chart titled ‘Where a network charge eats the market’: households' total saving versus no market falls as the wheeling charge rises from 0 to 5.5 rupees per kWh. Seasonal-naive bidding crosses zero near 2.33; newsvendor-quantile bidding stays positive until about 5.15.",
        caption: "Wheeling-charge sensitivity: naive vs newsvendor bidding (from reports/study).",
        width: 1260,
        height: 588,
      },
    ],
    interview: [
      {
        q: "Why a local energy market?",
        a: "On a solar feeder, surplus is exported at the feed-in tariff while neighbours import at retail. Clearing locally inside that band lets both sides beat the grid-only counterfactual. The study measures by how much, per strategy, against billing the same meters with no market.",
        evidence: "reports/study/results.md",
      },
      {
        q: "How does market clearing work?",
        a: "Each half-hour book is a double auction: bids walked from highest, asks from lowest, matched while the bid still meets the ask. Everyone trades at one price, the midpoint of the last matched bid and ask. Flows and I²R losses are then computed along each trade's path, capped at 5 %.",
        evidence: "market/double_auction.py · market/losses.py",
      },
      {
        q: "Why a uniform price?",
        a: "One price per slot is easy to explain and cheap to verify on-chain, and under truthful bidding it sits at the band midpoint. The study shows it is not strategy-proof on this supply-short feeder — sellers gain by shading — but that is a transfer, not lost welfare.",
        evidence: "Readme › Incentive compatibility",
      },
      {
        q: "Why use a blockchain at all?",
        a: "Not for matching — for non-repudiation. Publishing the trade commitment before delivery and verifying signed readings on-chain means the operator cannot restate an outcome afterwards. Matching stays off-chain where it is cheap.",
        evidence: "contracts/src/EnergyMarket.sol (NatSpec)",
      },
      {
        q: "What is signed off-chain and what is anchored on-chain?",
        a: "Off-chain, each meter signs its reading with its ECDSA key and the engine hashes the cleared trades with keccak256. On-chain, commit(slot, hash) lands at gate closure; settle(…) then checks quantities against the commitment and recovers all 24 signatures against MeterRegistry.",
        evidence: "sim/crypto.py · sim/chain.py · contracts/src",
      },
      {
        q: "Why XGBoost?",
        a: "It won on the held-out window: MAE 159 Wh against 226 Wh for persistence, and 20 % better than the LSTM. The LSTM, trained on pinball loss, had better-calibrated bands — a real trade-off — so XGBoost's quantiles come from a calibrated error model.",
        evidence: "reports/forecasting/results.md",
      },
      {
        q: "How was forecasting evaluated?",
        a: "Target: net energy two half-hours ahead, the market's gate. Test window Oct 2012 – Jun 2013, never used for fitting or selection. Day-block bootstrap 95 % CIs, persistence and seasonal-naive baselines, a feature leakage test, and an oracle-weather check.",
        evidence: "ml/evaluate.py · ml/tests/test_features.py",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 3 · TokenGrid
  {
    slug: "tokengrid",
    title: "TokenGrid",
    subtitle: "AI Token Metering & Cost Intelligence Infrastructure",
    rank: 3,
    tier: "large",
    maturity: null,
    categories: ["featured", "ai-ml", "software"],
    domains: ["ai", "software", "data"],
    period: "2026",
    summary:
      "A streaming gateway that meters every LLM call exactly, attributes it to a person and turns spend into coaching — without ever delaying the response.",
    recruiterLine:
      "Infrastructure, not a chatbot: a Fastify proxy for OpenAI and Anthropic that meters usage asynchronously through Redis Streams into Postgres, with budgets, reconciliation and consent-based privacy.",
    metrics: [
      { value: "2", label: "providers behind one ProviderAdapter" },
      { value: "0", label: "bytes of prompt text stored" },
      { value: "2 %", label: "drift threshold vs the provider's bill" },
      { value: "6", label: "integration acceptance stages" },
    ],
    problem:
      "Teams pay for AI by the token, but spend is invisible at the level that matters: which person, which workflow, and how much went on retries or an over-sized model. Consumer subscriptions expose no usage API, and provider admin APIs only show totals after the fact.",
    whyItMatters:
      "Cost control needs exact, attributable data in real time: budgets that act before the bill, and feedback a person can act on. A meter in the request path must never be the reason an answer is late or lost, and it must not become surveillance of prompts.",
    system: [
      "apps/gateway — Fastify streaming proxy for Anthropic and OpenAI behind one ProviderAdapter interface. Checks the budget before forwarding and emits usage to a Redis Stream after the response closes.",
      "apps/ingest — stream consumer that prices each event by its timestamp, inserts it exactly once with its hourly rollup, maintains spend counters, detects retries, and runs lint rules and efficiency scores. Nightly reconciliation and retention.",
      "apps/web — Next.js dashboard and /api/usage, where the consent and audit rules live.",
      "packages/db — Drizzle schema, migrations, seed and envelope encryption for provider credentials. packages/shared — the usage event format and exact integer cost math.",
    ],
    architecture: {
      title: "Request path",
      steps: [
        { label: "Client", detail: "Official SDK pointed at the gateway with a virtual key" },
        { label: "Fastify gateway", detail: "Auth · budget check (402 over limit, warning from 80 %)" },
        { label: "OpenAI / Anthropic", detail: "Provider adapter forwards the streaming request" },
        { label: "Response", detail: "Streamed to the client first; usage parsed from a copy" },
        { label: "Redis Stream", detail: "XADD after the response closes; never awaited" },
        { label: "Ingestion", detail: "Price by timestamp · insert once · rollup · counters" },
        { label: "Database", detail: "PostgreSQL 16 via Drizzle" },
        { label: "Analytics", detail: "Retries, lint findings, efficiency score" },
        { label: "Cost intelligence", detail: "Budgets, coaching dashboard, reconciliation" },
      ],
    },
    dataFlow: {
      title: "A usage event's life",
      steps: [
        { label: "UsageMeter", detail: "Reads the streamed chunks as they pass" },
        { label: "UsageEventV1", detail: "Normalised tokens, cache use, pricing tier" },
        { label: "Consumer group", detail: "Worker reads and acknowledges" },
        { label: "model_prices", detail: "Append-only, dated rows; missing price → DLQ" },
        { label: "Insert + rollup", detail: "Exactly once, with its hourly aggregate" },
        { label: "Reconcile", detail: "Nightly vs provider admin API; alert over 2 %" },
      ],
    },
    decisions: [
      {
        title: "The gateway is the source of truth",
        detail: "Consumer subscriptions expose no usage API. Provider admin APIs are used only to reconcile against.",
      },
      {
        title: "Metering never blocks delivery",
        detail:
          "UsageEmitter.emit never throws and never awaits Redis. Failed sends wait in a bounded in-memory buffer (10,000 events), so a few seconds of Redis failover costs nothing.",
      },
      {
        title: "No MAXLEN on write",
        detail: "Trimming on write would discard events the worker has not consumed. The worker trims acknowledged history instead.",
      },
      {
        title: "Budgets fail open",
        detail:
          "Over the limit the gateway returns 402 naming the limit and the spend. If Redis is down the check fails open: availability over strictness, and documented as such.",
      },
      {
        title: "Prices are append-only and future-dated",
        detail:
          "A price change is a new row dated at least 2 minutes ahead (workers cache prices for 60 s); the database refuses anything sooner. An event with no price goes to a DLQ rather than being stored at a guessed cost.",
      },
      {
        title: "Exactly one body modification",
        detail:
          "OpenAI streaming only reports usage with stream_options.include_usage, so OpenAIAdapter.prepareBody sets it. It is the single place a forwarded body changes.",
      },
      {
        title: "Privacy by construction",
        detail:
          "After delivery, prompts are reduced to hashes and sizes. Managers see team totals with unnamed lines; opening one person needs their consent and writes an audit row first.",
      },
    ],
    results: [
      "Unit tests cover budgets, both provider adapters, efficiency scoring and reconciliation.",
      "Integration stages 1–6 run the real gateway, worker and dashboard against fake provider APIs on a throwaway PostgreSQL 16. Stage 6 rehearses a cold deploy with a real redis-server: consumer groups, a worker crash with a backlog, and replay over the real stream.",
      "Retry detection: a structurally identical final turn (same fingerprint, shape and numbers, simhash within 3 bits) within 15 minutes; the earlier response is counted as wasted in its own hour.",
      "Efficiency score = retries (0.35) + model fit (0.25) + cache use (0.2) + acceptance (0.2). A component without measured input has its weight redistributed and is shown as such.",
      "Export (NDJSON) and delete-on-request. Deletion moves hourly totals to an unnamed ‘Former member’ line so org totals, budgets and reconciliation still add up.",
    ],
    limitations: [
      "Calls already in flight when a budget is crossed still complete, so spend can overshoot by their cost.",
      "Web search and other server-tool charges are not priced yet; those events wait in the DLQ.",
      "Fast-mode, flex, priority and long-context price variants are not seeded until verified prices are added.",
      "Beyond the 10,000-event buffer, or on process exit, unsent events are lost and counted.",
      "Cost against the provider console is a manual check that costs real money.",
      "No public live demo. Deployment configs target Fly.io (gateway, worker) and Vercel (dashboard).",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Fastify",
      "Redis Streams",
      "PostgreSQL 16",
      "Drizzle ORM",
      "Next.js",
      "pnpm workspaces",
      "Docker",
      "Fly.io",
    ],
    repos: [{ name: "Token-Saver", url: gh("Token-Saver") }],
    interview: [
      {
        q: "Why Redis Streams?",
        a: "The gateway needs a durable hand-off it can write to quickly and forget. Streams give append-only persistence, consumer groups with acknowledgements, and replay — a worker can crash with a backlog and resume, and the replay and redrive tools run over the same stream. Integration stage 6 exercises exactly that.",
        evidence: "apps/ingest/src/stream.ts · tests/integration",
      },
      {
        q: "Why asynchronous metering?",
        a: "Pricing, inserting, rolling up and scoring an event all need database round-trips. Doing that inline would add latency to every call and make the user's answer depend on Postgres being up. Asynchronous ingestion moves all of it off the request path.",
        evidence: "README › Principles",
      },
      {
        q: "Why does metering not block delivery?",
        a: "The response is written to the client first; usage is read from a copy of the stream and recorded afterwards. emit() never throws and never awaits Redis. If Redis or Postgres is down, the user still gets their answer.",
        evidence: "apps/gateway/src/emit.ts",
      },
      {
        q: "How does the provider abstraction work?",
        a: "ProviderAdapter captures what differs per provider: upstream headers, prepareBody, createMeter (a streaming usage parser fed every chunk), request-id extraction, prompt features and error bodies. The proxy core is provider-agnostic; Anthropic and OpenAI are two implementations with their own tests.",
        evidence: "apps/gateway/src/providers/types.ts",
      },
      {
        q: "How are retries detected?",
        a: "After delivery each request is reduced to a fingerprint, shape, numbers and a simhash. A retry is a structurally identical final turn — simhash within 3 bits — inside 15 minutes in the same session (the x-tokengrid-session header, or the key). The earlier response counts as wasted.",
        evidence: "apps/ingest/src/efficiency.ts",
      },
      {
        q: "How is privacy handled?",
        a: "No prompt text is stored or leaves the gateway — only hashes and sizes. People see their own data; managers see team totals with unnamed lines, hidden entirely below three other people. Opening one person needs their consent, writes an audit row first and is listed on that person's own dashboard.",
        evidence: "apps/web/src/lib/usage.ts",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 4 · Doppelgänger
  {
    slug: "doppelganger-entity-resolution",
    title: "Doppelgänger",
    subtitle: "Business Entity Resolution",
    rank: 4,
    tier: "medium",
    maturity: null,
    categories: ["featured", "ai-ml", "data"],
    domains: ["ai", "data"],
    period: "2026",
    summary:
      "Matches every noisy Source-2/3 record to its Source-1 business across three sources — and rejects the look-alikes planted next door.",
    recruiterLine:
      "Two-stage LightGBM ranker with entity ownership and an expected-F0.5 decision layer: 0.9752 F0.5 and 0.9921 precision on held-out test, against 0.6529 for tuned fuzzy matching.",
    callout: "Built for ML Challenge 2026, scored by macro F0.5. No pretrained language model or external data.",
    metrics: [
      { value: "0.9752", label: "macro F0.5 on TEST" },
      { value: "0.9921", label: "precision" },
      { value: "0.9462", label: "recall" },
      { value: "0.6529", label: "tuned fuzzy-matcher baseline" },
    ],
    problem:
      "Three sources describe the same businesses with spelling variation, aliases, pseudo-words, URLs, native-script names and empty addresses. The data also plants sibling decoys: same name, same street, house number moved a few doors. The task is to match every Source-2/3 record to the right Source-1 entity across ~22M records.",
    whyItMatters:
      "Entity resolution sits under KYC, deduplication and every business-data product. Here similarity alone fails: a decoy next door looks more similar than a genuine record disguised as a URL. F0.5 weights precision, so a false merge costs more than a miss.",
    system: [
      "Normalise (vectorised pyarrow): split aliases; flag URL, handle, junk, native-script and pseudo names; fold accents while keeping Indic vowel signs; read digits inside words (c0mmerce → commerce); extract house numbers.",
      "Learn a lexicon from TRAIN labels only: state and département equivalences and a 1,312-token transliteration dictionary.",
      "Block with 8 integer-packed key families in a sorted index; each record keeps its best 8 entities by rarity-weighted votes.",
      "Stage 1 LightGBM on 37 pairwise features. Stage 2 adds competition features from out-of-fold stage-1 scores and group-coherence features.",
      "Decide: each record goes to at most one entity; each entity's list is the probability-ranked prefix that maximises expected F0.5.",
      "France has no labels: the reverse-engineered noise generator synthesises labelled French variants and decoys, plus one self-training round.",
    ],
    architecture: {
      title: "Pipeline",
      steps: [
        { label: "Noisy records", detail: "~22.3M records from three sources" },
        { label: "Normalization", detail: "Aliases, scripts, URLs, digit-letter swaps, house numbers" },
        { label: "Candidate generation", detail: "8 key families · pair recall 0.9794" },
        { label: "Feature engineering", detail: "37 pairwise + 9 competition + 4 group-coherence" },
        { label: "ML ranker", detail: "Two-stage LightGBM, out-of-fold stage-1 scores" },
        { label: "Entity ownership", detail: "Each record assigned to at most one entity" },
        { label: "Expected-F0.5 list", detail: "Probability-ranked prefix per entity; floor frozen on VALID" },
        { label: "Resolved entities", detail: "1,732,544 rows · 5,746,970 matched ids (final file)" },
      ],
    },
    dataFlow: {
      title: "Validation protocol",
      steps: [
        { label: "Hash split by entity", detail: "TRAIN 50 % · VALID 10 % · TEST 10 % · held out 30 %" },
        { label: "Lexicon", detail: "Learned from TRAIN labels only" },
        { label: "Out-of-fold scores", detail: "Stage 2 never sees its own stage-1 fit" },
        { label: "VALID", detail: "Every choice: features, blocking, model, decision floor" },
        { label: "TEST", detail: "Scored once per frozen design" },
        { label: "Final refit", detail: "All labelled entities + synthetic France block" },
      ],
    },
    decisions: [
      {
        title: "Measure the ceiling before modelling",
        detail:
          "Blocking keeps 18.6M train pairs at pair recall 0.9794. A perfect matcher on those candidates would score 0.9929, so the blocking loss is measured, not assumed.",
      },
      {
        title: "Judge each record against its rivals",
        detail:
          "Competition features — rank and margin among the entity's candidates, and the rival entity's claim on the record — separate a genuine record from a sibling decoy.",
      },
      {
        title: "Optimise the metric directly",
        detail:
          "Calibrated probabilities let each entity's list be the prefix that maximises expected F0.5. The only free parameter, a probability floor, is frozen on VALID.",
      },
      {
        title: "Train at test-like density",
        detail:
          "TEST had more hard same-street siblings than train (US 1.04 → 1.76 per entity), measured without labels. The v3 model fell from 0.9806 to 0.9552 at that density; calibrated synthetic decoys closed the gap.",
      },
      {
        title: "LightGBM over alternatives",
        detail:
          "On VALID pairs ROC-AUC was 0.9768 (logistic regression), 0.9973 (random forest), 0.9964 (ExtraTrees) and 0.9987–0.9988 (LightGBM). XGBoost and CatBoost gave no gain.",
      },
    ],
    results: [
      "TEST (v4, test-like density): F0.5 0.9752 · precision 0.9921 · recall 0.9462 · F1 0.9686 · ROC-AUC 0.9986. US 0.9794, India 0.9688.",
      "Tuned fuzzy matcher on the same TEST: 0.6529.",
      "Leaderboard: v4 0.9709. The final v5 adds a cross-source fill in the decision layer (+0.0004 on VALID and TEST).",
      "France without labels: the synthetic-data approach, validated by treating India as unlabelled, moved 0.9392 → 0.9424.",
      "End to end ≈ 3.3 CPU-hours on a 16 GB laptop with no GPU.",
    ],
    limitations: [
      "99 % is not reached on any held-out measurement. Remaining errors: true matches blocking never proposes (0.007), hard same-street siblings, and empty-address records whose name is shared by several entities.",
      "The real test behaved closer to plain density than to the synthetic test-like density, so the +0.020 local gain moved the leaderboard only slightly.",
      "A wider candidate cut (top 12) validated at +0.0003 to +0.0004, but its refit (24.1M pairs) does not fit in 16 GB of RAM, so the submission keeps the top 8.",
    ],
    stack: ["Python", "pyarrow", "pandas", "NumPy", "LightGBM", "RapidFuzz", "scikit-learn", "FastAPI", "pytest"],
    repos: [{ name: "business-entity-resolution", url: gh("business-entity-resolution") }],
    interview: [
      {
        q: "Why F0.5?",
        a: "It is the challenge metric, averaged per Source-1 entity. F0.5 weights precision over recall: attaching a decoy to a business is worse than missing a record. That shaped everything downstream, from ownership to the expected-F0.5 list builder.",
        evidence: "docs/METHODOLOGY.md",
      },
      {
        q: "Why candidate generation?",
        a: "Scoring every record against every entity is quadratic over millions. Eight key families keep 18.6M train pairs at 0.9794 pair recall, and give an oracle ceiling (0.9929), so I know how much error comes from blocking and how much from the model.",
        evidence: "docs/BLOCKING.md",
      },
      {
        q: "Why LightGBM?",
        a: "Fifty tabular, NaN-heavy features over 18.6M pairs on CPU. It trains in minutes, gives calibrated probabilities and exact SHAP values for the explorer, and topped the comparison on VALID (ROC-AUC 0.9987–0.9988). XGBoost and CatBoost gave no gain.",
        evidence: "docs/MODEL.md · docs/EXPERIMENT_LOG.md",
      },
      {
        q: "How are hard negatives created?",
        a: "From the measured noise model: synthetic sibling decoys — same name and street, house number moved — thinned per country to close exactly the hard-sibling gap between train and test (US 93.8 % kept, India 52.3 %; 1.84M used). Synthetic decoys are never labelled true.",
        evidence: "docs/VALIDATION.md › Test-like density",
      },
      {
        q: "How do you prevent leakage?",
        a: "Split by a hash of the Source-1 entity id, so all records of one business share a role. The lexicon is learned from TRAIN labels only. Stage 2 uses out-of-fold stage-1 scores. Every choice is made on VALID; TEST is scored once per frozen design.",
        evidence: "docs/VALIDATION.md › Protocol",
      },
      {
        q: "Why does similarity alone fail?",
        a: "The decoys are built to be similar: same name, same street, house number a few doors away. Genuine records, meanwhile, are disguised as URLs, pseudo-words or native script. Tuned fuzzy matching scores 0.6529; judging each record by the noise that produced it and against its rivals scores 0.9752.",
        evidence: "README › Results",
      },
    ],
  },

  // ──────────────────────────────────────────── 5 · Field-Device Predictive Maintenance
  {
    slug: "field-device-predictive-maintenance",
    title: "Field-Device Predictive Maintenance",
    subtitle: "Combi Mill cause classifier → Combi Mill + Power Fleet",
    rank: 5,
    tier: "medium",
    maturity: null,
    categories: ["featured", "industrial", "ai-ml", "engineering"],
    domains: ["industry", "ai", "data"],
    period: "2026",
    summary:
      "Classifies which field device caused a mill delay from the delay log's free text — evaluated the way it will be used, on months it has never seen.",
    recruiterLine:
      "Industrial ML with honest validation: 70.3 % time-based holdout accuracy (not the 76.3 % CV score), a live FastAPI dashboard, FMEA risk fusion, and public power-fleet benchmarks.",
    callout:
      "One case study, two repositories: v1 is the Tata Steel Combi Mill cause classifier; v2 extends it into the Combi Mill + Power Fleet dashboard with a stricter rolling backtest.",
    metrics: [
      { value: "70.3 %", label: "time-based holdout accuracy (v1)" },
      { value: "62.7 %", label: "pooled 3-month rolling backtest (v2)" },
      { value: "345", label: "hand-tagged delay events (v1)" },
      { value: "~35,000", label: "power plants in the global view" },
    ],
    problem:
      "Field devices — photocells, HMDs, proximity sensors, encoders, LVDTs and others — cause production delays at a steel combi mill. Each delay is logged as free text by maintenance staff. Knowing which device caused it, and where delays cluster, supports the plant's FY27 target: reduce field-device delays by 50 % over FY26.",
    whyItMatters:
      "With a few hundred labelled events, the evaluation method decides whether the number means anything. Shuffled cross-validation mixes months, so the model sees the test period's phrasing during training. A maintenance team needs to know how it will do next month.",
    system: [
      "v1 — Random Forest (30-iteration RandomizedSearchCV) over 168 features: TF-IDF text plus domain keyword and pattern flags. 345 events, 9 device classes. FastAPI /predict with a low-confidence flag below 35 %, /model_info read from the training manifest, retraining with archived and accepted models, and a model card.",
      "v2 — three-tab dashboard. Combi Mill: device Pareto, area red zones, 6-month forecast, recurrence health scores, FMEA fusion, review queue and shadow-mode validation. Power Fleet: US NRC event reports — field-device failures, failure modes, trip rates, grid / offsite-power events, plants ranked by trips per GW, cross-site lessons. Global: ~35,000 plants from the WRI database.",
      "v2 training compares 4 model families × 4 data mixes × an explicit-device-mention rule and selects by rolling backtest. Power-plant data is adopted only if it wins by at least 2 points.",
    ],
    architecture: {
      title: "Model workflow",
      steps: [
        { label: "Ingestion", detail: "Mill delay log + public NRC and WRI data (resumable fetch)" },
        { label: "Data quality", detail: "684 mill events → 349 resolve to a field device" },
        { label: "Device / failure-mode tagging", detail: "Hand tags at the mill; keyword weak labels on NRC" },
        { label: "Model training", detail: "RF · HistGB · LR · CatBoost × data mixes × rule" },
        { label: "Time-based backtest", detail: "Train strictly before; test on the unseen month" },
        { label: "Prediction", detail: "FastAPI · confidence flag below 35 %" },
        { label: "Health / risk", detail: "Recurrence health score + FMEA fusion" },
        { label: "Maintenance review", detail: "Review queue · shadow mode · human decision" },
      ],
    },
    dataFlow: {
      title: "How the v2 winner is chosen",
      steps: [
        { label: "Candidates", detail: "4 families × 4 data mixes × rule on/off" },
        { label: "Rolling backtest", detail: "Mar-26, Apr-26, May-26, each trained only on earlier months" },
        { label: "Pool", detail: "161 unseen test events" },
        { label: "2-point bar", detail: "External data must beat home-only by ≥ 2 points" },
        { label: "Winner", detail: "Logistic Regression + explicit-mention rule, mill data only" },
      ],
    },
    honesty: {
      title: "Model honesty",
      columns: [
        {
          heading: "v1 · Random Forest",
          rows: [
            { label: "5-fold CV (weighted F1)", value: "76.3 %" },
            { label: "Time-based holdout · May-26, n = 37", value: "70.3 %", headline: true },
          ],
        },
        {
          heading: "v2 · LR + explicit-mention rule",
          rows: [
            { label: "CV accuracy (reference only)", value: "78.5 %" },
            { label: "Rolling backtest · 3 months, n = 161", value: "62.7 %", headline: true },
          ],
        },
      ],
      reason:
        "Shuffled CV mixes months, so phrasing from the test period leaks into training. A time-based holdout trains only on the past and tests on the next unseen month — what the plant will actually experience. For earlier versions the gap was as large as 25 points (76.5 % CV vs 51.4 % holdout).",
    },
    decisions: [
      {
        title: "Select on time-based holdout, not CV",
        detail:
          "v1 picked the Random Forest by holdout: 70.3 %, against 64.9 % for Logistic Regression and CatBoost and 48.6 % for HistGradientBoosting.",
      },
      {
        title: "Pool three unseen months",
        detail:
          "One month of 36–37 events moves about 3 points per error. v2 pools Mar, Apr and May-26 (161 events): a harder and more stable number. On May-26 alone the new model scores 75.0 %.",
      },
      {
        title: "Explicit-device-mention rule",
        detail:
          "If the text names exactly one device class, use it. +1.9 to +6.8 points on all 16 configurations (+3.7 on the winner). It covers 29 % of events and matches the human label 94 % of the time.",
      },
      {
        title: "External data must earn its place",
        detail:
          "~3,900 NRC events gave +1.2 points (about 2 test events) — below the 2-point bar, so not adopted. They power the fleet insights and never enter a test set.",
      },
      {
        title: "Never train on the model's own guesses",
        detail: "Rows logged through /log_event are excluded from training, because their label is the model's prediction.",
      },
    ],
    results: [
      "v1 candidates on the May-26 holdout: Random Forest 70.3 %, Logistic Regression 64.9 %, CatBoost 64.9 %, HistGradientBoosting 48.6 %.",
      "v2 backtest by month: Mar-26 77.8 %, Apr-26 56.1 %, May-26 75.0 % — pooled 62.7 % over 161 events.",
      "v2 per-class precision / recall: Pressure Switch 0.90 / 1.00 · HMD 0.84 / 0.79 · Photocell 0.72 / 0.62 · Proximity 0.61 / 0.74 · LVDT 0.39 / 0.48 · Encoder 0.40 / 0.25.",
      "Live dashboard deployed on Render with the API docs at /docs.",
    ],
    limitations: [
      "Text-only: no live PLC or sensor signals, so it cannot catch degradation before it is described in a delay log.",
      "Small data: 344–345 labelled events. Classes with a single event (RFID, TT, HIP) are excluded.",
      "Encoder and LVDT are the weakest, most-confused classes in every version; their failure descriptions use near-identical words.",
      "NRC device labels are keyword-derived weak labels, and the dashboard says so.",
      "Shadow mode works but has one resolved entry so far. Not for unsupervised maintenance decisions. On Render's free plan, shadow entries are lost on redeploy.",
      "335 untagged mill events wait in the review queue: more hand-tagged data is the main lever for accuracy.",
    ],
    stack: ["Python", "scikit-learn", "CatBoost", "TF-IDF", "pandas", "NumPy", "FastAPI", "pytest", "Render"],
    repos: [
      { name: "predictive-maintenance-analysis", url: gh("predictive-maintenance-analysis"), note: "v1 · cause classifier" },
      { name: "predictive-analysis-model", url: gh("predictive-analysis-model"), note: "v2 · Combi Mill + Power Fleet" },
    ],
    live: { url: "https://field-device-pdm.onrender.com", note: "v2 dashboard · free instance, may take a minute to wake" },
    media: [
      {
        src: "/projects/pdm/confusion-matrix.png",
        alt: "Confusion matrix for the logistic-regression model on the March to May 2026 backtest. The diagonal is strong for HMD (26), Proximity (25), Photocell (23) and Pressure Switch (9); Encoder events are predicted as LVDT (7) more often than as Encoder (6).",
        caption: "v2 honest backtest, Mar-26 → May-26. Encoder rows land on LVDT more often than on Encoder.",
        width: 1650,
        height: 1350,
      },
    ],
    interview: [
      {
        q: "Why time-based validation?",
        a: "Because that is how the model is used: trained on the past, applied to next month. Delay descriptions repeat phrasing within a month, and shuffled folds let that leak. v1 trains on Nov-25 → Apr-26 and tests on the unseen May-26; v2 repeats that for three months in turn.",
        evidence: "MODEL_CARD.md (both repositories)",
      },
      {
        q: "Why not rely on CV?",
        a: "Here it misleads. For the deployed v1 model CV said 76.3 % and the holdout 70.3 %; for earlier versions the gap reached 25 points (76.5 % vs 51.4 %). Selecting on CV would have picked the wrong models, so CV is reported for reference only.",
        evidence: "predictive-maintenance-analysis/MODEL_CARD.md › Accuracy",
      },
      {
        q: "What causes class confusion?",
        a: "Encoder versus LVDT. Kick-off-arm and position-feedback faults are logged in near-identical words whichever sensor failed — six rows read ‘Kick off arm encoder feedback missing’ but are labelled LVDT. That is a vocabulary and labelling problem, not something tuning fixes.",
        evidence: "predictive-analysis-model/MODEL_CARD.md › Known weak point",
      },
      {
        q: "What are the limitations?",
        a: "Text-only (no PLC signals), a few hundred labelled events, weak labels on the public NRC data, and shadow-mode validation that has barely started. The model card says plainly not to use it for unsupervised maintenance decisions.",
        evidence: "MODEL_CARD.md › Known limitations",
      },
      {
        q: "Why human review?",
        a: "At this accuracy, with known confusions, the model is prioritisation and diagnostic support. Predictions under 35 % confidence are flagged for manual diagnosis, untagged events go to a review queue, and shadow mode compares predictions with confirmed outcomes before anyone trusts it.",
        evidence: "MODEL_CARD.md › When NOT to trust the model",
      },
      {
        q: "Why didn't 3,900 extra power-plant events help?",
        a: "More data helps only if it is relevant and labelled. Plant staff rarely name a specific sensor in NRC reports: 1–2 % name exactly one field-device class, mostly classes the mill does not have. The gain was within noise, so the selection kept the home-only model.",
        evidence: "predictive-analysis-model/MODEL_CARD.md",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── 6 · Nifty 100
  {
    slug: "nifty100-financial-intelligence",
    title: "Nifty 100 Financial Intelligence Platform",
    subtitle: "ETL, analytics, screening and peer intelligence for India's Nifty 100",
    rank: 6,
    tier: "medium",
    maturity: null,
    categories: ["featured", "data", "ai-ml"],
    domains: ["data"],
    period: "2026",
    summary:
      "An end-to-end analysis platform: raw financial statements → validated SQLite store → KPIs, screener, peer percentiles and clustering → dashboard, API and PDF tearsheets.",
    recruiterLine:
      "Python data platform for Nifty 100 companies: SQLite store, 14+ KPIs and CAGR, screener, peer percentiles, KMeans segments, 9 Streamlit screens, a FastAPI backend and 91 generated tearsheets.",
    metrics: [
      { value: "11 + 4", label: "SQLite tables + analytical views" },
      { value: "9", label: "Streamlit screens" },
      { value: "9", label: "FastAPI endpoints" },
      { value: "91", label: "generated PDF tearsheets" },
    ],
    problem:
      "Comparing Nifty 100 companies means reconciling P&L, balance-sheet and cash-flow data across years, then asking the same questions again and again: which companies compound, which look cheap, and how does each compare with its real peers?",
    whyItMatters:
      "Screens and peer comparisons are only as good as the data under them. Separating ingestion, validation, analytics and presentation lets each layer be tested, and lets a dashboard, an API and PDF reports share one source of truth.",
    system: [
      "ETL (loader, normaliser, validator) from raw Excel into SQLite: companies, sectors, P&L, balance sheet, cash flow, ratios, market cap, stock prices, YoY growth, peer percentiles and rankings.",
      "Analytics: 14+ KPIs, a CAGR engine, cash-flow KPIs, capital-allocation patterns, trend analysis and company scoring.",
      "Screener with multi-filter and presets (e.g. Quality Compounder, Value Pick), configured in YAML.",
      "Peer analysis with percentile rankings inside peer groups, and KMeans segmentation (k = 5).",
      "Rule-based pros and cons, ReportLab PDF tearsheets and radar charts.",
      "Streamlit dashboard (Home, Profile, Screener, Peers, Trends, Sectors, Capital Allocation, Reports, Valuation) and a FastAPI backend.",
    ],
    architecture: {
      title: "Pipeline",
      steps: [
        { label: "Raw data", detail: "Excel exports: P&L, balance sheet, cash flow, prices" },
        { label: "ETL", detail: "Loader → normaliser" },
        { label: "Data quality", detail: "Validator with a rule-id / severity failure log + manual review sample" },
        { label: "SQL database", detail: "SQLite · 11 tables + 4 views" },
        { label: "Financial analytics", detail: "14+ KPIs · CAGR · capital allocation" },
        { label: "Screener", detail: "Filters + presets from config" },
        { label: "Peer analysis", detail: "Percentile ranks inside peer groups" },
        { label: "KMeans", detail: "Company segments (k = 5)" },
        { label: "Dashboard / API / Report", detail: "Streamlit · FastAPI · ReportLab" },
      ],
    },
    dataFlow: {
      title: "One store, three outputs",
      steps: [
        { label: "SQLite", detail: "Single analytical store" },
        { label: "Streamlit", detail: "9 interactive screens" },
        { label: "FastAPI", detail: "/companies · /screener · /sectors · /peers · /clusters" },
        { label: "ReportLab", detail: "Per-company PDF tearsheets" },
      ],
    },
    decisions: [
      {
        title: "SQLite as the analytical store",
        detail:
          "One file, zero operations, shared by the dashboard, the API and the report generators. SQL views (top ROE, low debt, high margin, company summary) keep common queries in one place.",
      },
      {
        title: "Percentiles inside peer groups",
        detail: "A bank's margins mean nothing next to an IT company's. Ranking within peer groups makes comparisons fair.",
      },
      {
        title: "Rule-based pros and cons",
        detail: "Deterministic statements derived from the ratios, so every claim on a tearsheet can be traced to a number.",
      },
      {
        title: "Screener presets as configuration",
        detail: "Preset definitions live in config/screener_config.yaml rather than code, so a new screen needs no code change.",
      },
    ],
    results: [
      "9 Streamlit screens, a FastAPI backend with 9 endpoints, and 91 PDF tearsheets plus 15 radar charts committed in reports/.",
      "64 pytest tests across ETL, KPI ratios and final database checks.",
      "KMeans (k = 5, n_init = 10, fixed seed) exposed through /clusters and /clusters/summary.",
    ],
    limitations: [
      "Batch analytics over static Excel exports; no live market-data feed.",
      "SQLite suits a 100-company universe and a single writer, not concurrent writes.",
      "KMeans segments are descriptive groupings for exploration, not a predictive model.",
    ],
    stack: ["Python", "pandas", "SQLite", "Streamlit", "Plotly", "FastAPI", "scikit-learn", "ReportLab", "pytest"],
    repos: [{ name: "nifty100-financial-platform", url: gh("nifty100-financial-platform") }],
    interview: [
      {
        q: "Why SQLite rather than Postgres?",
        a: "The universe is 100 companies and one writer. A single-file store needs no server, travels with the repo and is fast enough for every screen. If the platform needed concurrent writers or live prices, Postgres would be the next step.",
        evidence: "db/schema.sql",
      },
      {
        q: "Why rank within peer groups?",
        a: "Ratios are sector-dependent: a bank's margins and leverage are not comparable with an IT services company's. Percentiles inside peer groups answer the real question — is this company good relative to its competitors?",
        evidence: "src/analytics/peer.py",
      },
      {
        q: "What does KMeans add, and what doesn't it?",
        a: "Five unsupervised segments help explore which companies look structurally similar across the KPIs. It is not a prediction of returns, and the platform does not treat it as one.",
        evidence: "src/analytics/clustering.py",
      },
      {
        q: "How do the three outputs stay consistent?",
        a: "The dashboard, the API and the tearsheet generator all read the same SQLite tables and views, so a number cannot differ between a screen and a PDF.",
        evidence: "src/dashboard · src/api · src/analytics/generate_tearsheets",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 7 · Radar
  {
    slug: "radar-micro-motion",
    title: "RF Target Classification & Micro-Motion Radar",
    subtitle: "Monostatic, bistatic and multistatic radar models in MATLAB / Simulink",
    rank: 7,
    tier: "medium",
    maturity: "prototype",
    maturityNote: "The repository calls itself a basic prototype and a stepping stone.",
    categories: ["featured", "engineering", "ai-ml"],
    domains: ["radar", "ai"],
    period: "2025",
    summary:
      "Radar geometries modelled in Simulink, with time-frequency analysis and micro-Doppler signatures as the bridge from RF signal to target classification.",
    recruiterLine:
      "Signal-processing prototype in MATLAB / Simulink: monostatic, bistatic and scripted multistatic radar models, micro-Doppler and time-frequency analysis feeding an ML classifier.",
    metrics: [
      { value: "3", label: "radar geometries modelled" },
      { value: "2", label: "receivers in the scripted multistatic model" },
      { value: "RTI / DTI", label: "range- and Doppler-time outputs" },
    ],
    problem:
      "Detect and characterise subtle motion — gestures, breathing, vibration, rotating parts — without contact, in conditions where optical sensors struggle.",
    whyItMatters:
      "Micro-motions modulate the radar return around the main Doppler shift. Those micro-Doppler signatures can tell apart targets whose bulk motion looks the same, which is the basis for non-contact monitoring and target classification.",
    system: [
      "Monostatic radar Simulink models, including a multiple-target configuration.",
      "A bistatic radar Simulink model with range-time (RTI) and Doppler-time (DTI) intensity outputs.",
      "A MATLAB script that builds a multistatic Simulink model in code: one transmitter, two targets, two free-space channels and two receivers feeding a range-Doppler response.",
      "Sensor-array and beamformer configurations (ULA, microphone array).",
      "The Simulink models and the multi-class classification notebook are linked from the README (OneDrive and Colab).",
    ],
    architecture: {
      title: "Signal chain",
      steps: [
        { label: "RF signal", detail: "Transmitted waveform" },
        { label: "Radar", detail: "Monostatic · bistatic · multistatic geometry" },
        { label: "Doppler", detail: "Velocity from frequency shift; range-Doppler response" },
        { label: "Time-frequency", detail: "Short-time Fourier transform (spectrogram)" },
        { label: "Micro-Doppler", detail: "Sidebands from moving parts and micro-motion" },
        { label: "Features", detail: "Signature descriptors for a classifier" },
        { label: "Classification", detail: "ML / DL model (linked Colab notebook)" },
      ],
    },
    dataFlow: {
      title: "Scripted multistatic model",
      steps: [
        { label: "Tx waveform", detail: "Sine-wave placeholder source" },
        { label: "Targets 1 & 2", detail: "phased/Target blocks" },
        { label: "Free space", detail: "Two propagation channels" },
        { label: "Receivers 1 & 2", detail: "phased/Radar Receiver" },
        { label: "Range-Doppler", detail: "Joint response from both receivers" },
      ],
    },
    decisions: [
      {
        title: "Model more than one geometry",
        detail:
          "Monostatic is the simplest (co-located transmitter and receiver); bistatic separates them; multistatic adds receivers so the target is seen from several aspect angles.",
      },
      {
        title: "Build the multistatic model in code",
        detail:
          "multistatic_radar_model.m places and wires blocks with add_block / add_line, so the geometry is reproducible from a script rather than hand-drawn.",
      },
      {
        title: "Time-frequency, not a single FFT",
        detail:
          "Micro-motion is non-stationary. A spectrogram shows how Doppler changes over time, where one FFT over the whole window would smear it.",
      },
    ],
    results: [
      "Range-time and Doppler-time intensity scope recordings from the bistatic simulation (shown below).",
      "No classification accuracy is claimed for this repository.",
    ],
    limitations: [
      "A basic prototype with a sample dataset, by the repository's own description — not a production radar.",
      "Simulated returns only; there is no radar hardware in this repository.",
      "Several Simulink models start from MathWorks Phased Array System Toolbox examples; the multistatic model script is custom.",
      "The classifier lives in an externally linked Colab notebook, not in the repository.",
    ],
    stack: ["MATLAB", "Simulink", "Phased Array System Toolbox", "Signal processing", "Micro-Doppler"],
    repos: [{ name: "radar-system", url: gh("radar-system") }],
    media: [
      {
        src: "/projects/radar/bistatic-rti.gif",
        alt: "Animated range-time intensity scope from the bistatic Simulink model, plotting range in metres against time history as the simulation runs.",
        caption: "Bistatic range-time intensity (Simulink scope).",
        width: 496,
        height: 380,
      },
      {
        src: "/projects/radar/bistatic-dti.gif",
        alt: "Animated Doppler-time intensity scope from the bistatic Simulink model, plotting speed in metres per second against time history.",
        caption: "Bistatic Doppler-time intensity (Simulink scope).",
        width: 496,
        height: 380,
      },
    ],
    interview: [
      {
        q: "What is micro-Doppler?",
        a: "Extra frequency modulation around a target's main Doppler shift, caused by parts moving relative to the body — swinging limbs, rotor blades, a breathing chest. It appears as time-varying sidebands, which is why it works as a fingerprint for target type.",
      },
      {
        q: "Why the STFT?",
        a: "Micro-Doppler is non-stationary: the frequency content changes within fractions of a second. An FFT over the whole window averages that away; the STFT takes spectra over short sliding windows and gives a time-frequency map. The window length trades time resolution against frequency resolution.",
      },
      {
        q: "Monostatic versus bistatic?",
        a: "Monostatic: transmitter and receiver at the same site, range from round-trip delay. Bistatic: separated transmitter and receiver, so constant range is an ellipse and the measured Doppler depends on the bistatic angle. A bistatic receiver can be passive.",
      },
      {
        q: "Why multistatic?",
        a: "Several receivers see the target from different aspect angles, so a signature that is weak from one viewpoint can be strong from another, and one blocked path does not blind the system. The cost is synchronisation and data fusion.",
      },
      {
        q: "How does target classification work?",
        a: "Spectrogram → features (or the spectrogram image itself) → classifier. In this repository the classifier is the linked Colab notebook. I later built a micro-Doppler CNN with STFT, centroid and SVD features during my internship at VectraVision.",
        evidence: "README · Experience",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 8 · WhatsApp CRM
  {
    slug: "whatsapp-crm",
    title: "WhatsApp CRM",
    subtitle: "Multi-tenant messaging CRM on the WhatsApp Cloud API",
    rank: 8,
    tier: "small",
    maturity: null,
    categories: ["software"],
    domains: ["software"],
    period: "2026",
    summary:
      "A shared real-time inbox, Kanban pipeline and template broadcasts, built as a Fastify gateway plus queue-driven workers.",
    recruiterLine:
      "Gateway + six services over BullMQ queues: real-time inbox via Socket.IO, broadcasts with delivery funnels, Stripe billing, and row-level-security tenant isolation on Supabase Postgres.",
    callout: "Implementation lives in the WhatsAPP_crm-main directory of the repository.",
    metrics: [
      { value: "6", label: "backend services" },
      { value: "4", label: "message queues" },
      { value: "20", label: "SQL migrations" },
    ],
    problem:
      "Small businesses sell over WhatsApp from one phone. Teams need a shared inbox, a pipeline and broadcasts — while respecting WhatsApp's 24-hour window, template approval and opt-outs, and surviving Meta's webhook retries.",
    whyItMatters:
      "Webhooks arrive late, duplicated and out of order; sends fail transiently; a campaign fans out into thousands of messages. Doing that inside a request handler loses messages or blocks users.",
    system: [
      "Inbox: real-time chats with delivery and read ticks, media, filters, a contact sidebar, and a composer that enforces the 24-hour window.",
      "Pipeline: drag-and-drop Kanban with deal values, per-stage totals, win rate and time to convert.",
      "Broadcasts: approved templates to tag-based lists with per-contact variables, scheduling and a sent → delivered → read → replied funnel. Contacts who reply STOP are excluded.",
      "AI reply suggestions: three LLM-drafted replies from the conversation; the agent picks, edits and sends.",
      "Stripe subscriptions, Admin / Agent roles, CSV import, and a dashboard with first-reply time and broadcast performance.",
    ],
    architecture: {
      title: "Inbound path",
      steps: [
        { label: "Meta webhook", detail: "Signature verified" },
        { label: "whatsapp-webhook", detail: "Verify and enqueue only" },
        { label: "inbound-events queue", detail: "BullMQ on Redis" },
        { label: "inbox-service", detail: "Idempotent writes via Postgres functions" },
        { label: "Postgres (Supabase)", detail: "Tenant isolation with row-level security" },
        { label: "Redis pub/sub → gateway", detail: "Fan-out to connected agents" },
        { label: "Socket.IO → browser", detail: "Real-time inbox" },
      ],
    },
    dataFlow: {
      title: "Outbound path",
      steps: [
        { label: "UI send", detail: "api-gateway (Fastify)" },
        { label: "outbound-messages", detail: "Queue" },
        { label: "messaging-worker", detail: "Rate-limited; retries only transient errors" },
        { label: "Graph API", detail: "WhatsApp Cloud API" },
        { label: "campaign-worker", detail: "Expands campaigns into outbound messages" },
      ],
    },
    decisions: [
      {
        title: "A queue at every external edge",
        detail: "The webhook service only verifies and enqueues, so Meta gets a fast response and processing can retry independently.",
      },
      {
        title: "Idempotent, monotonic statuses",
        detail:
          "Ingestion and delivery statuses run in Postgres functions that are idempotent under webhook retries, never move a status backwards (read → delivered), and replay statuses that arrive before the send is recorded.",
      },
      {
        title: "Secrets encrypted at rest",
        detail: "WhatsApp access tokens are encrypted with AES-256-GCM; webhooks are signature-verified and the API has CSRF protection and rate limits.",
      },
      {
        title: "AI drafts, humans send",
        detail: "Suggestions are drafts. The agent chooses, edits and sends them.",
      },
    ],
    results: [
      "Services: api-gateway, whatsapp-webhook, inbox-service, messaging-worker, campaign-worker, media-uploads, plus an all-in-one runner.",
      "Test suites for AI, auth, billing, database, gateway and WhatsApp handling; a webhook simulator tests the inbound pipeline without Meta.",
      "One-click Render blueprint for deployment.",
    ],
    limitations: [
      "No public live demo; running it needs a Meta app, Supabase and Redis.",
      "Billing limits apply only when Stripe is configured; self-hosted installs get every feature.",
    ],
    stack: [
      "TypeScript",
      "Bun",
      "Fastify 5",
      "BullMQ",
      "Redis",
      "Supabase Postgres",
      "Socket.IO",
      "Zod",
      "Stripe",
      "React 19",
      "Vite",
      "Tailwind 4",
      "TanStack Query",
    ],
    repos: [{ name: "Whatsapp-CRM", url: gh("Whatsapp-CRM") }],
    interview: [
      {
        q: "Why put a queue behind the webhook?",
        a: "Meta retries webhooks that are slow or fail. Verifying the signature and enqueuing — nothing else — keeps the endpoint fast, and the worker can retry processing without the webhook being redelivered.",
        evidence: "BACKEND/services/whatsapp-webhook",
      },
      {
        q: "How do you handle out-of-order delivery statuses?",
        a: "Status updates run in Postgres functions that are idempotent, never move a status backwards, and replay statuses that arrive before the send itself is recorded.",
        evidence: "migrations/0017_crm_core.sql",
      },
      {
        q: "Why separate workers for messaging and campaigns?",
        a: "Campaign expansion — tag lists, per-contact variables, scheduling, completion tracking — is a different job from sending. Both one-to-one sends and campaigns end in the same outbound-messages queue, so rate limiting and the transient-only retry policy for the Graph API live in exactly one place.",
        evidence: "README › Architecture",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 9 · RescueGrid
  {
    slug: "rescuegrid",
    title: "RescueGrid",
    subtitle: "Disaster-response coordination for victims, volunteers and authorities",
    rank: 9,
    tier: "small",
    maturity: null,
    categories: ["software", "ai-ml"],
    domains: ["software", "ai"],
    period: "2026",
    summary:
      "Three front ends on one Supabase database — a victim PWA, a volunteer PWA and a disaster-management dashboard with an AI assistant over live data.",
    recruiterLine:
      "Next.js 16 + Supabase platform with per-user row-level security, a mission lifecycle, SMS fallback, and an OpenAI Agents SDK assistant using a read-only Supabase MCP tool.",
    callout: "Implementation lives in the Rescue-Grid--main/rescuegrid directory of the repository.",
    metrics: [
      { value: "3", label: "front ends, one database" },
      { value: "63", label: "API route files" },
      { value: "5", label: "mission states" },
    ],
    problem:
      "In a disaster, victims cannot reach responders, volunteers duplicate effort, and the operations centre has no live picture — often over failing networks.",
    whyItMatters:
      "Coordination fails on trust and connectivity: who may see a victim's location, and what happens when there is no data signal. The design has to answer both before it adds features.",
    system: [
      "Victim PWA: report an emergency or SOS without an account; the report id is the private link. Offline, the form routes the report to SMS.",
      "Volunteer PWA: phone number + PIN sign-in (no SMS cost), skills, GPS pings, mission alerts by web push and a mission timeline.",
      "DMA dashboard: triage, missions, task forces, stock reservation and settlement, volunteer roster, live alerts, and an AI assistant over live data.",
      "Realtime: operators and volunteers subscribe to Postgres changes with their own sessions, so RLS decides what each receives.",
    ],
    architecture: {
      title: "System",
      steps: [
        { label: "Victim · Volunteer · DMA", detail: "Three Next.js front ends" },
        { label: "API routes", detail: "All writes; authorisation enforced in code" },
        { label: "Supabase Postgres", detail: "Per-user RLS; rate-limited public endpoints" },
        { label: "Realtime", detail: "Subscriptions filtered by each user's RLS" },
        { label: "AI assistant", detail: "OpenAI Agents SDK + read-only Supabase MCP" },
      ],
    },
    dataFlow: {
      title: "Mission lifecycle",
      steps: [
        { label: "Report", detail: "Triaged by type: rescue and medical → critical" },
        { label: "active", detail: "Assigned to a volunteer or task force" },
        { label: "en_route", detail: "The victim's report mirrors each step" },
        { label: "arrived", detail: "Updates build the mission timeline" },
        { label: "completed / failed", detail: "Failure needs a reason; the report returns to the queue" },
      ],
    },
    decisions: [
      {
        title: "Operator role is server-granted",
        detail:
          "An account is an operator only if app_metadata.role = dma_operator, which only the secret key can set. An email sign-up alone is not enough.",
      },
      {
        title: "Victims have no account",
        detail: "There is no lookup by phone number, and a report link never shows the reporter's phone or exact coordinates.",
      },
      {
        title: "Read-only MCP for the assistant",
        detail: "The agent queries live operational data through Supabase's hosted MCP server in read-only mode; it cannot modify records.",
      },
      {
        title: "Rate limits that respect mobile networks",
        detail: "Limits are by connection and by phone number, generous for reports because carriers put many phones behind one IP.",
      },
    ],
    results: [
      "Deployed: victim PWA, volunteer login and DMA login are live.",
      "RLS: operators read all operational data; volunteers read only their own missions, task forces, chats and supplies; the public key reads nothing except the skill taxonomy.",
      "Security headers: CSP allowing only Supabase, Mapbox and Turnstile; HSTS; frame blocking.",
    ],
    limitations: [
      "No offline write queue: offline victims are routed to SMS (Twilio, optional and paid) or the 112 helpline.",
      "Unit tests are limited (three test files).",
      "The public GitHub history is short; the app sits in a nested directory.",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React",
      "Supabase",
      "PostgreSQL",
      "OpenAI Agents SDK",
      "MCP",
      "Mapbox",
      "Twilio",
      "Web Push",
    ],
    repos: [{ name: "Rescue-Grid", url: gh("Rescue-Grid") }],
    live: { url: "https://rescuegrid-india.vercel.app", note: "Victim PWA; volunteer and DMA logins at /volunteer/login and /dma/login" },
    interview: [
      {
        q: "How does the AI assistant access data safely?",
        a: "It is an OpenAI Agents SDK agent whose only tool is Supabase's hosted MCP server with read_only=true, so it can answer questions over live data but cannot write.",
        evidence: "app/api/dma/chat/route.ts",
      },
      {
        q: "Why route every write through API routes?",
        a: "Writes use the service-role key on the server with authorisation checked in code, so clients never hold write privileges. Reads for realtime use the user's own session, so row-level security decides what they see.",
        evidence: "README › How it fits together",
      },
      {
        q: "What happens when a victim has no data connection?",
        a: "The form detects it and offers SMS. With Twilio configured, an edge function receives the message after checking the Twilio signature; otherwise SOS goes to 112.",
        evidence: "components/victim/ReportForm.tsx · supabase/functions",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 10 · CodeBreaker
  {
    slug: "codebreaker-symbols-api",
    title: "CodeBreaker Symbols API",
    subtitle: "FastAPI backend for editable symbols extracted from a PDF",
    rank: 10,
    tier: "small",
    maturity: null,
    categories: ["software"],
    domains: ["software"],
    period: "2026",
    summary: "Extracts 16 shapes from a PDF worksheet and serves them as editable symbols with custom properties and SVG export.",
    recruiterLine: "FastAPI + Pydantic backend built for a backend developer assessment: PDF shape extraction, CRUD, property editing and SVG export.",
    callout: "Built as part of a backend developer assessment.",
    metrics: [
      { value: "16", label: "shapes extracted from the PDF" },
      { value: "5", label: "documented API routes" },
    ],
    problem: "Symbols on a PDF worksheet need to become editable, addressable objects that a front end or an AI tool can query and restyle.",
    whyItMatters: "Turning a static document into a typed API is the first step for any tool that edits, tags or regenerates its content.",
    system: [
      "Content-aware cropping extracts 16 shape images from the PDF.",
      "Pydantic models for Symbol and Properties (colours, stroke, transform, metadata).",
      "JSON-backed storage that seeds itself with the 16 symbols.",
      "Endpoints to list and filter, fetch, patch properties, export one symbol as SVG and export the whole bundle; Swagger UI.",
      "AI-ready metadata fields (ai_tags, usage notes).",
    ],
    architecture: {
      title: "Pipeline",
      steps: [
        { label: "PDF worksheet", detail: "Source document" },
        { label: "extract_shapes.py", detail: "Content-aware cropping" },
        { label: "16 PNG symbols", detail: "shapes/" },
        { label: "Pydantic models", detail: "Symbol · Properties" },
        { label: "JSON store", detail: "Auto-seeded" },
        { label: "FastAPI", detail: "CRUD · SVG export · Swagger" },
      ],
    },
    dataFlow: {
      title: "Edit a symbol",
      steps: [
        { label: "PATCH /api/shapes/{id}/properties", detail: "Validated by Pydantic" },
        { label: "storage.py", detail: "Persisted to JSON" },
        { label: "GET /api/shapes/{id}/export/svg", detail: "Rendered with the new properties" },
      ],
    },
    decisions: [
      { title: "Typed models first", detail: "Pydantic models define the contract, so validation and Swagger docs come from one place." },
      { title: "File storage for an assessment", detail: "A JSON store keeps the service self-contained and easy to run." },
    ],
    results: ["16 symbols extracted and seeded; full REST API documented in Swagger UI."],
    limitations: [
      "SVG export wraps the extracted PNGs; converting them to pure vector paths is listed as future work.",
      "JSON storage and no authentication — suitable for an assessment, not multi-user production.",
    ],
    stack: ["Python", "FastAPI", "Pydantic", "Uvicorn"],
    repos: [{ name: "code_breaker_symbols_backend", url: gh("code_breaker_symbols_backend") }],
    interview: [
      {
        q: "What would you change for production?",
        a: "A real database instead of a JSON file, authentication, and vectorising the shapes so SVG export is resolution-independent — the README lists the last two as next steps.",
        evidence: "README › Future improvements",
      },
      {
        q: "Why Pydantic models?",
        a: "They validate every property update at the boundary and generate the OpenAPI schema, so the documentation cannot drift from the code.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 11 · BizForce
  {
    slug: "bizforce-crm",
    title: "BizForce CRM — BDA Module",
    subtitle: "MERN CRM for business-development associates",
    rank: 11,
    tier: "small",
    maturity: null,
    categories: ["software"],
    domains: ["software"],
    period: "2026",
    summary: "Leads, a drag-and-drop pipeline, deal conversion, funnel analytics and a team leaderboard for business-development teams.",
    recruiterLine: "Full-stack MERN CRM with JWT auth, lead scoring, a Kanban pipeline with drag-and-drop, funnel analytics and a team leaderboard.",
    metrics: [
      { value: "0–100", label: "lead score per lead" },
      { value: "5", label: "API route groups" },
    ],
    problem: "Business-development associates juggle leads across stages and need to see which ones deserve attention today.",
    whyItMatters: "A pipeline view plus a simple priority score turns a list of contacts into a daily plan.",
    system: [
      "JWT authentication with protected routes.",
      "Leads with Hot / Warm / Cold tags and a 0–100 score.",
      "Kanban pipeline with drag-and-drop (@hello-pangea/dnd).",
      "Convert a lead to a deal; sales-funnel analytics with Recharts; team leaderboard.",
    ],
    architecture: {
      title: "Stack",
      steps: [
        { label: "React + Vite + Tailwind", detail: "Client" },
        { label: "Express REST", detail: "auth · leads · deals · dashboard · team" },
        { label: "JWT middleware", detail: "Protects every resource route" },
        { label: "MongoDB", detail: "User · Lead · Deal models" },
      ],
    },
    dataFlow: {
      title: "Lead scoring",
      steps: [
        { label: "Source", detail: "Weighted by channel" },
        { label: "Deal value", detail: "Tiered points" },
        { label: "Status", detail: "Pipeline stage points" },
        { label: "Activity", detail: "More touches, more points" },
        { label: "Score", detail: "Clamped to 0–100" },
      ],
    },
    decisions: [
      {
        title: "Transparent scoring",
        detail:
          "The score labelled ‘AI score’ in the app is a weighted heuristic over source, deal value, status and activity count — deterministic and explainable to a sales team.",
      },
    ],
    results: ["Working client and server with JWT auth, pipeline drag-and-drop, funnel charts and leaderboard."],
    limitations: [
      "Lead scoring is rule-based, not a trained model; a learned model would need historical win / loss labels.",
      "No verified live demo.",
    ],
    stack: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "JWT", "Recharts"],
    repos: [{ name: "bizforce", url: gh("bizforce") }],
    interview: [
      {
        q: "How is the lead score computed, and how would you make it learned?",
        a: "Today it is a weighted sum of source, deal-value tier, pipeline status and activity count, clamped to 0–100. To learn it, I would log stage transitions and outcomes, then fit a calibrated classifier on won versus lost deals and validate it on later months.",
        evidence: "server/controllers/leadController.js",
      },
    ],
  },

  // ───────────────────────────────────────────────────────── 12 · Mutual Fund Analytics
  {
    slug: "mutual-fund-analytics",
    title: "Mutual Fund Analytics & Investor Intelligence",
    subtitle: "Bluestock MF capstone — one project, two repository snapshots",
    rank: 12,
    tier: "small",
    maturity: null,
    categories: ["data"],
    domains: ["data"],
    period: "2026",
    summary:
      "A mutual-fund analytics pipeline: cleaning, a SQLite store, EDA, performance and risk analytics, and a four-page Power BI dashboard.",
    recruiterLine: "Python + SQL + Power BI analytics on mutual-fund data: Sharpe / Sortino, drawdown, VaR / CVaR, sector concentration and investor cohorts.",
    callout: "bluestock-mf and Mutual-Fund-Analysis are two snapshots of the same capstone (identical README and Power BI file), shown here once.",
    metrics: [
      { value: "10", label: "raw datasets" },
      { value: "4", label: "Power BI dashboard pages" },
      { value: "95 %", label: "VaR / CVaR level" },
    ],
    problem: "Fund NAVs, flows, holdings and investor transactions sit in separate files. Investors and analysts need performance, risk and behaviour in one view.",
    whyItMatters: "Returns without risk are misleading. Risk-adjusted metrics, drawdowns and concentration show what a fund's headline return cost.",
    system: [
      "Master pipeline (run_pipeline.py) with data ingestion and a live NAV fetch script.",
      "Cleaning to processed CSVs and a SQLite database.",
      "EDA: NAV trends, AUM by fund house, SIP inflows, category heatmaps, investor demographics and geography, sector allocation.",
      "Performance: alpha / beta, Sharpe / Sortino, maximum drawdown, benchmark comparison and a fund scorecard.",
      "Advanced risk: VaR / CVaR at 95 %, rolling Sharpe, sector HHI concentration, SIP continuity and investor cohorts.",
      "Power BI dashboard: Industry Overview, Fund Performance, Investor Analytics, SIP & Market Trends.",
    ],
    architecture: {
      title: "Pipeline",
      steps: [
        { label: "Raw data", detail: "10 CSV datasets + live NAV" },
        { label: "Cleaning", detail: "Processed CSVs" },
        { label: "SQLite", detail: "bluestock_mf.db" },
        { label: "EDA", detail: "Trends, flows, demographics" },
        { label: "Performance", detail: "Alpha / beta · Sharpe / Sortino · drawdown" },
        { label: "Risk", detail: "VaR / CVaR · rolling Sharpe · HHI" },
        { label: "Power BI", detail: "4-page dashboard" },
      ],
    },
    dataFlow: {
      title: "Outputs",
      steps: [
        { label: "Charts", detail: "EDA and performance figures" },
        { label: "CSV reports", detail: "Scorecard, VaR / CVaR, HHI, cohorts" },
        { label: "Dashboard", detail: ".pbix and PDF export" },
      ],
    },
    decisions: [
      { title: "Risk-adjusted, not raw, returns", detail: "Sharpe, Sortino and drawdown sit next to returns so funds are compared on what their returns cost." },
      { title: "Concentration as a risk", detail: "Sector HHI shows how concentrated each portfolio is, which a return series alone hides." },
    ],
    results: ["Four-page Power BI dashboard (committed as .pbix and PDF) with EDA charts and CSV risk reports."],
    limitations: [
      "Analysis is descriptive, built on the capstone's provided datasets.",
      "The repositories hold the pipeline scripts, outputs and dashboard; the notebooks referenced in the README are not included.",
    ],
    stack: ["Python", "pandas", "SQLite", "SQL", "Power BI"],
    repos: [
      { name: "Mutual-Fund-Analysis", url: gh("Mutual-Fund-Analysis"), note: "includes processed data" },
      { name: "bluestock-mf", url: gh("bluestock-mf"), note: "includes analytics outputs" },
    ],
    media: [
      {
        src: "/projects/mf/fund-performance.png",
        alt: "Power BI dashboard page titled Fund Performance, with charts comparing mutual-fund returns and risk metrics.",
        caption: "Power BI · Fund Performance page.",
        width: 1447,
        height: 755,
      },
    ],
    interview: [
      {
        q: "Sharpe versus Sortino — when does the difference matter?",
        a: "Sharpe divides excess return by total volatility; Sortino uses only downside deviation. For funds with large upside swings Sharpe penalises good volatility, so Sortino separates them better.",
      },
      {
        q: "What does sector HHI tell you?",
        a: "The Herfindahl–Hirschman index of sector weights: the sum of squared shares. Higher means more concentrated, so two funds with similar returns can carry very different concentration risk.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 13 · Disaster Info
  {
    slug: "disaster-info",
    title: "Disaster Info",
    subtitle: "Real-time disaster information aggregation — early prototype",
    rank: 13,
    tier: "small",
    maturity: "archived",
    maturityNote: "Initial code base from 2024; not developed further.",
    categories: ["experimental", "software"],
    domains: ["software", "data"],
    period: "2024",
    summary:
      "The first sketch of a disaster-information platform: an ingest server, an event schema and real-time web and mobile feeds.",
    recruiterLine: "Early 2024 prototype: Express ingest server, PostGIS event schema and Socket.IO feeds for web and React Native — the same problem space RescueGrid later tackled.",
    metrics: [],
    problem: "During a crisis, information is scattered across agencies, weather services and social media.",
    whyItMatters: "Aggregated, credibility-weighted, location-aware information helps communities prepare and respond.",
    system: [
      "Express server with an /ingest route wired to sentiment and credibility scoring.",
      "PostGIS table for events with severity, geographic location, credibility and sentiment scores.",
      "React dashboard and React Native feed receiving new events over Socket.IO.",
      "A Laravel chatbot with basic canned responses.",
    ],
    architecture: {
      title: "Initial skeleton",
      steps: [
        { label: "Sources", detail: "News / social fetchers (placeholders)" },
        { label: "Express /ingest", detail: "Sentiment + credibility" },
        { label: "PostGIS", detail: "disaster_events table" },
        { label: "Socket.IO", detail: "new_event broadcast" },
        { label: "Web + mobile feeds", detail: "React · React Native" },
      ],
    },
    dataFlow: {
      title: "Event",
      steps: [
        { label: "Ingest", detail: "POST /ingest" },
        { label: "Score", detail: "Sentiment, credibility" },
        { label: "Store", detail: "PostGIS" },
        { label: "Broadcast", detail: "Socket.IO" },
      ],
    },
    decisions: [{ title: "Real-time push from the start", detail: "Clients subscribe to new events over Socket.IO instead of polling." }],
    results: ["Skeleton code for each layer, committed as single files."],
    limitations: [
      "Each component is a short skeleton file; data-source fetchers are placeholders.",
      "Location-based notifications, maps and graphs are described in the README but not implemented in the repository.",
    ],
    stack: ["Node.js", "Express", "PostgreSQL / PostGIS", "Socket.IO", "React", "React Native", "Laravel"],
    repos: [{ name: "disaster-info", url: gh("disaster-info") }],
    interview: [
      {
        q: "What would you do differently now?",
        a: "Start from trust and connectivity rather than feeds: who may see what, and what happens offline. That is the design RescueGrid starts from.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 14 · StudyFlow
  {
    slug: "studyflow",
    title: "StudyFlow",
    subtitle: "Academic to-do app",
    rank: 14,
    tier: "listed",
    maturity: "experimental",
    maturityNote: "Small prototype.",
    categories: ["experimental"],
    domains: ["software"],
    period: "2026",
    summary: "An academic to-do app: a plain HTML/JS front end, plus a version backed by an Express and MongoDB API.",
    recruiterLine: "Small to-do prototype with an Express + Mongoose REST backend.",
    metrics: [],
    problem: "Track academic tasks.",
    whyItMatters: "A small exercise in a REST API with a separate front end.",
    system: ["studyflow-frontend: single-page HTML/JS front end.", "todo-app: Express routes, controller and a Mongoose Todo model, with a JS front end."],
    architecture: {
      title: "Stack",
      steps: [
        { label: "HTML / JS", detail: "Front end" },
        { label: "Express", detail: "Todo routes and controller" },
        { label: "MongoDB", detail: "Mongoose model" },
      ],
    },
    dataFlow: { title: "Request", steps: [{ label: "UI" }, { label: "REST" }, { label: "MongoDB" }] },
    decisions: [],
    results: [],
    limitations: ["A small prototype, kept for completeness."],
    stack: ["JavaScript", "Express", "MongoDB"],
    repos: [
      { name: "studyflow-frontend", url: gh("studyflow-frontend") },
      { name: "todo-app", url: gh("todo-app") },
    ],
    live: { url: "https://studyflow-frontend-pi.vercel.app" },
    interview: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const byTier = (tier: Tier) => projects.filter((p) => p.tier === tier).sort((a, b) => a.rank - b.rank);

/** Ordering for the featured grid on the homepage. Medium pairs follow the brief. */
export const featuredLayout = {
  large: ["plantdesk", "local-energy-market", "tokengrid"],
  medium: ["doppelganger-entity-resolution", "field-device-predictive-maintenance", "radar-micro-motion", "nifty100-financial-intelligence"],
  small: ["whatsapp-crm", "rescuegrid", "codebreaker-symbols-api", "bizforce-crm", "mutual-fund-analytics", "disaster-info"],
} as const;

export const categoryLabels: Record<Category, string> = {
  featured: "Featured",
  industrial: "Industrial",
  energy: "Energy",
  "ai-ml": "AI / ML",
  data: "Data",
  software: "Software",
  engineering: "Engineering",
  experimental: "Experimental",
};

export const maturityLabels: Record<Exclude<Maturity, null>, string> = {
  prototype: "Prototype",
  experimental: "Experimental",
  "in-development": "In development",
  archived: "Archived",
};
