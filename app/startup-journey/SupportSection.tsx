import styles from './SupportSection.module.css'
import { lightGhostBtnStyle } from '../lib/tokens'

export default function SupportSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left: text */}
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <p className={styles.eyebrow}>Open Access</p>
            <h2 className={styles.headline}>Support across the journey</h2>
          </div>
          <div className={styles.body}>
            <p>Startups do not need to be part of a program to connect with SouthwestX. We support founders before, during and between programs — from early orientation to validation, go-to-market and financing.</p>
            <p>Whether teams are just getting started or already building their company, SouthwestX provides direct access to entrepreneurial sparring, relevant networks, potential customers, investors and the right next-step formats across the journey.</p>
          </div>
          <a
            href="#contact"
            data-contact-modal
            className="btn-hover-light"
            style={{ ...lightGhostBtnStyle, width: '30%', justifyContent: 'center' }}
          >
            Talk to the Startup Team
          </a>
        </div>

        {/* Right: image card */}
        <div className={styles.card}>
          <img
            src="/img-networking.jpg"
            alt="SouthwestX networking"
            className={styles.cardImg}
          />
        </div>

      </div>
    </section>
  )
}
