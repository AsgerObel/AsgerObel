import ScrollReveal from './ScrollReveal'
import MagneticButton from './MagneticButton'

const Contact = () => {
  return (
    <footer
      id="contact"
      className="w-full flex flex-col items-center py-32 md:py-48 relative"
      style={{ color: 'var(--color-text)' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'var(--color-border)' }} />

      {/* Main CTA */}
      <ScrollReveal>
        <div className="flex flex-col items-center gap-6 text-center px-8">
          <span
            className="text-xs uppercase tracking-widest opacity-50"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            Got a project in mind?
          </span>
          <h2
            className="text-4xl md:text-7xl lg:text-8xl font-normal leading-[1.1]"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            let's work together
          </h2>
        </div>
      </ScrollReveal>

      {/* Email */}
      <ScrollReveal delay={0.15}>
        <div className="mt-16 md:mt-24">
          <MagneticButton strength={0.25}>
            <a href="mailto:asgerobel@gmail.com">
              <span
                className="text-xl md:text-3xl font-normal hover:opacity-60 transition-opacity cursor-pointer"
                style={{
                  fontFamily: 'var(--font-office-code)',
                  borderBottom: '1px solid var(--color-text)',
                  paddingBottom: 4,
                }}
              >
                asgerobel@gmail.com
              </span>
            </a>
          </MagneticButton>
        </div>
      </ScrollReveal>

      {/* Socials row */}
      <ScrollReveal delay={0.25}>
        <div className="flex gap-8 mt-12 md:mt-16">
          {[
            { label: 'Instagram', href: 'https://instagram.com' },
            { label: 'X', href: 'https://x.com' },
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
          ].map((social) => (
            <MagneticButton key={social.label} strength={0.4}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base font-normal hover:opacity-60 transition-opacity cursor-pointer"
                style={{ fontFamily: 'var(--font-office-code)' }}
              >
                {social.label}
              </a>
            </MagneticButton>
          ))}
        </div>
      </ScrollReveal>

      {/* Bottom credits */}
      <ScrollReveal delay={0.35}>
        <div
          className="mt-24 md:mt-32 flex flex-col md:flex-row items-center gap-2 md:gap-8 opacity-40"
        >
          <span
            className="text-[10px] md:text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            Designed & Built by Asger Obel
          </span>
          <span
            className="text-[10px] md:text-xs uppercase tracking-widest hidden md:inline"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            /
          </span>
          <span
            className="text-[10px] md:text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-office-code)' }}
          >
            2025
          </span>
        </div>
      </ScrollReveal>
    </footer>
  )
}

export default Contact
