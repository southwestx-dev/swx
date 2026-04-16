'use client'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import CallToAction from '../../components/CallToAction'
import { r, TEAL, DARK, W10 } from '../../lib/tokens'
import SectionIntro from '../../components/SectionIntro'

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
      <img
        src="/img-networking.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }}
      />
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
        <div style={{ display: 'flex', gap: r(8), flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{
            height: r(32), padding: `0 ${r(12)}`, borderRadius: r(9999),
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.85)', fontSize: r(14), fontWeight: 400,
            display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
          }}>
            Series A+
          </span>
          <span style={{
            height: r(32), padding: `0 ${r(12)}`, borderRadius: r(9999),
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            color: TEAL, fontSize: r(14), fontWeight: 400,
            display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
          }}>
            For Companies
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.75rem, 7vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'white', margin: 0,
        }}>
          <span style={{ color: TEAL }}>Startup</span> Leaders
        </h1>

        <p style={{
          fontSize: r(23), fontWeight: 400, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          maxWidth: r(720), margin: 0,
        }}>
          A structured program connecting established companies with Europe's most
          promising Series A+ startups — enabling strategic partnerships, co-development
          and investment opportunities across the Franco-German ecosystem.
        </p>

        <div style={{ display: 'flex', gap: r(16), flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact" data-contact-modal className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            Apply Now
          </a>
          <a href="/programs" className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white', fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            All Programs
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────── */
export default function StartupLeadersPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionIntro
          eyebrow="About the Program"
          headline={'Scale together.\nLead the market.'}
          headlineSize={56}
          paddingTop={120}
          paddingBottom={80}
        >
          <p>Startup Leaders connects established companies with Europe's most advanced DeepTech startups operating at Series A and beyond. This is not a scouting exercise — it is a structured engagement designed to generate real strategic outcomes.</p>
          <p>Participants gain access to a curated cohort of scale-ups, structured collaboration formats and a bilateral exchange that accelerates both corporate innovation and startup growth across the Franco-German corridor.</p>
        </SectionIntro>
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
