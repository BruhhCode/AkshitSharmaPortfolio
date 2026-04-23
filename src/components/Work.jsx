import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'

// Category data with cover images optimized via Cloudinary transformations
const CATEGORIES = [
  {
    id: 'portrait',
    title: 'Portrait',
    subtitle: 'Capturing Essence',
    description: 'Expressive portraits that reveal personality and emotion through careful composition and lighting.',
    // Using Cloudinary transformation for optimized cover image
    cover: 'https://res.cloudinary.com/dlimc6j71/image/upload/v1775061972/DSC03464.JPG_pd9w1b.jpg',
    accent: 'from-amber-500/20 to-orange-600/30',
    count: 5
  },
  {
    id: 'concert',
    title: 'Concert',
    subtitle: 'Live Energy',
    description: 'Dynamic concert photography capturing the raw energy and atmosphere of live performances.',
    cover: 'https://res.cloudinary.com/dlimc6j71/image/upload/v1775096917/DSC03698.jpg_xrek2l.jpg',
    accent: 'from-purple-500/20 to-pink-600/30',
    count: 11
  },
  {
    id: 'product',
    title: 'Product & Food',
    subtitle: 'Commercial Excellence',
    description: 'Clean, compelling product photography that elevates brands and drives conversions.',
    cover: 'https://res.cloudinary.com/dlimc6j71/image/upload/v1775104503/DSC01111_1.jpg_g6rwpy.jpg',
    accent: 'from-cyan-500/20 to-blue-600/30',
    count: 9
  },
  
]

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <Link 
        to={`/gallery/${category.id}`}
        className="group block relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/15 transition-all duration-500"
      >
        {/* Image container with aspect ratio */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
          
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
          
          {/* Image with zoom effect */}
          <motion.img
            src={category.cover}
            alt={category.title}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          
          {/* Floating badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 border border-white/10">
              {category.count} photos
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <motion.div
            initial={false}
            className="transform"
          >
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2 block">
              {category.subtitle}
            </span>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-50 transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-slate-300 line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              {category.description}
            </p>
            
            {/* CTA */}
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <span className="group-hover:text-amber-400 transition-colors">View Gallery</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-4 h-4 group-hover:text-amber-400 transition-colors"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </div>
          </motion.div>
        </div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </Link>
    </motion.div>
  )
}

const Work = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <section id="work" className="py-24 px-6 scroll-mt-20" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Selected Work
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Explore my photography collections across different genres. Click on any category to view the full gallery.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm">
            Looking for something specific? <a href="#contact" className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4">Let's discuss your project</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Work
