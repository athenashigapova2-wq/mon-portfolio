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

function LoadTesting() {
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
      <article className="load-test-card">
        <div className="load-test-card__title"><span>Test 02</span><strong>Repeated 5-user load</strong></div>
        <div className="table-wrap"><table><thead><tr><th>Metric</th><th>Run 1</th><th>Run 2</th></tr></thead><tbody>
          <tr><td>Virtual users</td><td>5</td><td>5</td></tr><tr><td>Completed E2E</td><td>25 / 25</td><td>25 / 25</td></tr>
          <tr><td>Duration</td><td>40.431 s</td><td>37.342 s</td></tr><tr><td>p50</td><td>3.059 s</td><td>3.069 s</td></tr>
          <tr><td>p95</td><td>4.068 s</td><td>4.122 s</td></tr><tr><td>p99</td><td>6.187 s</td><td>5.087 s</td></tr>
          <tr><td>E2E throughput</td><td>0.618/s</td><td>0.669/s</td></tr><tr><td>HTTP throughput</td><td>2.275 req/s</td><td>2.571 req/s</td></tr>
          <tr><td>Error rate</td><td>0%</td><td>0%</td></tr><tr><td>POST enqueue</td><td>25</td><td>25</td></tr>
          <tr><td>GET polling</td><td>67</td><td>71</td></tr><tr><td>Total HTTP requests</td><td>92</td><td>96</td></tr>
        </tbody></table></div>
        <p className="case-caption">Both runs completed all 25 scenarios without errors or dropped jobs. Run 2 improved throughput and p99 while p50 and p95 stayed stable.</p>
        <figure className="load-test-card__evidence"><img src="/projects/athena-grafana-load.png" alt="Grafana results for repeated five-user load test" /><figcaption><span>Test 02</span><span>Grafana / repeated load</span></figcaption></figure>
      </article>
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
      <header className="case-nav"><a href="/">AS</a><nav><a href="#architecture">Architecture</a><a href="#results">Results</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a></nav></header>
      <main>
        <section className="case-hero section">
          <SectionHead number="00" title="Product" detail="Athena AI / 2026" />
          <h1>Athena AI</h1>
          <p className="case-hero__lede">AI-powered nutrition, training and recovery assistant.</p>
          <img src="/projects/macrocoach.png" alt="Four Athena AI mobile product screens" />
          <div className="case-overview">
            <div><span>What it is</span><p>An all-in-one product for meal logging, AI help, workout management and overall wellbeing. Athena adapts to each user and suggests the next useful action.</p></div>
            <div><span>What I built</span><p>User interface, FastAPI backend, GigaChat-2 as the main operating model, and LLM tool calling.</p></div>
            <div><span>My role</span><p>Full-stack developer</p></div>
            <div><span>Stack</span><p>JavaScript · React · Node.js · TypeScript · SQL · PostgreSQL · CSS · Docker · JMeter</p></div>
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
            <p><strong>6,077 kcal / 100g?</strong> The source mixed per-portion calories with per-100g nutrition. I wrote a Python recalculation pipeline and removed 185 irrelevant records.</p>
            <div className="data-result"><strong>2,210</strong><span>valid items</span><strong>0</strong><span>physically impossible rows</span></div>
          </Reveal>
          <div className="data-evidence">
            <figure><img src="/projects/athena-data-before.png" alt="Original food nutrition dataset before cleaning" /><figcaption><span>01 / Before</span><span>Raw nutrition data</span></figcaption></figure>
            <figure><img src="/projects/athena-data-after.png" alt="Food nutrition dataset after cleaning and database preparation" /><figcaption><span>02 / After</span><span>Validated PostgreSQL data</span></figcaption></figure>
            <div className="data-evidence__method"><span>Method</span><p>I used RStudio to analyze outliers, Python to reframe the dataset, and the built-in SQL editor to add tracking fields such as <code>created_at</code> and <code>embedding</code> for router observability.</p></div>
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

        <section className="case-section section case-section--dark">
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
