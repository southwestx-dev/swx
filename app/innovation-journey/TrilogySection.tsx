import styles from './TrilogySection.module.css'

export default function TrilogySection() {
  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.blobs}>
        <div className={`${styles.blob} ${styles.blobBlue}`} />
        <div className={`${styles.blob} ${styles.blobWhite}`} />
        <div className={`${styles.blob} ${styles.blobPurple}`} />
        <div className={`${styles.blob} ${styles.blobTeal}`} />
      </div>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Connecting what usually operates in isolation</p>
        <h2 className={styles.headline}>Research meets Entrepreneurship meets Industry</h2>
      </div>
    </section>
  )
}
