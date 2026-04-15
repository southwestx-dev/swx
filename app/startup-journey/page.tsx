'use client'

import Nav from '../components/Nav'
import { r, TEAL, DARK, W10 } from '../lib/tokens'
import SectionIntro from '../components/SectionIntro'
import JourneySlider from './JourneySlider'

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <img
        src="/img-meeting.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }}
      />

      {/* Gradient overlays — bottom-up dark + teal top-right accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.80) 100%)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(225deg, ${TEAL}55 0%, transparent 45%)`,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: r(40),
        padding: `calc(var(--nav-h, 96px) + 4rem) ${r(32)} ${r(80)}`,
        maxWidth: r(1024), margin: '0 auto',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: r(14), fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: TEAL,
        }}>
          For Startups
        </p>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.75rem, 7vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'white', margin: 0,
        }}>
          The{' '}
          <span style={{ color: TEAL }}>Startup</span>
          <br />Journey
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: r(23), fontWeight: 400, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          maxWidth: r(720),
        }}>
          From early-stage idea to market-ready DeepTech company — structured support,
          expert mentors and cross-border access across Germany and France.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: r(16), flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#programs" className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            Explore Programs
          </a>
          <a href="#contact" data-contact-modal className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white', fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            Get in touch
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #sj-hero a { height: 3rem !important; padding: 0 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}


/* ─── Page ───────────────────────────────────────── */
export default function StartupJourneyPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionIntro
          headline={'One journey.\nMultiple entry points.'}
          headlineSize={56}
          paddingTop={120}
          paddingBottom={80}
        >
          <p>SouthwestX builds entrepreneurial pathways across the full startup lifecycle. From early exposure and idea development to venture building, customer access and international growth, each stage is supported by formats designed for a specific level of maturity.</p>
          <p>The journey is built as a connected system. Talents become future founders, teams become startups, and startups gain the structure, support and access needed to scale.</p>
        </SectionIntro>
        {/* Process diagram */}
        <div style={{
          maxWidth: 'var(--content-max-w)',
          margin: '0 auto',
          padding: `0 ${r(64)} ${r(80)}`,
        }}>
          <img
            src="/Startup Journey_image.png"
            alt="SouthwestX Startup Journey Process diagram"
            style={{ width: '100%', height: 'auto', borderRadius: r(16) }}
          />
        </div>

        <JourneySlider />
      </main>
    </>
  )
}
