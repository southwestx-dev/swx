import styles from './LogoBand.module.css'

const LOGOS = [
  { src: '/logo-max-planck.png',    alt: 'Max-Planck-Innovation' },
  { src: '/logo-rptu.png',          alt: 'RPTU' },
  { src: '/logo-trier.png',         alt: 'Trier University' },
  { src: '/whu.png',                alt: 'WHU' },
  { src: '/triathlon_logo_rot.png', alt: 'Triathlon' },
  { src: '/logo-max-planck.png',    alt: 'Max-Planck-Innovation' },
  { src: '/logo-rptu.png',          alt: 'RPTU' },
  { src: '/logo-trier.png',         alt: 'Trier University' },
  { src: '/whu.png',                alt: 'WHU' },
  { src: '/triathlon_logo_rot.png', alt: 'Triathlon' },
]

export default function LogoBand() {
  return (
    <div className={styles.band}>
      <div className={styles.trackWrap}>
        <div className={styles.track}>
          {LOGOS.map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} className={styles.logo} />
          ))}
        </div>
        <div className={`${styles.fade} ${styles.fadeLeft}`} />
        <div className={`${styles.fade} ${styles.fadeRight}`} />
      </div>
    </div>
  )
}
