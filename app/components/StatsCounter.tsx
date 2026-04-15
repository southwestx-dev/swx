import styles from './StatsCounter.module.css'

interface Stat {
  value: string
  label: string
}

interface Props {
  stats: Stat[]
}

export default function StatsCounter({ stats }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.item}>
            <p className={styles.value}>{stat.value}</p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
