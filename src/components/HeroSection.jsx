import { ArrowRight, Play, Sparkles } from 'lucide-react'
import mascot from '../../images/rook-mascot.png'
import workspace from '../../images/byro-work.png'
import heroBackdrop from '../../images/bg.png'

export default function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <img className="hero-backdrop" src={heroBackdrop} alt="" aria-hidden="true" />

      <div className="hero-pill"><Sparkles size={12} /> The reputation workspace for expert-led B2B teams</div>
      <div className="hero-heading">
        <h1><span className="hero-title-line">Turn company expertise</span><br />into <em>trusted content</em><br />and conversations.</h1>
        <p>Byro connects interviews, customer proof and product knowledge to the goals your team cares about. It recommends what to say next, shows the evidence behind it and keeps the named author in control.</p>
        <div className="hero-actions">
          <a className="dark-button" href="#waitlist">See BYRO in action <ArrowRight size={16} /></a>
          <a className="play-link" href="#how"><span><Play size={12} fill="currentColor" /></span> How it works</a>
        </div>
        <div className="hero-proof-row" aria-label="BYRO benefits">
          <span><i>✓</i> Evidence-backed</span>
          <span><i>✓</i> Author-led</span>
          <span><i>✓</i> Built for focus</span>
        </div>
      </div>

      <img className="hero-mascot" src={mascot} alt="Byro mascot" />
      <div className="workspace-preview">
        <div className="preview-top">
          <span className="preview-logo">✦ byro.</span>
          <span>Work⌄</span>
          <span className="preview-actions">☷ All &nbsp; + New &nbsp; ◉ &nbsp; ◎ &nbsp; ▣</span>
          <span>⌕ Ask Byro &nbsp; <b className="preview-avatar">AR</b></span>
        </div>
        <img src={workspace} alt="Byro reputation workspace" />
      </div>
    </section>
  )
}
