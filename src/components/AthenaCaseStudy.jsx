import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import routerCode from '../assets/router_agent.py?raw'

const githubUrl = 'https://github.com/athenashigapova2-wq/macrocoach'

const agents = {
  Nutrition: ['search_food', 'log_meal', 'analyze_macros', 'recommend_meal'],
  Workout: ['create_workout', 'log_exercise', 'get_training_history'],
  Recovery: ['log_sleep', 'track_cycle', 'review_recovery'],
  General: ['get_profile', 'search_knowledge', 'handoff_to_specialist'],
}

const architecture = ['Mobile', 'FastAPI', 'Auth', 'Router', 'Agents', 'Tools', 'PostgreSQL / RAG']

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

function Architecture() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="architecture-flow" aria-label={architecture.join(' to ')}>
      {architecture.map((node, index) => (
        <motion.div
          className="architecture-flow__step"
          key={node}
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.11 }}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{node}</strong>
          {index < architecture.length - 1 && <i aria-hidden="true">→</i>}
        </motion.div>
      ))}
    </div>
  )
}

function AgentExplorer() {
  const [active, setActive] = useState('Nutrition')
  return (
    <div className="agent-explorer">
      <div className="agent-explorer__router"><span>Router Agent</span><strong>chooses one specialist</strong></div>
      <div className="agent-explorer__tabs" role="tablist" aria-label="Specialist agents">
        {Object.keys(agents).map((agent) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === agent}
            className={active === agent ? 'is-active' : ''}
            key={agent}
            onClick={() => setActive(agent)}
          >
            {agent}
          </button>
        ))}
      </div>
      <motion.div className="agent-explorer__tools" key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span>{active} tools</span>
        <ul>{agents[active].map((tool) => <li key={tool}>{tool}</li>)}</ul>
      </motion.div>
    </div>
  )
}

const pythonKeywords = new Set(['from', 'import', 'def', 'return', 'if', 'in', 'for', 'try', 'except', 'pass', 'set', 'dict', 'tuple', 'str', 'sum', 'max', 'lambda', 'else'])

function PythonCode({ code }) {
  const tokenPattern = /(#.*$|""".*?"""|"[^"\n]*"|'[^'\n]*'|\b(?:from|import|def|return|if|in|for|try|except|pass|set|dict|tuple|str|sum|max|lambda|else|True|False|None)\b)/g
  return code.split('\n').map((line, lineIndex) => (
    <span className="code-line" key={`${lineIndex}-${line}`}>
      {line.split(tokenPattern).filter(Boolean).map((token, tokenIndex) => {
        let className = ''
        if (token.startsWith('#')) className = 'token-comment'
        else if (token.startsWith('"') || token.startsWith("'")) className = 'token-string'
        else if (pythonKeywords.has(token)) className = 'token-keyword'
        else if (['True', 'False', 'None'].includes(token)) className = 'token-constant'
        return <span className={className} key={`${tokenIndex}-${token}`}>{token}</span>
      })}
    </span>
  ))
}

function CodePreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="code-preview">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span>View code</span><span>{open ? 'Close −' : 'Router agent +'}</span>
      </button>
      {open && <pre><code><PythonCode code={routerCode} /></code></pre>}
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
      <article className="load-test-card">
        <div className="load-test-card__title"><span>Test 01</span><strong>Smoke / baseline</strong></div>
        <dl className="case-facts">
          <div><dt>Virtual users</dt><dd>2</dd></div><div><dt>Iterations</dt><dd>3 / user</dd></div>
          <div><dt>Ramp-up</dt><dd>10 s</dd></div><div><dt>E2E scenarios</dt><dd>6</dd></div>
          <div><dt>Duration</dt><dd>12.192 s</dd></div><div><dt>Errors</dt><dd>0%</dd></div>
        </dl>
        <div className="table-wrap"><table><thead><tr><th>Metric</th><th>Result</th></tr></thead><tbody>
          <tr><td>Completed E2E</td><td>6 / 6</td></tr><tr><td>p50</td><td>2.058 s</td></tr>
          <tr><td>p95 / p99</td><td>3.505 s</td></tr><tr><td>E2E throughput</td><td>0.492 scenarios/s</td></tr>
          <tr><td>HTTP throughput</td><td>1.722 req/s</td></tr><tr><td>HTTP requests</td><td>21 (6 POST / 15 GET)</td></tr>
        </tbody></table></div>
        <p className="case-caption">With only six E2E scenarios, p95 and p99 equal the maximum. This run is a smoke baseline, not a stable high-percentile estimate.</p>
        <figure className="load-test-card__evidence"><img src="/projects/athena-grafana-baseline.png" alt="Grafana results for load test one" /><figcaption><span>Test 01</span><span>Grafana / measured result</span></figcaption></figure>
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
          <p className="case-hero__lede">AI-powered nutrition, training and recovery assistant.</p>
          <img src="/projects/macrocoach.png" alt="Four Athena AI mobile product screens" />
          <div className="case-overview">
            <div><span>What it is</span><p>An all-in-one product for meal logging, AI help, workout management and overall wellbeing. Athena adapts to each user and suggests the next useful action.</p></div>
            <div><span>What I built</span><p>User interface, FastAPI backend, GigaChat-2 as the main operating model, and LLM tool calling.</p></div>
            <div><span>My role</span><p>Independent Full-stack / Applied AI Engineer</p></div>
            <div><span>Stack</span><div className="case-stack"><div><strong>Backend</strong><p>Python · JS · FastAPI · Redis · Celery</p></div><div><strong>AI</strong><p>LangGraph · GigaChat · multilingual-e5 · RAG</p></div><div><strong>Data</strong><p>Supabase · PostgreSQL · pgvector</p></div><div><strong>Client / Infra</strong><p>React · Docker · Capacitor · JMeter · Grafana</p></div></div></div>
          </div>
        </section>

        <section className="case-section section" id="architecture">
          <SectionHead number="01" title="Architecture" detail="The system assembles as you scroll." />
          <Architecture />
        </section>

        <section className="case-section section case-section--dark">
          <SectionHead number="02" title="Agents & Tool Calling" detail="A narrow tool surface for every specialist." />
          <Reveal className="case-two-column"><AgentExplorer /><CodePreview /></Reveal>
          <p className="case-takeaway">Specialist agents receive only the tools required for their domain.</p>
          <div className="security-boundary"><span>JWT</span><i>→</i><span>FastAPI</span><i>→</i><span>trusted user_id</span><i>→</i><span>build_tools(user_id)</span></div>
        </section>

        <section className="case-section section">
          <SectionHead number="03" title="Data Quality" />
          <Reveal className="data-story">
            <p>Of course, I needed a food database, so I chose the <a href="https://www.kaggle.com/datasets/utsavdey1410/food-nutrition-dataset/data" target="_blank" rel="noreferrer">Food Nutrition Dataset ↗</a>.</p>
            <p><strong>6,077 kcal / 100g?</strong> The source mixed per-portion calories with per-100g nutrition. I wrote a Python recalculation pipeline and removed 185 unrecoverable records.</p>
            <div className="data-result"><strong>2,210</strong><span>valid items</span><strong>0</strong><span>physically impossible rows</span></div>
          </Reveal>
          <div className="data-evidence">
            <figure><img src="/projects/athena-data-before.png" alt="Original food nutrition dataset before cleaning" /><figcaption><span>01 / Before</span><span>Raw nutrition data</span></figcaption></figure>
            <figure><img src="/projects/athena-data-after.png" alt="Food nutrition dataset after cleaning and database preparation" /><figcaption><span>02 / After</span><span>Validated PostgreSQL data</span></figcaption></figure>
            <div className="data-evidence__method"><span>Method</span><p>I used RStudio to investigate outliers, Python to normalize the dataset, and PostgreSQL to store validated records. I later added vector embeddings for semantic retrieval and tracking fields for observability.</p></div>
          </div>
        </section>

        <section className="case-section section retrieval" id="results">
          <SectionHead number="04" title="Retrieval Experiment" detail="A measured multilingual search pipeline." />
          <div className="retrieval__result"><strong>13%</strong><span>→</span><strong>93%</strong><small>Recall@5</small></div>
          <div className="retrieval__steps">
            <div><span>pg_trgm</span><strong>13%</strong></div><div><span>E5-small</span><strong>30%</strong></div>
            <div><span>E5-base</span><strong>37%</strong></div><div><span>+ translation</span><strong>77%</strong></div>
            <div><span>+ domain reranking</span><strong>93%</strong></div>
          </div>
          <div className="experiment-summary"><div><span>What failed</span><p>String similarity and larger embeddings alone did not solve multilingual intent.</p></div><div><span>Why</span><p>Queries crossed languages, spelling variants and nutrition-specific terminology.</p></div><div><span>What changed</span><p>Translation normalized intent; domain reranking promoted nutritionally relevant matches.</p></div></div>
        </section>

        <section className="case-section section evaluation">
          <SectionHead number="05" title="Evaluation" detail="The AI system was not checked by eye." />
          <div className="evaluation-grid">
            <div><strong>40</strong><span>labeled router regression cases</span></div><div><strong>5</strong><span>evaluation languages</span></div>
          </div>
          <div className="table-wrap"><table><thead><tr><th>Evaluation</th><th>What it protects</th><th>Method</th></tr></thead><tbody>
            <tr><td>Router regression</td><td>Correct specialist handoff</td><td>40 labeled cases</td></tr>
            <tr><td>Tool selection</td><td>Minimum tool surface</td><td>Expected tool assertions</td></tr>
            <tr><td>Write safety</td><td>User-scoped mutations</td><td>JWT / user_id boundary tests</td></tr>
            <tr><td>Answer quality</td><td>Useful, grounded responses</td><td>Rubric-based evaluation</td></tr>
            <tr><td>Retrieval benchmark</td><td>Relevant food matches</td><td>Recall@5 across 5 languages</td></tr>
          </tbody></table></div>
        </section>

        <section className="case-section section case-section--dark" id="load-testing">
          <SectionHead number="06" title="Load Testing" detail="Real queue, worker, database and GigaChat calls." />
          <LoadTesting />
        </section>

        <section className="case-section section observability">
          <SectionHead number="07" title="Observability" detail="JMeter → InfluxDB → Grafana" />
          <div className="observability__metrics"><span>Request latency</span><span>CPU</span><span>Memory</span><span>Celery tasks</span><span>Redis queue</span><span>DB connections</span><span>LLM latency</span></div>
        </section>

        <section className="case-section section failures">
          <SectionHead number="08" title="What Didn’t Work" />
          <ul><li><strong>Larger embeddings</strong><span>did not solve multilingual retrieval.</span></li><li><strong>IVFFlat</strong><span>reduced retrieval quality on a small dataset.</span></li><li><strong>One universal agent</strong><span>exposed too broad a tool surface.</span></li><li><strong>Synchronous processing</strong><span>created a latency bottleneck.</span></li></ul>
        </section>

        <section className="case-section section evolution">
          <SectionHead number="09" title="Current Architecture" />
          <div className="evolution__flow"><div><span>Started with</span><p>One agent and synchronous requests.</p></div><i>→</i><div><span>What broke</span><p>Wide tool access, weak multilingual retrieval and blocked requests.</p></div><i>→</i><div><span>What I measured</span><p>Router behavior, Recall@5, queue latency and E2E percentiles.</p></div><i>→</i><div><span>Where it landed</span><p>Specialist agents, scoped tools, reranked RAG and Redis / Celery jobs.</p></div></div>
        </section>

        <section className="case-section section limitations">
          <SectionHead number="10" title="Limitations & Next" />
          <div className="case-two-column"><div><span>Current limitations</span><ul><li>Small evaluation dataset</li><li>Held-out evaluation is still needed</li><li>Known multilingual edge cases</li><li>External LLM latency</li></ul></div><div><span>Next three steps</span><ol><li>Expand held-out multilingual evaluation</li><li>Add tool-level tracing and cost budgets</li><li>Run sustained and failure-injection load tests</li></ol></div></div>
        </section>

        <section className="case-end section">
          <SectionHead number="11" title="End" />
          <h2>Athena AI <span>/ 2026</span></h2>
          <div><a href={githubUrl} target="_blank" rel="noreferrer">View GitHub ↗</a><a href="/#work">Back to selected work ←</a></div>
        </section>
      </main>
    </div>
  )
}
