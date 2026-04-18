'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'
import { r, TEAL, DARK, W10 } from '../lib/tokens'

/* ─── All Cases (grid) ───────────────────────────── */
const CASES = [
  {
    sector: 'Automotive',
    company: 'AutoTech GmbH',
    headline: 'From lab to Tier-1 supplier in 14 months',
    body: 'SouthwestX connected this Stuttgart-based robotics startup with a leading German automotive group, accelerating the path from prototype to a first production contract.',
    tags: ['Deep Tech', 'Germany', 'Series A'],
    img: '/img-meeting.jpg',
  },
  {
    sector: 'MedTech',
    company: 'MedDevice AG',
    headline: 'Clinical validation through research network access',
    body: 'Through our university partnerships, this Munich MedTech was matched with clinical trial expertise and regulatory guidance that cut time-to-market by six months.',
    tags: ['Life Sciences', 'Germany–France', 'Seed'],
    img: '/img-networking.jpg',
  },
  {
    sector: 'CleanTech',
    company: 'EnergyScale SAS',
    headline: 'Cross-border partnership with French energy group',
    body: 'A Franco-German clean energy initiative brokered by SouthwestX resulted in a joint R&D agreement and co-investment from both sides of the border.',
    tags: ['CleanTech', 'France–Germany', 'Series B'],
    img: '/img-meeting.jpg',
  },
  {
    sector: 'Quantum Computing',
    company: 'QuantumSec',
    headline: "Europe's first joint quantum security venture",
    body: "SouthwestX facilitated the founding partnership between a Saarland research spin-off and a Paris-based deep tech investor, creating Europe's first quantum-native security company.",
    tags: ['Deep Tech', 'Quantum', 'Pre-Seed'],
    img: '/img-networking.jpg',
  },
  {
    sector: 'AgriTech',
    company: 'AgroTech FR',
    headline: 'Agricultural innovation scaled cross-border',
    body: 'A precision agriculture startup from Alsace entered the German market via our innovation corridor, signing its first enterprise contract within the programme year.',
    tags: ['AgriTech', 'France', 'Seed'],
    img: '/img-meeting.jpg',
  },
  {
    sector: 'Defense Tech',
    company: 'DefenceSys GmbH',
    headline: 'Research-to-product in 18 months',
    body: 'Working alongside our Bundeswehr and industry partners, this Baden-Württemberg startup moved from early TRL to a first government contract faster than any comparable programme.',
    tags: ['Defense', 'Germany', 'Series A'],
    img: '/img-networking.jpg',
  },
]

/* ─── Featured Cases ─────────────────────────────── */
const FEATURED = [
  {
    title: 'AI Ideation Challenge in Banking',
    body: 'A financial services organisation explored how AI could reshape key business areas — from customer interaction to back-office automation.',
    img: '/img-networking.jpg',
    reverse: false,
  },
  {
    title: 'Startup Collaboration through Venture Clienting',
    body: 'A corporate sought to systematically collaborate with startups beyond ad-hoc pilots — building a repeatable model for open innovation.',
    img: '/img-meeting.jpg',
    reverse: true,
  },
  {
    title: 'Deep-Tech Venture Building with Academic IP',
    body: 'A company aimed to unlock innovation potential from research and intellectual property, transforming lab-stage findings into market-ready ventures.',
    img: '/img-networking.jpg',
    reverse: false,
  },
]

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <img src="/img-networking.jpg" alt="" aria-hidden="true" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.80) 100%)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(225deg, ${TEAL}55 0%, transparent 45%)`,
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: r(40),
        padding: `calc(var(--nav-h, 96px) + 4rem) ${r(32)} ${r(80)}`,
        maxWidth: r(1024), margin: '0 auto',
      }}>
        <p style={{ fontSize: r(18), fontWeight: 400, lineHeight: 1.6, color: TEAL, margin: 0 }}>
          For Companies
        </p>
        <h1 style={{
          fontSize: 'clamp(2.75rem, 7vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'white', margin: 0,
        }}>
          Case <span style={{ color: TEAL }}>Studies</span>
        </h1>
        <p style={{ fontSize: r(18), fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: r(720), margin: 0 }}>
          Real results from our ecosystem partnerships — how SouthwestX connects companies with the right startups, research institutions and cross-border opportunities.
        </p>
        <div style={{ display: 'flex', gap: r(16), flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#cases" className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>Explore Cases</a>
          <a href="#contact" data-contact-modal className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white', fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>Get in touch</a>
        </div>
      </div>
    </section>
  )
}

/* ─── Case Showcase ──────────────────────────────── */
function CaseShowcase() {
  return (
    <section id="cases" style={{ background: '#0a0a0a' }}>

      {/* ── Header ── */}
      <div style={{ padding: '192px 64px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Gradient orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '29%', top: '55%', width: '384px', height: '384px', borderRadius: '9999px', background: '#847292', filter: 'blur(240px)', opacity: 0.55, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '55%', width: '384px', height: '384px', borderRadius: '9999px', background: '#3ccbda', filter: 'blur(240px)', opacity: 0.45, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '0%', width: '384px', height: '384px', borderRadius: '9999px', background: 'white', filter: 'blur(240px)', opacity: 0.08, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: '29%', top: '0%', width: '384px', height: '384px', borderRadius: '9999px', background: '#4c87ff', filter: 'blur(240px)', opacity: 0.35, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 'var(--content-max-w, 1792px)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: r(18), color: TEAL, margin: '0 0 32px', lineHeight: 1.6, fontWeight: 400 }}>
            Case Studies
          </p>
          <h2 style={{
            fontSize: 'clamp(3rem, 7.5vw, 107px)',
            fontWeight: 400, lineHeight: 1, color: 'white', margin: '0 0 32px',
          }}>
            From concept to outcome
          </h2>
          <div style={{ maxWidth: '876px' }}>
            <p style={{ fontSize: r(18), lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: '0 0 16px', fontWeight: 400 }}>
              Our case studies show how organisations work with SouthwestX to move from initial challenge to measurable results.
            </p>
            <p style={{ fontSize: r(18), lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 400 }}>
              They illustrate different formats — from innovation challenges to venture building and co-creation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Rows ── */}
      {FEATURED.map((c, i) => (
        <div key={i} style={{
          padding: `8px 64px`,
          paddingBottom: i === FEATURED.length - 1 ? '120px' : '8px',
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'stretch',
            flexDirection: c.reverse ? 'row-reverse' : 'row',
          }}>

            {/* Text card */}
            <div style={{ flex: '0 0 30%', display: 'flex' }}>
              <div style={{
                background: '#171717',
                borderRadius: '16px',
                padding: '48px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%',
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 69px)',
                  fontWeight: 400, lineHeight: 1.1, color: 'white', margin: 0,
                }}>
                  {c.title}
                </h3>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '48px' }}>
                  <p style={{ fontSize: r(18), lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 400 }}>
                    {c.body}
                  </p>
                  <a
                    href="#contact"
                    data-contact-modal
                    className="btn-hover"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      height: '64px', padding: '0 28px', borderRadius: '8px',
                      backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '18px', fontWeight: 700,
                      textDecoration: 'none', whiteSpace: 'nowrap', alignSelf: 'flex-start',
                    }}
                  >
                    View case
                  </a>
                </div>
              </div>
            </div>

            {/* Image */}
            <div style={{ flex: 1, position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                <img
                  src={c.img}
                  alt=""
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(209deg, #3ccbda 0%, rgba(148,183,255,0) 39%)',
                }} />
              </div>
            </div>

          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 900px) {
          #cases .case-row { flex-direction: column !important; }
          #cases .case-row > * { flex: none !important; width: 100% !important; }
        }
        @media (max-width: 640px) {
          #cases { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Case Study Card ────────────────────────────── */
function CaseCard({ c }: { c: typeof CASES[0] }) {
  return (
    <article style={{
      background: '#efe9e0',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.22s ease, box-shadow 0.22s ease',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.10)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = ''
        ;(e.currentTarget as HTMLElement).style.boxShadow = ''
      }}
    >
      <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
        <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />
        <span style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          borderRadius: '9999px', padding: '4px 12px',
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: TEAL,
        }}>{c.sector}</span>
      </div>
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', margin: 0 }}>
          {c.company}
        </p>
        <h3 style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 400, lineHeight: 1.25, color: '#0a0a0a', margin: 0 }}>
          {c.headline}
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#404040', margin: 0, flex: 1 }}>
          {c.body}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '8px' }}>
          {c.tags.map(t => (
            <span key={t} style={{
              fontSize: '12px', fontWeight: 400, color: '#0a0a0a',
              border: '1px solid rgba(0,0,0,0.15)', borderRadius: '9999px', padding: '3px 10px',
            }}>{t}</span>
          ))}
        </div>
        <a href="#contact" data-contact-modal style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginTop: '8px', fontSize: '14px', fontWeight: 700, color: '#0a0a0a',
          textDecoration: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px',
          transition: 'color 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = TEAL)}
          onMouseLeave={e => (e.currentTarget.style.color = '#0a0a0a')}
        >
          Read case study
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  )
}

/* ─── Case Grid ──────────────────────────────────── */
function CaseGrid() {
  return (
    <section style={{ background: '#f6f3ef', padding: '120px 64px' }}>
      <div style={{ maxWidth: 'var(--content-max-w)', margin: '0 auto' }}>
        <div className="case-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {CASES.map((c, i) => <CaseCard key={i} c={c} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .case-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .case-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────── */
export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseShowcase />
        <CaseGrid />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
