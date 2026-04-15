import styles from './Pullquote.module.css'

interface Props {
  paragraphs: string[]
}

export default function Pullquote({ paragraphs }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {paragraphs.map((text, i) => (
          <p key={i} className={styles.text}>{text}</p>
        ))}
      </div>
    </section>
  )
}
