import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

// Gallery data with optimized Cloudinary URLs
const GALLERY_DATA = {
  portrait: {
    title: 'Portrait Photography',
    subtitle: 'Capturing Essence & Emotion',
    description: 'A collection of expressive portraits that reveal personality and emotion through careful composition, natural lighting, and authentic moments.',
    images: [
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877834/DSC03368-2_hoqtyk.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877826/DSC03981_qhlfwf.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877826/DSC06253_lpa0mi.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC07456_xps44p.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC07438_az3auz.jpg'
    ],
    accent: 'amber'
  },
  concert: {
    title: 'Concert Photography',
    subtitle: 'Live Energy & Performance',
    description: 'Dynamic concert photography capturing the raw energy, dramatic lighting, and electric atmosphere of live music performances.',
    images: [
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877802/DSC_0575_jiseyh.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877797/IMG_7081_jotpbp.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877806/DSC_0499_flpjmo.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877792/IMG_5741_eha65a.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877795/DSC_0577_1_z5dri5.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877809/_MG_0635_kjh7hr.jpg'
    ],
    accent: 'purple'
  },
  product: {
    title: 'Product Photography',
    subtitle: 'Commercial Excellence',
    description: 'Clean, compelling product photography that elevates brands, showcases details, and drives engagement and conversions.',
    images: [
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877809/5_fhvwuk.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877807/IMG-20251029-WA0051_bmsqbf.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877816/DSC05237_rve5p1.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC05446_xcztd2.jpg',
      'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC05364_uk3itr.jpg'
    ],
    accent: 'cyan'
  }
}

// Cloudinary transformation helper for optimized images
const getOptimizedUrl = (url, width = 800) => {
  // Insert Cloudinary transformations for auto format, quality, and width
  return url.replace('/upload/', `/upload/c_scale,w_${width},q_auto,f_auto/`)
}

const getThumbnailUrl = (url) => {
  return url.replace('/upload/', '/upload/c_fill,w_150,h_100,q_auto,f_auto/')
}

// Blur placeholder for progressive loading
const BlurImage = ({ src, alt, className, onClick }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      {/* Blur placeholder */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={getOptimizedUrl(src)}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

const GalleryPage = () => {
  const { category } = useParams()
  const galleryData = GALLERY_DATA[category]
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      
      switch (e.key) {
        case 'Escape':
          setLightboxOpen(false)
          break
        case 'ArrowRight':
          setCurrentIndex(prev => Math.min(prev + 1, galleryData.images.length - 1))
          break
        case 'ArrowLeft':
          setCurrentIndex(prev => Math.max(prev - 1, 0))
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, galleryData?.images?.length])

  // Sync scroll position with current index
  useEffect(() => {
    if (lightboxOpen && scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollLeft = currentIndex * scrollRef.current.clientWidth
      })
    }
  }, [lightboxOpen, currentIndex])

  // Touch/swipe support
  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX || e.clientX
    touchCurrentX.current = touchStartX.current
  }

  const onTouchMove = (e) => {
    touchCurrentX.current = e.touches?.[0]?.clientX || e.clientX
  }

  const onTouchEnd = () => {
    const dx = touchStartX.current - touchCurrentX.current
    const threshold = 50
    
    if (dx > threshold) {
      setCurrentIndex(prev => Math.min(prev + 1, galleryData.images.length - 1))
    } else if (dx < -threshold) {
      setCurrentIndex(prev => Math.max(prev - 1, 0))
    }
  }

  const scrollToImage = useCallback((index) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = index * scrollRef.current.clientWidth
    }
  }, [])

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  // Handle scroll sync
  const onScroll = useCallback(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setCurrentIndex(prev => prev === idx ? prev : idx)
  }, [])

  if (!galleryData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gallery not found</h1>
          <Link to="/" className="text-amber-400 hover:text-amber-300">← Back to home</Link>
        </div>
      </div>
    )
  }

  const accentColors = {
    amber: 'text-amber-400 bg-amber-400',
    purple: 'text-purple-400 bg-purple-400',
    cyan: 'text-cyan-400 bg-cyan-400'
  }

  const accent = accentColors[galleryData.accent] || accentColors.amber

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Back link */}
          <Link 
            to="/#work" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>

          {/* Title section */}
          <div className="mb-8">
            <span className={`text-xs font-semibold tracking-wider uppercase mb-3 block ${accent.split(' ')[0]}`}>
              {galleryData.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {galleryData.title}
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              {galleryData.description}
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{galleryData.images.length} Photos</span>
            </div>
            <div className={`h-1 w-1 rounded-full ${accent.split(' ')[1]}`} />
            <span>Click any image to view full size</span>
          </div>
        </motion.div>
      </div>

      {/* Gallery grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryData.images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 aspect-[4/5]">
                <BlurImage
                  src={src}
                  alt={`${galleryData.title} ${index + 1}`}
                  className="w-full h-full"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Image number */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-white/90">
                    {index + 1} / {galleryData.images.length}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-6xl mx-auto px-6 mt-16 text-center"
      >
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl p-8 border border-white/5">
          <h3 className="text-2xl font-bold mb-3">Like what you see?</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            I'm available for commissions, brand work, and creative collaborations. Let's create something amazing together.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <span>Get in Touch</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <div 
              className="relative w-full h-full max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation buttons */}
              {currentIndex > 0 && (
                <button
                  onClick={() => scrollToImage(currentIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {currentIndex < galleryData.images.length - 1 && (
                <button
                  onClick={() => scrollToImage(currentIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Main image carousel */}
              <div
                ref={scrollRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onScroll={onScroll}
                className="h-[calc(100%-120px)] w-full flex snap-x snap-mandatory overflow-x-auto scrollbar-hide pt-16"
              >
                {galleryData.images.map((src, i) => (
                  <div 
                    key={src} 
                    className="min-w-full h-full flex items-center justify-center snap-center px-4"
                  >
                    <motion.img
                      src={getOptimizedUrl(src, 1400)}
                      alt={`${galleryData.title} ${i + 1}`}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                ))}
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-sm text-slate-300">
                    {currentIndex + 1} / {galleryData.images.length}
                  </span>
                </div>
                
                <div className="flex gap-2 overflow-x-auto justify-center scrollbar-hide pb-2">
                  {galleryData.images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => scrollToImage(i)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                        i === currentIndex 
                          ? 'ring-2 ring-amber-400 opacity-100 scale-105' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getThumbnailUrl(src)}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-20 h-14 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default GalleryPage

