import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import FeaturedProject from './components/FeaturedProject.jsx'
import IntroSequence from './components/IntroSequence.jsx'
import ProjectIndex from './components/ProjectIndex.jsx'
import { CookieConsent, CookiePolicyPage } from './components/CookieConsent.jsx'
import { contacts, currently } from './data/portfolio.js'

function SiteHeader({ visible }) {
  return (
    <motion.header
      className="site-header"
      aria-hidden={!visible}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <a className="site-header__name" href="#top">AS</a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contacts">Contacts</a>
      </nav>
    </motion.header>
  )
}

function Identity({ visible }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.section
      className="identity section"
      aria-labelledby="identity-title"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55 }}
    >
      <div className="identity__top"><span className="eyebrow">Portfolio / 2026</span><span>Beijing</span></div>
      <h1 id="identity-title">Amina<br />Shigapova</h1>
      <p className="identity__role">Applied AI / Backend Engineer</p>
      <div className="identity__bottom">
        <p>I work across software,<br />business and design.</p>
        <div className="identity__meta">
          <span>Management · GSOM SPbU</span>
          <span>Exchange · Renmin University</span>
          <a className="identity__projects-button" href="https://disk.yandex.ru/d/PsNikJGdP51PUg" target="_blank" rel="noreferrer">View projects ↗</a>
        </div>
        <a href="#work">Selected work <span aria-hidden="true">↓</span></a>
      </div>
    </motion.section>
  )
}

function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="section-heading"><h2 id="about-title">About / 04</h2><span>Currently</span></div>
      <div className="about__layout">
        <p className="about__statement">Management student building software and AI products, with a focus on backend systems, applied AI and fintech.</p>
        <dl className="currently">
          {currently.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </div>
    </section>
  )
}

function Contacts() {
  return (
    <section className="elsewhere section" id="contacts" aria-labelledby="contacts-title">
      <p className="elsewhere__cta">Let&apos;s start building together</p>
      <div className="section-heading"><h2 id="contacts-title">Contacts</h2><span>Links / 05</span></div>
      <div className="elsewhere__layout">
        <ul className="link-list">
          {contacts.map(([label, href], index) => (
            <li key={label}><a href={href} target="_blank" rel="noreferrer"><span>0{index + 1}</span><strong>{label}</strong><span aria-hidden="true">↗</span></a></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div><strong>Amina Shigapova</strong><span>© 2026</span></div>
      {/* TODO: verify that the display email and mailto address intentionally differ. */}
      <a href="mailto:amina.shigapova.2006@mail.ru">amina.shigapova.06@mail.ru</a>
      <a href="/cookies">Cookie policy</a>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const finishIntro = useCallback(() => setIntroComplete(true), [])

  if (window.location.pathname.replace(/\/$/, '') === '/cookies') {
    return <CookiePolicyPage />
  }

  return (
    <div id="top">
      <a className="skip-link" href="#work">Skip to selected work</a>
      <SiteHeader visible={introComplete} />
      <main>
        <IntroSequence onComplete={finishIntro} />
        <Identity visible={introComplete} />
        <ProjectIndex />
        <FeaturedProject />
        <About />
        <Contacts />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
