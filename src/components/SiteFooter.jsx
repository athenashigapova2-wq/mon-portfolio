import { contacts } from '../data/portfolio.js'

export function ContactsSection() {
  const columns = [contacts.slice(0, 3), contacts.slice(3)]

  return (
    <section className="elsewhere section" id="contacts" aria-labelledby="contacts-title">
      <div className="elsewhere__cta-wrap">
        <p className="elsewhere__cta">Let&apos;s start building together</p>
        <a className="telegram-cta" href="https://t.me/ami_shig" target="_blank" rel="noreferrer">Message me on Telegram ↗</a>
      </div>
      <div className="section-heading"><h2 id="contacts-title">Get acquainted with my work</h2><span>Links / 05</span></div>
      <div className="elsewhere__layout">
        {columns.map((column, columnIndex) => (
          <ul className="link-list" key={columnIndex}>
            {column.map(({ label, detail, href }, index) => {
              const number = columnIndex === 0 ? index + 1 : index + 4
              return <li key={label}><a href={href} target="_blank" rel="noreferrer"><span>0{number}</span><span><strong>{label}</strong><small>({detail})</small></span><span aria-hidden="true">↗</span></a></li>
            })}
          </ul>
        ))}
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div><strong>Amina Shigapova</strong><span>© 2026</span></div>
      <a href="mailto:amina.shigapova.06@mail.ru">amina.shigapova.06@mail.ru</a>
      <a href="/cookies">Cookie policy</a>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
