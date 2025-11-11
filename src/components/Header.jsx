import React from 'react'

const Header = () => {
  return (
    <header className="fixed top-0 z-50 bg-white/3 backdrop-blur border-b border-white/6" role="banner">
      <div className="mx-auto w-dvw px-6 py-3 flex lg:justify-center lg:gap-150 gap-12">
        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 rounded-md bg-yellow-400 text-slate-900 flex items-center justify-center font-bold">AK</div>
           */}
           <img src="/Icon.jpg" alt="" className='h-12 w-12' />
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold leading-tight">Akshit Sharma Photography</h1>
            <p className="text-xs text-slate-300">Commercial Photographer</p>
          </div>
        </div>

        <nav className="flex items-center" role="navigation" aria-label="Primary">
          <a href="#about" className="text-sm text-slate-300 hover:text-white ml-4">About</a>
          <a href="#work" className="text-sm text-slate-300 hover:text-white ml-4">My Work</a>
          <a href="#contact" className="ml-4 inline-block text-sm font-semibold text-white border border-white/10 px-3 py-1 rounded-md hover:bg-white/5">Contact</a>
          {/* <a href="#contact" className="ml-4 inline-block text-sm font-semibold text-white border border-white/10 px-3 py-1 rounded-md hover:bg-white/5">Hire me</a> */}
        </nav>
      </div>
    </header>
  )
}

export default Header
