'use client'

import { useRef, useState } from 'react'
import styles from './JourneySlider.module.css'

const CARDS = [
  {
    step: 'Stage 01',
    title: 'Sensibilisation',
    desc: 'Early exposure to entrepreneurship across universities and research environments. This phase creates first access, visibility and orientation for future founders.',
    programs: 'Entrepreneurial Education, Support',
  },
  {
    step: 'Stage 02',
    title: 'Qualification',
    desc: 'Foundational entrepreneurial skills are built through practical, interdisciplinary and low-barrier formats. The focus is on capability building before venture decisions become concrete.',
    programs: 'Entrepreneurial Education, Ideation Modules, Community Enterprises',
  },
  {
    step: 'Stage 03',
    title: 'Ideation',
    desc: 'Ideas are developed, challenged and turned into concrete founder paths. Teams form, research potential becomes visible and early entrepreneurial experience begins.',
    programs: 'Ideation Modules, Community Enterprises, Deep Tech Venture Camp, SWX Co-Founder Matching, Support',
  },
  {
    step: 'Stage 04',
    title: 'Pre-Seed',
    desc: 'The focus shifts from opportunity to execution: validating the business model, developing an MVP and preparing teams for incorporation and first funding steps.',
    programs: 'SWX & Partners Launchpad, SWX Incubator, Support',
  },
  {
    step: 'Stage 05',
    title: 'Seed',
    desc: 'Startups strengthen customer access, investor readiness and market traction to move from validated venture to scalable company.',
    programs: 'SWX Accelerator, Support',
  },
  {
    step: 'Stage 06',
    title: 'Series A',
    desc: 'Selected scale-ups enter a high-caliber growth environment with access to strategic networks, international markets and long-term European scaling opportunities.',
    programs: 'Startup Leaders, SWX Accelerator, Support',
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

            {/* Title + desc + programs — bottom */}
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.desc}>{card.desc}</p>
              <p className={styles.programs}>
                <span className={styles.programsLabel}>Programs: </span>
                {card.programs}
              </p>
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
