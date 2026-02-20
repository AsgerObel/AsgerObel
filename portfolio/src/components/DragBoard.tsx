import { useRef, useState, useCallback, useEffect } from 'react'
import ScrollReveal from './ScrollReveal'

// Import skill images
import cssImg from '../assets/css.png'
import htmlImg from '../assets/htmllogo.png'
import jsImg from '../assets/javascript.png'
import reactImg from '../assets/react.png'
import typescriptImg from '../assets/typescript.png'
import tailwindImg from '../assets/tailwind.png'
import figmaImg from '../assets/figma.png'
import githubImg from '../assets/github.png'
import supabaseImg from '../assets/supabase.png'
import photoshopImg from '../assets/photoshop.png'
import illustratorImg from '../assets/illustrator.png'
import premiereImg from '../assets/premierepro.svg.png'
import aftereffectsImg from '../assets/altereffects.png'
import cursorImg from '../assets/cursor.png'
import vscodeImg from '../assets/visualstudiocode.png'
import wordpressImg from '../assets/wordpress.png'
import devtoolsImg from '../assets/DevTools.png'

interface SkillItem {
  id: string
  label: string
  image: string
  /** initial X position as % of container width */
  x: number
  /** initial Y position as % of container height */
  y: number
  /** scale factor for varied sizing */
  scale: number
  /** slight rotation in degrees */
  rotation: number
}

const ITEM_SIZE = 110 // max item size in px (md breakpoint)

const initialSkills: SkillItem[] = [
  // Row 1 - top area
  { id: 'html',          label: 'HTML',            image: htmlImg,          x: 3,  y: 15, scale: 1.0,  rotation: -3  },
  { id: 'css',           label: 'CSS',             image: cssImg,           x: 14, y: 12, scale: 0.95, rotation: 2   },
  { id: 'javascript',    label: 'JavaScript',      image: jsImg,            x: 25, y: 18, scale: 1.05, rotation: -2  },
  { id: 'typescript',    label: 'TypeScript',      image: typescriptImg,    x: 37, y: 13, scale: 1.0,  rotation: 4   },
  { id: 'react',         label: 'React',           image: reactImg,         x: 49, y: 16, scale: 1.1,  rotation: -1  },
  { id: 'tailwind',      label: 'Tailwind',        image: tailwindImg,      x: 61, y: 12, scale: 0.95, rotation: 3   },
  { id: 'supabase',      label: 'Supabase',        image: supabaseImg,      x: 73, y: 18, scale: 1.0,  rotation: -4  },
  { id: 'github',        label: 'GitHub',          image: githubImg,        x: 85, y: 14, scale: 1.05, rotation: 2   },

  // Row 2 - middle area
  { id: 'figma',         label: 'Figma',           image: figmaImg,         x: 5,  y: 50, scale: 1.05, rotation: 3   },
  { id: 'photoshop',     label: 'Photoshop',       image: photoshopImg,     x: 17, y: 48, scale: 1.0,  rotation: -2  },
  { id: 'illustrator',   label: 'Illustrator',     image: illustratorImg,   x: 30, y: 52, scale: 0.95, rotation: 4   },
  { id: 'premiere',      label: 'Premiere Pro',    image: premiereImg,      x: 43, y: 47, scale: 1.0,  rotation: -3  },
  { id: 'aftereffects',  label: 'After Effects',   image: aftereffectsImg,  x: 56, y: 51, scale: 1.05, rotation: 1   },
  { id: 'wordpress',     label: 'WordPress',       image: wordpressImg,     x: 68, y: 48, scale: 0.95, rotation: -2  },
  { id: 'cursor',        label: 'Cursor',          image: cursorImg,        x: 80, y: 52, scale: 1.0,  rotation: 3   },

  // Row 3 - bottom area
  { id: 'vscode',        label: 'VS Code',         image: vscodeImg,        x: 10, y: 80, scale: 1.0,  rotation: -1  },
  { id: 'devtools',      label: 'DevTools',        image: devtoolsImg,      x: 40, y: 78, scale: 1.25, rotation: 2   },
]

const DragBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState(initialSkills)
  const [dragging, setDragging] = useState<string | null>(null)
  const [hovering, setHovering] = useState<string | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [initialized, setInitialized] = useState(false)

  // Convert % positions → px once container is measured
  useEffect(() => {
    if (!containerRef.current || initialized) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos: Record<string, { x: number; y: number }> = {}
    items.forEach((item) => {
      pos[item.id] = {
        x: (item.x / 100) * rect.width,
        y: (item.y / 100) * rect.height,
      }
    })
    setPositions(pos)
    setInitialized(true)
  }, [items, initialized])

  /* ---- pointer handlers ---- */

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
      e.preventDefault()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)

      const pos = positions[id]
      if (!pos) return

      const container = containerRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()

      dragOffset.current = {
        x: e.clientX - containerRect.left - pos.x,
        y: e.clientY - containerRect.top - pos.y,
      }
      setDragging(id)

      // Bring dragged item to front
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.id === id)
        if (idx === -1) return prev
        const copy = [...prev]
        const [item] = copy.splice(idx, 1)
        copy.push(item)
        return copy
      })
    },
    [positions],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      let newX = e.clientX - rect.left - dragOffset.current.x
      let newY = e.clientY - rect.top - dragOffset.current.y

      // Clamp fully inside container (top has extra room for tooltip)
      const TOOLTIP_SPACE = 45
      newX = Math.max(0, Math.min(newX, rect.width - ITEM_SIZE))
      newY = Math.max(TOOLTIP_SPACE, Math.min(newY, rect.height - ITEM_SIZE))

      setPositions((prev) => ({
        ...prev,
        [dragging]: { x: newX, y: newY },
      }))
    },
    [dragging],
  )

  const handlePointerUp = useCallback(() => {
    setDragging(null)
  }, [])

  const showLabel = (id: string) => dragging === id || hovering === id

  return (
    <section id="skills" className="w-full py-16 md:py-24" style={{ color: 'var(--color-text)' }}>
      {/* Section Title */}
      <ScrollReveal>
        <div className="w-full flex justify-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-normal" style={{ fontFamily: 'var(--font-office-code)' }}>
            my skills
          </h2>
        </div>
      </ScrollReveal>

      {/* Drag area */}
      <div
        ref={containerRef}
        className="relative w-full mx-auto select-none"
        style={{ height: '75vh', cursor: dragging ? 'grabbing' : 'default', touchAction: 'none' }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {initialized &&
          items.map((item, index) => {
            const pos = positions[item.id]
            if (!pos) return null
            const labelVisible = showLabel(item.id)

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  zIndex: index + 1,
                  transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
                  cursor: dragging === item.id ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}
                onPointerDown={(e) => handlePointerDown(e, item.id)}
                onPointerEnter={() => setHovering(item.id)}
                onPointerLeave={() => setHovering(null)}
              >
                {/* Tooltip bubble */}
                <div
                  className="absolute left-1/2 pointer-events-none whitespace-nowrap"
                  style={{
                    bottom: '100%',
                    transform: 'translateX(-50%)',
                    marginBottom: 12,
                    opacity: labelVisible ? 1 : 0,
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  <span
                    className="inline-block rounded-lg text-xs md:text-sm tracking-widest text-center"
                    style={{
                      fontFamily: 'var(--font-office-code)',
                      fontWeight: 400,
                      background: 'var(--color-text)',
                      color: 'var(--color-bg)',
                      padding: '8px 15px',
                    }}
                  >
                    {item.label}
                  </span>
                  {/* Small triangle */}
                  <div
                    className="absolute left-1/2"
                    style={{
                      top: '100%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: '6px solid var(--color-text)',
                    }}
                  />
                </div>

                {/* Image */}
                <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] flex items-center justify-center pointer-events-none">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="max-w-full max-h-full object-contain drop-shadow-md"
                    draggable={false}
                  />
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default DragBoard
