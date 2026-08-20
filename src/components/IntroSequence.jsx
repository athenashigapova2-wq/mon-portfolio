import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const [line, setLine] = useState(reduceMotion ? lines.length - 1 : 0)
  const [finished, setFinished] = useState(Boolean(reduceMotion))

  const complete = useCallback(() => {
    setLine(lines.length - 1)
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

    const timers = lines.slice(1).map((_, index) =>
      window.setTimeout(() => setLine(index + 1), 620 * (index + 1)),
    )
    timers.push(window.setTimeout(complete, 620 * lines.length + 300))

    return () => {
      events.forEach((event) => window.removeEventListener(event, complete))
      timers.forEach(window.clearTimeout)
    }
  }, [complete, reduceMotion])

  return (
    <motion.section
      className={`intro ${finished ? 'intro--finished' : ''}`}
      aria-label="Introduction"
      animate={{ minHeight: finished ? '34vh' : '100svh' }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro__inner">
        <span className="eyebrow">Opening note</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={line}
            className="intro__line"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {lines[line]}
          </motion.p>
        </AnimatePresence>
        <span className="intro__count" aria-hidden="true">0{line + 1} / 05</span>
      </div>
    </motion.section>
  )
}
