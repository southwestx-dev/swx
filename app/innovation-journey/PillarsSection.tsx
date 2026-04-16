import styles from './PillarsSection.module.css'

const PILLARS = [
  {
    title: 'Research',
    desc: 'Access to scientific expertise, emerging technologies and validated knowledge. Research provides the foundation for innovation by identifying what is technically possible and where new solutions can emerge.',
    hasImage: true,
  },
  {
    title: 'Entrepreneurship',
    desc: 'A way of working that prioritizes speed, experimentation and iteration. Entrepreneurship translates ideas into testable concepts and ventures, reducing uncertainty through continuous validation.',
    hasImage: false,
  },
  {
    title: 'Industry',
    desc: 'Application at scale within real-world environments. Industry brings market access, operational capability and the ability to integrate and deploy solutions where they create measurable impact.',
    hasImage: false,
  },
]

export default function PillarsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className={`${styles.card} ${pillar.hasImage ? styles.cardImage : ''}`}
            >
              {pillar.hasImage && (
                <img src="/img-meeting.jpg" alt="" aria-hidden="true" className={styles.cardImg} />
              )}
              <div className={`${styles.cardContent} ${pillar.hasImage ? styles.contentBetween : styles.contentEnd}`}>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardDesc}>{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
