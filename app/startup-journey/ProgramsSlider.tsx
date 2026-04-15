'use client'

import { useRef, useState } from 'react'
import styles from './ProgramsSlider.module.css'
import { lightGhostBtnStyle } from '../lib/tokens'

const CARDS = [
  {
    title: 'Ideation Modules',
    desc: 'Develop ideas, test directions and find the right co-founders.',
  },
  {
    title: 'Deep Tech Venture Camp',
    desc: 'Turn scientific potential into venture-ready spin-off cases.',
  },
  {
    title: 'Launchpad',
    desc: 'Move from idea to MVP and prepare for founding.',
  },
  {
    title: 'Incubator',
    desc: 'Build with close support, venture expertise and early-stage funding.',
  },
  {
    title: 'Accelerator',
    desc: 'Gain customer access, investor readiness and momentum for scale.',
  },
]

const SCROLL_STEP = 444
const DOT_COUNT   = 3

export default function ProgramsSlider() {
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

      {/* Intro header */}
      <div className={styles.intro}>
        <div className={styles.introLeft}>
          <p className={styles.eyebrow}>Programs</p>
          <h2 className={styles.headline}>The right program for every stage of growth</h2>
        </div>
        <div className={styles.introRight}>
          <p className={styles.body}>From first ideas to international scaling, SouthwestX brings together the formats that support founders at the moments that matter most. Explore programs built for validation, venture building, customer access, funding readiness and long-term growth.</p>
          <div className={styles.actions}>
            <a href="#programs" className="btn-hover-light" style={lightGhostBtnStyle}>See all programs</a>
            <a href="#contact" data-contact-modal className="btn-hover-light" style={lightGhostBtnStyle}>Get in touch</a>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div ref={scrollRef} className={styles.track}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${activeCard === i ? styles.cardActive : ''}`}
            onClick={() => setActiveCard(i === activeCard ? null : i)}
          >
            <img src="/img-meeting.jpg" alt="" className={styles.cardImg} />
            <div className={styles.cardOverlay} />
            <div className={styles.cardTeal} />
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
