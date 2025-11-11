import React, { useMemo, useRef, useState, useEffect } from 'react'

const GALLERY = {
  Portrait: [
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877834/DSC03368-2_hoqtyk.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877833/DSC03356_hxd875.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877826/DSC03981_qhlfwf.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877826/DSC06253_lpa0mi.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877823/DSC03991_k1wjff.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877838/DSC03292_kwk3lp.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC07456_xps44p.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC07438_az3auz.jpg'
  ],
  Concert: [
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877802/DSC_0575_jiseyh.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877797/IMG_7081_jotpbp.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877796/DSC_0503_1_clhwgm.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877806/DSC_0499_flpjmo.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877796/DSC_0531_lylkm9.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877792/IMG_5741_eha65a.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877795/DSC_0577_1_z5dri5.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877784/IMG_7073_jjxfqd.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877784/DSC_0670_y1czfd.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877784/IMG_7099_keq3zm.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877809/_MG_0635_kjh7hr.jpg'
  ],
  Product: [
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877809/5_fhvwuk.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877807/IMG-20251029-WA0051_bmsqbf.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877816/DSC05237_rve5p1.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC05446_xcztd2.jpg',
    'https://res.cloudinary.com/dn3jwglqf/image/upload/v1762877818/DSC05364_uk3itr.jpg'
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
  <div className="mx-auto max-w-6xl  h-145 overflow-y-scroll scrollbar-custom">

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
                  <span className="text-xs bg-white/8 text-white px-2 py-1 rounded">{genre === 'All' ? '' : genre}</span>
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
