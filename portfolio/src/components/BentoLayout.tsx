import { useState, useEffect, useRef, useLayoutEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { ScrollContainerContext } from '../contexts/ScrollContainerContext'

import img1 from '../assets/Generated Image January 21, 2026 - 2_36PM.jpeg'
import img2 from '../assets/Generated Image January 21, 2026 - 2_51PM.jpeg'
import img3 from '../assets/Generated Image January 21, 2026 - 2_59PM.jpeg'
import img4 from '../assets/Generated Image January 21, 2026 - 3_28PM.jpeg'
import img5 from '../assets/Generated Image January 21, 2026 - 3_34PM.jpeg'
import img6 from '../assets/Generated Image January 22, 2026 - 1_54PM.jpeg'
import img7 from '../assets/Generated Image January 22, 2026 - 1_57PM.jpeg'
import img8 from '../assets/Generated Image January 22, 2026 - 2_01PM.jpeg'

import film1 from '../assets/film1.png'
import film2 from '../assets/film2.jpg'
import film3 from '../assets/film3.png'
import film4 from '../assets/film4.png'
import film5 from '../assets/film5.png'
import film6 from '../assets/film6.png'
import film7 from '../assets/film7.png'
import film8 from '../assets/film8.jpeg'

gsap.registerPlugin(ScrollTrigger)

const loaderImages = [img1, img2, img3, img4, img5, img6, img7, img8]
const filmImages = [film1, film2, film3, film4, film5, film6, film7, film8]

const navLinks = [
  { label: 'work', href: '#work' },
  { label: 'skills', href: '#skills' },
  { label: 'graphic design', href: '#gallery' },
  { label: 'contact', href: '#contact' },
]

const roles = ['UX/UI designer', 'Full-stack developer', 'Frontend developer']

const dadJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "What do you call a fake noodle? An impasta.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "I used to hate facial hair, but then it grew on me.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why did the scarecrow win an award? He was outstanding in his field.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "What do you call a bear with no teeth? A gummy bear.",
]

interface BentoLayoutProps {
  children: ReactNode
  currentMood: number
  onCycleMood?: () => void
}

const BentoLayout = ({ children, currentMood }: BentoLayoutProps) => {
  const [showLoader, setShowLoader] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 5000)
    return () => clearInterval(id)
  }, [])

  const [showJoke, setShowJoke] = useState(false)
  const [currentJoke, setCurrentJoke] = useState('')
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null)
  const [resolvedColors, setResolvedColors] = useState({ bg: '#0a0a0a', text: '#ffffff', font: 'monospace' })
  const jokeTriggerRef = useRef<HTMLSpanElement>(null)

  const handleJokeEnter = useCallback(() => {
    const joke = dadJokes[Math.floor(Math.random() * dadJokes.length)]
    setCurrentJoke(joke)
    if (jokeTriggerRef.current) {
      setTooltipRect(jokeTriggerRef.current.getBoundingClientRect())
      const styles = getComputedStyle(jokeTriggerRef.current)
      setResolvedColors({
        bg: styles.getPropertyValue('--color-bg').trim() || '#0a0a0a',
        text: styles.getPropertyValue('--color-text').trim() || '#ffffff',
        font: styles.getPropertyValue('--font-office-code').trim() || 'monospace',
      })
    }
    setShowJoke(true)
  }, [])

  const handleJokeLeave = useCallback(() => {
    setShowJoke(false)
  }, [])

  const [showFilms, setShowFilms] = useState(false)
  const [filmPositions, setFilmPositions] = useState<{ x: number; y: number; rotate: number }[]>([])
  const filmTriggerRef = useRef<HTMLSpanElement>(null)
  const rightPanelRef = useRef<HTMLElement>(null)

  const generateFilmPositions = useCallback(() => {
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const cols = 4
    const rows = 2
    const titleZone = 120
    const padding = 30
    const availW = screenW - padding * 2
    const availH = screenH - titleZone - padding
    const cellW = availW / cols
    const cellH = availH / rows

    const cells: { col: number; row: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ col: c, row: r })
      }
    }
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]]
    }

    return cells.slice(0, filmImages.length).map(cell => {
      const jitterX = (Math.random() - 0.5) * cellW * 0.3
      const jitterY = (Math.random() - 0.5) * cellH * 0.25
      return {
        x: padding + cell.col * cellW + cellW / 2 - 100 + jitterX,
        y: titleZone + cell.row * cellH + cellH / 2 - 135 + jitterY,
        rotate: Math.random() * 14 - 7,
      }
    })
  }, [])

  const handleFilmEnter = useCallback(() => {
    setFilmPositions(generateFilmPositions())
    setShowFilms(true)
  }, [generateFilmPositions])

  const handleFilmLeave = useCallback(() => {
    setShowFilms(false)
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const loaderTextRef = useRef<HTMLDivElement>(null)
  const loaderImgRef = useRef<HTMLDivElement>(null)
  const loaderLRef = useRef<HTMLSpanElement>(null)
  const sidebarObelRef = useRef<HTMLDivElement>(null)
  const bentoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showLoader) return
    const id = setInterval(() => setImgIdx(i => (i + 1) % loaderImages.length), 80)
    return () => clearInterval(id)
  }, [showLoader])

  useLayoutEffect(() => {
    const timelines: gsap.core.Timeline[] = []

    if (bentoRef.current) gsap.set(bentoRef.current, { opacity: 0 })
    if (loaderLRef.current) gsap.set(loaderLRef.current, { x: '0.55em' })

    const tl = gsap.timeline({ onComplete: runMinimize })
    timelines.push(tl)

    tl.to({}, { duration: 2.0 })
    tl.to(loaderImgRef.current, { opacity: 0, duration: 0.8, ease: 'power3.inOut' })
    tl.to(loaderLRef.current, { x: 0, duration: 0.8, ease: 'power3.inOut' }, '<')
    tl.to({}, { duration: 0.3 })

    function runMinimize() {
      const from = loaderTextRef.current
      const to = sidebarObelRef.current
      const bento = bentoRef.current
      const overlay = loaderRef.current

      if (!from || !to || !bento || !overlay) {
        done()
        return
      }

      const fr = from.getBoundingClientRect()
      const tr = to.getBoundingClientRect()
      const scale = tr.height / fr.height
      const dx = tr.left + tr.width / 2 - (fr.left + fr.width / 2)
      const dy = tr.top + tr.height / 2 - (fr.top + fr.height / 2)

      const tl2 = gsap.timeline({ onComplete: done })
      timelines.push(tl2)

      tl2.to(from, { x: dx, y: dy, scale, duration: 1.0, ease: 'power3.inOut' })
      tl2.to(bento, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.7')
      tl2.to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    }

    function done() {
      setShowLoader(false)
      setShowContent(true)
      setTimeout(() => ScrollTrigger.refresh(), 200)
    }

    return () => timelines.forEach(t => t.kill())
  }, [])

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    const container = scrollRef.current
    if (el && container) {
      const containerRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const scrollTop = container.scrollTop + elRect.top - containerRect.top
      container.scrollTo({ top: scrollTop, behavior: 'smooth' })
    }
  }


  return (
    <>
      {/* ═══ Loader Overlay ═══ */}
      {showLoader && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div
            ref={loaderTextRef}
            className="flex items-center tracking-tighter"
            style={{
              fontFamily: 'var(--font-office-code)',
              fontWeight: 400,
              fontSize: '20vw',
              lineHeight: '0.8',
              color: 'var(--color-text)',
            }}
          >
            <span style={{ position: 'relative' }}>
              obe
              <div
                ref={loaderImgRef}
                className="absolute overflow-hidden rounded-md flex items-center justify-center"
                style={{
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '0.55em',
                  height: '0.85em',
                  fontSize: 'inherit',
                  marginLeft: '0.050em',
                }}
              >
                <img src={loaderImages[imgIdx]} alt="Loading" className="w-[95%] h-[95%] object-fill" />
              </div>
            </span>
            <span ref={loaderLRef} style={{ display: 'inline-block' }}>l</span>
          </div>
        </div>
      )}

      {/* ═══ Bento Layout ═══ */}
      <div ref={bentoRef} className="relative h-screen w-screen overflow-hidden">
        {/* Fallback bg — shows when video fails */}
        <div className="absolute inset-0 z-0" style={{ background: 'var(--color-bento-bg)' }} aria-hidden />
        {/* Background video — put background.mov in public/ for deployment */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src="/background.mov"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        {/* Bento grid */}
        <div
          className="relative h-full w-full flex overflow-hidden"
          style={{
            padding: '1.5% 1.5%',
            gap: '1%',
          }}
        >
        {/* ─── Left Column (3 stacked cards) ─── */}
        <div
          className="shrink-0 h-full flex flex-col"
          style={{ width: '32%', gap: '1%' }}
        >
          {/* Top Card — 15% — obel branding */}
          <div
            className="rounded-[32px] flex items-center overflow-hidden"
            style={{ background: 'var(--color-card-bg)', height: '10%', padding: '28px 30px' }}
          >
            <div
              ref={sidebarObelRef}
              className="text-4xl tracking-tighter"
              style={{
                fontFamily: 'var(--font-office-code)',
                fontWeight: 400,
                color: 'var(--color-text)',
              }}
            >
              obel
            </div>
          </div>

          {/* Middle Card — about me */}
          <div
            className="rounded-[32px] flex flex-col overflow-hidden"
            style={{ background: 'var(--color-card-bg)', height: '80%', padding: '28px 30px' }}
          >
            {/* Picture — left aligned, square */}
            <img
              src={img1}
              alt="Asger Obel"
              className="object-cover"
              style={{ width: '48px', height: '48px', marginBottom: '16px', borderRadius: '8px' }}
            />

            {/* First intro — name + animated role */}
            <p
              className="text-base leading-relaxed font-normal flex items-baseline"
              style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)', marginTop: '20px', fontSize: '17px' }}
            >
              <span>I'm Asger Obel — a&nbsp;</span>
              <span className="relative inline-flex overflow-hidden" style={{ height: '1.25em' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -14, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>

            {/* Second intro — personality + interactive triggers */}
            <p
              className="leading-relaxed font-normal"
              style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)', marginTop: '20px', fontSize: '12px' }}
            >
              When I'm not crafting interfaces or writing code, you'll probably find me being a self-proclaimed{' '}
              <span
                ref={jokeTriggerRef}
                className="relative inline-block cursor-pointer z-50"
                onMouseEnter={handleJokeEnter}
                onMouseLeave={handleJokeLeave}
              >
                <span
                  className="relative transition-colors duration-300"
                  style={{
                    borderBottom: '2px dashed currentColor',
                    paddingBottom: '2px',
                    opacity: showJoke ? 0.7 : 1,
                  }}
                >
                  dad joke enthusiast
                </span>
              </span>
              {' '}or diving deep into film as a devoted{' '}
              <span
                ref={filmTriggerRef}
                className="relative inline-block cursor-pointer z-50"
                onMouseEnter={handleFilmEnter}
                onMouseLeave={handleFilmLeave}
              >
                <span
                  className="relative transition-colors duration-300"
                  style={{
                    borderBottom: '2px dashed currentColor',
                    paddingBottom: '2px',
                    opacity: showFilms ? 0.7 : 1,
                  }}
                >
                  movie connoisseur
                </span>
              </span>
              . I like my coffee strong, my side projects unfinished — and I believe the best digital experiences come from a genuine curiosity for both design and technology.
            </p>

            {/* Details — adjust marginTop below to control how far down this sits */}
            <div className="flex flex-col gap-5" style={{ marginTop: '60px' }}>
              {[
                { label: 'Location', value: 'Aarhus, Denmark' },
                { label: 'Born', value: 'April 18, 1993' },
                { label: 'Focus', value: 'UX/UI Design, Full-Stack Development, Brand Identity' },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span
                    className="text-[10px] uppercase tracking-widest opacity-40"
                    style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dad joke blur overlay */}
          <AnimatePresence>
            {showJoke && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 pointer-events-none"
                style={{
                  backdropFilter: 'blur(1px)',
                  WebkitBackdropFilter: 'blur(1px)',
                  background: 'rgba(0, 0, 0, 0.15)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Dad joke tooltip portal */}
          {createPortal(
            <AnimatePresence>
              {showJoke && tooltipRect && (
                <motion.span
                  key="sidebar-dad-joke"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="fixed rounded-lg pointer-events-none"
                  style={{
                    fontFamily: resolvedColors.font,
                    background: resolvedColors.text,
                    color: resolvedColors.bg,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    maxWidth: '300px',
                    whiteSpace: 'normal',
                    padding: '16px 20px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    top: tooltipRect.bottom + 10,
                    left: tooltipRect.left + tooltipRect.width / 2,
                    transform: 'translateX(-50%)',
                    zIndex: 100,
                  }}
                >
                  {currentJoke}
                </motion.span>
              )}
            </AnimatePresence>,
            document.body,
          )}

          {/* Film: blur + title pill + scattered images — all in one portal */}
          {createPortal(
            <AnimatePresence>
              {showFilms && filmPositions.length > 0 && (
                <>
                  {/* Blur overlay */}
                  <motion.div
                    key="film-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 pointer-events-none"
                    style={{
                      zIndex: 90,
                      backdropFilter: 'blur(2px)',
                      WebkitBackdropFilter: 'blur(2px)',
                      background: 'rgba(0, 0, 0, 0.18)',
                    }}
                  />

                  {/* Title pill — centered top, solid background, above blur */}
                  <motion.div
                    key="film-title"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: 1, ease: 'easeOut' } }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.3, delay: 0, ease: 'easeOut' } }}
                    className="fixed pointer-events-none flex justify-center"
                    style={{
                      zIndex: 200,
                      top: '32px',
                      left: 0,
                      right: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-office-code)',
                        color: '#1a1a1a',
                        fontSize: '20px',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        background: '#ffffff',
                        padding: '16px 38px',
                        borderRadius: '9999px',
                        boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      and i love photoshop also
                    </span>
                  </motion.div>

                  {/* Scattered film images — grid cells, no overlap */}
                  {filmImages.map((src, i) => (
                    <motion.div
                      key={`film-scatter-${i}`}
                      initial={{ opacity: 0, scale: 0.7, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="fixed pointer-events-none rounded-xl overflow-hidden"
                      style={{
                        top: filmPositions[i].y,
                        left: filmPositions[i].x,
                        width: '200px',
                        height: '270px',
                        transform: `rotate(${filmPositions[i].rotate}deg)`,
                        zIndex: 101 + i,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                      }}
                    >
                      <img
                        src={src}
                        alt={`Film ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>,
            document.body,
          )}

          {/* Bottom Card — email & socials */}
          <div
            className="rounded-[32px] flex flex-col overflow-hidden"
            style={{ background: 'var(--color-card-bg)', height: '10%', padding: '20px 30px' }}
          >
            <a
              href="mailto:asgerobel@gmail.com"
              className="text-xs hover:opacity-60 transition-opacity block"
              style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
            >
              asgerobel@gmail.com
            </a>
            {/* Socials — adjust marginTop here to move links up/down */}
            <div className="flex gap-4" style={{ marginTop: '5px' }}>
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'X', href: 'https://x.com' },
                { label: 'GitHub', href: 'https://github.com' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] hover:opacity-60 transition-opacity opacity-50"
                  style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right Panel (outer shell + inner card) ─── */}
        <main
          ref={rightPanelRef}
          className="flex-1 h-full rounded-[32px] flex flex-col overflow-hidden relative"
          style={{ background: 'var(--color-card-outer)' }}
        >
          {/* Nav lives in the outer grey shell — left edge aligns with inner card */}
          <nav
            className="flex items-center shrink-0"
            style={{ marginLeft: '8px', marginRight: '6px', marginTop: '4px', gap: '4px' }}
          >
            {navLinks.map(link => (
              <MagneticButton key={link.label} strength={0.3}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                  className="block hover:opacity-70 transition-opacity tracking-wide rounded-full"
                  style={{
                    fontFamily: 'var(--font-office-code)',
                    color: 'var(--color-text)',
                    fontSize: '14px',
                    background: 'var(--color-card-bg)',
                    padding: '10px 20px',
                  }}
                >
                  {link.label}
                </a>
              </MagneticButton>
            ))}
          </nav>

          {/* Inner white card — scrollable content */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto no-scrollbar rounded-[32px]"
            style={{ background: 'var(--color-card-bg)', margin: '5px 6px 6px 6px' }}
          >
            <ScrollContainerContext.Provider value={scrollRef}>
              {showContent && children}
            </ScrollContainerContext.Provider>
          </div>
        </main>
        </div>
      </div>
    </>
  )
}

export default BentoLayout
