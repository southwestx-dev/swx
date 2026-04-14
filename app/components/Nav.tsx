'use client'

import { useState, useEffect, useRef } from 'react'
import { r, TEAL, DARK2, W70, W10 } from '../lib/tokens'

/* ─── Mega Menu Data ─────────────────────────────── */
const MEGA_DATA: Record<string, {
  heading: string; image: string; desc: string; cta: string
  items: { title: string; desc: string }[]
}> = {
  'For Startups': {
    heading: 'For Startups', image: '/img-meeting.jpg',
    desc: 'From idea to market-ready DeepTech company. Access structured programs, mentors and cross-border funding across the Franco-German ecosystem.',
    cta: 'Get in touch',
    items: [
      { title: 'Startup Journey',      desc: 'From early validation to international scaling.' },
      { title: 'Programmes & Batches', desc: 'Structured programs for every stage of growth.' },
    ],
  },
  'For Companies': {
    heading: 'For Companies', image: '/img-networking.jpg',
    desc: 'Turn technological potential into real business innovation. Connect with DeepTech startups and research institutions in Europe\'s leading innovation corridor.',
    cta: 'Get in touch',
    items: [
      { title: 'Innovation Journey',    desc: 'Structured corporate innovation programs.' },
      { title: 'Collaboration Formats', desc: 'Co-creation with startups and research.' },
      { title: 'Case Studies',          desc: 'Real results from our ecosystem partnerships.' },
      { title: 'Partnership',           desc: 'Become a long-term ecosystem partner.' },
    ],
  },
  'Ecosystem': {
    heading: 'Ecosystem', image: '/img-core-strengths-bg.png',
    desc: 'A cross-border network of research institutions, industry partners, investors and startups building Europe\'s DeepTech future together.',
    cta: 'Explore ecosystem',
    items: [
      { title: 'Industry Partners',       desc: 'Corporate members and ecosystem partners.' },
      { title: 'Research & Universities', desc: 'World-class institutions in the network.' },
      { title: 'Network Partners',        desc: 'Cross-border collaborators and allies.' },
    ],
  },
  'Insights': {
    heading: 'Insights', image: '/img-teal-explosion.png',
    desc: 'Research perspectives, expert analysis and innovation trends shaping Europe\'s DeepTech landscape.',
    cta: 'View all insights',
    items: [
      { title: 'News',         desc: 'Latest updates from the southwestX ecosystem.' },
      { title: 'Reports',      desc: 'In-depth analysis of DeepTech trends.' },
      { title: 'Case Studies', desc: 'Stories from startups and partners.' },
    ],
  },
  'About': {
    heading: 'About', image: '/img-meeting.jpg',
    desc: 'southwestX is built on the conviction that Europe\'s strongest competitive advantage lies in its scientific depth.',
    cta: 'Learn more',
    items: [
      { title: 'SouthwestX',        desc: 'Our mission and what drives us.' },
      { title: 'Locations',         desc: 'Where we operate across Europe.' },
      { title: 'Team',              desc: 'The people behind the ecosystem.' },
      { title: 'Mentors & Experts', desc: 'Our network of advisors and specialists.' },
      { title: 'Careers',           desc: 'Join the southwestX team.' },
      { title: 'Press',             desc: 'News, press releases and media kit.' },
    ],
  },
}

/* ─── Nav ────────────────────────────────────────── */
export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 24); setActiveMenu(null) }
    const onKey    = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMenu(null) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) }
  }, [])

  const links    = ['For Startups', 'For Companies', 'Ecosystem', 'Insights', 'Events', 'About']
  const megaData = activeMenu ? MEGA_DATA[activeMenu] : null

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${r(64)}`,
        background: (scrolled || activeMenu) ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: (scrolled || activeMenu) ? 'blur(16px)' : 'none',
        borderBottom: (scrolled || activeMenu) ? `1px solid ${W10}` : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', position: 'relative' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
            <img src="/logo.svg" alt="southwestX" style={{ height: r(48) }} />
          </a>

          {/* Desktop nav links — centered */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', alignItems: 'center', gap: 8,
          }} className="desktop-nav">
            {links.map(link => (
              <a key={link} href="#"
                className="nav-link"
                onMouseEnter={() => { cancelClose(); setActiveMenu(link) }}
                onMouseLeave={scheduleClose}
                style={{
                  fontSize: r(18), fontWeight: 400,
                  color: activeMenu === link ? 'white' : W70,
                  padding: `0 ${r(16)}`, height: r(64),
                  display: 'flex', alignItems: 'center',
                  whiteSpace: 'nowrap', textDecoration: 'none',
                  borderBottom: activeMenu === link ? '1px solid white' : '1px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}>
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
            <a href="#cta" data-contact-modal className="nav-contact-btn btn-hover" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: r(48), padding: `0 ${r(21)}`, borderRadius: r(8),
              backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
              border: '1px solid white', color: 'white', fontSize: r(14), fontWeight: 700,
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              Get in touch
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none', width: r(36), height: r(36), borderRadius: r(8),
                border: `1px solid ${W10}`, color: 'white',
                alignItems: 'center', justifyContent: 'center', fontSize: r(18),
                background: 'none', cursor: 'pointer',
              }}
              className="mobile-burger"
              aria-label="Menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: DARK2, borderBottom: `1px solid ${W10}`,
            padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {links.map(link => (
              <a key={link} href="#" onClick={() => setMobileOpen(false)} style={{
                fontSize: r(16), fontWeight: 400, color: W70,
                padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              }}>
                {link}
              </a>
            ))}
          </div>
        )}

        <style>{`
          .nav-link { transition: color .15s, border-color .15s; }
          @media (max-width: 900px) {
            .desktop-nav { display: none !important; }
            .mobile-burger { display: flex !important; }
            nav { padding: 0 20px !important; }
          }
        `}</style>
      </nav>

      {/* Mega Menu Overlay */}
      {megaData && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 99,
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(48px)',
            WebkitBackdropFilter: 'blur(48px)',
            paddingTop: r(96),
            paddingBottom: r(40),
          }}
          className="mega-overlay"
        >
          <div style={{
            maxWidth: r(1792), margin: '0 auto',
            padding: `${r(32)} ${r(64)} 0`,
            display: 'flex', gap: r(96), alignItems: 'flex-start',
          }}>
            {/* Left panel */}
            <div style={{ width: r(380), flexShrink: 0, display: 'flex', flexDirection: 'column', gap: r(24) }}>
              <h2 style={{ fontSize: r(28), fontWeight: 400, lineHeight: 1.2, color: 'white', margin: 0 }}>
                {megaData.heading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: r(16) }}>
                <div style={{ aspectRatio: '16/9', borderRadius: r(12), overflow: 'hidden', position: 'relative' }}>
                  <img src={megaData.image} alt={megaData.heading}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: r(12),
                    background: `linear-gradient(209deg, ${TEAL} 0%, rgba(148,183,255,0) 39%)`,
                  }} />
                </div>
                <p style={{ fontSize: r(15), lineHeight: 1.6, color: W70, margin: 0 }}>
                  {megaData.desc}
                </p>
              </div>
              <a href="#" data-contact-modal className="btn-hover" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: r(48), padding: `0 ${r(21)}`, borderRadius: r(8),
                backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
                border: `1px solid ${W10}`, color: 'white',
                fontSize: r(14), fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
                alignSelf: 'flex-start',
              }}>
                {megaData.cta}
              </a>
            </div>

            {/* Right panel */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: r(28), paddingTop: r(48) }}>
              {megaData.items.map((item, i) => (
                <a key={i} href="#" className="mega-item" style={{
                  display: 'flex', alignItems: 'center', gap: r(24),
                  textDecoration: 'none',
                  borderBottom: i < megaData.items.length - 1 ? `1px solid ${W10}` : 'none',
                  paddingBottom: i < megaData.items.length - 1 ? r(28) : 0,
                }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <p className="mega-item-title" style={{
                      fontSize: r(20), fontWeight: 400, lineHeight: 1.4,
                      color: 'white', margin: 0, transition: 'color 0.15s',
                    }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: r(14), lineHeight: 1.5, color: W70, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="mega-arrow" style={{
                    width: r(32), height: r(32), flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                  }}>
                    <img src="/icons/icon-arrow-right.svg" alt="" style={{ width: r(24), height: r(24), filter: 'brightness(0) invert(1)' }} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <style>{`
            .mega-item:hover .mega-item-title { color: ${TEAL} !important; }
            .mega-item:hover .mega-arrow { transform: translateX(6px); }
            @media (max-width: 900px) { .mega-overlay { display: none !important; } }
          `}</style>
        </div>
      )}
    </>
  )
}
