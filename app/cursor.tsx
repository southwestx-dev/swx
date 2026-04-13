'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Touch / coarse-pointer devices keep the native cursor
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mx = 0, my = 0   // live mouse position
    let rx = 0, ry = 0   // ring's lagged position
    let rafId: number
    let started = false

    /* ── Mouse tracking ─────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      // Dot: instant follow
      dot.style.left = `${mx}px`
      dot.style.top  = `${my}px`

      // Reveal both elements on the very first move
      if (!started) {
        started = true
        document.body.classList.add('cursor-ready')
      }
    }

    /* ── RAF loop — elastic ring ─────────────────────── */
    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top  = `${ry}px`
      rafId = requestAnimationFrame(loop)
    }

    /* ── Hover detection (event delegation) ─────────── */
    const INTERACTIVE = 'a, button, .prog-card, [role="button"], input, select, textarea, label'

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element).closest(INTERACTIVE)
      ring.classList.toggle('ring-hover', !!hit)
      dot.classList.toggle('dot-hover',  !!hit)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
      document.body.classList.remove('cursor-ready')
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
