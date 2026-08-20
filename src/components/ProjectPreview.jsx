export default function ProjectPreview({ type, large = false }) {
  return (
    <div className={`project-visual project-visual--${type} ${large ? 'project-visual--large' : ''}`}>
      <div className="placeholder-flag">PLACEHOLDER / REAL CAPTURE NEEDED</div>
      {type === 'macrocoach' && (
        <div className="phone-ui" aria-label="Placeholder MacroCoach interface preview">
          <div className="phone-ui__top"><span>Today</span><span>•••</span></div>
          <div className="macro-ring"><span>Daily plan</span><strong>—</strong><small>add real data</small></div>
          <div className="phone-ui__row"><span>Nutrition</span><span>+ Add meal</span></div>
          <div className="phone-ui__row"><span>Training</span><span>View plan</span></div>
        </div>
      )}
      {type === 'ami' && (
        <div className="lesson-ui" aria-label="Placeholder Ami Studios interface preview">
          <span className="lesson-ui__mark">AMI / STUDIOS</span>
          <strong>Language learning,<br />structured clearly.</strong>
          <div className="lesson-ui__rule" />
          <span>LESSON 01 &nbsp; · &nbsp; INTRODUCTION</span>
        </div>
      )}
      {type === 'model' && (
        <div className="sheet-ui" aria-label="Placeholder spreadsheet preview">
          <div className="sheet-ui__letters"><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span></div>
          {[0, 1, 2, 3, 4].map((row) => <div className="sheet-ui__row" key={row}>{[0, 1, 2, 3, 4].map((cell) => <span key={cell}>{row === 1 && cell === 1 ? 'INPUT' : row === 3 && cell === 3 ? '= ∑' : ''}</span>)}</div>)}
        </div>
      )}
      {type === 'design' && (
        <div className="design-ui" aria-label="Placeholder design work preview">
          <div className="design-ui__block">Aa</div>
          <div className="design-ui__block design-ui__block--dark">01</div>
          <div className="design-ui__line">INTERFACES / SYSTEMS / FIGMA</div>
        </div>
      )}
    </div>
  )
}
