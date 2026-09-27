import { useRef, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import waitlistPreview from '../../images/byro-waitlist-removebg-preview.png'

// Floating image that trails the cursor while a target is hovered.
// Position is written straight to the DOM node via rAF + a lerp — no React
// state changes on mousemove, so the page never re-renders while following.
const GAP = 25        // px the preview floats above the cursor
const H_OFFSET = 16   // nudge sideways so it never sits dead under the pointer
const MARGIN = 12     // keep this far from any viewport edge
const EASE = 0.2      // follow smoothing (0 = frozen, 1 = instant/jittery)

export function useCursorImagePreview(src = waitlistPreview) {
  const outerRef = useRef(null)
  const rafRef = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })
  const active = useRef(false)
  const [visible, setVisible] = useState(false)

  const clampTarget = (clientX, clientY) => {
    const el = outerRef.current
    const w = el ? el.offsetWidth : 0
    const h = el ? el.offsetHeight : 0
    const vw = window.innerWidth
    const vh = window.innerHeight

    let x = clientX + H_OFFSET - w / 2
    let y = clientY - GAP - h            // default: fully above the cursor
    if (y < MARGIN) y = clientY + GAP    // near the top edge → flip below

    x = Math.min(Math.max(x, MARGIN), vw - w - MARGIN)
    y = Math.min(Math.max(y, MARGIN), vh - h - MARGIN)
    target.current = { x, y }
  }

  const tick = useCallback(function loop() {
    const el = outerRef.current
    if (!el) return
    cur.current.x += (target.current.x - cur.current.x) * EASE
    cur.current.y += (target.current.y - cur.current.y) * EASE
    el.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`
    if (active.current) rafRef.current = requestAnimationFrame(loop)
  }, [])

  const onPointerEnter = useCallback((e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return // skip touch/pen
    active.current = true
    clampTarget(e.clientX, e.clientY)
    cur.current = { ...target.current } // snap to start so it fades in in place
    const el = outerRef.current
    if (el) el.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`
    setVisible(true)
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const onPointerMove = useCallback((e) => {
    if (!active.current) return
    clampTarget(e.clientX, e.clientY)
  }, [])

  const onPointerLeave = useCallback((e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return
    active.current = false
    cancelAnimationFrame(rafRef.current)
    setVisible(false)
  }, [])

  useEffect(() => () => {
    active.current = false
    cancelAnimationFrame(rafRef.current)
  }, [])

  const preview = createPortal(
    <div ref={outerRef} className="cursor-preview" aria-hidden="true">
      <img
        src={src}
        alt=""
        draggable="false"
        className={`cursor-preview__img${visible ? ' is-visible' : ''}`}
      />
    </div>,
    document.body,
  )

  return { hoverProps: { onPointerEnter, onPointerMove, onPointerLeave }, preview }
}
