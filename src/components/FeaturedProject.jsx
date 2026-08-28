import { projects } from '../data/portfolio.js'
import ProjectPreview from './ProjectPreview.jsx'

export default function FeaturedProject() {
  const project = projects.find((item) => item.featured)

  return (
    <section className="featured" id="athena-ai" aria-labelledby="featured-title">
      <div className="featured__header">
        <span className="eyebrow">01 / Featured</span>
        <span className="featured__status">{project.status}</span>
      </div>
      <div className="featured__title-row">
        <h2 id="featured-title">{project.title}</h2>
        <p>AI-powered nutrition, training<br />and recovery assistant.</p>
      </div>
      <dl className="featured__metadata">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Stack</dt><dd className="featured__stack-groups">{project.stackGroups.map(([label, value]) => <span key={label}><strong>{label}</strong>{value}</span>)}</dd></div>
        <div><dt>Product areas</dt><dd>Dashboard · Nutrition / food logging · AI chat · Training / recovery</dd></div>
      </dl>
      <div className="featured__media">
        <ProjectPreview type={project.preview} large />
        <p>Athena AI — AI-powered nutrition, training and recovery assistant.</p>
      </div>
      <div className="featured__proofs" aria-label="Athena AI proof points">
        <div><strong>93%</strong><span>Recall@5</span><p>Multilingual retrieval improved from 13%</p></div>
        <div><strong>5</strong><span>languages</span><p>Agent and retrieval evaluation</p></div>
        <div><strong>2,210</strong><span>records</span><p>Validated nutrition dataset</p></div>
      </div>
      <div className="featured__actions">
        <a className="featured__case-link" href="/athena-ai">Explore engineering case <span aria-hidden="true">→</span></a>
        <a href="https://github.com/athenashigapova2-wq/AthenaAI/" target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </section>
  )
}
