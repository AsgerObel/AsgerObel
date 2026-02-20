import { useRef, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { useScrollContainer } from '../contexts/ScrollContainerContext'

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

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [showJoke, setShowJoke] = useState(false)
  const [currentJoke, setCurrentJoke] = useState('')
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null)
  const scrollContainerRef = useScrollContainer()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(scrollContainerRef ? { container: scrollContainerRef as any } : {}),
    offset: ['start end', 'end start'],
  })

  // Parallax: labels move slower, values move faster
  const labelsY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const valuesY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const [resolvedColors, setResolvedColors] = useState({ bg: '#0a0a0a', text: '#ffffff', font: 'monospace' })

  const handleMouseEnter = useCallback(() => {
    const joke = dadJokes[Math.floor(Math.random() * dadJokes.length)]
    setCurrentJoke(joke)
    if (triggerRef.current) {
      setTooltipRect(triggerRef.current.getBoundingClientRect())
      const styles = getComputedStyle(triggerRef.current)
      setResolvedColors({
        bg: styles.getPropertyValue('--color-bg').trim() || '#0a0a0a',
        text: styles.getPropertyValue('--color-text').trim() || '#ffffff',
        font: styles.getPropertyValue('--font-office-code').trim() || 'monospace',
      })
    }
    setShowJoke(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowJoke(false)
  }, [])

  useEffect(() => {
    if (!showJoke || !triggerRef.current) return
    const updatePosition = () => {
      if (triggerRef.current) {
        setTooltipRect(triggerRef.current.getBoundingClientRect())
      }
    }
    updatePosition()
    const scroller = scrollContainerRef?.current
    if (scroller) scroller.addEventListener('scroll', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      if (scroller) scroller.removeEventListener('scroll', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [showJoke, scrollContainerRef])

  return (
    <>
      {/* Full-page blur overlay when dad joke is visible */}
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

      {/* Tooltip rendered in portal above blur - stays sharp and readable */}
      {createPortal(
        <AnimatePresence>
          {showJoke && tooltipRect && (
            <motion.span
              key="dad-joke-tooltip"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed rounded-lg text-sm md:text-base leading-relaxed pointer-events-none"
              style={{
                fontFamily: resolvedColors.font,
                background: resolvedColors.text,
                color: resolvedColors.bg,
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                maxWidth: '340px',
                whiteSpace: 'normal',
                padding: '2px 10px',
                top: tooltipRect.bottom + 12,
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

      <section
        id="about"
        ref={sectionRef}
        className="w-full flex flex-col items-center py-16 md:py-24"
        style={{ color: 'var(--color-text)' }}
      >
      {/* Section Title */}
      <ScrollReveal>
        <h2
          className="text-4xl md:text-6xl font-normal mb-24 md:mb-32"
          style={{ fontFamily: 'var(--font-office-code)' }}
        >
          about me
        </h2>
      </ScrollReveal>

      {/* Content */}
      <div className="w-full max-w-[900px] px-8 md:px-12 flex flex-col gap-12" style={{ marginTop: '2vh' }}>
        {/* Main intro */}
        <ScrollReveal delay={0.1}>
          <p
            className="text-lg md:text-2xl leading-relaxed font-normal"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            I'm Asger Obel — a UX/UI designer, full-stack developer, and{' '}
            <span
              ref={triggerRef}
              className="relative inline-block cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
            {' '}based in Aarhus, Denmark.
          </p>
        </ScrollReveal>

        {/* Details grid with parallax */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          style={{ marginTop: '5vh' }}
        >
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {[
              { label: 'Location', value: 'Aarhus, Denmark' },
              { label: 'Born', value: 'April 18, 1993' },
              { label: 'Focus', value: 'UX/UI Design, Full-Stack Development, Brand Identity' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={0.1 + i * 0.1}>
                <div className="flex flex-col gap-2">
                  <motion.span
                    className="text-xs uppercase tracking-widest opacity-50"
                    style={{ fontFamily: 'var(--font-office-code)', y: labelsY }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.span
                    className="text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-office-code)', y: valuesY }}
                  >
                    {item.value}
                  </motion.span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            {[
              {
                label: 'Background',
                value:
                  'I combine design thinking with technical execution to create digital experiences that feel intentional and polished — from concept to code.',
              },
              {
                label: 'Currently',
                value: 'Available for freelance projects and collaborations.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={0.15 + i * 0.1}>
                <div className="flex flex-col gap-2">
                  <motion.span
                    className="text-xs uppercase tracking-widest opacity-50"
                    style={{ fontFamily: 'var(--font-office-code)', y: labelsY }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-office-code)', y: valuesY }}
                  >
                    {item.value}
                  </motion.p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default About
