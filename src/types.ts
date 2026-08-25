export interface Project {
  slug: 'mwasalaty' | 'inneraura' | 'service-hub'
  name: string
  subtitle: string
  summary: string
  role: string
  year: string
  team: string
  technologies: string[]
  image: string
  imageAlt: string
  gallery: {
    src: string
    alt: string
    caption: string
    orientation?: 'wide' | 'tall'
  }[]
  links: { label: string; href: string; protected?: boolean }[]
  contribution: string
  contributions: string[]
  sections: { title: string; body: string; items?: string[]; visual?: string }[]
}

export interface Experience {
  role: string
  company: string
  date: string
  bullets: string[]
}

export interface Service {
  title: string
  description: string
}
