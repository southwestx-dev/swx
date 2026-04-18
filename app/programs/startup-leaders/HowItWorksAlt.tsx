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

const STICKY_TOP = 120 // matches .right { top: 120px }

export default function HowItWorksAlt() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement | null>(null)

  // Activate dimming only once the right panel has reached its sticky position
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return
      const rect = gridRef.current.getBoundingClientRect()
      setIsSticky(rect.top <= STICKY_TOP && rect.bottom > STICKY_TOP)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track which left item is centred in the viewport
  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.5, rootMargin: '-15% 0px -15% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.gradient} />

      <div className={styles.inner}>

        {/* Full-width header above the grid */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 className={styles.headline}>The STARTUP LEADERS Programme</h2>
        </div>

        {/* Two-column interactive grid — starts at Nomination */}
        <div className={styles.grid} ref={gridRef}>

          {/* Left: 6 scrolling headlines */}
          <div className={styles.left}>
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                ref={el => { itemRefs.current[i] = el }}
                className={`${styles.item} ${
                  !isSticky
                    ? styles.itemActive
                    : i === activeIndex ? styles.itemActive : styles.itemInactive
                }`}
              >
                <span className={styles.number}>{step.n}</span>
                <h3 className={styles.itemTitle}>{step.title}</h3>
              </div>
            ))}
          </div>

          {/* Right: sticky body text panel */}
          <div className={styles.right}>
            <div className={styles.panel}>
              <span className={styles.panelNumber}>{STEPS[activeIndex].n}</span>
              <h3 className={styles.panelTitle}>{STEPS[activeIndex].title}</h3>
              <p className={styles.panelBody}>{STEPS[activeIndex].body}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
