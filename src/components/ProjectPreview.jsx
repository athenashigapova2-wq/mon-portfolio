export default function ProjectPreview({ type, large = false }) {
  const photos = {
    ami: ['/projects/ami-studios.png', 'Ami Studios language-learning website'],
    model: ['/projects/data-center.png', 'Digital Twin data-center simulator'],
    design: ['/projects/behance.png', 'Amina Shigapova Behance portfolio'],
  }
  const photo = photos[type]

  return (
    <div className={`project-visual project-visual--${type} ${photo ? 'project-visual--photo' : ''} ${large ? 'project-visual--large' : ''}`}>
      {photo && <img className="project-visual__image" src={photo[0]} alt={photo[1]} loading="lazy" />}
      {type === 'macrocoach' && (
        <>
          <div className="placeholder-flag">PLACEHOLDER / REAL CAPTURE NEEDED</div>
          <div className="phone-ui" aria-label="Placeholder MacroCoach interface preview">
            <div className="phone-ui__top"><span>Today</span><span>•••</span></div>
            <div className="macro-ring"><span>Daily plan</span><strong>—</strong><small>add real data</small></div>
            <div className="phone-ui__row"><span>Nutrition</span><span>+ Add meal</span></div>
            <div className="phone-ui__row"><span>Training</span><span>View plan</span></div>
          </div>
        </>
      )}
    </div>
  )
}
