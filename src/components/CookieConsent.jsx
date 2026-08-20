import { useState } from 'react'

const preferenceKey = 'amina-cookie-preference'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => !window.localStorage.getItem(preferenceKey))

  const accept = () => {
    window.localStorage.setItem(preferenceKey, 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <p>This site only stores your cookie preference. No analytics or marketing cookies are active.</p>
      <div className="cookie-notice__actions">
        <a href="/cookies">Cookie policy & settings</a>
        <button type="button" onClick={accept}>Accept</button>
      </div>
    </aside>
  )
}

export function CookiePolicyPage() {
  const [saved, setSaved] = useState(false)

  const save = () => {
    window.localStorage.setItem(preferenceKey, 'necessary')
    setSaved(true)
  }

  return (
    <main className="cookie-page">
      <a className="cookie-page__back" href="/">← Back to portfolio</a>
      <div className="cookie-page__heading">
        <span className="eyebrow">Policy / Settings</span>
        <h1>Cookie<br />preferences</h1>
      </div>
      <div className="cookie-page__content">
        <p>This portfolio does not currently use analytics, advertising or marketing cookies.</p>
        <div className="cookie-setting">
          <div><strong>Necessary storage</strong><span>Remembers that you closed the cookie notice.</span></div>
          <span className="cookie-setting__status">Always on</span>
        </div>
        <div className="cookie-setting">
          <div><strong>Analytics</strong><span>No analytics service is installed.</span></div>
          <span className="cookie-setting__status">Off</span>
        </div>
        <div className="cookie-setting">
          <div><strong>Marketing</strong><span>No advertising or tracking service is installed.</span></div>
          <span className="cookie-setting__status">Off</span>
        </div>
        <button className="cookie-page__save" type="button" onClick={save}>{saved ? 'Preferences saved' : 'Save preferences'}</button>
      </div>
    </main>
  )
}
