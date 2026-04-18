import styles from './PullQuote.module.css'

export default function PullQuote() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Partner</p>
        <blockquote className={styles.quote}>
          "Europe has extraordinary talent, technology and ideas. What we often lack is the environment where these ideas can grow into great entrepreneurial leadership. STARTUP LEADERS is designed to create exactly that space."
        </blockquote>
        <div className={styles.attribution}>
          <p className={styles.name}>Knut Stannowski</p>
          <p className={styles.job}>CEO, Collège des Ingénieurs</p>
        </div>
      </div>
    </section>
  )
}
