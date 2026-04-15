'use client'

import { useState } from 'react'
import styles from './ProgramsList.module.css'

const STAGES = ['All Stages', 'Sensibilisation', 'Qualification', 'Ideation', 'Pre-Seed', 'Seed', 'Series A+']

const PROGRAMS = [
  {
    name: 'Ideation Modules',
    desc: 'Develop ideas, test directions and find the right co-founders.',
    stage: 'Ideation',
    img: '/img-meeting.jpg',
  },
  {
    name: 'Deep Tech Venture Camp',
    desc: 'Turn scientific potential into venture-ready spin-off cases.',
    stage: 'Ideation',
    img: '/img-networking.jpg',
  },
  {
    name: 'Launchpad',
    desc: 'Move from idea to MVP and prepare for founding.',
    stage: 'Pre-Seed',
    img: '/img-meeting.jpg',
  },
  {
    name: 'Incubator',
    desc: 'Build with close support, venture expertise and early-stage funding.',
    stage: 'Pre-Seed',
    img: '/img-networking.jpg',
  },
  {
    name: 'Accelerator',
    desc: 'Gain customer access, investor readiness and momentum for scale.',
    stage: 'Seed',
    img: '/img-meeting.jpg',
  },
]

const PREVIEW_COUNT = 3

export default function ProgramsList() {
  const [activeStage, setActiveStage] = useState('All Stages')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeStage === 'All Stages'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.stage === activeStage)

  const visible = showAll ? filtered : filtered.slice(0, PREVIEW_COUNT)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headline}>Programs Along the Journey</h2>
          <p className={styles.subtext}>
            Each stage is supported by dedicated programs. Find the formats that match
            your current phase and move forward with clarity.
          </p>
        </div>

        {/* Filters + list */}
        <div className={styles.body}>

          {/* Stage filter pills */}
          <div className={styles.filters}>
            {STAGES.map(stage => (
              <button
                key={stage}
                className={`${styles.pill} ${activeStage === stage ? styles.pillActive : ''}`}
                onClick={() => { setActiveStage(stage); setShowAll(false) }}
              >
                {stage}
              </button>
            ))}
          </div>

          {/* Program rows */}
          <div className={styles.list}>
            {visible.map((program, i) => (
              <div key={i} className={styles.row}>
                {/* Image */}
                <div className={styles.imgWrap}>
                  <img src={program.img} alt={program.name} className={styles.img} />
                  <div className={styles.imgOverlay} />
                </div>

                {/* Content card */}
                <div className={styles.card}>
                  <span className={styles.stageLabel}>{program.stage}</span>
                  <div className={styles.cardInfo}>
                    <h3 className={styles.programName}>{program.name}</h3>
                    <p className={styles.programDesc}>{program.desc}</p>
                  </div>
                  <a href="#" className={`${styles.learnMore} btn-hover-light`}>
                    Learn more
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Show All button */}
          {!showAll && filtered.length > PREVIEW_COUNT && (
            <button className={styles.showAll} onClick={() => setShowAll(true)}>
              Show All
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
