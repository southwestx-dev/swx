'use client'

import { useRef, useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SectionIntro from './components/SectionIntro'
import { r, TEAL, DARK, DARK2, W70, W10 } from './lib/tokens'

// Base ghost button — extend with height / padding / fontSize
const ghostBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
  border: '1px solid white', borderRadius: r(8),
  color: 'white', fontWeight: 700, textDecoration: 'none',
}

// Light ghost — for light-background sections
const lightGhostBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: r(48), padding: `0 ${r(21)}`,
  backdropFilter: 'blur(48px)', background: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: r(8),
  color: DARK2, fontWeight: 700, fontSize: r(14), textDecoration: 'none',
}

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

/* ─── Hero ───────────────────────────────────────── */
function HeroStage() {
  return (
    <section id="hero-stage" style={{
      position: 'relative',
      width: '100%',
      background: '#000000',
      overflow: 'hidden',
      paddingBottom: 0,
    }}>
      {/* Cloud background — starts at 25% from top */}
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

      {/* Headline */}
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

      {/* Subtitle + CTAs */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: r(48),
        paddingTop: r(48), paddingLeft: r(32), paddingRight: r(32),
        maxWidth: r(876), margin: '0 auto',
      }}>
        <p style={{ fontSize: r(28), fontWeight: 400, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
          We are a European Startup Factory that connects start-ups,
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

      {/* Large display text */}
      <p className="hero-stage-text" style={{
        position: 'relative', zIndex: 1,
        fontWeight: 400,
        fontSize: 'clamp(6rem, 17vw, 20.4375rem)', lineHeight: 1,
        color: 'rgba(10,10,10,0.85)', textAlign: 'center',
        pointerEvents: 'none', marginTop: r(180),
      }}>
        Where Impact Happens
      </p>

      {/* Bottom V-cutout */}
      <div style={{
        position: 'relative', width: '100%', height: 'clamp(200px, 38vw, 730px)',
        marginTop: 'clamp(-250px, -32vw, -600px)', overflow: 'hidden',
      }}>
        {/* "Ecosystem Highlights" eyebrow — sits between clipped text and bottom */}
        <p style={{
          position: 'absolute', left: '50%', top: '65%',
          transform: 'translateX(-50%)',
          fontWeight: 400, fontSize: r(23), lineHeight: 1.6, color: TEAL,
          textAlign: 'center', whiteSpace: 'nowrap', zIndex: 2,
        }}>
          Ecosystem Highlights
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
        .hero-stage-cloud {
          animation: heroStageCloudFloat 14s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes heroStageCloudFloat {
          0%   { transform: scale(1);    opacity: 1;    }
          50%  { transform: scale(1.03); opacity: 0.85; }
          100% { transform: scale(1);    opacity: 1;    }
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

const PROGRAMS = [
  {
    title: 'Startup Leaders program', category: 'Flagship Program',
    img: '/img-meeting.jpg', imgH: 571, dotColor: '#4c87ff',
    tag: '18-month program', tagSub: ' | Germany & France',
    desc: 'An excellence program connecting Europe\u2019s most ambitious founders with leading entrepreneurs, investors and industry partners across Germany and France.',
  },
  {
    title: 'Green Transformation Innovation', category: 'Flagship Initiative',
    img: '/img-meeting.jpg', imgH: 855, dotColor: TEAL,
    tag: 'Ongoing program', tagSub: ' | Europe',
    desc: 'A platform connecting corporates, startups and researchers to accelerate solutions for circular economy, renewable energy and sustainable industry.',
  },
  {
    title: 'SWX DeepTech Demo Day', category: 'Ecosystem Event',
    img: '/img-networking.jpg', imgH: 428, dotColor: '#4c87ff',
    tag: '6. \u2013 7. November 2026', tagSub: ' | Cologne',
    desc: 'Selected DeepTech startups from the SouthwestX ecosystem present validated solutions to investors, corporates and cross-border partners.',
  },
  {
    title: 'AI \u00d7 Industry Hackathon', category: 'Innovation Format',
    img: '/img-meeting.jpg', imgH: 571, dotColor: '#4c87ff',
    tag: '12. \u2013 14. March 2026', tagSub: ' | Cologne',
    desc: 'A cross-border hackathon connecting real industrial challenges with entrepreneurial talent from Germany and France.',
  },
  {
    title: 'Enter the SouthwestX Ecosystem', category: 'Getting Started',
    img: '/img-networking.jpg', imgH: 428, dotColor: TEAL, tealBadge: true,
    tag: 'For startups, corporates & researchers', tagSub: '',
    desc: 'Discover how SouthwestX connects startups, industry and research to transform DeepTech innovation into scalable companies.',
  },
]

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
          <div key={i} className="prog-card" style={{ flex: '0 0 auto', width: r(428), scrollSnapAlign: 'start' }}>
            {/* Fixed-height header so images align across all cards */}
            <div style={{ height: r(240), display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 16, overflow: 'visible' }}>
              <h3 style={{
                fontSize: 'clamp(1.125rem, 2.53vw, 2.42rem)', fontWeight: 400,
                lineHeight: 1.1, color: DARK, marginBottom: r(8),
              }}>{p.title}</h3>
              <p style={{ fontSize: r(18), lineHeight: 1.6, color: '#404040' }}>{p.category}</p>
            </div>

            <div style={{
              position: 'relative', width: '100%',
              height: p.imgH > 600 ? r(525) : r(Math.round(p.imgH * 0.75)),
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
        .prog-card { transition: transform 0.35s ease, filter 0.35s ease; cursor: pointer; }
        .prog-card:hover { transform: translateY(-10px); filter: drop-shadow(0 16px 32px rgba(0,0,0,0.18)); }
        .prog-card-img { transition: transform 0.5s ease; }
        .prog-card:hover .prog-card-img { transform: scale(1.06); }
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
// Shared logo list — also used by Partners marquee
const LOGOS = [
  { src: '/logo-max-planck.png',       w: 265, h: 48, alt: 'Max-Planck-Innovation' },
  { src: '/logo-rptu.png',             w: 129, h: 42, alt: 'RPTU' },
  { src: '/logo-trier.png',            w: 254, h: 48, alt: 'Trier University of Applied Sciences' },
  { src: '/whu.png',                   w: 120, h: 48, alt: 'WHU – Otto Beisheim School of Management' },
  { src: '/triathlon_logo_rot.png',    w: 103, h: 48, alt: 'triathlon' },
]
const LOGOS_DOUBLED = [...LOGOS, ...LOGOS]

function ResearchInstitutions() {
  return (
    <section id="research" style={{ background: '#f6f3ef', padding: `${r(192)} 0` }}>
      <style>{`
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
            {LOGOS_DOUBLED.map((logo, i) => (
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
const IJ_GLOWS = [
  { color: '#847292', left: r(512), top: r(384) },
  { color: TEAL,      left: r(896), top: r(384) },
  { color: 'white',   left: r(896), top: '0'    },
  { color: '#4c87ff', left: r(512), top: '0'    },
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
          <img src="/img-meeting.jpg" alt="Startup Journey" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={IJ_OVERLAY} />
        </div>
      </div>

      {/* Row 2: Image left, Card right */}
      <div className="ij-row ij-row-last" style={{ padding: `${r(8)} ${r(64)} ${r(192)}`, display: 'flex', gap: r(16), alignItems: 'stretch' }}>
        <div className="ij-img-col" style={IJ_IMG_COL}>
          <img src="/img-networking.jpg" alt="Innovation Journey" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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

/* ─── Core Strengths ─────────────────────────────── */
const STRENGTHS_DATA = [
  { icon: '/icons/icon-ai.svg',     title: 'Artificial\nIntelligence',  desc: 'Europe\u2019s leading AI research meets entrepreneurship and industrial application to build scalable DeepTech companies.' },
  { icon: '/icons/icon-green.svg',  title: 'Green Transformation',      desc: 'Technologies accelerating sustainable industry, energy transition and circular economy across Europe.' },
  { icon: '/icons/icon-franco.svg', title: 'Franco-German Innovation',  desc: 'Cross-border collaboration between Germany and France connecting research, talent and markets.' },
  { icon: '/icons/icon-talent.svg', title: 'Entrepreneurial Talent',    desc: 'A strong community of founders, researchers and innovators building the next generation of DeepTech companies.' },
]
const STRENGTHS_CARD: React.CSSProperties = {
  flex: '1 0 0', minWidth: r(220),
  background: DARK2, borderRadius: r(16), padding: r(48),
  display: 'flex', flexDirection: 'column', gap: r(24),
}

function CoreStrengths() {
  return (
    <section id="core-strengths" style={{ position: 'relative', padding: `${r(192)} ${r(64)}`, overflow: 'hidden' }}>
      <img src="/img-core-strengths-bg.png" alt="" style={{
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
        @media (max-width: 900px)  { #core-strengths { padding: 80px 32px !important; } .strengths-card-item { padding: 32px !important; } }
        @media (max-width: 640px)  { #core-strengths { padding: 64px 20px !important; } .strengths-card-item { min-width: 100% !important; padding: 24px !important; } }
      `}</style>
    </section>
  )
}

/* ─── Text + Image ("Our Approach") ─────────────── */
function TextImage() {
  return (
    <section id="about" style={{ background: '#f6f3ef', padding: '120px 64px' }}>
      <div style={{
        maxWidth: 'var(--content-max-w)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}>
        {/* Left: text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.6, color: TEAL, margin: 0 }}>
              The SouthwestX Ecosystem
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 56px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#171717', margin: 0 }}>
              A strong network across Germany and Europe
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#404040', margin: 0 }}>SouthwestX is embedded in a strong national and international innovation ecosystem. Through strategic networks, research-driven partnerships and cross-border collaboration, we connect startups and companies with the institutions, expertise and market access that matter for long-term growth.</p>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#404040', margin: 0 }}>From Germany's startup landscape to partnerships across France, Luxembourg and the wider European context, SouthwestX creates the connections that expand opportunity, strengthen visibility and open pathways for venture building and innovation.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#programs" className="btn-hover-light" style={lightGhostBtnStyle}>Explore the ecosystem</a>
            <a href="#cta" data-contact-modal className="btn-hover-light" style={lightGhostBtnStyle}>Get in touch</a>
          </div>
        </div>

        {/* Right: image card */}
        <div id="about-card" style={{
          borderRadius: '16px',
          height: '480px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src="/img-networking.jpg"
            alt="SouthwestX networking"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </div>
      </div>

      <style>{`
        #about-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(225deg, rgba(60, 203, 218, 0.12) 0%, transparent 50%);
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          #about { padding: 80px 32px !important; }
          #about > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #about-card { height: 320px !important; }
        }
        @media (max-width: 480px) {
          #about { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Events & Insights ──────────────────────────── */
// Arrow icons saved locally — never expire
const ARROW_L = '/icons/icon-arrow-left.svg'
const ARROW_R = '/icons/icon-arrow-right.svg'

const EI_CARDS = [
  {
    type: 'Report',
    title: 'The European DeepTech Opportunity',
    img: '/img-networking.jpg',
    desc: 'Why Europe has the scientific strength to lead in DeepTech — and what it takes to transform research into globally competitive companies.',
    badge: null as null | { date: string; loc: string },
  },
  {
    type: 'Article',
    title: 'From Research to Startup',
    img: '/img-meeting.jpg',
    desc: 'How universities and research institutes can accelerate the path from scientific discovery to scalable venture creation.',
    badge: null as null | { date: string; loc: string },
  },
  {
    type: 'Event',
    title: 'Green Transformation Summit',
    img: '/img-teal-explosion.png',
    desc: 'A conference bringing together industry leaders, researchers and founders to discuss the future of sustainable technologies.',
    badge: { date: '6. – 7. November 2026', loc: ' | Cologne' },
  },
  {
    type: 'Article',
    title: 'Building Cross-Border Innovation',
    img: '/img-networking.jpg',
    desc: 'Why collaboration between Germany and France is becoming a strategic advantage for DeepTech founders.',
    badge: null as null | { date: string; loc: string },
  },
  {
    type: 'Report',
    title: 'Green Transformation through Technology',
    img: '/img-networking.jpg',
    desc: 'How DeepTech startups contribute to climate transition across energy, materials and industrial production.',
    badge: null as null | { date: string; loc: string },
  },
]

const EI_DOT_COUNT  = 3
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
    <section id="events" style={{ background: '#ffffff', paddingBottom: r(96) }}>
      <SectionIntro
        headline="Events und Insights from our Ecosystem"
        headlineSize={35}
        headlineColor={DARK}
        background="#ffffff"
        paddingTop={192}
        paddingBottom={96}
      >
        <p>Discover upcoming events, key discussions and insights from the southwestX ecosystem. From conferences and demo days to research perspectives and innovation trends shaping Europe&apos;s DeepTech future.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#" className="btn-hover-light" style={lightGhostBtnStyle}>View all Events</a>
          <a href="#" className="btn-hover-light" style={lightGhostBtnStyle}>View all Insights</a>
        </div>
      </SectionIntro>

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
function LogoRow({ reverse }: { reverse?: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: r(80), overflow: 'hidden' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: r(144),
        animation: reverse ? 'marquee-reverse 40s linear infinite' : 'marquee 40s linear infinite',
        width: 'max-content',
      }}>
        {LOGOS_DOUBLED.map((logo, i) => (
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
        @media (max-width: 900px) { #partners { padding: 64px 0 100px !important; } .partner-fade { width: 120px !important; } }
        @media (max-width: 640px) { #partners { padding: 48px 0 64px !important; } .partner-fade { width: 60px !important; } }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
        <h2 style={{ fontSize: r(35), fontWeight: 400, lineHeight: 1.2, color: DARK2, textAlign: 'center' }}>
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
    <section id="cta" style={{ background: DARK, padding: `${r(192)} ${r(64)}` }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: r(48),
        maxWidth: 1486, margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontSize: r(23), lineHeight: 1.6, color: TEAL }}>Get in Touch</p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.3125rem)', fontWeight: 400, lineHeight: 1.1, color: 'white' }}>
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


/* ─── Page ───────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroStage />
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
