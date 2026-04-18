'use client'

import { useRef, useState } from 'react'
import styles from './BenefitsSlider.module.css'

const CARDS = [
  {
    number: '01',
    title: 'Executive Mentorship',
    desc: 'Each founder is matched with a senior mentor — DAX C-level executives, unicorn founders, or industry chairs — for structured one-to-one guidance throughout the programme.',
  },
  {
    number: '02',
    title: 'Founder Peer Network',
    desc: '20+ hand-selected founders from France and Germany. A confidential circle built on trust, shared ambition, and the rare candour that only peers can offer.',
  },
  {
    number: '03',
    title: 'Industrial Access',
    desc: 'Direct introductions to corporate decision-makers across automotive, pharma, energy and defense — the gatekeepers of enterprise contracts and strategic partnerships.',
  },
  {
    number: '04',
    title: 'Policy & Capital',
    desc: 'Curated access to political leaders shaping European tech policy and to growth-stage investors actively deploying into Series A and beyond.',
  },
  {
    number: '05',
    title: 'Cross-border Expansion',
    desc: 'Structured guidance for German founders entering France and vice versa — market intelligence, regulatory navigation, and warm introductions in both ecosystems.',
  },
  {
    number: '06',
    title: 'Lifetime Membership',
    desc: 'The programme ends; the network does not. Alumni carry lifelong access to the STARTUP LEADERS community, its mentors, and future cohorts.',
  },
]

const SCROLL_STEP = 444  // 428px card + 16px gap
const DOT_COUNT   = 4    // 6 cards, ~3 visible → 4 scroll positions

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

            <span className={styles.number}>{card.number}</span>

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
