'use client'

import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import CallToAction from '../../components/CallToAction'
import { r, TEAL, DARK, W10 } from '../../lib/tokens'
import SectionIntro from '../../components/SectionIntro'
import StatsCounter from '../../components/StatsCounter'
import FAQSection from '../../components/FAQSection'
import HowItWorks from './HowItWorks'
import HowItWorksAlt from './HowItWorksAlt'
import BenefitsSlider from './BenefitsSlider'
import OfferSection from './OfferSection'
import LogoBand from './LogoBand'
import ImageHero from './ImageHero'

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
            For Founders
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.75rem, 7vw, 6.6875rem)',
          fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'white', margin: 0,
        }}>
          Connecting Europe's Next Gen <span style={{ color: TEAL }}>Tech Champions.</span>
        </h1>

        <p style={{
          fontSize: r(23), fontWeight: 400, lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          maxWidth: r(720), margin: 0,
        }}>
          We are an invite-only circle uniting France's and Germany's most ambitious tech startup founders on a mission to strengthen European digital sovereignty.
        </p>

        <div style={{ display: 'flex', gap: r(16), flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact" data-contact-modal className="btn-hover" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: r(48), padding: `0 ${r(24)}`, borderRadius: r(8),
            background: TEAL, border: `1px solid ${W10}`,
            color: DARK, fontSize: r(14), fontWeight: 700, textDecoration: 'none',
          }}>
            Get in touch
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
        <LogoBand />
        <SectionIntro
          eyebrow="What we are"
          headline={'A Franco-German\nProgram'}
          headlineSize={56}
          paddingTop={120}
          paddingBottom={80}
        >
          <p>The STARTUP LEADERS Program fosters the Franco-German bridge to support selected (deep)tech startup founders on their path to industrial maturity and cross-border potential. In 4 highly curated off-site retreats, we match our members with top executive mentors, industrial leaders and authorities from politics and growth finance.</p>
          <p style={{ fontWeight: 700, color: '#0a0a0a' }}>STARTUP LEADERS is a life-long network on a mission to strengthen European tech sovereignty.</p>
        </SectionIntro>
        <StatsCounter stats={[
          { value: '20+', label: 'Founders per cohort' },
          { value: '4',   label: 'Off-site retreats' },
          { value: '12',  label: 'Months programme' },
          { value: '2',   label: 'Days minimum per retreat' },
        ]} />
        <OfferSection />
        <ImageHero />
        <HowItWorks />
        <HowItWorksAlt />
        <BenefitsSlider />
        <FAQSection
          eyebrow="FAQ"
          headline={'Further info'}
          items={[
            {
              q: 'Who is eligible for the STARTUP LEADERS Program?',
              a: 'We target late-stage Seed and Series A (deep-)tech founders from France and Germany who raised between 10–50 Mio. € and are ready to expand cross-border and to grow at industrial scale. The program is invite-only and targets exceptional founders and CEOs with category-defining ambition, united by technological excellence and a commitment to shaping Europe\'s future. Our first cohort will feature scaleup founders from quantum computing, ClimateTech and semiconductor industry.',
            },
            {
              q: 'How does the nomination and selection process work?',
              a: 'Founders are nominated by trusted partners including VCs, corporates, startup factories, and the SWX network. After the nomination phase, a jury evaluates candidates and forms the final cohort of French and German startup founders.',
            },
            {
              q: 'What does the "Zero Admin" policy actually mean?',
              a: 'Our team manages all logistics during the retreats, including hotels, catering, etc., ensuring your focus remains entirely on strategic exchange and high-level networking. You just have to take care of your own travel costs.',
            },
            {
              q: 'What does the 12-month programme look like?',
              a: 'The programme is built around four curated retreats — Paris at VivaTech (June 2026), Saarbrücken & Baden-Baden, Munich or Berlin, and Southern France. Each retreat lasts 2 days and combines executive mentorship, industry networking, leadership workshops, and access to policymakers and capital partners.',
            },
            {
              q: 'What do I gain from the retreat format?',
              a: 'Each retreat provides off-the-record peer dialogue, direct access to senior executives and policymakers, client acquisition workshops, and introductions to growth-focused investors. We believe that off-site exchange with peers is essential to build a network of trust, confidentiality and friendship that lasts a lifetime.',
            },
            {
              q: 'Can I participate if my startup is French or German only?',
              a: 'Yes. The programme is specifically designed for French and German startups. Supporting German founders to expand into France and vice versa is one of the programme\'s core purposes.',
            },
            {
              q: 'What is the commitment required?',
              a: 'The programme consists of 4 structured retreats (2 days / nights each) over 12 months.',
            },
            {
              q: 'How can I become a mentor?',
              a: 'Distinguished by exceptional professional trajectories (DAX C-level & chairs, unicorn founders), our mentors represent a wide array of industrial backgrounds. They share our mission to contribute to European autonomy and to cultivate exchange between cross-sectoral leaders and the next generation of pioneers. If you want to become a mentor, reach out to project lead Jana Burnikel.',
            },
          ]}
        />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
