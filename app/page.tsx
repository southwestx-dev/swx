'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Type Scale Helper ──────────────────────────── */
// Converts px → rem so font sizes scale with html { font-size } breakpoints
const r = (px: number) => `${px / 16}rem`

/* ─── Shared Constants ───────────────────────────── */
const TEAL = '#3ccbda'
const DARK = '#0a0a0a'
const DARK2 = '#171717'
const W70 = 'rgba(255,255,255,0.7)'
const W10 = 'rgba(255,255,255,0.1)'

// Base ghost: no size — extend with height/padding/fontSize
const ghostBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
  border: '1px solid white', borderRadius: r(8),
  color: 'white', fontWeight: 700, textDecoration: 'none',
}
// Light ghost — for light backgrounds (white/ivory sections)
const lightGhostBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: r(48), padding: `0 ${r(21)}`,
  backdropFilter: 'blur(48px)', background: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: r(8),
  color: DARK2, fontWeight: 700, fontSize: r(14), textDecoration: 'none',
}
// Dark teal fill — used in the TextImage "Our Approach" section
const darkTealBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: r(48), padding: `0 ${r(21)}`, flexShrink: 0,
  background: '#114e54', border: `1px solid ${W10}`, borderRadius: r(8),
  color: 'white', fontWeight: 700, fontSize: r(14), textDecoration: 'none', whiteSpace: 'nowrap',
}
// Ghost sizes: standard (h48) and large CTA (h60)
const ghostBtnLgStyle: React.CSSProperties = { ...ghostBtnStyle, height: r(60), padding: `0 ${r(30)}`, fontSize: r(17) }

const sectionTitle = (eyebrow: string, heading: string, align: 'left' | 'center' = 'left', maxW = 1027) => (
  <div style={{ position: 'relative', textAlign: align, marginBottom: r(96), ...(align === 'left' ? { maxWidth: r(maxW) } : {}) }}>
    <p style={{ fontSize: r(23), lineHeight: 1.6, color: TEAL, marginBottom: 32 }}>{eyebrow}</p>
    <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6.6875rem)', fontWeight: 400, lineHeight: 1, color: 'white', letterSpacing: '-0.02em' }}>{heading}</h2>
  </div>
)

function GlowOrbs({ glows }: { glows: { color: string; left: string; top: number | string }[] }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {glows.map((g, i) => (
        <div key={i} style={{
          position: 'absolute', width: r(384), height: r(384), borderRadius: '50%',
          background: g.color, filter: 'blur(480px)', left: g.left, top: g.top,
        }} />
      ))}
    </div>
  )
}

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
      { title: 'SouthwestX',       desc: 'Our mission and what drives us.' },
      { title: 'Locations',        desc: 'Where we operate across Europe.' },
      { title: 'Team',             desc: 'The people behind the ecosystem.' },
      { title: 'Mentors & Experts', desc: 'Our network of advisors and specialists.' },
      { title: 'Careers',          desc: 'Join the southwestX team.' },
      { title: 'Press',            desc: 'News, press releases and media kit.' },
    ],
  },
}

/* ─── Nav ────────────────────────────────────────── */
function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null)
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

  const links = ['For Startups', 'For Companies', 'Ecosystem', 'Insights', 'Events', 'About']
  const megaData = activeMenu ? MEGA_DATA[activeMenu] : null

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${r(64)}`,
        background: (scrolled || activeMenu) ? `rgba(10,10,10,0.95)` : 'transparent',
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
            {/* ── Left panel ── */}
            <div style={{ width: r(380), flexShrink: 0, display: 'flex', flexDirection: 'column', gap: r(24) }}>
              <h2 style={{ fontSize: r(28), fontWeight: 400, lineHeight: 1.2, color: 'white', margin: 0 }}>
                {megaData.heading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: r(16) }}>
                {/* Image */}
                <div style={{
                  aspectRatio: '16/9', borderRadius: r(12), overflow: 'hidden', position: 'relative',
                }}>
                  <img src={megaData.image} alt={megaData.heading}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: r(12),
                    background: `linear-gradient(209deg, ${TEAL} 0%, rgba(148,183,255,0) 39%)`,
                  }} />
                </div>
                {/* Description */}
                <p style={{ fontSize: r(15), lineHeight: 1.6, color: W70, margin: 0 }}>
                  {megaData.desc}
                </p>
              </div>
              {/* CTA button */}
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

            {/* ── Right panel — menu items ── */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', gap: r(28),
              paddingTop: r(48),
            }}>
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

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative',
      background: 'linear-gradient(170deg, #0d1b2a 0%, #07111b 40%, #0a0a0a 100%)',
      minHeight: '100vh',
      paddingBottom: r(120),
      overflow: 'hidden',
      zIndex: 1,
    }}>

      {/* ── Radial glow — soft cyan halo centered behind content ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div className="hero-glow" style={{
          position: 'absolute',
          width: '80vw', height: '80vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(60,203,218,0.18) 0%, rgba(60,203,218,0.06) 40%, transparent 70%)',
          left: '50%', top: '45%',
          transform: 'translate(-50%, -50%)',
        }} />
      </div>

      {/* ── Volumetric cloud / smoke — screen-blended, centered ── */}
      <img
        src="/hero-cloud.png"
        alt=""
        aria-hidden="true"
        className="hero-cloud"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: '140%',
          maxWidth: 1800,
          objectFit: 'contain',
          mixBlendMode: 'screen',
          opacity: 0.75,
          pointerEvents: 'none',
          zIndex: 1,
          transformOrigin: '50% 100%',
        }}
      />

      {/* ── Headline ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        paddingTop: 'calc(var(--nav-h) + 6rem)',
        paddingLeft: r(32), paddingRight: r(32),
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7.5vw, 6.6875rem)', fontWeight: 700,
          lineHeight: 1, color: 'white', letterSpacing: '-0.02em',
          maxWidth: r(1182), margin: '0 auto',
        }}>
          Turning European DeepTech into{' '}
          <span style={{ color: TEAL }}>Scalable Impact</span>
        </h1>
      </div>

      {/* ── Subtitle + CTAs ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: r(48),
        paddingTop: r(80), paddingLeft: r(32), paddingRight: r(32),
        maxWidth: r(876), margin: '0 auto',
      }}>
        <p style={{
          fontSize: r(28), fontWeight: 400,
          lineHeight: 1.6, color: 'rgba(255,255,255,0.85)',
        }}>
          We are a European Startup Factory that connects start-ups,
          companies and research institutions to transform cutting-edge
          technology into market-ready businesses.
        </p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#cta" className="hero-btn-primary btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(21)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            For Startups
          </a>
          <a href="#companies" className="hero-btn-ghost btn-hover" style={{
            ...ghostBtnStyle, height: r(48), padding: `0 ${r(21)}`, fontSize: r(14),
          }}>
            For Companies
          </a>
        </div>
      </div>

      <style>{`
        /* ── Cloud drift & breathe ── */
        @keyframes cloudFloat {
          0%   { transform: translateX(-50%) translateY(0px)   scale(1);     opacity: 0.75; }
          30%  { transform: translateX(-50%) translateY(-18px) scale(1.03);  opacity: 0.82; }
          60%  { transform: translateX(-50%) translateY(-8px)  scale(1.015); opacity: 0.78; }
          80%  { transform: translateX(-50%) translateY(-22px) scale(1.04);  opacity: 0.84; }
          100% { transform: translateX(-50%) translateY(0px)   scale(1);     opacity: 0.75; }
        }
        .hero-cloud {
          animation: cloudFloat 12s ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* ── Glow pulse ── */
        @keyframes glowPulse {
          0%, 100% { opacity: 1;    transform: translate(-50%, -50%) scale(1);    }
          50%       { opacity: 0.7; transform: translate(-50%, -50%) scale(1.08); }
        }
        .hero-glow {
          animation: glowPulse 8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* hero-btn-primary / hero-btn-ghost hover handled by global .btn-hover */
        @media (max-width: 640px) {
          .hero-btn-primary, .hero-btn-ghost { height: 2.5rem !important; padding: 0 1rem !important; font-size: 0.8rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cloud, .hero-glow { animation: none !important; }
        }
      `}</style>
    </section>
  )
}


/* ─── Hero Stage — chevron transition with cloud imagery ── */
function HeroStage() {
  return (
    <section id="hero-stage" style={{
      position: 'relative',
      width: '100%',
      background: '#000000',
      overflow: 'hidden',
      paddingBottom: 0,
    }}>
      {/* ── Cloud background — starts at 25% from top ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '25%', left: '-5%', right: '-5%', bottom: 0,
        overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
      }}>
        <img src="/hero-stage-cloud.png" alt="" className="hero-stage-cloud" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: 'center 40%',
          mixBlendMode: 'screen', opacity: 0.45,
        }} />
      </div>

      {/* ── Headline ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        paddingTop: 'calc(var(--nav-h) + 6rem)',
        paddingLeft: r(32), paddingRight: r(32),
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7.5vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1,
          color: 'white', letterSpacing: '-0.02em',
          maxWidth: r(1182), margin: '0 auto',
        }}>
          Turning European DeepTech into{' '}
          <span style={{ color: TEAL }}>Scalable Impact</span>
        </h1>
      </div>

      {/* ── Subtitle + CTAs ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: r(48),
        paddingTop: r(48), paddingLeft: r(32), paddingRight: r(32),
        maxWidth: r(876), margin: '0 auto',
      }}>
        <p style={{
          fontSize: r(28), fontWeight: 400, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
        }}>
          We are a European start-up incubator that connects start-ups,
          companies and research institutions to transform cutting-edge
          technology into market-ready businesses.
        </p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#cta" className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(21)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            For Startups
          </a>
          <a href="#companies" className="btn-hover" style={{
            ...ghostBtnStyle, height: r(48), padding: `0 ${r(21)}`, fontSize: r(14),
          }}>
            For Companies
          </a>
        </div>
      </div>

      {/* ── Large display text ── */}
      <p className="hero-stage-text" style={{
        position: 'relative', zIndex: 1,
        fontFamily: "'Inter', sans-serif", fontWeight: 400,
        fontSize: 'clamp(6rem, 17vw, 20.4375rem)', lineHeight: 1,
        color: 'rgba(10,10,10,0.85)', textAlign: 'center',
        pointerEvents: 'none', marginTop: r(180),
      }}>
        Where Impact Happens
      </p>

      {/* ── Bottom V-cutout — "Happens" is clipped at ~50% height ── */}
      <div style={{
        position: 'relative', width: '100%', height: 'clamp(200px, 38vw, 730px)',
        marginTop: 'clamp(-250px, -32vw, -600px)', overflow: 'hidden',
      }}>
        {/* "Ecosystem Highlights" eyebrow — between clipped text and bottom */}
        <p style={{
          position: 'absolute', left: '50%', top: '65%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif", fontWeight: 400,
          fontSize: r(23), lineHeight: 1.6, color: TEAL,
          textAlign: 'center', whiteSpace: 'nowrap', zIndex: 2,
        }}>
          Ecosystem Highlights
        </p>

        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '50%', height: '100%',
            background: '#f6f3ef',
            clipPath: 'polygon(0% 100%, 100% 100%, 0% 0%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '50%', height: '100%',
            background: '#f6f3ef',
            clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)',
          }} />
        </div>
      </div>

      <style>{`
        .hero-stage-cloud {
          animation: heroStageCloudFloat 14s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes heroStageCloudFloat {
          0%   { transform: scale(1);     opacity: 1; }
          50%  { transform: scale(1.03);  opacity: 0.85; }
          100% { transform: scale(1);     opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-stage-cloud { animation: none !important; }
        }
        @media (max-width: 768px) {
          .hero-stage-text { font-size: clamp(3rem, 14vw, 6rem) !important; }
        }
        @media (max-width: 640px) {
          #hero-stage a { height: 3.25rem !important; padding: 0 1.25rem !important; font-size: 1rem !important; }
        }
      `}</style>
    </section>
  )
}


/* ─── Programs Carousel ──────────────────────────── */
const PROG_DOT_COUNT  = 3    // 5 cards, ~3 visible → 3 scroll positions
const PROG_SCROLL_STEP = 468 // 428px card + 40px gap
const PROG_IMG1 = '/img-meeting.jpg'
const PROG_IMG2 = '/img-networking.jpg'

const PROGRAMS = [
  {
    title: 'Startup Leaders program', category: 'Flagship Program',
    img: PROG_IMG1, imgH: 571, dotColor: '#4c87ff',
    tag: '18-month program', tagSub: ' | Germany & France',
    desc: 'An excellence program connecting Europe\u2019s most ambitious founders with leading entrepreneurs, investors and industry partners across Germany and France.',
  },
  {
    title: 'Green Transformation Innovation', category: 'Flagship Initiative',
    img: PROG_IMG1, imgH: 855, dotColor: TEAL,
    tag: 'Ongoing program', tagSub: ' | Europe',
    desc: 'A platform connecting corporates, startups and researchers to accelerate solutions for circular economy, renewable energy and sustainable industry.',
  },
  {
    title: 'SWX DeepTech Demo Day', category: 'Ecosystem Event',
    img: PROG_IMG2, imgH: 428, dotColor: '#4c87ff',
    tag: '6. \u2013 7. November 2026', tagSub: ' | Cologne',
    desc: 'Selected DeepTech startups from the SouthwestX ecosystem present validated solutions to investors, corporates and cross-border partners.',
  },
  {
    title: 'AI \u00d7 Industry Hackathon', category: 'Innovation Format',
    img: PROG_IMG1, imgH: 571, dotColor: '#4c87ff',
    tag: '12. \u2013 14. March 2026', tagSub: ' | Cologne',
    desc: 'A cross-border hackathon connecting real industrial challenges with entrepreneurial talent from Germany and France.',
  },
  {
    title: 'Enter the SouthwestX Ecosystem', category: 'Getting Started',
    img: PROG_IMG2, imgH: 428, dotColor: TEAL, tealBadge: true,
    tag: 'For startups, corporates & researchers', tagSub: '',
    desc: 'Discover how SouthwestX connects startups, industry and research to transform DeepTech innovation into scalable companies.',
  },
]

/* ─── Text Video Mask ────────────────────────────── */
function TextVideoMask() {
  return (
    <section style={{ background: '#000', overflow: 'hidden', lineHeight: 0, maxWidth: '100vw' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        style={{ display: 'block', height: 'clamp(220px, 36vw, 520px)' }}
      >
        <defs>
          <mask id="swx-text-mask">
            <rect width="1440" height="520" fill="black" />
            <text
              x="720" y="260"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
              fontSize="230"
              fontWeight="700"
              letterSpacing="-6"
              fill="white"
            >SOUTHWEST</text>
          </mask>
        </defs>
        <foreignObject width="1440" height="520" mask="url(#swx-text-mask)">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <video
            {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
            autoPlay loop muted playsInline
            style={{ width: 1440, height: 520, objectFit: 'cover' } as React.CSSProperties}
          >
            <source src="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4" type="video/mp4" />
          </video>
        </foreignObject>
      </svg>
    </section>
  )
}

function Programs() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollToIdx = (idx: number) => {
    const next = Math.max(0, Math.min(idx, PROG_DOT_COUNT - 1))
    setActiveIdx(next)
    scrollRef.current?.scrollTo({ left: next * PROG_SCROLL_STEP, behavior: 'smooth' })
  }

  return (
    <section style={{ background: '#f6f3ef', padding: `${r(70)} 0 ${r(120)}`, overflow: 'hidden' }}>
      <div ref={scrollRef}
        style={{
          display: 'flex', gap: r(40), padding: `0 ${r(64)}`,
          overflowX: 'auto', scrollSnapType: 'x mandatory', scrollPaddingLeft: r(64),
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          overscrollBehaviorX: 'contain', touchAction: 'pan-x',
        }} className="programs-scroll">
        {PROGRAMS.map((p, i) => (
          <div key={i} className="prog-card" style={{
            flex: '0 0 auto', width: r(428), scrollSnapAlign: 'start',
          }}>
            {/* Fixed-height header so images align; tall enough for 3-line titles */}
            <div style={{ height: r(240), display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 16, overflow: 'visible' }}>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2.53vw, 2.42rem)', fontWeight: 400,
                lineHeight: 1.1, color: DARK, marginBottom: r(8),
              }}>{p.title}</h3>
              <p style={{ fontSize: r(18), lineHeight: 1.6, color: '#404040' }}>{p.category}</p>
            </div>

            <div style={{
              position: 'relative', width: '100%', height: p.imgH > 600 ? r(525) : r(Math.round(p.imgH * 0.75)),
              borderRadius: r(16), overflow: 'hidden', marginBottom: r(24),
            }}>
              <img src={p.img} alt={p.title} className="prog-card-img" style={{
                width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16,
              }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16,
                background: `linear-gradient(225deg, ${TEAL} 0%, rgba(148,183,255,0) 39.26%)`,
              }} />
              <div style={{
                position: 'absolute', bottom: r(16), left: r(16),
                display: 'flex', alignItems: 'center', gap: r(8),
                height: r(40), padding: `0 ${r(12)}`, borderRadius: r(9999),
                background: p.tealBadge ? TEAL : DARK2,
                fontSize: r(18), lineHeight: 1.6, whiteSpace: 'nowrap',
              }}>
                {!p.tealBadge && <div style={{ width: r(16), height: r(16), borderRadius: r(9999), background: p.dotColor }} />}
                <span style={{ color: p.tealBadge ? DARK : 'white' }}>{p.tag}</span>
                {p.tagSub && <span style={{ color: p.tealBadge ? DARK : W70 }}>{p.tagSub}</span>}
              </div>
            </div>

            <p style={{ fontSize: r(18), lineHeight: 1.6, color: '#404040' }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Navigation: dots + arrows */}
      <div style={{ padding: `${r(40)} ${r(64)} 0`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {Array.from({ length: PROG_DOT_COUNT }).map((_, i) => (
            <div key={i} onClick={() => scrollToIdx(i)} style={{
              height: r(8), borderRadius: r(999),
              background: i === activeIdx ? DARK : 'rgba(0,0,0,0.3)',
              width: i === activeIdx ? 48 : 8,
              transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => scrollToIdx(activeIdx - 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <img src={ARROW_L} alt="Previous" style={{ width: r(29), height: r(29) }} />
          </button>
          <button onClick={() => scrollToIdx(activeIdx + 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <img src={ARROW_R} alt="Next" style={{ width: r(29), height: r(29) }} />
          </button>
        </div>
      </div>

      <style>{`
        .programs-scroll::-webkit-scrollbar { display: none; }

        /* ── Card hover ── */
        .prog-card {
          transition: transform 0.35s ease, filter 0.35s ease;
          cursor: pointer;
        }
        .prog-card:hover {
          transform: translateY(-10px);
          filter: drop-shadow(0 16px 32px rgba(0,0,0,0.18));
        }
        .prog-card-img {
          transition: transform 0.5s ease;
        }
        .prog-card:hover .prog-card-img {
          transform: scale(1.06);
        }

        @media (max-width: 900px) {
          .programs-scroll { padding: 0 32px !important; scroll-padding-left: 32px !important; gap: 24px !important; }
          .programs-scroll > div { width: 85vw !important; }
        }
        @media (max-width: 640px) {
          .programs-scroll { padding: 0 20px !important; scroll-padding-left: 20px !important; gap: 20px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .prog-card, .prog-card-img { transition: none !important; }
          .prog-card:hover { transform: none; filter: none; }
        }
      `}</style>
    </section>
  )
}

/* ─── Research Institutions ──────────────────────── */
const RI_LOGOS = [
  { src: '/logo-max-planck.png', w: 265, h: 48, alt: 'Max-Planck-Innovation' },
  { src: '/logo-rptu.png',       w: 129, h: 42, alt: 'RPTU' },
  { src: '/logo-trier.png',      w: 254, h: 48, alt: 'Trier University of Applied Sciences' },
]
const RI_LOGOS_DOUBLED = [...RI_LOGOS, ...RI_LOGOS]

function ResearchInstitutions() {
  return (
    <section id="research" style={{ background: '#f6f3ef', padding: `${r(192)} 0` }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          #research { padding: 100px 0 !important; }
          .ri-track { gap: 80px !important; }
          .ri-fade { width: 150px !important; }
        }
        @media (max-width: 640px) {
          #research { padding: 64px 0 !important; }
          #research h2 { padding: 0 20px !important; font-size: 1.625rem !important; }
          .ri-track { gap: 48px !important; }
          .ri-fade { width: 60px !important; }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
        <h2 style={{ fontSize: r(35), fontWeight: 400, lineHeight: 1.2, color: DARK2, textAlign: 'center', padding: `0 ${r(64)}` }}>
          Rooted in world-class research
        </h2>
        <div style={{ position: 'relative', width: '100%', height: r(80), overflow: 'hidden' }}>
          <div className="ri-track" style={{
            display: 'flex', alignItems: 'center', gap: r(144),
            width: 'max-content', animation: 'marquee 40s linear infinite',
          }}>
            {RI_LOGOS_DOUBLED.map((logo, i) => (
              <img key={i} src={logo.src} alt={logo.alt}
                style={{ height: r(60), width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
            ))}
          </div>
          <div className="ri-fade" style={{
            position: 'absolute', top: 0, left: 0, width: r(329), height: '100%', pointerEvents: 'none',
            background: 'linear-gradient(to right, #f6f3ef, rgba(246,243,239,0))',
          }} />
          <div className="ri-fade" style={{
            position: 'absolute', top: 0, right: 0, width: r(329), height: '100%', pointerEvents: 'none',
            background: 'linear-gradient(to left, #f6f3ef, rgba(246,243,239,0))',
          }} />
        </div>
      </div>
    </section>
  )
}

/* ─── Two Journeys ───────────────────────────────── */
const IJ_IMG1 = '/img-meeting.jpg'
const IJ_IMG2 = '/img-networking.jpg'
const IJ_GLOWS = [
  { color: '#847292', left: r(512), top: r(384) },
  { color: TEAL,     left: r(896), top: r(384) },
  { color: 'white',  left: r(896), top: '0'    },
  { color: '#4c87ff', left: r(512), top: '0'   },
]
const IJ_OVERLAY: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: r(16),
  background: `linear-gradient(209deg, ${TEAL} 0%, rgba(148,183,255,0) 39.26%)`,
}
const IJ_CARD: React.CSSProperties = {
  flex: '1 0 0', alignSelf: 'stretch',
  background: DARK2, borderRadius: r(16), padding: r(48),
  display: 'flex', flexDirection: 'column', gap: r(24),
}
const IJ_IMG_COL: React.CSSProperties = {
  flex: '0 0 65%', position: 'relative', minHeight: r(480), borderRadius: r(16), overflow: 'hidden',
}
const IJ_BTN_TEAL: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: r(64), padding: `0 ${r(28)}`, borderRadius: r(8),
  background: TEAL, border: `1px solid ${W10}`,
  color: DARK, fontSize: r(18), fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
}
const IJ_BTN_GHOST: React.CSSProperties = {
  ...IJ_BTN_TEAL, backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)', color: 'white',
}

function TwoJourneys() {
  return (
    <section id="impact" style={{ background: DARK, overflow: 'hidden' }}>
      {/* Header */}
      <div className="ij-header" style={{ position: 'relative', padding: `${r(192)} ${r(64)} ${r(48)}` }}>
        <GlowOrbs glows={IJ_GLOWS} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: r(23), lineHeight: 1.6, color: TEAL, marginBottom: 32 }}>Two journeys. One ecosystem.</p>
          <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6.6875rem)', fontWeight: 400, lineHeight: 1, color: 'white' }}>
            We connect startups, industry <br />
            and research through structured innovation journeys
          </h2>
        </div>
      </div>

      {/* Row 1: Card left, Image right */}
      <div className="ij-row" style={{ padding: `${r(48)} ${r(64)} ${r(8)}`, display: 'flex', gap: r(16), alignItems: 'stretch' }}>
        <div className="ij-card" style={IJ_CARD}>
          <h3 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.3125rem)', fontWeight: 400, lineHeight: 1.1, color: 'white' }}>Startup Journey</h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <p style={{ fontSize: r(18), lineHeight: 1.6, color: W70 }}>From idea to market-ready DeepTech company. The Startup Journey supports founders from early validation to international scaling.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="#" className="btn-hover" style={IJ_BTN_TEAL}>Explore the Startup Journey</a>
              <a href="#" className="btn-hover" style={IJ_BTN_GHOST}>View programs</a>
            </div>
          </div>
        </div>
        <div className="ij-img-col" style={IJ_IMG_COL}>
          <img src={IJ_IMG1} alt="Startup Journey" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={IJ_OVERLAY} />
        </div>
      </div>

      {/* Row 2: Image left, Card right */}
      <div className="ij-row ij-row-last" style={{ padding: `${r(8)} ${r(64)} ${r(192)}`, display: 'flex', gap: r(16), alignItems: 'stretch' }}>
        <div className="ij-img-col" style={IJ_IMG_COL}>
          <img src={IJ_IMG2} alt="Innovation Journey" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={IJ_OVERLAY} />
        </div>
        <div className="ij-card" style={IJ_CARD}>
          <h3 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.3125rem)', fontWeight: 400, lineHeight: 1.1, color: 'white' }}>Innovation Journey</h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <p style={{ fontSize: r(18), lineHeight: 1.6, color: W70 }}>For companies that want to turn technological potential into real business innovation.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="#" className="btn-hover" style={IJ_BTN_TEAL}>Explore the Innovation Journey</a>
              <a href="#" className="btn-hover" style={IJ_BTN_GHOST}>View programs</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ij-header { padding: 80px 32px 40px !important; }
          .ij-row { flex-direction: column-reverse !important; padding: 0 32px 16px !important; gap: 16px; }
          .ij-row-last { flex-direction: column !important; padding-bottom: 80px !important; }
          .ij-img-col { flex: none !important; width: 100% !important; }
          .ij-card { padding: 32px !important; }
        }
        @media (max-width: 640px) {
          .ij-header { padding: 60px 20px 32px !important; }
          .ij-row { padding: 0 20px 12px !important; }
          .ij-row-last { padding-bottom: 60px !important; }
          .ij-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Who Should Attend ──────────────────────────── */
const WSA_CARDS = [
  { pre: 'You are a ',    accent: 'DeepTech startup',           desc: 'Pre-Seed to Series A with validated traction and scaling ambition.' },
  { pre: 'You are an ',   accent: 'investor',                   desc: 'Looking for curated, high-quality European AI and GreenTech dealflow.' },
  { pre: 'You are a ',    accent: 'corporate innovation lead',  desc: 'Seeking pilot-ready startups and Venture Clienting opportunities.' },
  { pre: 'You operate ',  accent: 'cross-border',               desc: 'With a strategic interest in the Franco-German innovation axis.' },
]
const WSA_GLOWS = [
  { color: '#847292', left: `calc(25% + ${r(96)})`, top: r(576) },
  { color: TEAL,      left: '50%',                  top: r(576) },
  { color: 'white',   left: '50%',                  top: r(192) },
  { color: '#4c87ff', left: `calc(25% + ${r(96)})`, top: r(192) },
]
const WSA_CARD_BASE: React.CSSProperties = {
  flex: '1 0 0', minWidth: r(280), height: 'clamp(17.5rem, 40vw, 36.6875rem)',
  borderRadius: r(16), padding: r(48),
  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
}
const WSA_H3_BASE: React.CSSProperties = {
  fontSize: 'clamp(2rem, 4.5vw, 4.3125rem)', fontWeight: 400, lineHeight: 1.1, color: 'white',
}

function WhoShouldAttend() {

  return (
    <section id="who-should-attend" style={{
      position: 'relative', background: DARK,
      padding: `${r(192)} ${r(64)}`, overflow: 'hidden',
    }}>
      <GlowOrbs glows={WSA_GLOWS} />
      {sectionTitle("What\u2019s on?", 'Who should attend?', 'center')}

      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {WSA_CARDS.map((c, i) => (
          <div key={i} className="wsa-card" style={{ ...WSA_CARD_BASE, background: DARK2 }}>
            <h3 style={WSA_H3_BASE}>{c.pre}<span style={{ color: TEAL }}>{c.accent}</span></h3>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.4375rem)', lineHeight: 1.6, color: W70 }}>
              {c.desc}
            </p>
          </div>
        ))}

        <div className="wsa-card" style={{ ...WSA_CARD_BASE, padding: 0, position: 'relative', overflow: 'hidden' }}>
          <img src="/img-networking.jpg"
            alt="Networking at southwestX event"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
          />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 16,
            background: `linear-gradient(225deg, ${TEAL} 0%, rgba(148,183,255,0) 39.26%)` }} />
        </div>

        <div className="wsa-card" style={{ ...WSA_CARD_BASE, background: '#062a2e' }}>
          <h3 style={{ ...WSA_H3_BASE, color: TEAL }}>Secure your participation</h3>
          <div>
            <a href="#cta" className="attend-cta-btn btn-hover" style={ghostBtnLgStyle}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .attend-cta-btn { transition: background .2s, border-color .2s; }
        .attend-cta-btn:hover { background: rgba(255,255,255,.1) !important; border-color: ${TEAL} !important; }
        @media (max-width: 1200px) { #who-should-attend { padding: 120px 32px !important; } }
        @media (max-width: 900px)  {
          #who-should-attend { padding: 80px 32px !important; }
          .wsa-card { padding: 32px !important; }
        }
        @media (max-width: 640px)  {
          #who-should-attend { padding: 64px 20px !important; }
          .wsa-card { min-width: 100% !important; padding: 24px !important; height: auto !important; min-height: 240px !important; }
          .attend-cta-btn { height: 45px !important; padding: 0 18px !important; font-size: 0.875rem !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Core Strengths ─────────────────────────────── */
const STRENGTHS_BG = '/img-core-strengths-bg.png'

// Icons saved locally in /public/icons/ — never expire
const STRENGTHS_DATA = [
  { icon: '/icons/icon-ai.svg',     title: 'Artificial\nIntelligence',   desc: 'Europe\u2019s leading AI research meets entrepreneurship and industrial application to build scalable DeepTech companies.' },
  { icon: '/icons/icon-green.svg',  title: 'Green Transformation',       desc: 'Technologies accelerating sustainable industry, energy transition and circular economy across Europe.' },
  { icon: '/icons/icon-franco.svg', title: 'Franco-German Innovation',   desc: 'Cross-border collaboration between Germany and France connecting research, talent and markets.' },
  { icon: '/icons/icon-talent.svg', title: 'Entrepreneurial Talent',     desc: 'A strong community of founders, researchers and innovators building the next generation of DeepTech companies.' },
]
const STRENGTHS_CARD: React.CSSProperties = {
  flex: '1 0 0', minWidth: r(220),
  background: DARK2, borderRadius: r(16), padding: r(48),
  display: 'flex', flexDirection: 'column', gap: r(24),
}

function CoreStrengths() {

  return (
    <section id="core-strengths" style={{
      position: 'relative', padding: `${r(192)} ${r(64)}`, overflow: 'hidden',
    }}>
      <img src={STRENGTHS_BG} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(212deg, ${TEAL} 0%, rgba(148,183,255,0) 39.26%), linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%)`,
      }} />

      {sectionTitle('Our Core Strengths', 'Where southwestX creates impact')}

      <div style={{ position: 'relative', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {STRENGTHS_DATA.map((s, i) => (
          <div key={i} className="strengths-card-item" style={STRENGTHS_CARD}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>
              <img src={s.icon} alt="" style={{ width: r(64), height: r(64), objectFit: 'contain' }} />
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2.3vw, 2.1875rem)', fontWeight: 400,
                lineHeight: 1.2, color: 'white', width: '100%', whiteSpace: 'pre-line',
              }}>
                {s.title}
              </h3>
            </div>
            <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)', lineHeight: 1.6, color: W70 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1200px) { #core-strengths { padding: 120px 32px !important; } }
        @media (max-width: 900px)  {
          #core-strengths { padding: 80px 32px !important; }
          .strengths-card-item { padding: 32px !important; }
        }
        @media (max-width: 640px)  {
          #core-strengths { padding: 64px 20px !important; }
          .strengths-card-item { min-width: 100% !important; padding: 24px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Text + Image ───────────────────────────────── */
const TI_IMG = '/img-networking.jpg'

function TextImage() {
  return (
    <section id="about" style={{ background: '#f6f3ef', display: 'flex' }}>
      {/* Left: text */}
      <div style={{ flex: '1 0 0', padding: `${r(192)} ${r(64)}`, display: 'flex', flexDirection: 'column', gap: r(96) }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <p style={{ fontSize: r(23), lineHeight: 1.6, color: TEAL }}>Our Approach</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.3125rem)', fontWeight: 400, lineHeight: 1.1, color: DARK2 }}>
            Where science meets entrepreneurship
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ fontSize: r(18), lineHeight: 1.6, color: '#404040' }}>
            <p style={{ marginBottom: 8 }}>southwestX is built on the conviction that Europe's strongest competitive advantage lies in its scientific depth. We work at the intersection of world-class research institutions, ambitious founders, and forward-thinking industry partners — structuring the conditions for breakthrough innovation to become market-ready companies.</p>
            <p>Our programs span the full journey: from validating a technology's commercial potential to navigating the complexities of cross-border scaling. Operating across the Franco-German innovation corridor, we connect the right people at the right moment — turning proximity to research excellence into a strategic advantage for startups and corporates alike.</p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#programs" className="btn-hover-light" style={lightGhostBtnStyle}>Explore our programs</a>
            <a href="#cta" data-contact-modal className="btn-hover-light" style={lightGhostBtnStyle}>Get in touch</a>
          </div>
        </div>
      </div>

      {/* Right: image */}
      <div style={{ flex: '1 0 0', position: 'relative', overflow: 'hidden', minHeight: 600 }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img src={TI_IMG} alt="southwestX workspace" style={{
            position: 'absolute', height: '100%', left: '-64.25%', width: '172.81%',
            objectFit: 'cover', maxWidth: 'none',
          }} />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(232deg, ${TEAL} 0%, rgba(148,183,255,0) 39.26%)`,
        }} />
      </div>

      <style>{`
        @media (max-width: 1200px) {
          #about { flex-direction: column; }
          #about > div:first-child { padding: 80px 64px !important; gap: 64px !important; }
          #about > div:last-child { min-height: 400px !important; }
        }
        @media (max-width: 900px) {
          #about > div:first-child { padding: 80px 40px !important; gap: 48px !important; }
          #about > div:last-child { min-height: 360px !important; }
        }
        @media (max-width: 640px) {
          #about > div:first-child { padding: 60px 20px !important; gap: 40px !important; }
          #about > div:last-child { min-height: 260px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Events & Insights ──────────────────────────── */
const EI_IMG1 = '/img-networking.jpg'
const EI_IMG2 = '/img-meeting.jpg'
const EI_IMG3 = '/img-teal-explosion.png'
// Arrow icons saved locally — never expire
const ARROW_L = '/icons/icon-arrow-left.svg'
const ARROW_R = '/icons/icon-arrow-right.svg'

const EI_CARDS = [
  {
    type: 'Report',
    title: 'The European DeepTech Opportunity',
    img: EI_IMG1,
    desc: 'Why Europe has the scientific strength to lead in DeepTech — and what it takes to transform research into globally competitive companies.',
    badge: null as null | { date: string; loc: string },
  },
  {
    type: 'Article',
    title: 'From Research to Startup',
    img: EI_IMG2,
    desc: 'How universities and research institutes can accelerate the path from scientific discovery to scalable venture creation.',
    badge: null as null | { date: string; loc: string },
  },
  {
    type: 'Event',
    title: 'Green Transformation Summit',
    img: EI_IMG3,
    desc: 'A conference bringing together industry leaders, researchers and founders to discuss the future of sustainable technologies.',
    badge: { date: '6. – 7. November 2026', loc: ' | Cologne' },
  },
  {
    type: 'Article',
    title: 'Building Cross-Border Innovation',
    img: EI_IMG1,
    desc: 'Why collaboration between Germany and France is becoming a strategic advantage for DeepTech founders.',
    badge: null as null | { date: string; loc: string },
  },
  {
    type: 'Report',
    title: 'Green Transformation through Technology',
    img: EI_IMG1,
    desc: 'How DeepTech startups contribute to climate transition across energy, materials and industrial production.',
    badge: null as null | { date: string; loc: string },
  },
]

const EI_DOT_COUNT = 3
const EI_SCROLL_STEP = 468 // 428px card + 40px gap

function EventsInsights() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollToIdx = (idx: number) => {
    const next = Math.max(0, Math.min(idx, EI_DOT_COUNT - 1))
    setActiveIdx(next)
    scrollRef.current?.scrollTo({ left: next * EI_SCROLL_STEP, behavior: 'smooth' })
  }

  return (
    <section id="events" style={{ background: '#ffffff', padding: `${r(192)} 0 ${r(96)}` }}>
      {/* Two-column header */}
      <div style={{ padding: `0 ${r(64)}`, display: 'flex', gap: r(40), alignItems: 'flex-start', marginBottom: r(96) }}>
        <h2 style={{ flex: '1 0 0', fontSize: r(35), fontWeight: 400, lineHeight: 1.2, color: DARK2 }}>
          Events and Insights
        </h2>
        <div className="ei-info-col" style={{ width: r(876), flexShrink: 0, display: 'flex', flexDirection: 'column', gap: r(48) }}>
          <p style={{ fontSize: r(18), lineHeight: 1.6, color: DARK2 }}>
            Discover upcoming events, key discussions and insights from the southwestX ecosystem. From conferences and demo days to research perspectives and innovation trends shaping Europe&apos;s DeepTech future.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#" className="btn-hover-light" style={lightGhostBtnStyle}>View all Events</a>
            <a href="#" className="btn-hover-light" style={lightGhostBtnStyle}>View all Insights</a>
          </div>
        </div>
      </div>

      {/* Scrollable cards */}
      <div ref={scrollRef}
        style={{
          display: 'flex', gap: r(40), padding: `0 ${r(64)}`,
          overflowX: 'auto', scrollSnapType: 'x mandatory', scrollPaddingLeft: r(64),
          scrollbarWidth: 'none',
          overscrollBehaviorX: 'contain', touchAction: 'pan-x',
        }} className="events-scroll">
        {EI_CARDS.map((card, i) => (
          <div key={i} className="prog-card" style={{ flex: '0 0 auto', width: r(428), scrollSnapAlign: 'start' }}>
            {/* Fixed-height header — images align at same Y across all cards */}
            <div style={{ height: r(240), display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 16, overflow: 'visible' }}>
              <p style={{ fontSize: r(18), lineHeight: 1.6, color: '#404040', marginBottom: r(8) }}>{card.type}</p>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2.53vw, 2.42rem)', fontWeight: 400,
                lineHeight: 1.1, color: DARK,
              }}>{card.title}</h3>
            </div>
            <div style={{ position: 'relative', height: r(321), borderRadius: r(16), overflow: 'hidden', marginBottom: r(24) }}>
              <img src={card.img} alt={card.title} className="prog-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16,
                background: `linear-gradient(225deg, ${TEAL} 0%, rgba(148,183,255,0) 39.26%)`,
              }} />
              {card.badge && (
                <div style={{
                  position: 'absolute', bottom: r(16), left: r(16),
                  display: 'flex', alignItems: 'center', gap: r(8),
                  height: r(40), padding: `0 ${r(12)}`, borderRadius: r(9999),
                  background: DARK2, fontSize: r(18), lineHeight: 1.6, whiteSpace: 'nowrap',
                }}>
                  <div style={{ width: r(16), height: r(16), borderRadius: r(9999), background: TEAL, flexShrink: 0 }} />
                  <span style={{ color: 'white' }}>{card.badge.date}</span>
                  <span style={{ color: W70 }}>{card.badge.loc}</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: r(18), lineHeight: 1.6, color: '#404040' }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Navigation row */}
      <div style={{ padding: `${r(40)} ${r(64)} 0`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {Array.from({ length: EI_DOT_COUNT }).map((_, i) => (
            <div key={i} onClick={() => scrollToIdx(i)} style={{
              height: r(8), borderRadius: r(999),
              background: i === activeIdx ? DARK : 'rgba(0,0,0,0.3)',
              width: i === activeIdx ? 48 : 8,
              transition: 'all 0.3s', cursor: 'pointer',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => scrollToIdx(activeIdx - 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <img src={ARROW_L} alt="Previous" style={{ width: r(29), height: r(29) }} />
          </button>
          <button onClick={() => scrollToIdx(activeIdx + 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <img src={ARROW_R} alt="Next" style={{ width: r(29), height: r(29) }} />
          </button>
        </div>
      </div>

      <style>{`
        .events-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 1100px) {
          #events > div:first-child { flex-direction: column !important; }
          .ei-info-col { width: 100% !important; }
        }
        @media (max-width: 900px) {
          #events { padding: 100px 0 64px !important; }
          #events > div:first-child { padding: 0 32px !important; margin-bottom: 64px !important; }
          .events-scroll { padding: 0 32px !important; scroll-padding-left: 32px !important; }
          .events-scroll > div { width: 85vw !important; }
        }
        @media (max-width: 640px) {
          #events { padding: 64px 0 48px !important; }
          #events > div:first-child { padding: 0 20px !important; margin-bottom: 48px !important; }
          .events-scroll { padding: 0 20px !important; scroll-padding-left: 20px !important; gap: 20px !important; }
          .events-scroll > div { width: 85vw !important; }
          #events > div:last-child { padding: 24px 20px 0 !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Partners ───────────────────────────────────── */
const PARTNER_LOGOS = [
  { src: '/logo-max-planck.png', w: 265, h: 48, alt: 'Max-Planck-Innovation' },
  { src: '/logo-rptu.png',       w: 129, h: 42, alt: 'RPTU' },
  { src: '/logo-trier.png',      w: 254, h: 48, alt: 'Trier University of Applied Sciences' },
]
const PARTNER_LOGOS_DOUBLED = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

function LogoRow({ reverse }: { reverse?: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: r(80), overflow: 'hidden' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: r(144),
        animation: reverse ? 'marquee-reverse 40s linear infinite' : 'marquee 40s linear infinite',
        width: 'max-content',
      }}>
        {PARTNER_LOGOS_DOUBLED.map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.alt}
            style={{ height: r(logo.h), width: r(logo.w), objectFit: 'contain', flexShrink: 0 }} />
        ))}
      </div>
      <div className="partner-fade" style={{
        position: 'absolute', top: 0, left: 0, width: r(329), height: '100%',
        background: 'linear-gradient(to right, #ffffff, rgba(255,255,255,0))',
        pointerEvents: 'none',
      }} />
      <div className="partner-fade" style={{
        position: 'absolute', top: 0, right: 0, width: r(329), height: '100%',
        background: 'linear-gradient(to left, #ffffff, rgba(255,255,255,0))',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

function Partners() {
  return (
    <section id="partners" style={{ background: '#ffffff', padding: `${r(96)} 0 ${r(192)}` }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 900px) {
          #partners { padding: 64px 0 100px !important; }
          .partner-fade { width: 120px !important; }
        }
        @media (max-width: 640px) {
          #partners { padding: 48px 0 64px !important; }
          .partner-fade { width: 60px !important; }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
        <h2 style={{
          fontSize: r(35), fontWeight: 400, lineHeight: 1.2,
          color: DARK2, textAlign: 'center',
        }}>
          Backed by strong corporate partners
        </h2>
        <LogoRow />
        <LogoRow reverse />
        <a href="#" className="btn-hover-light" style={lightGhostBtnStyle}>Become a Partner</a>
      </div>
    </section>
  )
}

/* ─── Get in Touch / CTA ─────────────────────────── */
function ApplyCTA() {
  return (
    <section id="cta" style={{
      background: DARK,
      padding: `${r(192)} ${r(64)}`,
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: r(48),
        maxWidth: 1486, margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontSize: r(23), lineHeight: 1.6, color: TEAL }}>Get in Touch</p>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.3125rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'white',
            }}>
              Ready to Take Part?
            </h2>
          </div>
          <p style={{ fontSize: r(23), lineHeight: 1.6, color: W70 }}>
            If you see yourself in this system, we invite you to take the next step in a way that fits your role and stage.
          </p>
        </div>
        <a href="#" data-contact-modal className="cta-main-btn btn-hover" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          height: r(60), padding: `0 ${r(30)}`,
          background: TEAL, border: `1px solid ${W10}`, borderRadius: r(8),
          color: DARK, fontWeight: 700, fontSize: r(17),
          textDecoration: 'none',
        }}>
          Get in touch
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) { #cta { padding: 100px 32px !important; } }
        @media (max-width: 640px) {
          #cta { padding: 64px 20px !important; }
          #cta p:first-child { font-size: 1.125rem !important; }
          .cta-main-btn { height: 45px !important; padding: 0 21px !important; font-size: 0.875rem !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────── */
const FOOTER_NAV = {
  'For Startups': ['Startup Journey', 'Programs & Batches', 'Active Calls', 'Resources & Tools'],
  'For Companies': ['Innovation Journey', 'Collaboration Formats', 'Strategic Partnerships', 'Corporate Membership'],
  'Ecosystem': ['Industry Partners', 'Research Institutes', 'de:hub Network', 'International'],
  'Company': ['About Us', 'Team', 'Careers', 'Contact', 'Press'],
}

function Footer() {

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
                  <a key={link} href="#" style={{
                    fontSize: '0.875rem', color: 'var(--text-3)', transition: 'color var(--ease)',
                  }}
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
              <a key={link} href="#" style={{
                fontSize: '0.8125rem', color: 'var(--text-4)', transition: 'color var(--ease)',
              }}
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
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  )
}

/* ─── Page ───────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroStage />
        {/* <TextVideoMask /> */}
        <Programs />
        <TwoJourneys />
        <CoreStrengths />
        <TextImage />
        <ResearchInstitutions />
        <EventsInsights />
        <Partners />
        <ApplyCTA />
      </main>
      <Footer />
    </>
  )
}
