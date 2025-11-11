import Header from './components/Header'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-900 via-gray-900 to-gray-950 text-white">
      <Header />

      <main>
        <About />
        <Work />
        <Contact />
      </main>

      <footer className="py-8 text-center text-slate-400">
        <div className="mx-auto max-w-5xl px-6">© {new Date().getFullYear()} Akki Photography — All rights reserved</div>
        <div className="mx-auto max-w-5xl px-6">Made with Love by <span className='text-yellow-400 cursor-pointer'><a href='https://lokeshdhariyal.me' >Loki</a></span></div>
      </footer>
    </div>
  )
}

export default App
