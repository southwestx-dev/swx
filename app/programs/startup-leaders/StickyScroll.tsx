'use client'

import { useRef, useEffect, useState } from 'react'
import styles from './StickyScroll.module.css'

const QUESTIONS = [
  'The programme structure',
  'How to get selected',
  'Locations & logistics',
]

const CARDS = [
  '4 off-site retreats, 2–3 days each',
  'Participation is mandatory',
  'Nominated by VCs, corporates & the SWX network',
  'Screened by a jury of top-level mentors',
  'Paris, Saarbrücken, Baden-Baden, Southern France, Munich or Berlin',
  'Zero Admin Policy — we handle all logistics at the retreats',
]

/* Map card index → question index */
const CARD_TO_Q = [0, 0, 1, 1, 2, 2]

export default function StickyScroll() {
  const [activeQ, setActiveQ] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveQ(CARD_TO_Q[i])
        },
        { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className={styles.section}>
      {/* Decorative teal gradient */}
      <div aria-hidden="true" className={styles.gradient} />

      <div className={styles.inner}>
        {/* Left: sticky questions */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>How it works</p>
          <div className={styles.questions}>
            {QUESTIONS.map((q, i) => (
              <p
                key={i}
                className={`${styles.question} ${i === activeQ ? styles.questionActive : styles.questionInactive}`}
              >
                {q}
              </p>
            ))}
          </div>
        </div>

        {/* Right: scrolling cards */}
        <div className={styles.cards}>
          {CARDS.map((title, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              className={styles.card}
            >
              <p className={styles.cardTitle}>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
