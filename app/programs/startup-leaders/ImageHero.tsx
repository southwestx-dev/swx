import styles from './ImageHero.module.css'

export default function ImageHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <img
            src="/img-networking.jpg"
            alt=""
            aria-hidden="true"
            className={styles.img}
          />
          <div aria-hidden="true" className={styles.overlay} />
          <h2 className={styles.headline}>
            We unite Europe's<br />
            <span className={styles.teal}>tech champions.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
