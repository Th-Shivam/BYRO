import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SplashCursor from './components/SplashCursor'
import IntroAnimation from './components/IntroAnimation'
import HeroSection from './components/HeroSection'
import ProductStorySection from './components/ProductStorySection'
import { HoverBorderGradient } from './components/ui/hover-border-gradient'
import { useCursorImagePreview } from './components/useCursorImagePreview'
import './App.css'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  // Flipped when the intro curtain *starts* lifting, so the homepage assembles
  // itself as the wipe uncovers it instead of popping in afterwards.
  const [contentReady, setContentReady] = useState(false)
  const { hoverProps, preview } = useCursorImagePreview()

  // Safety net: never leave the page staged (invisible) if the intro stalls.
  useEffect(() => {
    const timer = setTimeout(() => setContentReady(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Fluid cursor — always rendered */}
      <SplashCursor RAINBOW_MODE />

      {/* Cinematic intro */}
      {!introComplete && (
        <IntroAnimation
          onExitStart={() => setContentReady(true)}
          onComplete={() => setIntroComplete(true)}
        />
      )}

      {/* Main page */}
      <main className={`home ${contentReady ? 'home--ready' : 'home--staged'}`}>
        <header className="home-nav">
          <a className="logo" href="#top"><span>✦</span> byro.</a>
          <nav>
            <a href="#product">Product</a>
            <a href="#how">How it works</a>
            <a href="#use-cases">Use cases</a>
            <a href="#resources">Resources</a>
          </nav>
          <HoverBorderGradient
            as="a"
            href="#waitlist"
            containerClassName="rounded-full bg-black hover:bg-black p-[2px] shadow-[0_6px_18px_rgba(30,20,37,0.16)] duration-300 hover:-translate-y-0.5"
            className="flex items-center gap-3 px-5 py-3.5 text-[13px] font-semibold max-[720px]:px-3.5 max-[720px]:py-[11px] max-[720px]:text-[11px]"
            {...hoverProps}
          >
            Join the waitlist <ArrowRight size={16} />
          </HoverBorderGradient>
        </header>

        <HeroSection />
        <ProductStorySection />
      </main>
      {preview}
    </>
  )
}

export default App
