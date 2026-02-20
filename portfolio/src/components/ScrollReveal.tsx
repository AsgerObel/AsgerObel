import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollContainer } from '../contexts/ScrollContainerContext'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  distance?: number
  duration?: number
}

const ScrollReveal = ({
  children,
  className = '',
  style,
  delay = 0,
  distance = 60,
  duration = 1,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useScrollContainer()

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const scroller = scrollContainerRef?.current || undefined

    gsap.set(el, { y: distance, opacity: 0 })

    ScrollTrigger.create({
      trigger: el,
      scroller,
      start: 'top 85%',
      end: 'bottom 15%',
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
        })
      },
      onLeave: () => {
        gsap.to(el, {
          y: -distance,
          opacity: 0,
          duration: duration * 0.6,
          ease: 'power3.in',
        })
      },
      onEnterBack: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration,
          delay: delay * 0.5,
          ease: 'power3.out',
        })
      },
      onLeaveBack: () => {
        gsap.to(el, {
          y: distance,
          opacity: 0,
          duration: duration * 0.6,
          ease: 'power3.in',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [delay, distance, duration, scrollContainerRef])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

export default ScrollReveal
