import { useState } from 'react'

const preferenceKey = 'amina-cookie-preference'

const isPolicyUrl = () => window.location.pathname.replace(/\/$/, '') === '/cookies'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => !window.localStorage.getItem(preferenceKey))
  const [policyOpen, setPolicyOpen] = useState(isPolicyUrl)
  const [choice, setChoice] = useState(() => window.localStorage.getItem(preferenceKey) || 'necessary')
  const [saved, setSaved] = useState(false)

  const leavePolicyUrl = () => {
    if (isPolicyUrl()) window.history.replaceState({}, '', '/')
  }

  const choose = (preference) => {
    window.localStorage.setItem(preferenceKey, preference)
    setChoice(preference)
    setVisible(false)
    setPolicyOpen(false)
    leavePolicyUrl()
  }

  const save = () => {
    window.localStorage.setItem(preferenceKey, choice)
    setSaved(true)
    setVisible(false)
  }

  const closePolicy = () => {
    setPolicyOpen(false)
    leavePolicyUrl()
  }

  if (policyOpen) {
    return (
      <aside className="cookie-notice cookie-notice--policy" aria-label="Cookie policy">
        <div className="cookie-policy-panel__top">
          <span>Policy / Settings</span>
          <button className="cookie-policy-panel__close" type="button" onClick={closePolicy} aria-label="Close cookie policy">×</button>
        </div>

        <h2>Cookie usage</h2>
        <p className="cookie-policy-panel__updated">Updated: August 20, 2026</p>

        <section className="cookie-policy-panel__settings" aria-labelledby="cookie-settings-title">
          <h3 id="cookie-settings-title">Preferences</h3>
          <div className="cookie-setting">
            <div><strong>Necessary storage</strong><span>Supports core site functions and remembers your choice.</span></div>
            <span className="cookie-setting__status">Always on</span>
          </div>
          <div className="cookie-choice" role="radiogroup" aria-label="Cookie preference">
            <label><input type="radio" name="cookie-choice" value="necessary" checked={choice === 'necessary'} onChange={(event) => setChoice(event.target.value)} /> Accept</label>
            <label><input type="radio" name="cookie-choice" value="declined" checked={choice === 'declined'} onChange={(event) => setChoice(event.target.value)} /> Decline optional storage</label>
          </div>
          <button className="cookie-page__save" type="button" onClick={save}>{saved ? 'Preferences saved' : 'Save preferences'}</button>
        </section>

        <div className="policy-copy">
          <h3>What cookies are</h3>
          <p>Cookies are small files stored on your device when you visit a website. They help the site function correctly and remember your settings.</p>

          <h3>Why we use cookies</h3>
          <p>We use strictly necessary first-party cookies and local storage for:</p>
          <ul>
            <li>authentication and session data that keep you signed in;</li>
            <li>preference data that preserve your selected interface language;</li>
            <li>a local record of the choice made in the cookie notice.</li>
          </ul>
          <p>We do not use advertising cookies, cross-site tracking, analytics trackers, or third-party marketing pixels. We do not show targeted advertising or use Flash cookies (Local Shared Objects).</p>

          <h3>How to manage cookies</h3>
          <p>On your first visit, the notice lets you accept or decline cookies and similar storage methods. If you decline, optional cookies remain disabled. Strictly necessary session data may still be used when you sign in. Your choice is stored locally on your device. To make a new choice, delete the site’s cookies and local data in your browser settings. This may also sign you out.</p>

          <h3>Other tracking technologies</h3>
          <p>We do not use web beacons, tracking pixels, or similar technologies on this site.</p>

          <h3>Policy changes</h3>
          <p>We may update this policy from time to time. The “Updated” date above identifies the current version.</p>

          <h3>Contact</h3>
          <p>For questions about this policy, email <a href="mailto:amina.shigapova.06@mail.ru">amina.shigapova.06@mail.ru</a>.</p>
        </div>
      </aside>
    )
  }

  if (!visible) return null

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <h2>We use cookies</h2>
      <p>This site uses necessary cookies and local storage for authentication, saved settings, and your cookie preference.</p>
      <a className="cookie-notice__more" href="/cookies">Read the cookie policy</a>
      <div className="cookie-notice__actions">
        <button className="cookie-notice__decline" type="button" onClick={() => choose('declined')}>Decline</button>
        <button type="button" onClick={() => choose('necessary')}>Accept</button>
      </div>
    </aside>
  )
}
