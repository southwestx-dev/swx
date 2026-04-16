import styles from './PerspectivesSection.module.css'

const CARDS = [
  {
    title: 'Research',
    desc: 'Technologies, scientific expertise, long-term thinking',
    hasImage: true,
  },
  {
    title: 'Startups',
    desc: 'Speed, experimentation, new solutions',
    hasImage: false,
  },
  {
    title: 'Industry',
    desc: 'Application, scale, real-world challenges',
    hasImage: false,
  },
  {
    title: 'Talent',
    desc: 'New ideas, interdisciplinary thinking, execution support',
    hasImage: false,
  },
]

export default function PerspectivesSection() {
  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.blobs}>
        <div className={`${styles.blob} ${styles.blobBlue}`} />
        <div className={`${styles.blob} ${styles.blobWhite}`} />
        <div className={`${styles.blob} ${styles.blobPurple}`} />
        <div className={`${styles.blob} ${styles.blobTeal}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Ecosystem</p>
          <h2 className={styles.headline}>
            Four perspectives.{'\n'}One system.
          </h2>
        </div>

        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`${styles.card} ${card.hasImage ? styles.cardImage : ''}`}
            >
              {card.hasImage && (
                <img src="/img-meeting.jpg" alt="" aria-hidden="true" className={styles.cardImg} />
              )}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
