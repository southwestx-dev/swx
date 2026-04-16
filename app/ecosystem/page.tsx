'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'
import { r, TEAL, DARK, W10 } from '../lib/tokens'
import SectionIntro from '../components/SectionIntro'
import PerspectivesSection from './PerspectivesSection'

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
        src="/img-core-strengths-bg.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }}
      />

      {/* Gradient overlays */}
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
        <p style={{
          fontSize: r(18), fontWeight: 400, lineHeight: 1.6, color: TEAL, margin: 0,
        }}>
          Ecosystem
        </p>

        <h1 style={{
          fontSize: 'clamp(2.75rem, 7vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'white', margin: 0,
        }}>
          Our{' '}
          <span style={{ color: TEAL }}>Ecosystem</span>
        </h1>

        <p style={{
          fontSize: r(23), fontWeight: 400, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          maxWidth: r(720), margin: 0,
        }}>
          A cross-border network of research institutions, industry partners, investors
          and startups building Europe's DeepTech future together across the Franco-German corridor.
        </p>

        <div style={{ display: 'flex', gap: r(16), flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#network" className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            Explore Network
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
    </section>
  )
}

/* ─── Page ───────────────────────────────────────── */
export default function EcosystemPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionIntro
          headline={'A network built\nfor deep impact.'}
          headlineSize={56}
          paddingTop={120}
          paddingBottom={80}
        >
          <p>southwestX brings together the most relevant actors across the Franco-German innovation corridor — research institutions, established companies, startups and investors — into one structured, cross-border ecosystem.</p>
          <p>Our network is designed to create meaningful connections, accelerate technology transfer and turn scientific excellence into market-ready solutions that scale.</p>
        </SectionIntro>
        <PerspectivesSection />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
