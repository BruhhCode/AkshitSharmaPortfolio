import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import emailjs from '@emailjs/browser'

// EmailJS configuration - Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID  // e.g., 'service_xxx'
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID // e.g., 'template_xxx'
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY   // e.g., 'xxx...'

const Contact = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    budget: '', 
    message: '' 
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

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
    if (status === 'error') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const ews = validate()
    
    if (Object.keys(ews).length) {
      setErrors(ews)
      setStatus('idle')
      return
    }

    setStatus('sending')

    try {
      // EmailJS send
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'New inquiry from portfolio',
          budget: form.budget || 'Not specified',
          message: form.message,
          to_name: 'Akshit Sharma',
        },
        EMAILJS_PUBLIC_KEY
      )

      setStatus('success')
      setForm({ name: '', email: '', subject: '', budget: '', message: '' })
      setErrors({})
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  const inputClasses = (hasError) => `
    w-full rounded-xl bg-slate-800/50 border px-4 py-3 text-white 
    placeholder:text-slate-500 transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50
    ${hasError ? 'border-rose-500' : 'border-white/10 hover:border-white/20'}
  `

  return (
    <section id="contact" className="py-24 px-6 scroll-mt-20" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-slate-400 max-w-xl text-lg">
            Interested in collaborating? Tell me about your project and timeline — I'll reply within 48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info card */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-900/40 p-8 rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Let's collaborate</h3>
                <p className="text-sm text-slate-400">I'd love to hear from you</p>
              </div>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              Available for commissions, brand work and shooting. Based in Dehradun — available for on-location shoots.
            </p>

            <div className="space-y-4 mb-8">
              <a 
                href="mailto:akshitsharmaphotography04@gmail.com" 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-sm text-slate-200 group-hover:text-amber-400 transition-colors">akshitsharmaphotography04@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                  <p className="text-sm text-slate-200">+91 7876156503</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm text-slate-200">Dehradun, Uttarakhand</p>
                </div>
              </div>
            </div>

            {/* Services list */}
            <div>
              <h4 className="text-sm font-semibold text-slate-100 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Services
              </h4>
              <ul className="text-slate-400 text-sm space-y-2">
                {['Commercial Photography', 'Portraits & Headshots', 'Creative Direction', 'Retouching & Color Grading'].map((service, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-gradient-to-br from-slate-800/40 to-slate-900/30 p-8 rounded-2xl border border-white/5"
          >
            {/* Status messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-emerald-300">Message sent successfully!</p>
                  <p className="text-sm text-emerald-400/80">Thanks for reaching out. I'll get back to you within 48 hours.</p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-rose-300">Failed to send message</p>
                  <p className="text-sm text-rose-400/80">Please try again or email me directly.</p>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2 font-medium">Name *</label>
                <input 
                  value={form.name} 
                  onChange={handleChange('name')} 
                  className={inputClasses(errors.name)}
                  type="text" 
                  name="name" 
                  placeholder="Your name"
                  disabled={status === 'sending'}
                />
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-rose-400 text-xs mt-2 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2 font-medium">Email *</label>
                <input 
                  value={form.email} 
                  onChange={handleChange('email')} 
                  className={inputClasses(errors.email)}
                  type="email" 
                  name="email" 
                  placeholder="you@domain.com"
                  disabled={status === 'sending'}
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-rose-400 text-xs mt-2 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2 font-medium">Subject</label>
                <input 
                  value={form.subject} 
                  onChange={handleChange('subject')} 
                  className={inputClasses(false)}
                  type="text" 
                  name="subject" 
                  placeholder="Project title or brief"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2 font-medium">Budget (optional)</label>
                <input 
                  value={form.budget} 
                  onChange={handleChange('budget')} 
                  className={inputClasses(false)}
                  type="text" 
                  name="budget" 
                  placeholder="₹5k - ₹10k"
                  disabled={status === 'sending'}
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-slate-300 mb-2 font-medium">Message *</label>
              <textarea 
                value={form.message} 
                onChange={handleChange('message')} 
                className={`${inputClasses(errors.message)} resize-none`}
                name="message" 
                rows="5" 
                placeholder="Tell me about your project, timeline and goals..."
                disabled={status === 'sending'}
              />
              {errors.message && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-rose-400 text-xs mt-2 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.message}
                </motion.p>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Prefer email? <a href="mailto:aksh1t04@gmail.com" className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4">aksh1t04@gmail.com</a>
              </p>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="relative bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/50 text-slate-900 font-semibold px-8 py-3 rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all duration-300 flex items-center gap-2 group"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
