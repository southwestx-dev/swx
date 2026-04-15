'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsCounter.module.css'

interface Stat {
  value: string
  label: string
}

interface Props {
  stats: Stat[]
}

function parseStat(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: value }
  return { num: parseFloat(match[1]), suffix: match[2] }
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatsCounter({ stats }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [counts, setCounts] = useState<number[]>(
    stats.map(s => Math.round(parseStat(s.value).num * 0.5))
  )
  const animated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1400
          const start = performance.now()
          const parsed = stats.map(s => parseStat(s.value))

          const tick = (now: number) => {
            const elapsed = now - start
            const t = easeOut(Math.min(elapsed / duration, 1))

            setCounts(parsed.map(({ num }) =>
              Math.round(num * 0.5 + num * 0.5 * t)
            ))

            if (elapsed < duration) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stats])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {stats.map((stat, i) => {
          const { suffix } = parseStat(stat.value)
          return (
            <div key={i} className={styles.item}>
              <p className={styles.value}>{counts[i]}{suffix}</p>
              <p className={styles.label}>{stat.label}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
