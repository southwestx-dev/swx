import styles from './TouchpointsSection.module.css'

const CARDS = [
  {
    title: 'Ideation Challenges',
    desc: 'Structured formats to generate and validate new ideas around specific challenges.',
  },
  {
    title: 'Open Innovation Challenges',
    desc: 'Collaborative formats that connect organisations with external innovators to develop and test solutions.',
  },
  {
    title: 'Venture Clienting',
    desc: 'A systematic approach to identify, test and integrate startup solutions through pilots and real use cases.',
  },
]

export default function TouchpointsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Touchpoints</p>
          <h2 className={styles.headline}>Where collaboration happens</h2>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <div key={i} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
