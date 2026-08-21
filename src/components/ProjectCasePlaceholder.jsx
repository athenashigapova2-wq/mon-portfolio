import ProjectPreview from './ProjectPreview.jsx'

export default function ProjectCasePlaceholder({ project }) {
  return (
    <div className="case-page project-case" id="top">
      <header className="case-nav">
        <a href="/">AS</a>
        <nav><a href="/#work">Selected work</a><a href="/#contacts">Contacts</a></nav>
      </header>
      <main>
        <section className="case-hero section">
          <div className="case-section__head"><span>{project.number} / Project</span><p>{project.category}</p></div>
          <h1>{project.title}</h1>
          <p className="case-hero__lede">{project.summary}</p>
          <ProjectPreview type={project.preview} large />
          <div className="project-case__status">
            <span>Case study</span>
            <p>This project page is ready. Detailed process, decisions and results will be added next.</p>
          </div>
        </section>
      </main>
      <footer className="project-case__footer section"><a href="/#work">Back to selected work ←</a><span>Amina Shigapova / 2026</span></footer>
    </div>
  )
}
