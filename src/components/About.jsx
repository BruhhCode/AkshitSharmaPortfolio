import React from 'react'

const About = () => {
  return (
    <section id="about" className="pf-section about">
      <div className="container about-inner">
        <div className="about-hero">
          <img
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&q=80&auto=format&fit=crop"
            alt="Photographer portrait"
            className="about-portrait"
          />
        </div>

        <div className="about-content">
          <h2>About Me</h2>
          <p className="lead">
            I’m Akki — a professional photographer specializing in landscape,
            portrait and commercial photography. I blend creative direction
            with technical precision to create striking images for brands and
            personal projects.
          </p>

          <ul className="stats">
            <li>
              <strong>10+</strong>
              <span>Years experience</span>
            </li>
            <li>
              <strong>500+</strong>
              <span>Projects</span>
            </li>
            <li>
              <strong>20+</strong>
              <span>Awards</span>
            </li>
          </ul>

          <p>
            Available for commissions and collaborations worldwide. I take a
            client-focused approach and deliver final images with careful
            retouching and color grading.
          </p>

          <a href="#work" className="btn-primary">View Work</a>
        </div>
      </div>
    </section>
  )
}

export default About
