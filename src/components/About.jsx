import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const ServiceCard = ({ title, desc, icon, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/30 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-4 text-amber-400 group-hover:bg-amber-400/20 transition-colors duration-300">
          {icon}
        </div>
        <h4 className="text-lg font-bold mb-2 group-hover:text-amber-50 transition-colors">{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

const StatCard = ({ value, label, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="text-center px-4"
    >
      <div className="text-3xl md:text-4xl font-bold text-amber-400">{value}</div>
      <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

const About = () => {
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" })

  const services = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
      title: "Commercial Photography",
      desc: "High-end imagery for catalogs, e-commerce and advertising—delivered on-brand and on-time."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="8" r="5"/><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></svg>,
      title: "Portraits & Headshots",
      desc: "Polished professional headshots and expressive portraits for talent and teams."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
      title: "Creative Direction",
      desc: "Concept development, styling direction and location scouting to shape compelling narratives."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
      title: "Editing & Retouching",
      desc: "Detailed retouching, color grading and file delivery in any format required for your project."
    }
  ]

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "40+", label: "Projects" },
    { value: "5+", label: "Brands" }
  ]

  return (
    <section id="about" aria-labelledby="about-heading" className="pt-32 pb-16 scroll-mt-20">
      {/* Hero */}
      <div ref={heroRef} className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-xs font-semibold tracking-wider text-amber-400 uppercase mb-4 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20"
            >
              Hi, I'm Akshit Sharma
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Story-driven photography
              </span>
              <br />
              <span className="text-amber-400">that elevates brands</span>
            </h1>
          </div>
          
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            I create imagery with intention—carefully composed, color graded, and crafted to tell your story. I work with brands, agencies, and individuals to deliver visual work that performs.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a 
              href="#work" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all duration-300"
            >
              <span>See Portfolio</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/20 px-5 py-3 rounded-xl transition-all duration-300"
            >
              <span>Let's talk</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 pt-6 border-t border-white/5">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.figure 
          className="relative group cursor-pointer"
          initial={{ opacity: 0, x: 40 }}
          animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-transparent to-purple-600/10 rounded-3xl blur-2xl opacity-60" />
            
            <img 
              src="https://res.cloudinary.com/dn3jwglqf/image/upload/c_fill,w_600,h_750,q_auto,f_auto/v1762879465/akkiPro_iet5uo.jpg" 
              alt="Portrait of Akshit Sharma" 
              className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-white/10 transition-transform duration-500 group-hover:scale-105" 
              loading="eager"
            />
            
            {/* Floating card - visible on hover */}
            <div className="absolute left-4 right-4 bottom-4 bg-slate-900/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="text-sm font-semibold">Available for Projects</h3>
                  <p className="text-xs text-slate-400">Dehradun • akshitsharmaphotography04@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.figure>
      </div>

      {/* About me (detailed) */}
      <motion.div 
        ref={aboutRef}
        className="mx-auto max-w-6xl px-6 mt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/30 p-8 md:p-10 rounded-2xl border border-white/5">
          <h2 id="about-heading" className="text-2xl md:text-3xl font-bold mb-6">
            <span className="text-amber-400">About</span> me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                I started as a landscape photographer, chasing light across remote locations. Over the years I expanded into portrait and commercial work, learning to balance creative direction with the exacting needs of clients. My work focuses on mood, texture, and authentic moments.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I believe great photography starts with great collaboration. I help brands define a visual language, plan shoots efficiently, and deliver polished images ready for both web and print.
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6">
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                My Approach
              </h4>
              <ul className="space-y-3">
                {[
                  'Pre-shoot concept and moodboarding',
                  'Efficient on-location production and direction',
                  'Professional retouching and color grading',
                  'Deliverables optimized for web, social and print'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services */}
      <div className="mx-auto max-w-6xl px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 block">
            What I Offer
          </span>
          <h3 className="text-2xl md:text-3xl font-bold">Services</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
