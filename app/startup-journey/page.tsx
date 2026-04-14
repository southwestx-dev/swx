'use client'

import Nav from '../components/Nav'
import { r, TEAL, DARK, W10 } from '../lib/tokens'

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      background: '#000000',
      overflow: 'hidden',
      paddingBottom: 0,
    }}>
      {/* Glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { color: '#847292', left: '26%',  top: '30%' },
          { color: TEAL,      left: '46%',  top: '30%' },
          { color: 'white',   left: '46%',  top: '-10%' },
          { color: '#4c87ff', left: '26%',  top: '-10%' },
        ].map((g, i) => (
          <div key={i} style={{
            position: 'absolute', width: r(384), height: r(384), borderRadius: '50%',
            background: g.color, filter: 'blur(480px)', left: g.left, top: g.top,
          }} />
        ))}
      </div>

      {/* Cloud background */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '25%', left: '-5%', right: '-5%', bottom: 0,
        overflow: 'hidden', pointerEvents: 'none', zIndex: 1,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%)',
      }}>
        <img src="/hero-stage-cloud.png" alt="" className="sj-cloud" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: 'center 40%',
          mixBlendMode: 'screen', opacity: 0.45,
        }} />
      </div>

      {/* Eyebrow + Headline */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        paddingTop: 'calc(var(--nav-h, 96px) + 6rem)',
        paddingLeft: r(32), paddingRight: r(32),
      }}>
        <p style={{
          fontSize: r(18), fontWeight: 400, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: TEAL,
          marginBottom: r(24),
        }}>
          For Startups
        </p>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7.5vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1,
          color: 'white', letterSpacing: '-0.02em',
          maxWidth: r(1182), margin: '0 auto',
        }}>
          The{' '}
          <span style={{ color: TEAL }}>Startup Journey</span>
        </h1>
      </div>

      {/* Subtitle + CTAs */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: r(48),
        paddingTop: r(48), paddingLeft: r(32), paddingRight: r(32),
        maxWidth: r(876), margin: '0 auto',
      }}>
        <p style={{ fontSize: r(28), fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
          From early-stage idea to market-ready DeepTech company — structured support,
          expert mentors and cross-border access across Germany and France.
        </p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#programs" className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(21)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            Explore Programs
          </a>
          <a href="#contact" data-contact-modal className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(21)}`, borderRadius: r(8),
            backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
            border: '1px solid white', color: 'white', fontSize: r(14), fontWeight: 700,
            textDecoration: 'none',
          }}>
            Get in touch
          </a>
        </div>
      </div>

      {/* Large display text + V-cutout transition */}
      <p className="sj-display-text" style={{
        position: 'relative', zIndex: 1,
        fontWeight: 400,
        fontSize: 'clamp(6rem, 17vw, 20.4375rem)', lineHeight: 1,
        color: 'rgba(10,10,10,0.85)', textAlign: 'center',
        pointerEvents: 'none', marginTop: r(180),
      }}>
        Startup Journey
      </p>

      {/* V-cutout into next section */}
      <div style={{
        position: 'relative', width: '100%', height: 'clamp(200px, 38vw, 730px)',
        marginTop: 'clamp(-250px, -32vw, -600px)', overflow: 'hidden',
      }}>
        <p style={{
          position: 'absolute', left: '50%', top: '65%',
          transform: 'translateX(-50%)',
          fontWeight: 400, fontSize: r(23), lineHeight: 1.6, color: TEAL,
          textAlign: 'center', whiteSpace: 'nowrap', zIndex: 2,
        }}>
          Programs & Batches
        </p>

        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '50%', height: '100%',
            background: '#f6f3ef', clipPath: 'polygon(0% 100%, 100% 100%, 0% 0%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '50%', height: '100%',
            background: '#f6f3ef', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)',
          }} />
        </div>
      </div>

      <style>{`
        .sj-cloud {
          animation: heroStageCloudFloat 14s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) { .sj-cloud { animation: none !important; } }
        @media (max-width: 768px) { .sj-display-text { font-size: clamp(3rem, 14vw, 6rem) !important; } }
        @media (max-width: 640px) {
          #sj-hero a { height: 3.25rem !important; padding: 0 1.25rem !important; font-size: 1rem !important; }
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
        {/* More sections to come */}
      </main>
    </>
  )
}
