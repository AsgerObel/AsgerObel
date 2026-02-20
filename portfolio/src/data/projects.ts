import placeholderImg from '../assets/test3.png'

export interface Project {
  id: string
  index: string
  title: string
  description: string
  year: string
  image: string
  /** Extended info for the project detail page */
  overview: string
  role: string
  client: string
  timeline: string
  body: string[]
  /** Gallery images for the project page */
  gallery: string[]
}

const projects: Project[] = [
  {
    id: 'berta',
    index: '001',
    title: 'BERTA',
    description: 'BRAND IDENTITY & DIGITAL PRESENCE',
    year: '2025',
    image: placeholderImg,
    overview: 'A complete brand identity and digital presence for Berta, a Copenhagen-based lifestyle brand. The project spanned from initial concept through to a fully realized visual system and responsive website.',
    role: 'UX/UI Design, Development',
    client: 'Berta',
    timeline: '3 months',
    body: [
      'The challenge was to create a brand that felt both minimal and warm — approachable but premium. We started with extensive mood boarding and research into the Scandinavian design landscape.',
      'The visual identity was built around a restrained color palette and custom typography choices that reflect the brand\'s commitment to simplicity and quality.',
      'The website was developed as a fully responsive experience with smooth animations and an intuitive navigation system, ensuring the brand story comes through at every touchpoint.',
    ],
    gallery: [placeholderImg, placeholderImg, placeholderImg, placeholderImg],
  },
  {
    id: 'hoffmeister',
    index: '002',
    title: 'HOFFMEISTER STUDIO',
    description: 'ECOMMERCE & ART DIRECTION',
    year: '2025',
    image: placeholderImg,
    overview: 'An ecommerce platform and art direction project for Hoffmeister Studio, a boutique design studio specializing in handcrafted objects. The project focused on translating the tactile, artisanal quality of their work into a digital shopping experience.',
    role: 'Art Direction, Full-Stack Development',
    client: 'Hoffmeister Studio',
    timeline: '4 months',
    body: [
      'Hoffmeister Studio needed a digital home that matched the craft and intentionality of their physical products. Every interaction was designed to feel deliberate.',
      'The product photography direction emphasized natural lighting and raw textures, creating a consistent visual language across the entire platform.',
      'Built on a modern stack with a headless CMS, the platform delivers fast load times and a seamless checkout experience while maintaining the editorial quality the brand demands.',
    ],
    gallery: [placeholderImg, placeholderImg, placeholderImg, placeholderImg],
  },
]

export default projects
