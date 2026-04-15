'use client'

import { useState, useRef } from 'react'
import styles from './TeamSection.module.css'

const TEAM = [
  {
    name: 'Jane Cooper',
    role: 'Head of Ecosystem Partnerships',
    bio: 'Jane builds and maintains the network of corporate partners, research institutions and investors that make the southwestX ecosystem thrive.',
    img: '/img-meeting.jpg',
  },
  {
    name: 'Wade Warren',
    role: 'Program Lead Venture Development',
    bio: 'Wade designs and runs the acceleration and incubation programs, guiding founders from early validation through to investor readiness.',
    img: '/img-networking.jpg',
  },
  {
    name: 'Brooklyn Simmons',
    role: 'Communications & Community Manager',
    bio: 'Brooklyn shapes the voice of southwestX, fostering community engagement and telling the stories of the startups and partners in our ecosystem.',
    img: '/img-meeting.jpg',
  },
  {
    name: 'Robert Fox',
    role: 'Director Innovation & Growth',
    bio: 'Robert drives the strategic direction of growth initiatives, working with corporate partners to unlock new opportunities at the frontier of deep tech.',
    img: '/img-networking.jpg',
  },
  {
    name: 'Dianne Russell',
    role: 'Startup Programs Coordinator',
    bio: 'Dianne coordinates day-to-day program operations and ensures every founder cohort has the tools and support to succeed at each stage of their journey.',
    img: '/img-meeting.jpg',
  },
  {
    name: 'Cameron Williamson',
    role: 'Research & University Relations',
    bio: 'Cameron bridges the gap between academia and entrepreneurship, cultivating relationships with leading universities and research labs across the corridor.',
    img: '/img-networking.jpg',
  },
]

export default function TeamSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [activeDot, setActiveDot]   = useState(0)

  const scroll = (dir: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const cardW = 444 + 16 // card width + gap
    track.scrollBy({ left: dir === 'next' ? cardW : -cardW, behavior: 'smooth' })
    setActiveDot(d => dir === 'next' ? Math.min(d + 1, TEAM.length - 1) : Math.max(d - 1, 0))
  }

  const scrollTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const cardW = 444 + 16
    track.scrollTo({ left: i * cardW, behavior: 'smooth' })
    setActiveDot(i)
  }

  return (
    <section className={styles.section}>
      {/* ── Intro header ── */}
      <div className={styles.intro}>
        <div className={styles.introLeft}>
          <p className={styles.eyebrow}>Our Team</p>
          <h2 className={styles.headline}>People behind<br />the platform</h2>
        </div>
        <div className={styles.introRight}>
          <p className={styles.body}>
            southwestX is powered by a dedicated team of ecosystem builders, program experts
            and network connectors — united by a passion for turning scientific potential into
            real-world impact across the Franco-German corridor.
          </p>
        </div>
      </div>

      {/* ── Scroll track ── */}
      <div className={styles.track} ref={trackRef}>
        {TEAM.map((person, i) => (
          <div
            key={i}
            className={`${styles.card} ${activeCard === i ? styles.cardActive : ''}`}
            onClick={() => setActiveCard(i === activeCard ? null : i)}
          >
            {/* Photo */}
            <img src={person.img} alt={person.name} className={styles.cardImg} />
            {/* Overlays */}
            <div className={styles.cardOverlay} />
            <div className={styles.cardTeal} />

            {/* Bottom content */}
            <div className={styles.cardContent}>
              <span className={styles.roleBadge}>{person.role}</span>
              <h3 className={styles.name}>{person.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ── Navigation ── */}
      <div className={styles.nav}>
        {/* Dots */}
        <div className={styles.dots}>
          {TEAM.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${activeDot === i ? styles.dotActive : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to member ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll('prev')} aria-label="Previous">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className={styles.arrow} onClick={() => scroll('next')} aria-label="Next">
            <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
