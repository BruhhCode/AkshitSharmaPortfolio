import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { href: isHome ? '#about' : '/#about', label: 'About' },
    { href: isHome ? '#work' : '/#work', label: 'Work' }
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/Icon.jpg" 
              alt="Akshit Sharma" 
              className="h-11 w-11 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-amber-400/50 transition-all duration-300" 
            />
            <div className="absolute inset-0 rounded-xl bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-tight tracking-tight group-hover:text-amber-50 transition-colors">
              Akshit Sharma
            </h1>
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              Commercial Photographer
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-1.5 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
          
          <a 
            href={isHome ? '#contact' : '/#contact'}
            className="ml-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30"
          >
            <span>Contact Me</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <nav className="px-6 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="block text-lg text-slate-300 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.a
                href={isHome ? '#contact' : '/#contact'}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-center text-lg font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 py-3 px-4 rounded-xl mt-4 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
