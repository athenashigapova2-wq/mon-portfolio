import { useState } from 'react'
import { projects } from '../data/portfolio.js'
import ProjectPreview from './ProjectPreview.jsx'

function ProjectRow({ project, active, onSelect }) {
  return (
    <a
      className={`project-row ${active ? 'project-row--active' : ''}`}
      href={project.href}
      target={project.external ? '_blank' : undefined}
      rel={project.external ? 'noreferrer' : undefined}
      onMouseEnter={() => onSelect(project.id)}
      onFocus={() => onSelect(project.id)}
    >
      <span className="project-row__number">{project.number}</span>
      <span className="project-row__title">{project.title}</span>
      <span className="project-row__category">{project.category}</span>
      <span className="project-row__year">{project.year}</span>
      <span className="project-row__arrow" aria-hidden="true">{project.external ? '↗' : '→'}</span>
      <div className="project-row__mobile-preview"><ProjectPreview type={project.preview} /></div>
    </a>
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
