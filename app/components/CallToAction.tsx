export default function CallToAction() {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          <p style={{
            fontSize: '23px', fontWeight: 400, lineHeight: 1.6,
            color: '#3ccbda', margin: 0,
          }}>
            Get in Touch
          </p>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.3125rem)',
            fontWeight: 700, lineHeight: 1.1,
            color: '#ffffff', margin: 0,
          }}>
            Explore your next step
          </h2>
          <p style={{
            fontSize: '23px', fontWeight: 400, lineHeight: 1.6,
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
            height: '80px', padding: '0 40px', borderRadius: '8px',
            background: '#3ccbda', border: '1px solid rgba(255,255,255,0.1)',
            color: '#0a0a0a', fontSize: '23px', fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
