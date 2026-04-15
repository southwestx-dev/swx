'use client'

import { useRef, useState } from 'react'
import styles from './JourneySlider.module.css'

const CARDS = [
  {
    step: 'Stage 01',
    title: 'Sensibilisation',
    desc: 'Initial exposure to entrepreneurship, innovation and market opportunities.',
  },
  {
    step: 'Stage 02',
    title: 'Qualification',
    desc: 'Assessment and refinement of skills, ideas and entrepreneurial readiness.',
  },
  {
    step: 'Stage 03',
    title: 'Ideation',
    desc: 'Development and validation of ideas through structured exploration and team formation.',
  },
  {
    step: 'Stage 04',
    title: 'Pre-Seed',
    desc: 'Transformation of validated ideas into early ventures with prototypes and initial business models.',
  },
  {
    step: 'Stage 05',
    title: 'Seed',
    desc: 'Market entry with first customers, product-market fit and initial traction.',
  },
  {
    step: 'Stage 06',
    title: 'Series A+',
    desc: 'Scaling the venture through growth, international expansion and organizational development.',
  },
]

const SCROLL_STEP = 444   // 428px card + 16px gap
const DOT_COUNT   = 4     // 6 cards, ~3 visible → 4 scroll positions

export default function JourneySlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const scrollToIdx = (idx: number) => {
    const next = Math.max(0, Math.min(idx, DOT_COUNT - 1))
    setActiveIdx(next)
    scrollRef.current?.scrollTo({ left: next * SCROLL_STEP, behavior: 'smooth' })
  }

  return (
    <section className={styles.section}>
      {/* Cards */}
      <div ref={scrollRef} className={styles.track}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${activeCard === i ? styles.cardActive : ''}`}
            onClick={() => setActiveCard(i === activeCard ? null : i)}
          >
            {/* Background image — hidden by default, revealed on hover/active */}
            <img src="/img-meeting.jpg" alt="" className={styles.cardImg} />
            {/* Gradient overlay */}
            <div className={styles.cardOverlay} />
            {/* Teal corner accent */}
            <div className={styles.cardTeal} />

            {/* Step label — top */}
            <span className={styles.step}>{card.step}</span>

            {/* Title + desc — bottom */}
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.desc}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className={styles.nav}>
        <div className={styles.dots}>
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scrollToIdx(activeIdx - 1)} aria-label="Previous">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className={styles.arrow} onClick={() => scrollToIdx(activeIdx + 1)} aria-label="Next">
            <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
