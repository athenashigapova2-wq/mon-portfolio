import { useState } from 'react'
import { projects } from '../data/portfolio.js'
import ProjectPreview from './ProjectPreview.jsx'

function ProjectRow({ project, active, onSelect }) {
  return (
    <article
      className={`project-row ${active ? 'project-row--active' : ''}`}
      onMouseEnter={() => onSelect(project.id)}
    >
      <span className="project-row__number">{project.number}</span>
      <div className="project-row__content">
        <a className="project-row__title" href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noreferrer' : undefined} onFocus={() => onSelect(project.id)}>{project.title}</a>
        <p className="project-row__category">{project.description ?? project.category}</p>
        {project.links && <div className="project-row__links">{project.links.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label}</a>)}</div>}
      </div>
      <span className="project-row__year">{project.year}</span>
      <a className="project-row__arrow" href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noreferrer' : undefined} aria-label={`Open ${project.title}`}>{project.external ? '↗' : '→'}</a>
      <div className="project-row__mobile-preview"><ProjectPreview type={project.preview} /></div>
    </article>
  )
}

export default function ProjectIndex() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const active = projects.find((project) => project.id === activeId) ?? projects[0]

  return (
    <section className="section project-index" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">Selected work</h2>
        <span>2024—2026</span>
      </div>
      <div className="project-index__layout">
        <div className="project-index__list">
          {projects.map((project) => <ProjectRow key={project.id} project={project} active={project.id === activeId} onSelect={setActiveId} />)}
        </div>
        <div className="project-index__preview" aria-live="polite">
          <ProjectPreview type={active.preview} />
          <p><span>{active.number} /</span> {active.summary}</p>
        </div>
      </div>
    </section>
  )
}
