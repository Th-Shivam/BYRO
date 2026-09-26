import { useEffect, useRef } from 'react'
import workspace from '../../images/byro-work.png'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const lerp = (from, to, progress) => from + (to - from) * progress

export default function SharedProductPreview() {
  const previewRef = useRef(null)

  useEffect(() => {
    const preview = previewRef.current
    const placeholder = document.querySelector('[data-product-preview-target]')
    if (!preview || !placeholder) return undefined

    let frame
    const update = () => {
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      const scrolled = window.scrollY
      const isMobile = viewportWidth <= 720

      // This is the exact card placement seen at the bottom of the hero.
      const startWidth = Math.min(viewportWidth * (isMobile ? 1.06 : 0.76), 1200)
      const startHeight = isMobile ? 260 : 370
      const startLeft = (viewportWidth - startWidth) / 2
      const startTop = viewportHeight - startHeight + (isMobile ? 115 : 145)

      // While the hero is on screen the card rides the page like any other
      // element — no early lift-off.
      const heroTop = startTop - scrolled

      // The placeholder holds the final slot in section two. Its document
      // offset sits well below the hero card, and closing that gap faster than
      // the page scrolls is what makes the card glide downwards into place.
      const target = placeholder.getBoundingClientRect()
      const targetDocTop = target.top + scrolled
      const gap = targetDocTop - startTop
      const handoff = clamp(gap / 1.0, 600, 1000)
      // Finish the hand-off while the slot is still comfortably in view.
      const handoffEnd = targetDocTop - viewportHeight * 0.30
      const progress = clamp((scrolled - handoffEnd + handoff) / handoff, 0, 1)
      const ease = progress * progress * (3 - 2 * progress)

      preview.style.left = `${lerp(startLeft, target.left, ease)}px`
      preview.style.top = `${lerp(heroTop, target.top, ease)}px`
      preview.style.width = `${lerp(startWidth, target.width, ease)}px`
      preview.style.height = `${lerp(startHeight, target.height, ease)}px`
      preview.style.borderRadius = `${lerp(20, 24, ease)}px`
      preview.style.borderWidth = `${lerp(isMobile ? 4 : 7, isMobile ? 4 : 6, ease)}px`
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    // The hand-off is timed off the slot's document offset, so recompute when
    // late layout shifts (web fonts, image loads) move it.
    const observer = new ResizeObserver(onScroll)
    observer.observe(placeholder)
    observer.observe(document.body)

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div ref={previewRef} className="shared-product-preview">
      <div className="shared-product-preview__topbar">
        <span className="shared-product-preview__logo">✦ byro.</span>
        <span>Work⌄</span>
        <span className="shared-product-preview__actions">☷ All &nbsp; + New &nbsp; ◉ &nbsp; ◎ &nbsp; ▣</span>
        <span>⌕ Ask Byro &nbsp; <b>AR</b></span>
      </div>
      <img src={workspace} alt="Byro reputation workspace" />
    </div>
  )
}
