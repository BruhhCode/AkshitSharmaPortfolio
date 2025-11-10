import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email.'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Tell me a bit more about the project (10+ characters).'
    return e
  }

  const handleChange = (k) => (ev) => {
    setForm((s) => ({ ...s, [k]: ev.target.value }))
    setErrors((err) => ({ ...err, [k]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const ews = validate()
    if (Object.keys(ews).length) {
      setErrors(ews)
      setSuccess(false)
      return
    }

    // fake submit: replace with real API call
    setTimeout(() => {
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', budget: '', message: '' })
      setErrors({})
    }, 600)
  }

  return (
    <section id="contact" className="pt-16 mx-7 scroll-mt-2">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold">Contact</h2>
          <p className="text-slate-300 max-w-xl">Interested in working together? Tell me about your project and timeline — I’ll reply within 48 hours.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info card */}
          <aside className="lg:col-span-1 bg-gradient-to-br from-slate-800/60 to-slate-900/50 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Let's collaborate</h3>
            <p className="text-slate-300 mb-4">Available for commissions, brand work and teaching. Based in New York — available worldwide for on-location shoots.</p>

            <ul className="space-y-3 text-sm">
              <li><strong className="text-slate-100">Email:</strong> <a href="mailto:akki@example.com" className="text-yellow-300 underline">akki@example.com</a></li>
              <li><strong className="text-slate-100">Phone:</strong> <span className="text-slate-300">+1 (555) 123-4567</span></li>
              <li><strong className="text-slate-100">Location:</strong> <span className="text-slate-300">New York, USA</span></li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-100 mb-2">Services</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>Commercial Photography</li>
                <li>Portraits & Headshots</li>
                <li>Creative Direction</li>
                <li>Retouching & Color Grading</li>
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <a href="#work" className="inline-block bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg">See portfolio</a>
              <a href="/Akki_CV.pdf" className="inline-block text-sm text-slate-200 border border-white/8 px-3 py-2 rounded-lg">Download CV</a>
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-2 bg-slate-900/40 p-6 rounded-2xl shadow-lg">
            {success && <div className="mb-4 rounded-md bg-emerald-800/60 p-3 text-emerald-200">Thanks — your message was sent. I’ll get back to you soon.</div>}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-200 mb-1">Name</label>
                <input value={form.name} onChange={handleChange('name')} className={`w-full rounded-md bg-transparent border px-3 py-2 text-white placeholder:text-slate-400 ${errors.name ? 'border-rose-500' : 'border-white/10'}`} type="text" name="name" placeholder="Your name" />
                {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-slate-200 mb-1">Email</label>
                <input value={form.email} onChange={handleChange('email')} className={`w-full rounded-md bg-transparent border px-3 py-2 text-white placeholder:text-slate-400 ${errors.email ? 'border-rose-500' : 'border-white/10'}`} type="email" name="email" placeholder="you@domain.com" />
                {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-slate-200 mb-1">Subject</label>
                <input value={form.subject} onChange={handleChange('subject')} className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 text-white placeholder:text-slate-400" type="text" name="subject" placeholder="Project title or brief" />
              </div>

              <div>
                <label className="block text-sm text-slate-200 mb-1">Budget (optional)</label>
                <input value={form.budget} onChange={handleChange('budget')} className="w-full rounded-md bg-transparent border border-white/10 px-3 py-2 text-white placeholder:text-slate-400" type="text" name="budget" placeholder="$5k - $10k" />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-slate-200 mb-1">Message</label>
              <textarea value={form.message} onChange={handleChange('message')} className={`w-full rounded-md bg-transparent border px-3 py-3 text-white placeholder:text-slate-400 ${errors.message ? 'border-rose-500' : 'border-white/10'}`} name="message" rows="6" placeholder="Tell me about your project, timeline and goals" />
              {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-300">Prefer not to use the form? Email me directly at <a href="mailto:akki@example.com" className="text-yellow-300 underline">akki@example.com</a></div>
              <button type="submit" className="bg-yellow-400 text-slate-900 font-semibold px-5 py-2 rounded-lg shadow">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
