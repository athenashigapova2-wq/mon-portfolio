export default function ProjectPreview({ type, large = false }) {
  const photos = {
    athena: ['/projects/macrocoach.png', 'Athena AI nutrition, AI coach, training and shopping-list screens'],
    ami: ['/projects/ami-studios.png', 'Ami Studios language-learning website'],
    model: ['/projects/data-center.png', 'Digital Twin data-center simulator'],
    design: ['/projects/behance.png', 'Amina Shigapova Behance portfolio'],
  }
  const photo = photos[type]

  return (
    <div className={`project-visual project-visual--${type} ${photo ? 'project-visual--photo' : ''} ${large ? 'project-visual--large' : ''}`}>
      {photo && <img className="project-visual__image" src={photo[0]} alt={photo[1]} loading="lazy" />}
    </div>
  )
}
