import styles from './OfferSection.module.css'

const PILLARS = [
  {
    n: '01',
    title: 'Circle of Peers',
    desc: 'An exclusive, trust-based circle of fellow top-level founders sharing radical honesty and deep-dive discussions on company-building at the highest level.',
  },
  {
    n: '02',
    title: 'Leading Authorities',
    desc: 'A mentor advisory board of leading economic, political and financial authorities, including unicorn founders, Growth VCs, and Family Offices.',
  },
  {
    n: '03',
    title: 'Cross-Border Partnerships',
    desc: 'Building bridges into our neighboring markets to propel cross-border market expansion and industry partnerships.',
  },
  {
    n: '04',
    title: 'Off-the-record Insights',
    desc: 'Guided by the Chatham House Rule, we facilitate a high-density knowledge transfer among the cohort members and with their mentors.',
  },
  {
    n: '05',
    title: 'European Autonomy',
    desc: 'Contributing to the agenda of European technological autonomy in key future industry sectors.',
  },
  {
    n: '06',
    title: 'A Lifelong Connection',
    desc: 'Once in, you will always be a part of the STARTUP LEADERS network — including regular alumni retreats and exchanges.',
  },
]

export default function OfferSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>What we offer</p>
          <h2 className={styles.headline}>STARTUP LEADERS is:</h2>
        </div>
        <div className={styles.grid}>
          {PILLARS.map((p) => (
            <div key={p.n} className={styles.card}>
              <span className={styles.number}>{p.n}</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
