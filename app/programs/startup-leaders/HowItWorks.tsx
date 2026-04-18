import styles from './HowItWorks.module.css'

const STEPS = [
  {
    n: '01',
    title: 'Nomination',
    body: 'Suitable startup candidates (C-level founders) can be nominated by VCs and mentors from our network. We are looking for (deep-)tech startups from Germany and France that raised between 10–50 Mio. € and are looking to expand cross-border.',
  },
  {
    n: '02',
    title: 'Selection',
    body: 'Each nominee is screened by a jury of our top-level mentors. Up to 10 startups per country per cohort are selected based on technological excellence and cross-border ambition.',
  },
  {
    n: '03',
    title: 'Commitment',
    body: 'Participation is mandatory. The programme is built around 4 off-site retreats, 2–3 days each, over 12 months. Presence at all retreats is required.',
  },
  {
    n: '04',
    title: 'Zero Admin Policy',
    body: 'We handle all logistics at the retreats — hotels, catering, and programme agenda. Your only responsibility is covering your own travel costs. Your focus stays on what matters.',
  },
  {
    n: '05',
    title: 'Locations',
    body: 'Retreats take place across the Franco-German corridor: Paris, Saarbrücken, Baden-Baden, Southern France, Berlin or Munich. Each location is chosen to maximise access to relevant industry and political leaders.',
  },
  {
    n: '06',
    title: 'Kick-off',
    body: 'The first retreat takes place on 15–17 June 2026 in Paris, coinciding with VivaTech. Cohort building, mentorship matching, and French industry giant & embassy networking.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.gradient} />
      <div className={styles.inner}>

        {/* Left — sticky eyebrow + headline */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 className={styles.headline}>
            The STARTUP LEADERS Programme
          </h2>
        </div>

        {/* Right — 6 scrolling text blocks */}
        <div className={styles.right}>
          {STEPS.map((step) => (
            <div key={step.n} className={styles.block}>
              <span className={styles.number}>{step.n}</span>
              <h3 className={styles.blockTitle}>{step.title}</h3>
              <p className={styles.blockBody}>{step.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
