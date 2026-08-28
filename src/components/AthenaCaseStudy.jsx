import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const githubUrl = 'https://github.com/athenashigapova2-wq/macrocoach'

const proofPoints = [
  'Multi-agent architecture with specialist routing',
  'Human-confirmed, idempotent AI tool execution',
  'LLM evals + longitudinal simulations',
  'Async backend with Redis/Celery + observability',
]

const stackRows = [
  ['Frontend', 'React, Vite, Capacitor'],
  ['Backend', 'Python, FastAPI'],
  ['AI', 'LangGraph, LangChain, GigaChat'],
  ['Async', 'Celery, Redis'],
  ['Data', 'Supabase / PostgreSQL'],
  ['AI infrastructure', 'RAG, model routing, tracing, evals'],
  ['Quality', 'pytest, mypy, Ruff, Playwright'],
  ['DevOps', 'Docker, GitHub Actions'],
  ['Observability', 'Grafana, InfluxDB'],
]

const principles = [
  ['Decouple', 'Async Celery/Redis execution separates API availability from AI latency.'],
  ['Constrain', "Specialist agents and explicit graphs reduce the LLM's allowed action space."],
  ['Centralize', 'One AI execution boundary enforces privacy, routing, resilience and tracing.'],
  ['Validate', 'Server-side deterministic rules verify model-generated decisions.'],
  ['Authorize', 'Human confirmation, ownership and idempotency protect persistent state.'],
]

const whyChain = [
  ['Why not just build a chatbot?', "Because Athena doesn't only generate text. It reasons over user state and can interact with tools."],
  ['Why does that change architecture?', 'Because probabilistic decisions can now affect persistent application state.'],
  ['Why is that dangerous?', 'Because LLM outputs are non-deterministic, providers are unreliable, and distributed requests can be retried.'],
  ['Why not solve this with better prompts?', 'Because prompts can guide behavior, but they cannot guarantee invariants, authorization, idempotency or availability.'],
  ['So what should the architecture do?', 'Put deterministic software boundaries around probabilistic AI.'],
]

const engineeringChallenges = [
  {
    number: '01',
    title: 'Safe AI actions',
    problem: 'LLM agents should not be able to silently mutate user data.',
    solution: 'A two-phase write protocol with user confirmation, ownership validation, hashed confirmation tokens, idempotency keys and distributed locks.',
    why: 'It protects against duplicate or unintended state-changing tool calls.',
  },
  {
    number: '02',
    title: 'Centralized AI execution',
    problem: 'Direct provider calls across agents make tracing, privacy and failure handling inconsistent.',
    solution: 'All inference goes through one AI execution layer: AIExecutionService.',
    why: 'One boundary makes policy and operational behavior consistent across every agent.',
  },
  {
    number: '03',
    title: 'Deterministic guardrails over prompt-only safety',
    problem: 'Critical nutrition decisions cannot be trusted to free-form LLM output alone.',
    solution: 'Athena retrieves server-owned facts and validates structured outputs against deterministic constraints.',
    why: 'The LLM proposes; the application validates.',
  },
]

const snippets = [
  {
    number: '01',
    title: 'Agent routing',
    code: `graph.add_edge(START, "router")
graph.add_edge("router", "retriever")

graph.add_conditional_edges(
    "retriever",
    _select_route,
    {
        "nutrition": "nutrition",
        "workout": "workout",
        "recovery": "recovery",
        "general": "general",
    },
)`,
  },
  {
    number: '02',
    title: 'Idempotent write confirmation',
    code: `stage
  ↓
confirm
  ↓
ownership check
  ↓
idempotency check
  ↓
distributed lock
  ↓
execute`,
  },
  {
    number: '03',
    title: 'AI execution boundary',
    code: `routing
  → privacy
  → resilience
  → tracing
  → model invocation`,
  },
]

function SectionHead({ number, title, detail }) {
  return (
    <div className="case-section__head">
      <span>{number} / {title}</span>
      {detail && <p>{detail}</p>}
    </div>
  )
}

function Reveal({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SystemArchitecture() {
  const reduceMotion = useReducedMotion()
  const primaryNodes = ['User / React', 'FastAPI API', 'Auth + validation', 'Async job layer · Celery + Redis', 'Agent Router', 'Retriever']
  const executionNodes = ['AI Execution Layer', 'Privacy → Model Routing → Resilience → Tracing', 'LLM Provider']
  return (
    <div className="system-architecture">
      <div className="system-architecture__main">
        {primaryNodes.map((node, index) => <ArchitectureNode key={node} node={node} index={index} reduceMotion={reduceMotion} />)}
        <motion.div className="specialist-branch" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {['Nutrition', 'Workout', 'Recovery', 'General'].map((agent) => <span key={agent}>{agent}</span>)}
        </motion.div>
        {executionNodes.map((node, index) => <ArchitectureNode key={node} node={node} index={primaryNodes.length + index} reduceMotion={reduceMotion} />)}
      </div>
      <aside className="tool-protocol">
        <span>Tools</span>
        <i className="tool-protocol__entry" aria-hidden="true">↓</i>
        <div><strong>Read operation</strong><i>↓</i><p>Execute</p></div>
        <div><strong>Write operation</strong><i>↓</i><p>Preview → user confirmation → idempotent execution</p></div>
      </aside>
    </div>
  )
}

function ArchitectureNode({ node, index, reduceMotion }) {
  return (
    <motion.div className="architecture-node" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .7 }} transition={{ duration: reduceMotion ? 0 : .4, delay: reduceMotion ? 0 : Math.min(index * .05, .3) }}>
      <strong>{node}</strong><i aria-hidden="true">↓</i>
    </motion.div>
  )
}

function Pipeline({ items, label }) {
  return (
    <div className="engineering-pipeline" aria-label={label || items.join(' to ')}>
      {items.map((item, index) => <div key={item}><span>{item}</span>{index < items.length - 1 && <i>↓</i>}</div>)}
    </div>
  )
}

const capacityTests = [
  {
    id: '02',
    title: 'Progressive ramp: 10–120 users',
    image: '/projects/athena-capacity-120.png',
    alt: 'Grafana dashboard for the progressive load test up to 120 virtual users',
    columns: ['Users', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95', 'p99'],
    rows: [
      ['10', '100', '0', '0', '0%', '1,035 ms', '1,052 ms', '1,054 ms'],
      ['20', '200', '0', '0', '0%', '1,033 ms', '1,059 ms', '1,113 ms'],
      ['40', '400', '0', '0', '0%', '1,025 ms', '1,041 ms', '1,056 ms'],
      ['80', '800', '0', '0', '0%', '1,026 ms', '1,054 ms', '1,071 ms'],
      ['120', '1,200', '0', '0', '0%', '1,025 ms', '1,052 ms', '1,069 ms'],
    ],
    conclusion: 'No degradation appeared through 120 virtual users: 2,700 / 2,700 scenarios completed, with no errors or missing jobs. p50 stayed within 1,025–1,035 ms and p95 within 1,041–1,059 ms. Roughly one second comes from JMeter polling the job status once per second; it is not Celery processing time.',
  },
  {
    id: '03',
    title: 'Preliminary boundary: 160–500 users',
    image: '/projects/athena-capacity-500-token.png',
    alt: 'Grafana dashboard for the preliminary 500-user load test',
    columns: ['Users', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95', 'p99'],
    rows: [
      ['160', '800', '0', '0', '0%', '1,023 ms', '1,055 ms', '1,109 ms'],
      ['240', '1,200', '0', '0', '0%', '1,022 ms', '1,042 ms', '1,061 ms'],
      ['320', '1,600', '0', '0', '0%', '1,020 ms', '1,048 ms', '1,192 ms'],
      ['400', '2,000', '0', '0', '0%', '1,018 ms', '1,034 ms', '1,069 ms'],
      ['500', '165', '2,335', '0', '93.4%', '4 ms', '1,018 ms', '1,034 ms'],
    ],
    conclusion: 'Up to 400 users, all 5,600 scenarios completed with 0% errors and p95 no higher than 1,055 ms. The failed 500-user run was later traced to token expiry, so it cannot be treated as the backend capacity limit.',
  },
  {
    id: '04',
    title: 'Ramp semantics check: 500 configured users',
    image: '/projects/athena-capacity-500-ramp.png',
    alt: 'Grafana dashboard showing a 500-user ramp test with about 45 active users',
    columns: ['Users', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95', 'p99'],
    rows: [['500', '2,500', '0', '0', '0%', '1,027 ms', '1,052 ms', '1,098 ms']],
    conclusion: 'All 2,500 scenarios passed, but this was not a 500-concurrent-user result. With a 60-second ramp and five loops, early threads finished before the final threads started; observed concurrency was approximately 40–45 users.',
  },
  {
    id: '05',
    title: 'Verified concurrency: 100–500 users',
    image: '/projects/athena-capacity-500-concurrent.png',
    alt: 'Grafana dashboard confirming 500 simultaneously active users',
    columns: ['Users', 'Max active', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95'],
    rows: [
      ['100', '100', '3,000', '0', '0', '0%', '1,057 ms', '1,138 ms'],
      ['250', '250', '7,500', '0', '0', '0%', '1,086 ms', '1,190 ms'],
      ['500', '500', '15,000', '0', '0', '0%', '1,706 ms', '1,964 ms'],
    ],
    conclusion: 'All 25,500 scenarios passed and 500 simultaneously active users were confirmed. Between 250 and 500 users, p50 rose 61% and p95 rose 73%, revealing queueing, but the tested capacity still held p95 below two seconds.',
  },
  {
    id: '06',
    title: 'Upper-range probe: 650–1,000 users',
    image: '/projects/athena-capacity-1000.png',
    alt: 'Grafana dashboard for the 1000-concurrent-user load test',
    columns: ['Users', 'Max active', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95'],
    rows: [
      ['650', '650', '19,500', '0', '0', '0%', '2,214 ms', '2,990 ms'],
      ['800', '800', '24,000', '0', '0', '0%', '3,014 ms', '3,531 ms'],
      ['1,000', '1,000', '30,000', '0', '0', '0%', '3,894 ms', '6,583 ms'],
    ],
    conclusion: 'The service remained functionally correct through 1,000 concurrent users with no failed or missing scenarios. At 1,000, however, p95 reached 6.583 seconds and crossed the five-second SLO, separating functional capacity from acceptable latency.',
  },
  {
    id: '07',
    title: 'Boundary probe: 850 users',
    image: '/projects/athena-capacity-850.png',
    alt: 'Grafana dashboard for the 850-concurrent-user load test',
    columns: ['Users', 'Max active', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95'],
    rows: [['850', '850', '25,500', '0', '0', '0%', '3,233 ms', '5,525 ms']],
    conclusion: 'All 25,500 scenarios completed without errors, but p95 reached 5.525 seconds. The system was functional at 850 users, while latency was already outside the SLO.',
  },
  {
    id: '08',
    title: 'Boundary probe: 825 users',
    image: '/projects/athena-capacity-825.png',
    alt: 'Grafana dashboard for the 825-concurrent-user load test',
    columns: ['Users', 'Max active', 'Successful E2E', 'Failed E2E', 'Missing E2E', 'Error rate', 'p50', 'p95'],
    rows: [['825', '825', '24,750', '0', '0', '0%', '2,929 ms', '3,841 ms']],
    conclusion: 'At 825 concurrent users, all scenarios passed and p95 remained under five seconds. This placed 825 inside the emerging saturation zone, but one run was not sufficient to call it a stable operating limit.',
  },
  {
    id: '09',
    title: 'Repeatability check: 840 users',
    image: '/projects/athena-capacity-840.png',
    alt: 'Grafana dashboard for repeated 840-concurrent-user load testing',
    columns: ['Run', 'Users', 'Max active', 'Successful E2E', 'Failed E2E', 'Error rate', 'p50', 'p95'],
    rows: [
      ['01', '840', '840', '25,200', '0', '0%', '3,196 ms', '4,216 ms'],
      ['02', '840', '840', '25,200', '0', '0%', '3,519 ms', '5,317 ms'],
      ['03', '840', '840', '25,200', '0', '0%', '3,640 ms', '5,223 ms'],
    ],
    conclusion: 'All 75,600 scenarios completed, yet two of three runs exceeded the five-second p95 target. The result classifies 840 users as unstable rather than a repeatable SLO limit.',
  },
  {
    id: '10',
    title: 'SLO confirmation: 800 users',
    image: '/projects/athena-capacity-800.png',
    alt: 'Grafana dashboard confirming the 800-concurrent-user SLO limit',
    columns: ['Run', 'Users', 'Max active', 'Successful E2E', 'Failed E2E', 'Error rate', 'p50', 'p95'],
    rows: [
      ['01', '800', '800', '24,000', '0', '0%', '3,385 ms', '4,242 ms'],
      ['02', '800', '800', '24,000', '0', '0%', '2,786 ms', '3,114 ms'],
      ['03', '800', '800', '24,000', '0', '0%', '2,720 ms', '3,095 ms'],
    ],
    conclusion: 'Across three repeats, 72,000 / 72,000 scenarios passed. Median p50 was 2.786 seconds, median p95 was 3.114 seconds, and the worst p95 was 4.242 seconds—still below the five-second SLO.',
  },
]

function CapacityTable({ columns, rows }) {
  return (
    <div className="table-wrap capacity-table"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={`${rowIndex}-${row[0]}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  )
}

function LoadTesting() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  return (
    <div className="load-tests">
      <article className="testing-strategy">
        <div className="load-test-card__title"><span>Testing strategy</span><strong>Independent quality gates by failure domain</strong></div>
        <p className="testing-strategy__lede">The current CI is intentionally split into backend, frontend, browser E2E, AI offline regressions and Docker build pipelines.</p>
        <div className="testing-lanes">
          {['Backend', 'Frontend', 'Browser E2E', 'AI offline regressions', 'Docker build'].map((lane) => <span key={lane}>{lane}</span>)}
        </div>
        <div className="testing-proof-grid">
          <div><strong>25 / 25</strong><span>successful real-provider E2E scenarios</span></div>
          <div><strong>0%</strong><span>error rate in baseline load test</span></div>
          <div><strong>3.07 s</strong><span>p50 end-to-end latency</span></div>
          <div><strong>5.15 s</strong><span>p95 end-to-end latency</span></div>
          <div><strong>3 / 3</strong><span>longitudinal AI evaluation checkpoints passed</span></div>
        </div>
        <div className="testing-findings">
          <p>The real-provider load baseline completed 25 / 25 scenarios with 0% errors, p50 ≈ 3.07 s and p95 ≈ 5.15 s.</p>
          <p>The longitudinal GigaChat baseline passed 3 / 3 hard checkpoints and 3 / 3 semantic checkpoints.</p>
        </div>
        <figure className="load-test-card__evidence"><img src="/projects/athena-grafana-load.png" alt="Grafana dashboard for the 25-scenario real-provider baseline" /><figcaption><span>Baseline</span><span>Grafana / real-provider E2E</span></figcaption></figure>
      </article>
      <article className="load-test-card capacity-summary">
        <div className="load-test-card__title"><span>Capacity study</span><strong>Progressive overload in user quantity on a local server</strong></div>
        <p className="capacity-summary__lede">I ran progressive local load tests with increasing real concurrency to find the repeatable latency boundary—not merely the point where requests still returned successfully.</p>
        <div className="capacity-summary__limit"><strong>800</strong><span>concurrent users<br />confirmed SLO limit</span></div>
        <dl className="case-facts capacity-summary__facts">
          <div><dt>Successful E2E</dt><dd>72,000 / 72,000</dd></div><div><dt>Error rate</dt><dd>0%</dd></div>
          <div><dt>Median p50</dt><dd>2.786 s</dd></div><div><dt>Median p95</dt><dd>3.114 s</dd></div>
          <div><dt>Worst p95</dt><dd>4.242 s</dd></div><div><dt>SLO threshold</dt><dd>&lt; 5 s</dd></div>
        </dl>
        <div className="capacity-classification">
          <div><span>Stable SLO limit</span><strong>800 users</strong></div>
          <div><span>Saturation zone</span><strong>825–840 users</strong></div>
          <div><span>Unstable</span><strong>840 users</strong><p>Two of three runs missed the SLO.</p></div>
          <div><span>Functional, outside SLO</span><strong>1,000 users</strong><p>0% errors; p95 = 6.583 s.</p></div>
          <div><span>Recommended production ceiling</span><strong>600–650 users</strong><p>Capacity reserve below the measured limit.</p></div>
        </div>
        <button className="capacity-details-button" type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen} aria-controls="capacity-test-details">
          <span>{detailsOpen ? 'Hide detailed tests' : 'Check detailed tests'}</span><span aria-hidden="true">{detailsOpen ? '−' : '↓'}</span>
        </button>
      </article>
      {detailsOpen && <motion.div id="capacity-test-details" className="capacity-details" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        {capacityTests.map((test) => (
          <article className="capacity-detail" key={test.id}>
            <div className="load-test-card__title"><span>Test {test.id}</span><strong>{test.title}</strong></div>
            <CapacityTable columns={test.columns} rows={test.rows} />
            <div className="capacity-detail__evidence">
              <figure className="load-test-card__evidence"><img src={test.image} alt={test.alt} /><figcaption><span>Test {test.id}</span><span>Grafana / measured result</span></figcaption></figure>
              <div className="capacity-detail__conclusion"><span>Conclusion</span><p>{test.conclusion}</p></div>
            </div>
          </article>
        ))}
      </motion.div>}
      <div className="load-environment">
        <span>Measured path</span><p>POST <code>/api/v1/agent/chat</code> queued work in Redis / Celery. GET <code>/api/v1/agent/chat/jobs/{'{job_id}'}</code> polled until succeeded or failed.</p>
        <span>Environment</span><p>Windows 11 · Docker Desktop / WSL2 · FastAPI :8001 · Redis 7.4-alpine · Celery 5.4, thread pool, concurrency 4 · Supabase · real GigaChat API · JMeter 5.6.3 CLI · InfluxDB · Grafana 12.4.0.</p>
      </div>
    </div>
  )
}

export default function AthenaCaseStudy() {
  return (
    <div className="case-page" id="top">
      <header className="case-nav"><a href="/">AS</a><nav><a href="#architecture">Architecture</a><a href="#results">Results</a><a href="#load-testing">Load tests</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a></nav></header>
      <main>
        <section className="case-hero section">
          <SectionHead number="00" title="Product" detail="Athena AI / 2026" />
          <h1>Athena AI</h1>
          <p className="case-hero__lede"><strong>Athena AI is a production-oriented multi-agent AI platform</strong> for personalized health and wellness workflows.</p>
          <div className="case-hero__context">
            <p>Built with FastAPI, LangGraph, Redis/Celery, Supabase and React.</p>
            <p>Designed around deterministic safety guardrails, human-confirmed writes, model routing, observability and LLM evaluation.</p>
          </div>
          <div className="hero-proof-grid">
            {proofPoints.map((point, index) => <div key={point}><span>{String(index + 1).padStart(2, '0')}</span><p>{point}</p></div>)}
          </div>
          <img src="/projects/macrocoach.png" alt="Four Athena AI mobile product screens" />
        </section>

        <section className="case-section section" id="architecture">
          <SectionHead number="01" title="Architecture" detail="The request path, AI boundary and write protocol at a glance." />
          <SystemArchitecture />
        </section>

        <section className="case-section section tech-stack-section">
          <SectionHead number="02" title="Tech Stack" detail="Organized by system layer." />
          <div className="stack-table" role="table" aria-label="Athena AI technology stack">
            <div className="stack-table__head" role="row"><span role="columnheader">Layer</span><span role="columnheader">Technologies</span></div>
            {stackRows.map(([layer, technologies]) => <div role="row" key={layer}><strong role="cell">{layer}</strong><span role="cell">{technologies}</span></div>)}
          </div>
        </section>

        <section className="case-section section case-section--dark principles-section">
          <SectionHead number="03" title="Engineering Principle" detail="The boundary between probabilistic reasoning and application authority." />
          <blockquote>Athena is designed around one principle: probabilistic AI can propose and reason, while deterministic software owns validation, authorization and state changes.</blockquote>
          <div className="principles-grid">
            {principles.map(([title, description], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{description}</p></div>)}
          </div>
        </section>

        <section className="case-section section why-section">
          <SectionHead number="04" title="You May Wonder Why" detail="Five questions that explain the architecture." />
          <div className="why-chain">
            {whyChain.map(([question, answer], index) => <Reveal className="why-item" key={question}><span>Why #{index + 1}</span><h3>{question}</h3><p>{answer}</p></Reveal>)}
          </div>
        </section>

        <section className="case-section section challenges-section">
          <SectionHead number="05" title="Engineering Challenges" detail="The constraints that shaped the production architecture." />
          <div className="challenge-list">
            {engineeringChallenges.map((challenge) => <article className="challenge-card" key={challenge.number}>
              <div className="challenge-card__title"><span>{challenge.number}</span><h3>{challenge.title}</h3></div>
              <dl><div><dt>Problem</dt><dd>{challenge.problem}</dd></div><div><dt>Solution</dt><dd>{challenge.solution}</dd></div><div><dt>Why it matters</dt><dd>{challenge.why}</dd></div></dl>
              {challenge.number === '01' && <Pipeline label="Two-phase write protocol" items={['Stage', 'Preview', 'User confirmation', 'Ownership + token validation', 'Idempotency + lock', 'Execute']} />}
              {challenge.number === '02' && <><Pipeline label="AI execution service pipeline" items={['Agent', 'Model routing', 'Privacy sanitization', 'Circuit breaker / resilience', 'Tracing', 'Provider']} /><p className="challenge-card__boundary">This boundary is implemented in <code>AIExecutionService</code>.</p></>}
              {challenge.number === '03' && <p className="guardrail-formula"><span>LLM proposes</span><i>→</i><span>application validates</span></p>}
            </article>)}
          </div>
        </section>

        <section className="case-section section snippets-section">
          <SectionHead number="06" title="Engineering Snippets" detail="Three compact implementation patterns." />
          <div className="snippet-grid">
            {snippets.map((snippet) => <article className="engineering-snippet" key={snippet.number}><header><span>{snippet.number}</span><strong>{snippet.title}</strong></header><pre><code>{snippet.code}</code></pre></article>)}
          </div>
        </section>

        <section className="case-section section case-section--dark" id="results">
          <SectionHead number="07" title="Testing & Load Evidence" detail="Real provider calls, separated CI gates and measured concurrency." />
          <div id="load-testing">
          <LoadTesting />
          </div>
        </section>

        <section className="case-section section role-section">
          <SectionHead number="08" title="My Role Here" detail="Designed and implemented independently." />
          <div className="role-layout">
            <h2>Designed and implemented independently</h2>
            <ul>{['Backend architecture', 'Agent orchestration', 'AI execution layer', 'Safety mechanisms', 'CI/testing infrastructure', 'Frontend integration', 'Load testing and evaluation'].map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="case-end section">
          <SectionHead number="09" title="End" />
          <h2>Athena AI <span>/ 2026</span></h2>
          <div><a href={githubUrl} target="_blank" rel="noreferrer">View GitHub ↗</a><a href="/#work">Back to selected work ←</a></div>
        </section>
      </main>
    </div>
  )
}
