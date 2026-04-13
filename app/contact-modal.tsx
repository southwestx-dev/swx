'use client'
import { useEffect, useRef, useState } from 'react'

const ACCENT  = '#3ccbda'
const SURFACE = '#1a1a16'
const BORDER  = 'rgba(255,255,255,.1)'
const MUTED   = 'rgba(255,255,255,.45)'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,.05)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 8,
  padding: '12px 16px',
  color: 'white',
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

export default function ContactModal() {
  const [open, setOpen]       = useState(false)
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef               = useRef<HTMLFormElement>(null)
  const firstFieldRef         = useRef<HTMLInputElement>(null)

  /* ── intercept all mailto links ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href^="mailto:"], [data-contact-modal]')
      if (!anchor) return
      e.preventDefault()
      setSent(false)
      setOpen(true)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  /* ── focus first field on open ── */
  useEffect(() => {
    if (open) setTimeout(() => firstFieldRef.current?.focus(), 60)
  }, [open])

  /* ── close on Escape ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => { setOpen(false); setSent(false) }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current!
    setLoading(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      setTimeout(close, 3000)
    } catch {
      alert('Something went wrong. Please email us directly at hello@southwestx.eu')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(15,15,12,.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 16,
          padding: '48px 40px',
          width: '100%',
          maxWidth: 480,
          boxSizing: 'border-box',
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: MUTED, fontSize: '1.5rem', lineHeight: 1,
            padding: '4px 8px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
          onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
        >
          ×
        </button>

        {/* Eyebrow */}
        <p style={{
          fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: ACCENT, marginBottom: 12,
        }}>
          Get in touch
        </p>

        {/* Headline */}
        <h2 style={{
          fontSize: '1.5rem', fontWeight: 700,
          color: 'white', lineHeight: 1.2,
          marginBottom: 32,
        }}>
          We&apos;d love to hear from you
        </h2>

        {sent ? (
          /* ── Success state ── */
          <div style={{
            textAlign: 'center', padding: '32px 0',
            color: ACCENT, fontSize: '1.1rem', fontWeight: 600,
          }}>
            ✓ Message sent!
          </div>
        ) : (
          /* ── Form ── */
          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <input type="hidden" name="form-name" value="contact" />
            {/* Honeypot */}
            <input type="hidden" name="bot-field" />

            <div>
              <label style={{ display: 'block', color: MUTED, fontSize: '0.8rem', marginBottom: 6 }}>
                Name
              </label>
              <input
                ref={firstFieldRef}
                type="text"
                name="name"
                required
                placeholder="Your name"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)')}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: MUTED, fontSize: '0.8rem', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)')}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: MUTED, fontSize: '0.8rem', marginBottom: 6 }}>
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us about your project…"
                style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                onFocus={e => (e.currentTarget.style.borderColor = ACCENT)}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-hover"
              style={{
                marginTop: 8,
                width: '100%',
                height: 48, borderRadius: 8,
                background: ACCENT,
                border: `1px solid rgba(255,255,255,0.1)`,
                cursor: loading ? 'not-allowed' : 'pointer',
                color: '#0a0a0a', fontWeight: 700, fontSize: '0.9rem',
                fontFamily: 'inherit',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
