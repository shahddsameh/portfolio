import { onMounted, watch, type Ref } from 'vue'

export interface SeoData {
  title: string
  description: string
  path: string
  image?: string
  schema?: Record<string, unknown>
}

export function useSeo(data: SeoData | Ref<SeoData>) {
  const update = (seo: SeoData) => {
    document.title = seo.title
    const canonical = `https://shahd.me${seo.path}`
    const entries = [
      ['description', seo.description],
      ['og:title', seo.title],
      ['og:description', seo.description],
      ['og:url', canonical],
      ['og:type', seo.path.startsWith('/projects/') ? 'article' : 'website'],
      ['og:image', seo.image ? `https://shahd.me${seo.image}` : 'https://shahd.me/images/profile/shahd-portrait.png'],
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', seo.title],
      ['twitter:description', seo.description],
    ]
    entries.forEach(([name, content]) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name'
      let meta = document.head.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.append(meta)
      }
      meta.content = content
    })
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.append(link)
    }
    link.href = canonical
    document.getElementById('page-schema')?.remove()
    if (seo.schema) {
      const script = document.createElement('script')
      script.id = 'page-schema'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(seo.schema)
      document.head.append(script)
    }
  }

  onMounted(() => update('value' in data ? data.value : data))
  if ('value' in data) watch(data, update)
}
