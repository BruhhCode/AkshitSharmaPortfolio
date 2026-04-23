import ColorBends from './Silk';
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Header from './components/Header'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import GalleryPage from './components/GalleryPage'
import './App.css'

function HomePage() {
  return (
    <>
      <About />
      <Work />
      <Contact />
    </>
  )
}

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <ColorBends
        colors={["#8a5cff", "#A855F7", "#9333ea"]}
        rotation={90}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        noise={0.15}
        parallax={0.5}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        transparent
        autoRotate={0}
        className="absolute inset-0 -z-10"
      />
      <Header />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery/:category" element={<GalleryPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="py-8 text-center text-slate-400 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">© {new Date().getFullYear()} Akshit Sharma Photography — All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
