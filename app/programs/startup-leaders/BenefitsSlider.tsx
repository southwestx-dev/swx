'use client'

import { useRef, useState } from 'react'
import styles from './BenefitsSlider.module.css'

const CARDS = [
  {
    label: '1st Retreat',
    title: 'Paris, pre VivaTech',
    desc: 'Cohort building · Mentorship Matching · French industry giants & Embassy Networking',
    place: 'Paris, France',
    date: 'June 15–17, 2026',
  },
  {
    label: '2nd Retreat',
    title: 'Baden-Baden, Saarbrücken',
    desc: 'Participation in the BBUG Fall Meetings · Partnership meetings with German Mittelstand leaders',
    place: 'Germany',
    date: 'September, 2026',
  },
  {
    label: '3rd Retreat',
    title: 'Southern France',
    desc: 'Executive Leadership coaching · Corporate and capital partners · Client acquisition workshops · French VCs and Growth Capital meetings',
    place: 'Southern France',
    date: 'TBA',
  },
  {
    label: '4th Retreat',
    title: 'Munich or Berlin',
    desc: 'Alumni network · Policymaking workshop · Impact for European Tech sovereignty',
    place: 'Germany',
    date: 'TBA',
  },
]

const SCROLL_STEP = 444  // 428px card + 16px gap
const DOT_COUNT   = 2    // 4 cards, ~3 visible → 2 scroll positions

export default function BenefitsSlider() {
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

      {/* Header */}
      <div className={styles.intro}>
        <p className={styles.eyebrow}>What you gain</p>
        <h2 className={styles.headline}>Built for founders who move fast</h2>
      </div>

      {/* Cards */}
      <div ref={scrollRef} className={styles.track}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${activeCard === i ? styles.cardActive : ''}`}
            onClick={() => setActiveCard(i === activeCard ? null : i)}
          >
            <img src="/img-networking.jpg" alt="" className={styles.cardImg} />
            <div className={styles.cardOverlay} />
            <div className={styles.cardTeal} />

            {/* Top: label + badges */}
            <div className={styles.cardTop}>
              <span className={styles.label}>{card.label}</span>
              <div className={styles.badges}>
                {/* Place badge */}
                <span className={styles.badge}>
                  <svg className={styles.badgeIcon} viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
                    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.25"/>
                  </svg>
                  {card.place}
                </span>
                {/* Date badge */}
                <span className={styles.badge}>
                  <svg className={styles.badgeIcon} viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                    <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                  {card.date}
                </span>
              </div>
            </div>

            {/* Bottom: title + desc */}
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
