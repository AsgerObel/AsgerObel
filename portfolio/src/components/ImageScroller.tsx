import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Import images from assets
import img1 from '../assets/39177032-f000-4880-80fb-bd8ad41759b5.jpeg'
import img2 from '../assets/Gemini_Generated_Image_55ab3b55ab3b55ab 1.png'
import img3 from '../assets/Generated Image January 21, 2026 - 2_36PM.jpeg'
import img4 from '../assets/Generated Image January 21, 2026 - 2_51PM.jpeg'
import img5 from '../assets/Generated Image January 21, 2026 - 2_59PM.jpeg'
import img6 from '../assets/Generated Image January 21, 2026 - 3_28PM.jpeg'
import img7 from '../assets/Generated Image January 21, 2026 - 3_34PM.jpeg'
import img8 from '../assets/Generated Image January 22, 2026 - 1_54PM.jpeg'
import img9 from '../assets/Generated Image January 22, 2026 - 1_57PM.jpeg'
import img10 from '../assets/Generated Image January 22, 2026 - 2_01PM.jpeg'

// Triple the images to make rows much wider
const topRowImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img1, img2, img3, img4, img5]
const bottomRowImages = [img6, img7, img8, img9, img10, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]

const ImageScroller = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Add spring physics for smooth, fluid animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Start from middle, move opposite directions
  const topRowX = useTransform(smoothProgress, [0, 1], ["-50%", "-10%"])
  const bottomRowX = useTransform(smoothProgress, [0, 1], ["-10%", "-50%"])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-bg)] border-t border-[var(--color-border)] transition-colors duration-500"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen w-screen flex flex-col justify-center overflow-hidden">

        {/* Top Row */}
        <motion.div 
          style={{ x: topRowX }}
          className="flex gap-0 w-max items-end"
        >
          {topRowImages.map((img, index) => (
            <div 
              key={`top-${index}`}
              className="relative flex-shrink-0 group"
            >
              <img 
                src={img} 
                alt={`Project ${index + 1}`}
                className="h-[45vh] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </motion.div>

        {/* SPACER */}
        <div style={{ height: '70px' }} />

        {/* Bottom Row */}
        <motion.div 
          style={{ x: bottomRowX }}
          className="flex gap-0 w-max items-start"
        >
          {bottomRowImages.map((img, index) => (
            <div 
              key={`bottom-${index}`}
              className="relative flex-shrink-0 group"
            >
              <img 
                src={img} 
                alt={`Project ${index + 1}`}
                className="h-[45vh] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default ImageScroller
