import { useRef } from 'react'
import { Link } from 'react-router-dom'
import TiltedCard from './TiltedCard'
import ScrollReveal from './ScrollReveal'
import projects from '../data/projects'

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      id="work"
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center pt-32 md:pt-40 pb-16 md:pb-24"
      style={{ color: 'var(--color-text)' }}
    >
      <ScrollReveal>
        <h2 className="text-4xl md:text-6xl font-normal mb-16 md:mb-24" style={{ fontFamily: 'var(--font-office-code)' }}>
          selected work
        </h2>
      </ScrollReveal>

      {/* Projects List */}
      <div className="flex flex-col gap-24 md:gap-32 w-full">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.15}>
          <Link to={`/project/${project.id}`} className="block">
          <div 
            className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-4 items-center group cursor-pointer"
          >
            {/* Left Info: Index & Title */}
            <div className="md:col-span-3 flex flex-row items-baseline gap-4 md:gap-6 pl-2">
              <span 
                className="text-xs md:text-sm font-medium"
                style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
              >
                {project.index}
              </span>
              <h3 
                className="text-sm md:text-base uppercase tracking-widest font-medium"
                style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
              >
                {project.title}
              </h3>
            </div>

            {/* Center: TiltedCard Image */}
            <div className="md:col-span-6 w-full aspect-video">
              <TiltedCard
                imageSrc={project.image}
                altText={project.title}
                captionText={project.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
              />
            </div>

            {/* Right Info: Description & Year */}
            <div className="md:col-span-3 flex flex-row justify-between md:justify-end items-baseline gap-4 md:gap-6 text-right pr-2">
              <span 
                className="text-xs md:text-sm uppercase tracking-wider max-w-[150px] md:text-right text-left font-medium"
                style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)', opacity: 1 }}
              >
                {project.description}
              </span>
              <span 
                className="text-xs md:text-sm font-medium"
                style={{ fontFamily: 'var(--font-office-code)', color: 'var(--color-text)' }}
              >
                {project.year}
              </span>
            </div>
          </div>
          </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export default Work
