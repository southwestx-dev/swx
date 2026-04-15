import styles from './SectionIntro.module.css'

interface Props {
  eyebrow?: string               // optional eyebrow above headline
  headline: string
  headlineSize?: number          // px, default 56
  headlineColor?: string         // default #0a0a0a
  background?: string            // default #f6f3ef
  paddingTop?: number            // px, override top padding
  paddingBottom?: number         // px, override bottom padding
  children: React.ReactNode      // right column content
}

export default function SectionIntro({
  eyebrow,
  headline,
  headlineSize = 56,
  headlineColor = '#0a0a0a',
  background = '#f6f3ef',
  paddingTop,
  paddingBottom,
  children,
}: Props) {
  const sectionStyle = {
    background,
    ...(paddingTop    !== undefined && { paddingTop:    `${paddingTop}px` }),
    ...(paddingBottom !== undefined && { paddingBottom: `${paddingBottom}px` }),
  }

  return (
    <section className={styles.section} style={sectionStyle}>
      <div className={styles.inner}>
        <div>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2
            className={styles.headline}
            style={{ fontSize: `${headlineSize}px`, color: headlineColor }}
          >
            {headline}
          </h2>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </section>
  )
}
