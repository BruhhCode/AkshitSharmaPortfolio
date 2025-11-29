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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
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
        <div className="mx-auto max-w-5xl px-6 mt-1">Made with Love by <span className='text-amber-400 hover:text-amber-300 transition-colors'><a href='https://lokeshdhariyal.me'>Loki</a></span></div>
      </footer>
    </div>
  )
}

export default App
