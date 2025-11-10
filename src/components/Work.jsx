import React, { useMemo, useRef, useState, useEffect } from 'react'

const GALLERY = {
  Portrait: [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519340333755-1b4a6d4b7b44?w=1200&q=80&auto=format&fit=crop'
  ],
  Nature: [
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop'
  ],
  Product: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526178615830-0a7a1a7a6f0a?w=1200&q=80&auto=format&fit=crop'
  ]
}

const allImages = Object.values(GALLERY).flat()

const Work = () => {
  const genres = useMemo(() => ['All', ...Object.keys(GALLERY)], [])
  const [genre, setGenre] = useState('All')
  const [items, setItems] = useState(allImages)

  // modal state
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    setItems(genre === 'All' ? allImages : GALLERY[genre])
  }, [genre])

  useEffect(() => {
    if (open && scrollRef.current) {
      const el = scrollRef.current
      // wait a tick to ensure layout
      requestAnimationFrame(() => {
        el.scrollLeft = index * el.clientWidth
      })
    }
  }, [open, index])

  // ensure index is in range when items change
  useEffect(() => {
    setIndex((cur) => Math.max(0, Math.min(items.length - 1, cur)))
  }, [items.length])

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, items.length - 1))
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, items.length])

  // cleanup RAF when component unmounts
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const openAt = (i) => {
    setIndex(i)
    setOpen(true)
  }

  const scrollBy = (dir = 1) => {
    if (!scrollRef.current) return
    const w = scrollRef.current.clientWidth
    scrollRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
    setIndex((cur) => Math.max(0, Math.min(items.length - 1, cur + dir)))
  }

  // touch / swipe support for mobile viewer
  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
    touchCurrentX.current = touchStartX.current
  }

  const onTouchMove = (e) => {
    touchCurrentX.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  const onTouchEnd = () => {
    const dx = touchStartX.current - touchCurrentX.current
    const threshold = 50
    if (dx > threshold) {
      // swipe left -> next
      scrollBy(1)
    } else if (dx < -threshold) {
      // swipe right -> prev
      scrollBy(-1)
    }
  }

  // keep index in sync when user scrolls the viewer directly
  const rafRef = useRef(null)
  const onScroll = () => {
    if (!scrollRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      setIndex((cur) => (cur === idx ? cur : idx))
    })
  }

  return (
    <section id="work" className="py-16 px-7 scroll-mt-2">
  <div className="mx-auto max-w-6xl pt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Selected Work</h2>
            <p className="text-slate-300">Browse by genre and open a scrollable viewer to explore each set.</p>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide ">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`min-w-[72px] text-sm px-3 py-2 rounded-md ${genre === g ? 'bg-yellow-400 text-slate-900 font-semibold' : 'text-slate-300 bg-slate-800/30 hover:bg-slate-800/50'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
        </div>
  <div className="mx-auto max-w-6xl pt-10 h-220 overflow-y-scroll scrollbar-custom">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {items.map((src, i) => (
            <figure key={src + i} className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer border border-transparent hover:border-white/6" onClick={() => openAt(i)}>
              <img loading="lazy" src={src} alt={`Work ${i + 1}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              <figcaption className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{genre === 'All' ? `Image ${i + 1}` : `${genre} ${i + 1}`}</h3>
                    <p className="text-xs text-slate-200">Click to open viewer</p>
                  </div>
                  <span className="text-xs bg-white/8 text-white px-2 py-1 rounded">{genre === 'All' ? 'Mixed' : genre}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Modal / Scrollable viewer */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="relative w-full sm:max-w-6xl h-screen sm:h-[82vh] bg-gradient-to-b from-slate-900 to-slate-950 sm:rounded-xl rounded-none overflow-hidden shadow-2xl">
            <button onClick={() => setOpen(false)} aria-label="Close viewer" className="absolute top-4 right-4 z-50 bg-white/6 text-white rounded-md px-3 py-1">✕</button>

            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
              <button onClick={() => scrollBy(-1)} aria-label="Previous image" className="bg-white/6 text-white rounded-full w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation">◀</button>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
              <button onClick={() => scrollBy(1)} aria-label="Next image" className="bg-white/6 text-white rounded-full w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center touch-manipulation">▶</button>
            </div>

            <div ref={scrollRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onScroll={onScroll} className="h-[calc(100%-96px)] w-full flex snap-x snap-mandatory overflow-x-auto scrollbar-hide bg-black/60">
              {items.map((src, i) => (
                <div key={src + i} className="min-w-full h-full flex items-center justify-center snap-center p-6">
                  <img loading="lazy" src={src} alt={`Viewer ${i + 1}`} className="max-h-[92%] max-w-full object-contain rounded-lg shadow-lg" />
                </div>
              ))}
            </div>

            {/* Thumbnails strip */}
            <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
              <div className="flex items-center justify-center mb-2">
                <div className="text-sm text-slate-300">{index + 1} / {items.length}</div>
              </div>

              <div className="flex gap-2 overflow-x-auto px-2 scrollbar-hide">
                {items.map((src, i) => (
                  <button key={src + i} onClick={() => { setIndex(i); if (scrollRef.current) scrollRef.current.scrollLeft = i * scrollRef.current.clientWidth }} className={`flex-shrink-0 rounded-md overflow-hidden ${i === index ? 'ring-2 ring-yellow-400' : 'ring-0'}`} aria-label={`Open image ${i + 1}`}>
                    <img loading="lazy" src={src} alt={`thumb ${i + 1}`} className={`w-28 h-16 sm:w-24 sm:h-14 object-cover ${i === index ? 'opacity-100' : 'opacity-80'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Work
