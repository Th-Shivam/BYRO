import { useState } from 'react'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import SplashCursor from './components/SplashCursor'
import IntroAnimation from './components/IntroAnimation'
import mascot from '../images/rook-mascot.png'
import workspace from '../images/byro-work.png'
import './App.css'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {/* Fluid cursor — always rendered */}
      <SplashCursor RAINBOW_MODE />

      {/* Cinematic intro */}
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main page — fades in after intro */}
      <main className={`home home--animate-in${introComplete ? ' home--visible' : ''}`}>
        <header className="home-nav">
          <a className="logo" href="#top"><span>✦</span> byro.</a>
          <nav>
            <a href="#product">Product</a>
            <a href="#how">How it works</a>
            <a href="#use-cases">Use cases</a>
            <a href="#resources">Resources</a>
          </nav>
          <a className="nav-cta" href="#waitlist">See BYRO in action <ArrowRight size={16} /></a>
        </header>

        <section className="hero" id="top">
          <div className="hero-grid" />
          <div className="hero-pill"><Sparkles size={12} /> The reputation workspace for expert-led B2B teams</div>
          <div className="hero-heading">
            <h1>Turn company expertise<br />into <em>trusted content</em><br />and conversations.</h1>
            <p>Byro connects interviews, customer proof and product knowledge to the goals your team cares about. It recommends what to say next, shows the evidence behind it and keeps the named author in control.</p>
            <div className="hero-actions">
              <a className="dark-button" href="#waitlist">See BYRO in action <ArrowRight size={16} /></a>
              <a className="play-link" href="#how"><span><Play size={12} fill="currentColor" /></span> How it works</a>
            </div>
          </div>

          <img className="hero-mascot" src={mascot} alt="Byro mascot" />
          <div className="workspace-preview">
            <div className="preview-top">
              <span className="preview-logo">✦ byro.</span>
              <span>Work⌄</span>
              <span className="preview-actions">☷ All &nbsp; + New &nbsp; ◉ &nbsp; ◎ &nbsp; ▣</span>
              <span>⌕ Ask Byro &nbsp; ●</span>
            </div>
            <img src={workspace} alt="Byro reputation workspace" />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
