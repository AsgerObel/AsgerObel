import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import projects from '../data/projects'
import ScrollReveal from './ScrollReveal'

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <div
        className="w-full min-h-screen flex flex-col items-center justify-center gap-8"
        style={{ color: 'var(--color-text)' }}
      >
        <h1 className="text-4xl font-normal" style={{ fontFamily: 'var(--font-office-code)' }}>
          Project not found
        </h1>
        <Link
          to="/"
          className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity"
          style={{ fontFamily: 'var(--font-office-code)' }}
        >
          Back to home
        </Link>
      </div>
    )
  }

  // Find next project for the "next project" link
  const currentIndex = projects.findIndex((p) => p.id === id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <article className="w-full min-h-screen" style={{ color: 'var(--color-text)' }}>

      {/* Back link */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          to="/"
          className="text-sm uppercase tracking-widest hover:opacity-60 transition-opacity"
          style={{ fontFamily: 'var(--font-office-code)' }}
        >
          &larr; Back
        </Link>
      </div>

      {/* Hero section */}
      <section className="w-full min-h-[80vh] flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <span
              className="text-xs uppercase tracking-widest opacity-50"
              style={{ fontFamily: 'var(--font-office-code)' }}
            >
              {project.index} / {project.year}
            </span>
            <h1
              className="text-5xl md:text-8xl lg:text-9xl font-normal leading-[0.95]"
              style={{ fontFamily: 'var(--font-office-code)' }}
            >
              {project.title}
            </h1>
            <p
              className="text-sm md:text-base uppercase tracking-wider opacity-70 mt-2"
              style={{ fontFamily: 'var(--font-office-code)' }}
            >
              {project.description}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Full-width hero image */}
      <ScrollReveal>
        <section className="w-full px-8 md:px-16">
          <div className="w-full aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Project details grid */}
      <section className="w-full px-8 md:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Left: Meta info */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {[
              { label: 'Client', value: project.client },
              { label: 'Role', value: project.role },
              { label: 'Timeline', value: project.timeline },
              { label: 'Year', value: project.year },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.08}>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-xs uppercase tracking-widest opacity-50"
                    style={{ fontFamily: 'var(--font-office-code)' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-office-code)' }}
                  >
                    {item.value}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: Overview + body text */}
          <div className="md:col-span-8 flex flex-col gap-12">
            <ScrollReveal>
              <p
                className="text-lg md:text-2xl leading-relaxed"
                style={{ fontFamily: 'var(--font-office-code)' }}
              >
                {project.overview}
              </p>
            </ScrollReveal>

            {project.body.map((paragraph, i) => (
              <ScrollReveal key={i} delay={0.1}>
                <p
                  className="text-sm md:text-base leading-relaxed opacity-80"
                  style={{ fontFamily: 'var(--font-office-code)' }}
                >
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="w-full px-8 md:px-16 py-16 md:py-24">
        <ScrollReveal>
          <h3
            className="text-xs uppercase tracking-widest opacity-50 mb-12"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            Gallery
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {project.gallery.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Next project link */}
      <section className="w-full px-8 md:px-16 py-24 md:py-32">
        <ScrollReveal>
          <Link to={`/project/${nextProject.id}`} className="group flex flex-col items-center gap-4">
            <span
              className="text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'var(--font-office-code)' }}
            >
              Next project
            </span>
            <span
              className="text-4xl md:text-6xl font-normal group-hover:opacity-60 transition-opacity"
              style={{ fontFamily: 'var(--font-office-code)' }}
            >
              {nextProject.title}
            </span>
          </Link>
        </ScrollReveal>
      </section>
    </article>
  )
}

export default ProjectPage
