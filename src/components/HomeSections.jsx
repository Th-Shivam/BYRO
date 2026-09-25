import { ArrowUpRight, CheckCircle2, FileCheck2, ShieldCheck, Target } from 'lucide-react'
import featureDawn from '../../images/byro-feature-forest-dawn.webp'
import featureDusk from '../../images/byro-feature-forest-dusk.webp'
import featureBirch from '../../images/byro-feature-forest-birch.webp'
import { useEffect, useRef } from 'react'
import './HomeSections.css'

const pillars = [
  {
    number: '01',
    icon: Target,
    tag: 'Goal-first architecture',
    title: 'Know what to say next.',
    copy: 'Set the reputation you want to build. BYRO turns that goal into a clear, useful next move for your team.',
    image: featureDawn,
  },
  {
    number: '02',
    icon: FileCheck2,
    tag: 'Evidence verification',
    title: 'Make every claim travel with proof.',
    copy: 'Connect interviews, customer moments and product knowledge directly to the content they support.',
    image: featureDusk,
  },
  {
    number: '03',
    icon: ShieldCheck,
    tag: 'Author control',
    title: 'Keep the human in charge.',
    copy: 'Your named author reviews, edits and approves everything. BYRO helps the voice get sharper—not disappear.',
    image: featureBirch,
  },
]

const steps = [
  ['Capture', 'Bring the conversations, proof and hard-won knowledge already inside your company.'],
  ['Connect', 'BYRO maps the evidence to the reputation goals your team cares about right now.'],
  ['Compound', 'Publish with confidence and make every useful insight build on the last one.'],
]

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.style.setProperty('--reveal-delay', `${delay}ms`)
        node.classList.add('is-revealed')
        observer.disconnect()
      }
    }, { threshold: 0.14 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function HomeSections() {
  return (
    <div className="lower-page">
      <section className="knowledge-section">
        <Reveal className="lower-section-heading">
          <span className="section-eyebrow">The knowledge gap</span>
          <h2>The best thing your company knows is usually <em>somewhere else.</em></h2>
          <p>In a call. In a doc. In someone&apos;s head. BYRO gives that knowledge a path from scattered insight to trusted reputation.</p>
        </Reveal>
        <div className="knowledge-orbit" aria-hidden="true">
          <span className="orbit-line orbit-line--one" />
          <span className="orbit-line orbit-line--two" />
          <span className="orbit-dot orbit-dot--one" />
          <span className="orbit-dot orbit-dot--two" />
          <div className="orbit-core">✦<small>BYRO</small></div>
        </div>
      </section>

      <section className="pillars-section" id="product">
        <Reveal className="lower-section-heading lower-section-heading--left">
          <span className="section-eyebrow">One workspace, three advantages</span>
          <h2>Turn scattered knowledge into a <em>repeatable edge.</em></h2>
        </Reveal>
        <div className="pillar-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Reveal key={pillar.number} className="pillar-card" delay={index * 100}>
                <div className="pillar-card-top">
                  <span className="pillar-number">{pillar.number}</span>
                  <Icon size={20} strokeWidth={1.7} />
                </div>
                <div>
                  <span className="pillar-tag">{pillar.tag}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </div>
                <div className="pillar-image-wrap"><img src={pillar.image} alt="" /><span className="pillar-arrow"><ArrowUpRight size={17} /></span></div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="workflow-section" id="how">
        <Reveal className="workflow-copy">
          <span className="section-eyebrow">From insight to influence</span>
          <h2>A calmer way to build <em>category authority.</em></h2>
          <p>BYRO keeps the strategy, evidence and voice in one place—so your team can spend less time hunting for context and more time saying something worth remembering.</p>
          <a className="workflow-link" href="#waitlist">See the workspace <ArrowUpRight size={17} /></a>
        </Reveal>
        <div className="workflow-steps">
          {steps.map(([title, copy], index) => (
            <Reveal className="workflow-step" delay={index * 120} key={title}>
              <div className="workflow-step-marker"><span>0{index + 1}</span><i /></div>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="lower-cta-wrap">
        <section className="lower-cta" id="waitlist">
          <div className="cta-glow" aria-hidden="true" />
          <span className="section-eyebrow">Your next useful thing</span>
          <h2>Let your best thinking<br /><em>travel further.</em></h2>
          <p>Build a reputation people can recognise—and trust.</p>
          <a className="cta-button" href="mailto:hello@byro.so">Start a conversation <ArrowUpRight size={17} /></a>
          <div className="cta-proof"><CheckCircle2 size={15} /> Human-approved by design</div>
        </section>
      </Reveal>
    </div>
  )
}
