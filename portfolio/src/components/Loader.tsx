import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Import images for the loader
import img1 from '../assets/Generated Image January 21, 2026 - 2_36PM.jpeg'
import img2 from '../assets/Generated Image January 21, 2026 - 2_51PM.jpeg'
import img3 from '../assets/Generated Image January 21, 2026 - 2_59PM.jpeg'
import img4 from '../assets/Generated Image January 21, 2026 - 3_28PM.jpeg'
import img5 from '../assets/Generated Image January 21, 2026 - 3_34PM.jpeg'
import img6 from '../assets/Generated Image January 22, 2026 - 1_54PM.jpeg'
import img7 from '../assets/Generated Image January 22, 2026 - 1_57PM.jpeg'
import img8 from '../assets/Generated Image January 22, 2026 - 2_01PM.jpeg'

const loaderImages = [img1, img2, img3, img4, img5, img6, img7, img8]

interface LoaderProps {
  onLoadingComplete: () => void
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Image cycling interval
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % loaderImages.length)
    }, 80) // Fast switch every 80ms

    // GSAP Animation Sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearInterval(interval)
          onLoadingComplete()
        }
      })

      // Initial state
      tl.set(containerRef.current, { opacity: 1 })
      
      // Animate in
      tl.from(textContainerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Hold for the image cycling
      tl.to({}, { duration: 1.8 })

      // Collapse image width smoothly so letters join together
      tl.to(imageRef.current, {
        width: 0,
        opacity: 0,
        margin: 0,
        duration: 1,
        ease: 'power3.inOut'
      }, 'exit')

      // Fade out the whole container smoothly
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 'exit+=0.8')

    }, containerRef)

    return () => {
      clearInterval(interval)
      ctx.revert()
    }
  }, [onLoadingComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden"
    >
      {/* Mimic Hero Grid Structure for perfect alignment */}
      <div className="w-full min-h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-transparent">
          
          {/* Left Column Match */}
          <div className="relative h-[30vh] md:h-[40vh] flex items-center justify-center border-b md:border-b-0 md:border-r border-transparent">
            <div 
              ref={textContainerRef}
              className="flex items-center font-normal tracking-tighter text-[25vw] md:text-[20vw] leading-[0.8] translate-x-[2.3vw]"
              style={{ fontFamily: 'var(--font-office-code)', fontWeight: 400 }}
            >
              {/* obe */}
              <span>obe</span>
              
              {/* Image between E and L */}
              <div 
                ref={imageRef}
                className="relative overflow-hidden rounded-md self-center flex items-center justify-center"
                style={{ width: '0.60em', height: '0.80em', fontSize: 'inherit', marginLeft: '0.05em', marginRight: '-0.05em' }}
              >
                <img 
                  src={loaderImages[currentImageIndex]} 
                  alt="Loading" 
                  className="w-[95%] h-[95%] object-fill"
                />
              </div>

              {/* l */}
              <span>l</span>
            </div>
          </div>

          {/* Right Column (Empty in loader) */}
          <div className="hidden md:block h-[40vh]"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
