import styles from './CompanyTouchpoints.module.css'

const CARDS = [
  {
    title: 'Ideation Challenges',
    desc: 'Structured formats to generate and validate new ideas around specific challenges.',
  },
  {
    title: 'Open Innovation Challenges',
    desc: 'Collaborative formats that connect organizations with external innovators to develop and test solutions.',
  },
  {
    title: 'Venture Clienting',
    desc: 'A systematic approach to identify, test and integrate startup solutions through pilots and real use cases.',
  },
  {
    title: 'Co-Creation Labs',
    desc: 'Hands-on environments where companies, startups and researchers jointly develop and prototype solutions.',
  },
  {
    title: 'Think Tank & Insights',
    desc: 'Continuous analysis of trends, technologies and market developments to inform strategic decision-making.',
  },
]

export default function CompanyTouchpoints() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Touchpoints</p>
          <h2 className={styles.headline}>Where collaboration happens</h2>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div key={card.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
          {/* Dark image card */}
          <div className={`${styles.card} ${styles.cardDark}`}>
            <img src="/img-networking.jpg" alt="" aria-hidden="true" className={styles.cardImg} />
            <div aria-hidden="true" className={styles.cardTeal} />
          </div>
        </div>
      </div>
    </section>
  )
}
