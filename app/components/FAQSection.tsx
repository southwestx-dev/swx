'use client'

import { useState } from 'react'
import styles from './FAQSection.module.css'

export interface FAQItem {
  q: string
  a: string
}

interface Props {
  eyebrow?: string
  headline?: string
  items: FAQItem[]
}

export default function FAQSection({
  eyebrow = 'FAQ',
  headline = 'Frequently asked questions',
  items,
}: Props) {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>

        {/* Left: heading */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.headline}>{headline}</h2>
        </div>

        {/* Right: accordion */}
        <div className={styles.accordion}>
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={styles.hLine} />
                    </svg>
                  </span>
                </button>
                <div className={styles.answerWrap} style={{ maxHeight: isOpen ? '600px' : '0' }}>
                  <p className={styles.answer}>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
