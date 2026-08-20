import { projects } from '../data/portfolio.js'
import ProjectPreview from './ProjectPreview.jsx'

export default function FeaturedProject() {
  const project = projects.find((item) => item.featured)

  return (
    <section className="featured" id="macrocoach" aria-labelledby="featured-title">
      <div className="featured__header">
        <span className="eyebrow">01 / Featured</span>
        <span className="featured__status">{project.status}</span>
      </div>
      <div className="featured__title-row">
        <h2 id="featured-title">{project.title}</h2>
        <p>Nutrition, software and data<br />in one working product.</p>
      </div>
      <dl className="featured__metadata">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Stack</dt><dd>{project.stack}</dd></div>
        <div><dt>Source</dt><dd><a href="https://github.com/athenashigapova2-wq/macrocoach" target="_blank" rel="noreferrer">Private / GitHub repository ↗</a></dd></div>
      </dl>
      <ProjectPreview type={project.preview} large />
      <div className="featured__foot">
        <p>{project.summary}</p>
        <a href="#macrocoach-notes">{project.action} <span aria-hidden="true">→</span></a>
      </div>
      <div className="featured__note" id="macrocoach-notes">
        <span>Current scope</span>
        <p>A mobile client with a FastAPI boundary, user-scoped Supabase data, and specialist agent routing for nutrition, training, recovery and general questions.</p>
      </div>
    </section>
  )
}
