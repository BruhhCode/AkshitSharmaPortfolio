import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import './styles/portfolio.css'

function App() {
  return (
    <div>
      <Header />

      <main>
        <About />
        <Work />
        <Contact />
      </main>

      <footer className="pf-footer" style={{padding:'32px 0',textAlign:'center',color:'var(--muted)'}}>
        <div className="container">© {new Date().getFullYear()} Akki Photography — All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
