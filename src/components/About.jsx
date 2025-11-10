import React from 'react'

const ServiceCard = ({ title, desc, icon }) => (
  <div className="group bg-slate-800/40 rounded-2xl p-6 hover:shadow-2xl transform hover:-translate-y-1 transition">
    <div className="w-12 h-12 rounded-lg bg-slate-700/40 flex items-center justify-center mb-4 text-yellow-300">{icon}</div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-sm text-slate-300 mb-4">{desc}</p>
    <a href="#contact" className="inline-block text-sm font-semibold text-white border border-white/10 px-3 py-1 rounded-md hover:bg-white/5">Book a consult</a>
  </div>
)

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="pt-30 scroll-mt-2">
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="text-sm text-yellow-300 font-semibold">Hi, I’m Akki</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Story-driven photography that elevates brands</h1>
          <p className="text-slate-300 text-lg">I create imagery with intention—carefully composed, color graded, and crafted to tell your story. I work with brands, agencies, and individuals to deliver visual work that performs.</p>

          <div className="flex items-center gap-4 mt-4">
            <a href="#work" className="inline-block bg-yellow-400 text-slate-900 font-semibold px-5 py-3 rounded-lg shadow">See portfolio</a>
            <a href="#contact" className="inline-block text-sm text-slate-200 border border-white/10 px-4 py-2 rounded-lg">Let's talk</a>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-xs text-slate-300">Years experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs text-slate-300">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">20+</div>
              <div className="text-xs text-slate-300">Awards</div>
            </div>
          </div>
        </div>

        <figure className="relative">
          <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&q=80&auto=format&fit=crop" alt="Portrait of Akki" className="rounded-3xl shadow-2xl w-full h-full object-cover" />
          <figcaption className="absolute left-6 bottom-6 bg-gradient-to-br from-slate-800/70 to-slate-900/40 backdrop-blur px-4 py-3 rounded-xl">
            <h3 className="text-sm font-semibold">Akki — Photographer</h3>
            <p className="text-xs text-slate-300">Available worldwide • akki@example.com</p>
          </figcaption>
        </figure>
      </div>

      {/* About me (detailed) */}
      <div className="mx-auto max-w-6xl px-6 mb-12">
        <div className="bg-slate-800/30 p-8 rounded-2xl">
          <h2 id="about-heading" className="text-2xl font-bold mb-4">About me</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-300 mb-4">I started as a landscape photographer, chasing light across remote locations. Over the years I expanded into portrait and commercial work, learning to balance creative direction with the exacting needs of clients. My work focuses on mood, texture, and authentic moments.</p>
              <p className="text-slate-300">I believe great photography starts with great collaboration. I help brands define a visual language, plan shoots efficiently, and deliver polished images ready for both web and print.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Approach</h4>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Pre-shoot concept and moodboarding</li>
                <li>Efficient on-location production and direction</li>
                <li>Professional retouching and color grading</li>
                <li>Deliverables optimized for web, social and print</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-2xl font-bold mb-6">Services</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2a2 2 0 00-2 2v6H6a2 2 0 00-2 2v6h16v-6a2 2 0 00-2-2h-4V4a2 2 0 00-2-2z"/></svg>}
            title="Commercial Photography"
            desc="High-end imagery for catalogs, e-commerce and advertising—delivered on-brand and on-time."
          />

          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>}
            title="Portraits & Headshots"
            desc="Polished professional headshots and expressive portraits for talent and teams."
          />

          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4 7h16v2H4zM4 11h10v2H4zM4 15h16v2H4z"/></svg>}
            title="Creative Direction"
            desc="Concept development, styling direction and location scouting to shape compelling image narratives."
          />

          <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3 3v18h18V3H3zm2 2h14v14H5V5z"/></svg>}
            title="Editing & Retouching"
            desc="Detailed retouching, color grading and file delivery in any format required for your project."
          />
        </div>
      </div>
    </section>
  )
}

export default About
