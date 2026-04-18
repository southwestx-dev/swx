'use client'

import { useRef, useEffect, useState } from 'react'
import styles from './HowItWorksAlt.module.css'

const STEPS = [
  {
    n: '01',
    title: 'Nomination',
    body: 'Suitable startup candidates (C-level founders) can be nominated by VCs and mentors from our network. We are looking for (deep-)tech startups from Germany and France that raised between 10–50 Mio. € and are looking to expand cross-border.',
  },
  {
    n: '02',
    title: 'Selection',
    body: 'Each nominee is screened by a jury of our top-level mentors. Up to 10 startups per country per cohort are selected based on technological excellence and cross-border ambition.',
  },
  {
    n: '03',
    title: 'Commitment',
    body: 'Participation is mandatory. The programme is built around 4 off-site retreats, 2–3 days each, over 12 months. Presence at all retreats is required.',
  },
  {
    n: '04',
    title: 'Zero Admin Policy',
    body: 'We handle all logistics at the retreats — hotels, catering, and programme agenda. Your only responsibility is covering your own travel costs. Your focus stays on what matters.',
  },
  {
    n: '05',
    title: 'Locations',
    body: 'Retreats take place across the Franco-German corridor: Paris, Saarbrücken, Baden-Baden, Southern France, Berlin or Munich. Each location is chosen to maximise access to relevant industry and political leaders.',
  },
  {
    n: '06',
    title: 'Kick-off',
    body: 'The first retreat takes place on 15–17 June 2026 in Paris, coinciding with VivaTech. Cohort building, mentorship matching, and French industry giant & embassy networking.',
  },
]

export default function HowItWorksAlt() {
  // -1 means no item has reached the trigger yet → all dim
  const [activeIndex, setActiveIndex] = useState(-1)
  const [panelVisible, setPanelVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight
      const threshold = vh * 0.25

      // Panel appears when the headline crosses 25 % from the top
      const headerEl = headerRef.current
      if (headerEl) {
        setPanelVisible(headerEl.getBoundingClientRect().top <= threshold)
      }

      // Active item = last one whose top has crossed the 25 % mark
      let newActive = -1
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= threshold) {
          newActive = i
        }
      })
      setActiveIndex(newActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // When panel first appears but no item is active yet, default to step 0
  const panelStep = STEPS[Math.max(0, activeIndex)]

  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.gradient} />

      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* Left: headline + 6 scrolling items */}
          <div className={styles.left}>
            <div className={styles.header} ref={headerRef}>
              <p className={styles.eyebrow}>How it works</p>
              <h2 className={styles.headline}>The STARTUP LEADERS Programme</h2>
            </div>

            {STEPS.map((step, i) => (
              <div
                key={step.n}
                ref={el => { itemRefs.current[i] = el }}
                className={`${styles.item} ${
                  i === activeIndex ? styles.itemActive : styles.itemInactive
                }`}
              >
                <span className={styles.number}>{step.n}</span>
                <h3 className={styles.itemTitle}>{step.title}</h3>
              </div>
            ))}
          </div>

          {/* Right: sticky panel — fades in when headline at 25 % */}
          <div className={`${styles.right} ${panelVisible ? styles.rightVisible : ''}`}>
            <div className={styles.panel}>
              <span className={styles.panelNumber}>{panelStep.n}</span>
              <h3 className={styles.panelTitle}>{panelStep.title}</h3>
              <p className={styles.panelBody}>{panelStep.body}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
