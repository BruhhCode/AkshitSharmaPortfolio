import React from 'react'

const images = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=1200&q=80&auto=format&fit=crop'
]

const Work = () => {
  return (
    <section id="work" className="pf-section work">
      <div className="container">
        <div className="section-header">
          <h2>Selected Work</h2>
          <p className="muted">A curated selection of recent projects.</p>
        </div>

        <div className="gallery">
          {images.map((src, i) => (
            <figure key={i} className="gallery-item">
              <img src={src} alt={`Work ${i + 1}`} />
              <figcaption>
                <h3>Project Title {i + 1}</h3>
                <p className="muted">Editorial / Commercial</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
