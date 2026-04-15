import styles from './TextImage.module.css'

interface Props {
  eyebrow: string
  headline: string
  paragraphs: string[]
  imgSrc: string
  imgAlt?: string
  imgRight?: boolean
}

export default function TextImage({ eyebrow, headline, paragraphs, imgSrc, imgAlt = '', imgRight = false }: Props) {
  const image = (
    <div className={styles.imgWrap}>
      <img src={imgSrc} alt={imgAlt} className={styles.img} />
      <div className={styles.imgOverlay} />
    </div>
  )

  const content = (
    <div className={styles.content}>
      <div className={styles.title}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.headline}>{headline}</h2>
      </div>
      <div className={styles.body}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )

  return (
    <section className={styles.section}>
      <div className={`${styles.inner} ${imgRight ? styles.reversed : ''}`}>
        {imgRight ? <>{content}{image}</> : <>{image}{content}</>}
      </div>
    </section>
  )
}
