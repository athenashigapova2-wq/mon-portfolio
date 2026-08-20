import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const lines = [
  'I drew in Figma all day long.',
  'I built a place to teach online.',
  'I wondered how data centers could last longer.',
  'And how to train and eat a little smarter.',
  'I left the answers below.',
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
      timer = window.setTimeout(() => setVisibleCharacters((count) => count + 1), 48)
    } else if (line < lines.length - 1) {
      timer = window.setTimeout(() => {
        setLine((index) => index + 1)
        setVisibleCharacters(0)
      }, 950)
    } else {
      timer = window.setTimeout(complete, 1250)
    }

    return () => window.clearTimeout(timer)
  }, [complete, finished, line, reduceMotion, visibleCharacters])

  return (
    <motion.section
      className={`intro ${finished ? 'intro--finished' : ''}`}
      aria-label="Introduction"
      animate={{ minHeight: finished ? '34vh' : '100svh' }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro__inner">
        <span className="eyebrow">Opening note</span>
        <p className="intro__line" aria-live="polite">
          {lines[line].slice(0, visibleCharacters)}
          {!finished && <span className="intro__caret" aria-hidden="true" />}
        </p>
        <span className="intro__count" aria-hidden="true">0{line + 1} / 05</span>
      </div>
    </motion.section>
  )
}
