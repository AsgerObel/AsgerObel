import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }

      // Dot follows instantly
      gsap.set(dotRef.current, { x: e.clientX, y: e.clientY })
      // Ring trails with spring
      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => setHidden(false)
    const onMouseLeave = () => setHidden(true)

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, [data-cursor-hover], .cursor-hover, input, textarea'
      )
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovering(true))
        el.addEventListener('mouseleave', () => setHovering(false))
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // Run once + observe DOM changes for dynamically added elements
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      observer.disconnect()
    }
  }, [])

  // Animate ring scale on hover
  useEffect(() => {
    gsap.to(ringRef.current, {
      scale: hovering ? 1.8 : 1,
      opacity: hovering ? 0.4 : 0.6,
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(dotRef.current, {
      scale: hovering ? 0.5 : 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [hovering])

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: 'var(--color-text)',
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s ease, background-color 0.5s ease',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: '1.5px solid var(--color-text)',
          opacity: hidden ? 0 : 0.6,
          transition: 'opacity 0.3s ease, border-color 0.5s ease',
        }}
      />
    </>
  )
}

export default CustomCursor
