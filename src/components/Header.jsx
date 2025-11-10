import React from 'react'

const Header = () => {
  return (
    <header className="pf-header">
      <div className="container header-inner">
        <div className="brand">
          <div className="logo">AK</div>
          <div className="brand-text">
            <h1 className="name">Akki Photography</h1>
            <p className="tag">Fine Art & Commercial Photographer</p>
          </div>
        </div>

        <nav className="nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
