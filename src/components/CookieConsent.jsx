import { useState } from 'react'

const preferenceKey = 'amina-cookie-preference'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => !window.localStorage.getItem(preferenceKey))

  const choose = (preference) => {
    window.localStorage.setItem(preferenceKey, preference)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <h2>Мы используем cookie</h2>
      <p>Сайт использует необходимые cookie и локальное хранилище для авторизации, сохранения настроек и Вашего выбора.</p>
      <a className="cookie-notice__more" href="https://amistudios.ru/cookie-policy" target="_blank" rel="noreferrer">Подробнее об использовании cookie</a>
      <div className="cookie-notice__actions">
        <button className="cookie-notice__decline" type="button" onClick={() => choose('declined')}>Отказаться</button>
        <button type="button" onClick={() => choose('necessary')}>Принять</button>
      </div>
    </aside>
  )
}

export function CookiePolicyPage() {
  const [choice, setChoice] = useState(() => window.localStorage.getItem(preferenceKey) || 'necessary')
  const [saved, setSaved] = useState(false)

  const save = () => {
    window.localStorage.setItem(preferenceKey, choice)
    setSaved(true)
  }

  return (
    <main className="cookie-page">
      <a className="cookie-page__back" href="/">← Перейти на главную</a>
      <div className="cookie-page__heading">
        <span className="eyebrow">Политика / Настройки</span>
        <h1>Настройки<br />cookie</h1>
      </div>
      <div className="cookie-page__content">
        <p>Выберите, как сайт может использовать cookie и локальное хранилище.</p>
        <div className="cookie-setting">
          <div><strong>Необходимые данные</strong><span>Обеспечивают работу сайта и сохраняют Ваш выбор.</span></div>
          <span className="cookie-setting__status">Всегда включены</span>
        </div>
        <div className="cookie-choice" role="radiogroup" aria-label="Выбор cookie">
          <label><input type="radio" name="cookie-choice" value="necessary" checked={choice === 'necessary'} onChange={(event) => setChoice(event.target.value)} /> Согласиться</label>
          <label><input type="radio" name="cookie-choice" value="declined" checked={choice === 'declined'} onChange={(event) => setChoice(event.target.value)} /> Отказаться от необязательных cookie</label>
        </div>
        <button className="cookie-page__save" type="button" onClick={save}>{saved ? 'Настройки сохранены' : 'Сохранить настройки'}</button>

        <article className="policy-copy">
          <h2>Использование cookie</h2>
          <p className="policy-copy__updated">Обновлено: 20 августа 2026 года</p>
          <p>Настоящая политика описывает, как «Ami Studios» (далее - «мы») использует cookie-файлы и похожие технологии на сайте amistudios.ru.</p>

          <h3>Что такое cookie</h3>
          <p>Cookie - небольшие файлы, которые сохраняются на Вашем устройстве при посещении сайта, чтобы сайт работал корректно и запоминал Ваши настройки.</p>

          <h3>Зачем мы используем cookie</h3>
          <p>Мы используем строго необходимые cookie собственного сайта (first-party) и локальное хранилище:</p>
          <ul>
            <li>данные авторизации и сессии - сохраняют вход в аккаунт;</li>
            <li>данные предпочтений - поддерживают выбранный язык интерфейса;</li>
            <li>локальная запись о выборе, сделанном в уведомлении об использовании cookie.</li>
          </ul>
          <p>Мы не используем рекламные cookie, межсайтовое отслеживание, аналитические трекеры или сторонние маркетинговые пиксели. Мы не показываем таргетированную рекламу и не используем Flash-cookie (Local Shared Objects).</p>

          <h3>Как управлять cookie</h3>
          <p>При первом посещении уведомление позволяет согласиться или отказаться от использования cookie и похожих способов хранения данных. При отказе необязательные cookie не включаются; строго необходимые данные сессии могут использоваться, когда Вы самостоятельно входите в аккаунт. Выбор сохраняется локально на устройстве. Чтобы сделать новый выбор, удалите cookie и локальные данные сайта в настройках браузера. Это также может привести к выходу из аккаунта.</p>

          <h3>Другие технологии отслеживания</h3>
          <p>Мы не используем веб-маяки, трекинг-пиксели и похожие технологии на сайте.</p>

          <h3>Изменения политики</h3>
          <p>Мы можем время от времени обновлять эту политику. Дата «Обновлено» в начале страницы отражает актуальную версию.</p>

          <h3>Контакты</h3>
          <p>По вопросам, связанным с этой политикой, пишите на <a href="mailto:amina.shigapova.06@mail.ru">amina.shigapova.06@mail.ru</a>.</p>
        </article>
        <a className="cookie-page__home-link" href="/">Перейти на главную →</a>
      </div>
    </main>
  )
}
