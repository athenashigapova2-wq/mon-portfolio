import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const lines = [
  'Everyday I learn from people who are better than me',
  'I build systems that can be tested, measured and improved',
]

export default function IntroSequence({ onComplete }) {
  const reduceMotion = useReducedMotion()
  const [line, setLine] = useState(0)
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const [finished, setFinished] = useState(false)

  const complete = useCallback(() => {
    setLine(lines.length - 1)
    setVisibleCharacters(lines.at(-1).length)
    setFinished(true)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    if (reduceMotion) {
      complete()
      return undefined
    }

    const events = ['wheel', 'pointerdown', 'touchstart', 'keydown']
    events.forEach((event) => window.addEventListener(event, complete, { once: true, passive: true }))

    return () => {
      events.forEach((event) => window.removeEventListener(event, complete))
    }
  }, [complete, reduceMotion])

  useEffect(() => {
    if (reduceMotion || finished) return undefined

    const currentLine = lines[line]
    let timer

    if (visibleCharacters < currentLine.length) {
      timer = window.setTimeout(() => setVisibleCharacters((count) => count + 1), 30)
    } else if (line < lines.length - 1) {
      timer = window.setTimeout(() => {
        setLine((index) => index + 1)
        setVisibleCharacters(0)
      }, 520)
    } else {
      timer = window.setTimeout(complete, 750)
    }

    return () => window.clearTimeout(timer)
  }, [complete, finished, line, reduceMotion, visibleCharacters])

  return (
    <motion.section
      className={`intro ${finished ? 'intro--finished' : ''}`}
      aria-label="Introduction"
      animate={{ minHeight: finished ? '52svh' : '72svh' }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro__inner">
        <span className="eyebrow">Introduction</span>
        <div className="intro__copy">
          {lines.slice(0, line).map((sentence) => <p className="intro__line" key={sentence}>{sentence}</p>)}
          <p className="intro__line" aria-live="polite">
            {lines[line].slice(0, visibleCharacters)}
            {!finished && <span className="intro__caret" aria-hidden="true" />}
          </p>
        </div>
        <span className="intro__count" aria-hidden="true">
          {String(line + 1).padStart(2, '0')} / {String(lines.length).padStart(2, '0')}
        </span>
      </div>
    </motion.section>
  )
}
