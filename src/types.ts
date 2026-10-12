export interface CaseImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface Project {
  slug: 'pwc-middle-east' | 'mwasalaty' | 'inneraura' | 'service-hub'
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
  sections: {
    title: string
    body?: string
    items?: string[]
    visual?: string
    table?: { head: string[]; rows: string[][] }
    images?: CaseImage[]
    imageLayout?: 'pair' | 'phones' | 'wide'
  }[]
  /** Compact concept layout: lead + work in the first screen, numbered sections without per-section labels. */
  compact?: {
    lead: string
    imageWidth: number
    imageHeight: number
    meta: { label: string; value: string }[]
    actions: { label: string; href: string }[]
    note: string
  }
}

export interface Experience {
  role: string
  company: string
  date: string
  bullets: string[]
}
