import styles from './MediaPlaceholder.module.css'

export default function MediaPlaceholder() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.placeholder}>
          <div className={styles.icon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="20,16 34,24 20,32" fill="currentColor" />
            </svg>
          </div>
          <p className={styles.label}>Image / Video</p>
        </div>
      </div>
    </section>
  )
}
