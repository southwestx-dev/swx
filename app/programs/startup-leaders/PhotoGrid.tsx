import styles from './PhotoGrid.module.css'

export default function PhotoGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>

        {/* Column 1 — square + short */}
        <div className={styles.col}>
          <div className={`${styles.card} ${styles.cardSquare}`}>
            <img src="/img-meeting.jpg" alt="" aria-hidden="true" className={styles.img} />
            <div aria-hidden="true" className={`${styles.teal} ${styles.teal225}`} />
          </div>
          <div className={`${styles.card} ${styles.cardShort}`}>
            <img src="/img-networking.jpg" alt="" aria-hidden="true" className={styles.img} />
            <div aria-hidden="true" className={`${styles.teal} ${styles.teal217}`} />
          </div>
        </div>

        {/* Column 2 — single tall */}
        <div className={`${styles.card} ${styles.cardTall}`}>
          <img src="/img-meeting.jpg" alt="" aria-hidden="true" className={styles.img} style={{ objectPosition: 'center top' }} />
          <div aria-hidden="true" className={`${styles.teal} ${styles.teal236}`} />
        </div>

        {/* Column 3 — short + tall */}
        <div className={styles.col}>
          <div className={`${styles.card} ${styles.cardShort}`}>
            <img src="/img-core-strengths-bg.png" alt="" aria-hidden="true" className={styles.img} />
            <div aria-hidden="true" className={`${styles.teal} ${styles.teal217}`} />
          </div>
          <div className={`${styles.card} ${styles.cardTall}`}>
            <img src="/img-networking.jpg" alt="" aria-hidden="true" className={styles.img} style={{ objectPosition: 'center top' }} />
            <div aria-hidden="true" className={`${styles.teal} ${styles.teal236}`} />
          </div>
        </div>

      </div>
    </section>
  )
}
