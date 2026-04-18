import { r } from '../lib/tokens'

const FOOTER_NAV = {
  'For Startups':  ['Startup Journey', 'Programs & Batches', 'Active Calls', 'Resources & Tools'],
  'For Companies': ['Innovation Journey', 'Collaboration Formats', 'Case Studies', 'Strategic Partnerships', 'Corporate Membership'],
  'Ecosystem':     ['Industry Partners', 'Research Institutes', 'de:hub Network', 'International'],
  'Company':       ['About Us', 'Team', 'Careers', 'Contact', 'Press'],
}

const FOOTER_HREFS: Record<string, string> = {
  'Startup Journey':    '/startup-journey',
  'Programs & Batches': '/programs',
  'Innovation Journey': '/innovation-journey',
  'Case Studies':       '/case-studies',
  'About Us':           '/about',
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      padding: `${r(72)} 0 ${r(40)}`,
    }}>
      <div className="container">
        {/* Top row */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: `${r(240)} repeat(4, 1fr)`,
          gap: r(40),
          marginBottom: r(60),
          paddingBottom: r(60),
          borderBottom: '1px solid var(--border)',
        }}>
          {/* Brand */}
          <div>
            <a href="/" style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <img src="/logo.svg" alt="southwestX" style={{ height: r(36) }} />
            </a>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-4)', lineHeight: 1.65, marginBottom: 24 }}>
              Germany&apos;s premier platform for startup-corporate collaboration and ecosystem building.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['𝕏', 'in', 'yt', 'ig'].map(s => (
                <a key={s} href="#" style={{
                  width: r(34), height: r(34), borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border)', color: 'var(--text-4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, transition: 'all var(--ease)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-4)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_NAV).map(([section, links]) => (
            <div key={section}>
              <div style={{
                fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 16,
              }}>{section}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <a key={link} href={FOOTER_HREFS[link] ?? '#'} style={{ fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color var(--ease)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-4)' }}>
            © 2025 southwestX GmbH · Stuttgart, Germany
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Imprint', 'Terms of Service'].map(link => (
              <a key={link} href="#" style={{ fontSize: '0.8125rem', color: 'var(--text-4)', transition: 'color var(--ease)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-3)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-4)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }
      `}</style>
    </footer>
  )
}
