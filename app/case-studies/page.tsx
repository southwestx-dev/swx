'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'
import { r, TEAL, DARK, W10 } from '../lib/tokens'

/* ─── Data ───────────────────────────────────────── */
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

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      background: '#0a0a0a',
      padding: `calc(var(--nav-h, 96px) + 80px) 64px 120px`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* teal gradient accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%',
        background: `linear-gradient(239deg, #0a0a0a 0%, ${TEAL} 61%, rgba(255,255,255,0.85) 100%)`,
        opacity: 0.08, pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: r(32),
      }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEAL, margin: 0 }}>
          For Companies
        </p>
        <h1 style={{
          fontSize: 'clamp(2.75rem, 6vw, 5rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'white', margin: 0,
        }}>
          Case Studies
        </h1>
        <p style={{ fontSize: r(20), fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: '600px' }}>
          Real results from our ecosystem partnerships — how SouthwestX connects companies with the right startups, research institutions and cross-border opportunities.
        </p>
      </div>
    </section>
  )
}

/* ─── Case Study Card ────────────────────────────── */
function CaseCard({ c, i }: { c: typeof CASES[0]; i: number }) {
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
      {/* Image */}
      <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
        <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)',
        }} />
        {/* Sector badge */}
        <span style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          borderRadius: '9999px', padding: '4px 12px',
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: TEAL,
        }}>{c.sector}</span>
      </div>

      {/* Content */}
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
        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '8px' }}>
          {c.tags.map(t => (
            <span key={t} style={{
              fontSize: '12px', fontWeight: 400, color: '#0a0a0a',
              border: '1px solid rgba(0,0,0,0.15)', borderRadius: '9999px',
              padding: '3px 10px',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ─── Grid ───────────────────────────────────────── */
function CaseGrid() {
  return (
    <section style={{ background: '#f6f3ef', padding: '120px 64px' }}>
      <div style={{ maxWidth: 'var(--content-max-w)', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {CASES.map((c, i) => <CaseCard key={i} c={c} i={i} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          #case-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #case-grid { grid-template-columns: 1fr !important; }
          #case-section { padding: 80px 20px !important; }
        }
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
        <CaseGrid />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
