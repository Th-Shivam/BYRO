import { ArrowRight, Play, Sparkles } from 'lucide-react'
import mascot from '../../images/rook-mascot.png'
import heroBackdrop from '../../images/bg.png'
import SharedProductPreview from './SharedProductPreview'
import { HoverBorderGradient } from './ui/hover-border-gradient'
import { useCursorImagePreview } from './useCursorImagePreview'

export default function HeroSection() {
  const { hoverProps, preview } = useCursorImagePreview()

  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <img className="hero-backdrop" src={heroBackdrop} alt="" aria-hidden="true" />

      <div className="hero-pill"><Sparkles size={12} /> The reputation workspace for expert-led B2B teams</div>
      <div className="hero-heading">
        <h1><span className="hero-title-line">Turn company expertise</span><br />into <em>trusted content</em><br />and conversations.</h1>
        <p>Byro connects interviews, customer proof and product knowledge to the goals your team cares about. It recommends what to say next, shows the evidence behind it and keeps the named author in control.</p>
        <div className="hero-actions">
          <HoverBorderGradient
            as="a"
            href="#waitlist"
            containerClassName="rounded-full bg-black hover:bg-black p-[3px] shadow-[0_8px_22px_rgba(30,20,37,0.18)] duration-300 hover:-translate-y-0.5"
            className="flex items-center gap-3 px-6 py-4 text-[13px] font-semibold"
            {...hoverProps}
          >
            See BYRO in action <ArrowRight size={16} />
          </HoverBorderGradient>
          <a className="play-link" href="#how"><span><Play size={12} fill="currentColor" /></span> How it works</a>
        </div>
        <div className="hero-proof-row" aria-label="BYRO benefits">
          <span><i>✓</i> Evidence-backed</span>
          <span><i>✓</i> Author-led</span>
          <span><i>✓</i> Built for focus</span>
        </div>
      </div>
      <img className="hero-mascot" src={mascot} alt="Byro mascot" />
      <SharedProductPreview />
      {preview}
    </section>
  )
}
