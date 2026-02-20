import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollContainer } from '../contexts/ScrollContainerContext'

// Importing all images directly from assets
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
import img11 from '../assets/Generated Image January 22, 2026 - 2_05PM.jpeg'
import img12 from '../assets/Generated Image January 23, 2026 - 1_11PM.jpeg'
import img13 from '../assets/Generated Image January 23, 2026 - 1_16PM.jpeg'
import img14 from '../assets/Generated Image January 23, 2026 - 1_17PM.jpeg'
import img15 from '../assets/Generated Image January 23, 2026 - 1_19PM.jpeg'
import img16 from '../assets/Generated Image January 23, 2026 - 1_20PM.jpeg'
import img17 from '../assets/Generated Image January 23, 2026 - 1_22PM.jpeg'
import img18 from '../assets/Generated Image January 23, 2026 - 1_35PM.jpeg'
import img19 from '../assets/Generated Image January 23, 2026 - 1_37PM.jpeg'
import img20 from '../assets/Generated Image January 23, 2026 - 1_39PM.jpeg'
import img21 from '../assets/Generated Image January 23, 2026 - 1_40PM.jpeg'
import img22 from '../assets/mock-up-recqCfn1MH4SeNGTz.webp'
import img23 from '../assets/Original_Grim_Reaper_Design_Slight_Differences.png'

// Scattered layout - increased spacing (3800px height) & protected zones around animated images
const images = [
  // Row 1 - img1 and img3 are animated
  { src: img1, top: '2%', left: '5%', width: '250px', rotate: 0, has3D: true },
  { src: img2, top: '5%', left: '32%', width: '220px', rotate: 0, has3D: false }, // Pushed away from img1
  { src: img3, top: '3%', left: '58%', width: '210px', rotate: 0, has3D: true },
  { src: img4, top: '7%', left: '80%', width: '200px', rotate: 0, has3D: false }, // Pushed away from img3
  
  // Row 2 - img6 is animated
  { src: img5, top: '16%', left: '8%', width: '210px', rotate: 0, has3D: false },
  { src: img6, top: '20%', left: '30%', width: '250px', rotate: 0, has3D: true }, // Centered row 2
  { src: img7, top: '18%', left: '60%', width: '230px', rotate: 0, has3D: false }, // Clearance for img6
  { src: img8, top: '22%', left: '84%', width: '200px', rotate: 0, has3D: false },
  
  // Row 3 - img9 is animated
  { src: img9, top: '32%', left: '4%', width: '240px', rotate: 0, has3D: true },
  { src: img10, top: '35%', left: '35%', width: '210px', rotate: 0, has3D: false }, // Clearance for img9
  { src: img11, top: '33%', left: '58%', width: '250px', rotate: 0, has3D: false },
  { src: img12, top: '37%', left: '82%', width: '220px', rotate: 0, has3D: false },
  
  // Row 4 - img13 is animated
  { src: img13, top: '48%', left: '6%', width: '230px', rotate: 0, has3D: true },
  { src: img14, top: '51%', left: '32%', width: '210px', rotate: 0, has3D: false }, // Clearance for img13
  { src: img15, top: '49%', left: '55%', width: '240px', rotate: 0, has3D: false },
  { src: img16, top: '52%', left: '80%', width: '200px', rotate: 0, has3D: false },
  
  // Row 5 - No animations
  { src: img17, top: '64%', left: '5%', width: '220px', rotate: 0, has3D: false },
  { src: img18, top: '67%', left: '28%', width: '250px', rotate: 0, has3D: false },
  { src: img19, top: '65%', left: '55%', width: '210px', rotate: 0, has3D: false },
  { src: img20, top: '68%', left: '78%', width: '230px', rotate: 0, has3D: false },
  
  // Row 6 - No animations
  { src: img21, top: '80%', left: '8%', width: '240px', rotate: 0, has3D: false },
  { src: img22, top: '83%', left: '35%', width: '200px', rotate: 0, has3D: false },
  { src: img23, top: '81%', left: '65%', width: '250px', rotate: 0, has3D: false },
]

interface ImageProps {
  src: string
  top: string
  left: string
  width: string
  rotate: number
  has3D: boolean
}

const GalleryImage = ({ src, top, left, width, rotate, has3D }: ImageProps) => {
  const ref = useRef(null)
  const scrollContainerRef = useScrollContainer()
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(scrollContainerRef ? { container: scrollContainerRef as any } : {}),
    offset: ["start 0.8", "end 0.2"],
  })

  // Subtle zoom for 3D images
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], has3D ? [0.9, 1.15, 0.9] : [1, 1, 1])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], has3D ? [0, 250, 0] : [0, 0, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], has3D ? [8, 0, -8] : [0, 0, 0])
  
  return (
    <div 
      ref={ref} 
      className="absolute"
      style={{ 
        top, 
        left, 
        width,
        perspective: '1000px',
        transform: `rotate(${rotate}deg)`
      }}
    >
      <motion.div 
        style={{ 
          scale,
          z,
          rotateX,
          transformStyle: 'preserve-3d'
        }}
        className="will-change-transform" 
      >
        <img 
          src={src} 
          alt="Gallery item" 
          className={`w-full h-auto object-contain ${has3D ? 'drop-shadow-2xl' : 'drop-shadow-lg'}`}
        />
      </motion.div>
    </div>
  )
}

const Gallery = () => {
  return (
    <section id="gallery" className="relative" style={{ height: '3800px' }}>
      <div className="relative w-full h-full max-w-[1600px] mx-auto">
        {images.map((img, index) => (
          <GalleryImage 
            key={index} 
            {...img}
          />
        ))}
      </div>
    </section>
  )
}

export default Gallery