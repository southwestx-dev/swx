interface Props {
  image?: { src: string; alt: string }
}

export default function CallToAction({ image }: Props = {}) {
  return (
    <section style={{
      background: '#0a0a0a',
      padding: '120px 64px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
      }}>
        {/* Text block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', alignItems: 'center' }}>
          <p style={{
            fontSize: '18px', fontWeight: 400, lineHeight: 1.6,
            color: '#3ccbda', margin: 0,
          }}>
            Get in Touch
          </p>

          {/* Optional portrait — only shown when passed */}
          {image && (
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '16px',
                objectFit: 'cover',
                objectPosition: 'center top',
                border: '2px solid rgba(255,255,255,0.1)',
              }}
            />
          )}

          <h2 style={{
            fontSize: '56px',
            fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
            color: '#ffffff', margin: 0,
          }}>
            Explore your next step
          </h2>
          <p style={{
            fontSize: '18px', fontWeight: 400, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)', margin: 0,
          }}>
            Not sure where you stand? We help you identify the right entry point.
          </p>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          data-contact-modal
          className="btn-hover"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: '48px', padding: '0 24px', borderRadius: '8px',
            background: '#3ccbda', border: '1px solid rgba(255,255,255,0.1)',
            color: '#0a0a0a', fontSize: '14px', fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
