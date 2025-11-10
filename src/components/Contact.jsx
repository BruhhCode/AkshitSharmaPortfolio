import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="pf-section contact">
      <div className="container contact-inner">
        <div className="section-header">
          <h2>Contact</h2>
          <p className="muted">Let's work together — say hello.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Get in touch</h3>
            <p>
              Email: <a href="mailto:akki@example.com">akki@example.com</a>
            </p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Based in: New York, USA — Available worldwide</p>
          </div>

          <form className="contact-form" onSubmit={(e)=> e.preventDefault()}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>

            <label>
              Email
              <input type="email" name="email" placeholder="you@domain.com" />
            </label>

            <label>
              Message
              <textarea name="message" rows="5" placeholder="Tell me about your project" />
            </label>

            <button className="btn-primary" type="submit">Send message</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
