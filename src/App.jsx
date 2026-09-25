import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SplashCursor from './components/SplashCursor'
import IntroAnimation from './components/IntroAnimation'
import HeroSection from './components/HeroSection'
import HomeSections from './components/HomeSections'
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

        <HeroSection />
        <HomeSections />
      </main>
    </>
  )
}

export default App
