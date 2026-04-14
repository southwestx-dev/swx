import type { CSSProperties } from 'react'

/* ─── Type Scale Helper ──────────────────────────── */
export const r = (px: number) => `${px / 16}rem`

/* ─── Shared Design Tokens ───────────────────────── */
export const TEAL  = '#3ccbda'
export const DARK  = '#0a0a0a'
export const DARK2 = '#171717'
export const W70   = 'rgba(255,255,255,0.7)'
export const W10   = 'rgba(255,255,255,0.1)'

/* ─── Shared Button Styles ───────────────────────── */
export const ghostBtnStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(48px)', background: 'rgba(0,0,0,0.01)',
  border: '1px solid white', borderRadius: r(8),
  color: 'white', fontWeight: 700, textDecoration: 'none',
}

export const lightGhostBtnStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: r(48), padding: `0 ${r(21)}`,
  backdropFilter: 'blur(48px)', background: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: r(8),
  color: DARK2, fontWeight: 700, fontSize: r(14), textDecoration: 'none',
}
