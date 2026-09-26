import { ArrowRight } from 'lucide-react'

export default function ProductStorySection() {
  return (
    <section
      id="product"
      className="product-story-section"
      aria-labelledby="product-story-title"
    >
      <div className="product-story-section__inner">
        <div className="product-story-section__visual-target" data-product-preview-target aria-hidden="true" />

        <div className="product-story-section__copy">
          <span className="product-story-section__eyebrow">THE BYRO WORKSPACE</span>
          <h2 id="product-story-title">Every great story starts with the proof.</h2>
          <p>
            Bring interviews, customer evidence and product knowledge into one place.
            Byro helps your team turn what they know into content people can trust.
          </p>
          <a href="#how" className="product-story-section__link">
            Explore the workflow <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
