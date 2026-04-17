import styles from './ScheduleSection.module.css'

const RETREATS = [
  {
    label: '1st Retreat',
    title: 'Paris, pre VivaTech',
    desc: 'Cohort building · Mentorship Matching · French industry giants & Embassy Networking',
    date: 'June 15–17, 2026 · 2 days',
    tags: ['Launch', 'VivaTech', 'France'],
  },
  {
    label: '2nd Retreat',
    title: 'Baden-Baden, Saarbrücken',
    desc: 'Participation in the BBUG Fall Meetings · Partnership meetings with German Mittelstand leaders',
    date: 'September, 2026 · 3 days',
    tags: ['BBUG', 'Germany'],
  },
  {
    label: '3rd Retreat',
    title: 'Southern France',
    desc: 'Executive Leadership coaching · Corporate and capital partners · Client acquisition workshops · French VCs and Growth Capital meetings',
    date: 'TBA · 2 days',
    tags: ['Coaching', 'France'],
  },
  {
    label: '4th Retreat',
    title: 'Munich or Berlin',
    desc: 'Alumni network · Policymaking workshop · Impact for European Tech sovereignty',
    date: 'TBA · 2 days',
    tags: ['Alumni', 'Network', 'Germany'],
  },
]

export default function ScheduleSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>What you can expect</p>
          <h2 className={styles.headline}>Programme Schedule</h2>
          <p className={styles.note}>This programme is preliminary and subject to change.</p>
        </div>
        <div className={styles.grid}>
          {RETREATS.map((r, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.label}>{r.label}</span>
                <p className={styles.date}>{r.date}</p>
              </div>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.desc}>{r.desc}</p>
              <div className={styles.tags}>
                {r.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
