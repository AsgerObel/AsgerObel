import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import MagneticButton from './MagneticButton'
import placeholderImg from '../assets/americanp.png'
import fightclubImg from '../assets/fightclub.png'
import matrixImg from '../assets/matrix.png'
import mibImg from '../assets/mib3.png'

// Loader images
import img1 from '../assets/Generated Image January 21, 2026 - 2_36PM.jpeg'
import img2 from '../assets/Generated Image January 21, 2026 - 2_51PM.jpeg'
import img3 from '../assets/Generated Image January 21, 2026 - 2_59PM.jpeg'
import img4 from '../assets/Generated Image January 21, 2026 - 3_28PM.jpeg'
import img5 from '../assets/Generated Image January 21, 2026 - 3_34PM.jpeg'
import img6 from '../assets/Generated Image January 22, 2026 - 1_54PM.jpeg'
import img7 from '../assets/Generated Image January 22, 2026 - 1_57PM.jpeg'
import img8 from '../assets/Generated Image January 22, 2026 - 2_01PM.jpeg'

const loaderImages = [img1, img2, img3, img4, img5, img6, img7, img8]

const translations = {
  en: {
    work: 'work',
    about: 'about',
    graphicDesign: 'graphic design',
    contact: 'contact',
    role1: 'UX/UI - DESIGNER',
    role2: 'FULL-STACK DEVELOPER',
    bio: 'I\u2019m a UX/UI designer and full-stack developer based in Aarhus, Denmark, building digital products from first sketch to shipped solution.',
    moodBtn: 'change the mood',
    langBtn: 'DK'
  },
  da: {
    work: 'cases',
    about: 'om mig',
    graphicDesign: 'grafisk design',
    contact: 'kontakt',
    role1: 'UX/UI - DESIGNER',
    role2: 'FULL-STACK UDVIKLER',
    bio: 'Jeg er en UX/UI designer og full-stack udvikler baseret i Aarhus, Danmark, der bygger digitale produkter fra f\u00F8rste skitse til en f\u00E6rdig l\u00F8sning.',
    moodBtn: 'skift stemning',
    langBtn: 'EN'
  }
}

interface HeroProps {
  onCycleMood?: () => void
  currentMood?: number
  isLoading?: boolean
  onLoadingComplete?: () => void
}

const Hero = ({ onCycleMood, currentMood = 1, isLoading = false, onLoadingComplete }: HeroProps) => {
  const [lang, setLang] = useState<'en' | 'da'>('en')
  const [currentLoaderImageIndex, setCurrentLoaderImageIndex] = useState(0)
  const t = translations[lang]

  const containerRef = useRef<HTMLDivElement>(null)
  const topGridRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const loaderImageRef = useRef<HTMLDivElement>(null)
  const lRef = useRef<HTMLSpanElement>(null)
  const gridLineRef = useRef<HTMLDivElement>(null)
  const bottomSectionRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)

  // Loader Image Cycle
  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setCurrentLoaderImageIndex(prev => (prev + 1) % loaderImages.length)
    }, 80)

    return () => clearInterval(interval)
  }, [isLoading])



  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isLoading) {
        // --- LOADING STATE ---
        // Hide everything except the "obel" title area
        gsap.set(rightColRef.current, { opacity: 0 })
        gsap.set(bottomSectionRef.current, { opacity: 0 })
        gsap.set(socialsRef.current, { opacity: 0 })
        gsap.set(emailRef.current, { opacity: 0 })
        if (gridLineRef.current) gsap.set(gridLineRef.current, { opacity: 0 })

        // Hide all grid borders
        gsap.set(topGridRef.current, { borderColor: 'transparent' })
        gsap.set(leftColRef.current, { borderColor: 'transparent', overflow: 'visible' })

        // Show the loader image (absolutely positioned - doesn't move anything)
        gsap.set(loaderImageRef.current, { opacity: 1 })
        // Shift "l" to the right visually using transform (doesn't affect layout)
        gsap.set(lRef.current, { x: '0.55em' })

        const tl = gsap.timeline({
          onComplete: () => {
            if (onLoadingComplete) onLoadingComplete()
          }
        })

        // 1. Hold for image cycling
        tl.to({}, { duration: 2.0 })

        // 2. Fade out image and slide "l" back to its normal position
        tl.to(loaderImageRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        })

        tl.to(lRef.current, {
          x: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '<')

        // 3. Restore overflow and reveal the grid borders
        tl.set(leftColRef.current, { overflow: 'hidden' })
        
        tl.to(topGridRef.current, {
          borderColor: 'var(--color-border)',
          duration: 0.6,
          ease: 'power2.out'
        })

        tl.to(leftColRef.current, {
          borderColor: 'var(--color-border)',
          duration: 0.6,
          ease: 'power2.out'
        }, '<')

        // 4. Reveal right column and grid line
        tl.to(rightColRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        }, '<')

        if (gridLineRef.current) tl.to(gridLineRef.current, { opacity: 1, duration: 0.6 }, '<')

        // 5. Reveal bottom section, socials, email
        tl.to(bottomSectionRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        }, '-=0.3')

        tl.to([socialsRef.current, emailRef.current], {
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }, '<')

      } else {
        // --- STANDARD STATE (after loading) ---
        gsap.set(topGridRef.current, { borderColor: 'var(--color-border)' })
        gsap.set(leftColRef.current, { borderColor: 'var(--color-border)' })
        gsap.set(rightColRef.current, { opacity: 1 })
        if (gridLineRef.current) gsap.set(gridLineRef.current, { opacity: 1 })
        gsap.set(bottomSectionRef.current, { opacity: 1 })
        gsap.set([socialsRef.current, emailRef.current], { opacity: 1 })
        gsap.set(loaderImageRef.current, { opacity: 0 })
        gsap.set(lRef.current, { x: 0 })
      }

    }, containerRef)

    return () => ctx.revert()
  }, [isLoading, onLoadingComplete])

  const borderColor = 'border-[var(--color-border)]'

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen flex flex-col relative"
      style={{ color: 'var(--color-text)' }}
    >
      {/* Top Grid Section */}
      <div ref={topGridRef} className={`grid grid-cols-1 md:grid-cols-2 border-b ${borderColor}`}>
        
        {/* Left Column - Huge Name */}
        <div 
          ref={leftColRef}
          className={`relative h-[30vh] md:h-[40vh] flex items-center justify-center border-b md:border-b-0 md:border-r ${borderColor} overflow-hidden`}
        >
          <h1 
            className="text-[25vw] md:text-[20vw] leading-[0.8] font-normal tracking-tighter"
            style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400, position: 'relative' }}
          >
            {/* "obe" - never moves */}
            <span style={{ position: 'relative' }}>
              obe

              {/* Loader image - absolutely positioned at right edge of "obe" */}
              {/* This NEVER affects the layout of any text */}
              <div 
                ref={loaderImageRef}
                className="absolute overflow-hidden rounded-md flex items-center justify-center"
                style={{ 
                  left: '100%', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  width: '0.55em', 
                  height: '0.85em', 
                  fontSize: 'inherit',
                  opacity: 0,
                  marginLeft: '0.050em'
                }}
              >
                <img 
                  src={loaderImages[currentLoaderImageIndex]} 
                  alt="Loading" 
                  className="w-[95%] h-[95%] object-fill"
                />
              </div>
            </span>

            {/* "l" - shifts right via transform during loading, back to 0 after */}
            <span ref={lRef} style={{ display: 'inline-block' }}>l</span>
          </h1>
        </div>

        {/* Right Column */}
        <div 
          ref={rightColRef}
          className="flex flex-col h-[30vh] md:h-[40vh] relative"
        >
          {/* Vertical Grid Line - removed */}

          {/* Top Row - Navigation */}
          <div 
            ref={navRef}
            className="flex items-center justify-center relative pl-[9.7vw] pr-6 pt-10 pb-6 md:pl-[5.5vw] md:pr-10 md:pt-16 md:pb-8"
            style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400, transform: 'translateY(1vh)' }}
          >
            <nav className="flex flex-wrap gap-4 md:gap-8 text-base font-normal" style={{ transform: 'translate(-9vw, 0.5vh)' }}>
              <MagneticButton strength={0.4}>
                <a href="#work" className="hover:opacity-60 transition-opacity">{t.work}</a>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <a href="#about" className="hover:opacity-60 transition-opacity">{t.about}</a>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <a href="#graphic-design" className="hover:opacity-60 transition-opacity">{t.graphicDesign}</a>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <a href="#contact" className="hover:opacity-60 transition-opacity">{t.contact}</a>
              </MagneticButton>
            </nav>
            <button 
              onClick={() => setLang(prev => prev === 'en' ? 'da' : 'en')}
              className="hidden md:block text-base font-normal absolute hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0" 
              style={{ color: 'var(--color-text)', right: '1vw', transform: 'translate(0, 0.5vh)', fontFamily: 'inherit' }}
            >
              {t.langBtn}
            </button>
          </div>

          {/* Bottom Row - Content */}
          <div 
            ref={contentRef}
            className="flex-1 p-6 md:p-10 flex flex-col justify-center items-center relative"
          >
            <div className="flex flex-col items-start" style={{ transform: 'translateX(-4.3vw)' }}>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-left"
                style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400 }}
              >
                {t.role1}
              </h2>
              <h3 
                className="text-sm md:text-base mt-2 tracking-widest uppercase font-medium text-left"
                style={{ fontFamily: 'var(--font-office-code)', fontWeight: 500, transform: 'translate(5px, 4vh)' }}
              >
                {t.role2}
              </h3>
              <p 
                className="text-xs md:text-sm mt-4 text-left leading-relaxed max-w-[320px]"
                style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400, transform: 'translate(5px, 4vh)' }}
              >
                {t.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Mood Button & Image */}
      <div ref={bottomSectionRef} className="flex-1 w-full flex flex-col items-center justify-start pt-8 pb-20 gap-[calc(3vh+25px)]">
        
        {/* Change Mood Button (Replaces Scroll) */}
        <div className="translate-y-[7vh]">
          <MagneticButton strength={0.35}>
            <button 
              onClick={onCycleMood}
              className="rounded-full bg-transparent text-[var(--color-text)] font-medium tracking-wide text-sm border border-[var(--color-text)] hover:scale-105 transition-transform cursor-pointer"
              style={{ fontFamily: 'var(--font-office-code)', fontWeight: 500, padding: '2px 5px', color: 'var(--color-text)' }}
            >
              {t.moodBtn}
            </button>
          </MagneticButton>
        </div>
        
        {/* Hero Image */}
        <div className="flex flex-col items-center gap-4" style={{ marginTop: '75px' }}>
          <span className="text-sm md:text-base font-medium" style={{ fontFamily: 'var(--font-office-code)' }}>hi im asger</span>
          
          <div className="w-full flex justify-center items-center gap-6 md:gap-12">
            <span className="text-sm md:text-base font-medium" style={{ fontFamily: 'var(--font-office-code)' }}>1993</span>
            
            <div 
              ref={heroImageRef}
              className={`flex justify-center items-center transition-colors duration-500 bg-transparent shadow-none`}
              style={{ width: 'auto', maxWidth: '660px', height: '35vh' }}
            >
              <img 
                src={currentMood === 2 ? fightclubImg : currentMood === 3 ? matrixImg : currentMood === 4 ? mibImg : placeholderImg} 
                alt="Hero visual" 
                className={`w-auto h-full object-contain object-center`}
              />
            </div>

            <span className="text-sm md:text-base font-medium" style={{ fontFamily: 'var(--font-office-code)' }}>18/4</span>
          </div>
        </div>
      </div>

      {/* Socials - Bottom Left */}
      <div ref={socialsRef} className="absolute bottom-4 left-8 flex gap-4 z-20" style={{ color: 'var(--color-text)' }}>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:opacity-60 transition-opacity text-sm md:text-base font-normal" 
          style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400 }}
        >
          Instagram
        </a>
        <a 
          href="https://x.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:opacity-60 transition-opacity text-sm md:text-base font-normal" 
          style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400 }}
        >
          X
        </a>
      </div>

      {/* Email - Bottom Right */}
      <div ref={emailRef} className="absolute bottom-4 right-8 flex flex-col items-end gap-1 z-20 text-right" style={{ color: 'var(--color-text)' }}>
        <span 
          className="text-lg md:text-xl font-normal" 
          style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400 }}
        >
          email me :)
        </span>
        <a 
          href="mailto:asgerobel@gmail.com" 
          className="text-xl md:text-2xl font-normal hover:opacity-60 transition-opacity" 
          style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400 }}
        >
          asgerobel@gmail.com
        </a>
      </div>
    </section>
  )
}

export default Hero
