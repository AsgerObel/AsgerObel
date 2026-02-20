import { useState, useEffect, useRef, useCallback } from 'react'

const colors = [
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#00ffff', // Cyan
  '#ff00ff', // Magenta
  '#ff8000', // Orange
  '#ffffff'  // White
]

const LOGO_WIDTH = 200
const LOGO_HEIGHT = 100

const Screensaver = () => {
  const [isActive, setIsActive] = useState(false)
  const [color, setColor] = useState(colors[0])
  const [pos, setPos] = useState({ x: 100, y: 100 })
  const [cornerHits, setCornerHits] = useState(0)
  const [bounds, setBounds] = useState({ width: 200, height: 100 })
  
  const velocity = useRef({ x: 1.5, y: 1.5 })
  const colorRef = useRef(colors[0]) // Track current color
  const timerRef = useRef<number>()
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Helper to change to a different color
  const changeColor = useCallback(() => {
    const currentColor = colorRef.current
    const availableColors = colors.filter(c => c !== currentColor)
    const nextColor = availableColors[Math.floor(Math.random() * availableColors.length)]
    colorRef.current = nextColor
    setColor(nextColor)
  }, [])

  // Measure logo size
  useEffect(() => {
    if (logoRef.current) {
      setBounds({
        width: logoRef.current.offsetWidth,
        height: logoRef.current.offsetHeight
      })
    }
  }, [isActive]) // Re-measure when active

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsActive(true)
      // Initialize random velocity (slower)
      velocity.current = {
        x: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 0.5),
        y: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 0.5)
      }
      const startColor = colors[Math.floor(Math.random() * colors.length)]
      colorRef.current = startColor
      setColor(startColor)
    }, 60000) // 1 minute
  }, [])

  const handleActivity = useCallback(() => {
    if (isActive) {
      setIsActive(false)
      // Reset position to random or center
      setPos({ x: Math.random() * (window.innerWidth - bounds.width), y: Math.random() * (window.innerHeight - bounds.height) })
    }
    startTimer()
  }, [isActive, startTimer, bounds])

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    const onActivity = () => handleActivity()
    events.forEach(event => window.addEventListener(event, onActivity))
    startTimer()
    return () => {
      events.forEach(event => window.removeEventListener(event, onActivity))
      if (timerRef.current) clearTimeout(timerRef.current)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [handleActivity, startTimer])

  const updatePosition = useCallback(() => {
    if (!isActive) return

    setPos(prev => {
      let newX = prev.x + velocity.current.x
      let newY = prev.y + velocity.current.y
      let hitX = false
      let hitY = false

      // Check collisions using actual bounds
      if (newX <= 0) {
        newX = 0
        velocity.current.x = Math.abs(velocity.current.x)
        hitX = true
      } else if (newX + bounds.width >= window.innerWidth) {
        newX = window.innerWidth - bounds.width
        velocity.current.x = -Math.abs(velocity.current.x)
        hitX = true
      }

      if (newY <= 0) {
        newY = 0
        velocity.current.y = Math.abs(velocity.current.y)
        hitY = true
      } else if (newY + bounds.height >= window.innerHeight) {
        newY = window.innerHeight - bounds.height
        velocity.current.y = -Math.abs(velocity.current.y)
        hitY = true
      }

      if (hitX || hitY) {
        changeColor()
        if (hitX && hitY) setCornerHits(prev => prev + 1)
      }

      return { x: newX, y: newY }
    })

    animationRef.current = requestAnimationFrame(updatePosition)
  }, [isActive, bounds, changeColor])

  useEffect(() => {
    if (isActive) {
      animationRef.current = requestAnimationFrame(updatePosition)
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isActive, updatePosition])

  return (
    <div 
      className={`fixed inset-0 bg-black z-[9999] overflow-hidden cursor-none transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      ref={containerRef}
    >
      <div 
        ref={logoRef}
        style={{ 
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          color: color
        }}
        className="absolute flex flex-col items-center justify-center font-bold leading-none select-none will-change-transform"
      >
        <div className="text-5xl italic tracking-wider" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          ASGER
        </div>
        <div className="mt-1 px-4 py-1 rounded-[50%] border-2 border-current text-xl tracking-[0.2em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          OBEL
        </div>
      </div>

      {/* Corner Hit Counter */}
      <div className="absolute bottom-8 right-8 text-white text-sm" style={{ fontFamily: 'var(--font-office-code)' }}>
        Corner Hits: {cornerHits}
      </div>
    </div>
  )
}

export default Screensaver
