const navLinks = [
  { label: 'HOME', href: '#' },
  { label: 'WORK', href: '#gallery' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white">
      <nav className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
        <a href="#" className="font-bold font-sans tracking-tight text-lg uppercase">
          Asger Obel
        </a>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-bold font-sans text-sm tracking-wide hover:opacity-70 transition-opacity"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
