export interface InspectionCapture {
  id: string
  title: string
  description: string
  src: string
  alt: string
  width: number
  height: number
  crop?: readonly [number, number, number, number]
  layerClass?: string
}
interface ProjectInspection {
  context: string
  previewAspect: string
  full: InspectionCapture
  details: InspectionCapture[]
}
const routeImage = '/images/projects/mwasalaty/route-results.webp'
const homeImage = '/images/projects/pwc/home-hero.webp'
export const projectInspections: Record<string, ProjectInspection> = {
  mwasalaty: {
    context: 'Inspect the rider app’s route comparison and its Cairo map.',
    previewAspect: '1600 / 1125',
    full: {
      id: 'full', title: 'Route results', description: 'Duration, cost, transfers and walking distance sit alongside the Cairo map.',
      src: routeImage, alt: 'Mwasalaty route results with a comparison card and Cairo map', width: 1600, height: 1125,
    },
    details: [
      {
        id: 'route', title: 'Route comparison', description: 'The result card brings the journey steps, duration, cost, transfers and walking distance together.',
        src: routeImage, alt: 'The complete Mwasalaty route comparison card', width: 1600, height: 1125,
        crop: [82, 329, 946, 253], layerClass: 'transit-route-detail',
      },
      {
        id: 'map', title: 'Cairo map', description: 'The map provides geographic context alongside the route results.',
        src: routeImage, alt: 'Mwasalaty Cairo map with distance and routes found', width: 1600, height: 1125,
        crop: [1060, 330, 456, 680], layerClass: 'transit-map-detail',
      },
    ],
  },
  'pwc-middle-east': {
    context: 'Explore the Home concept’s featured story and insights at mobile width.',
    previewAspect: '812 / 1640',
    full: {
      id: 'full', title: 'Mobile Home concept', description: 'The complete Home design, including the featured story, insights, and regional practices and sectors.',
      src: homeImage, alt: 'The complete redesigned PwC Middle East mobile Home page', width: 812, height: 2640,
    },
    details: [
      {
        id: 'insight', title: 'Featured insight', description: 'A complete insight card: category, image, reading time, title, summary and reading action.',
        src: homeImage, alt: 'Complete Industrial manufacturing’s race to 2030 insight card in the PwC Home concept', width: 812, height: 2640,
        crop: [48, 1240, 716, 804], layerClass: 'pwc-insight-detail',
      },
    ],
  },
  inneraura: {
    context: 'Landing-page reference for the wider platform. My contribution focused on appointment scheduling and the rule-based therapist assessment described below.',
    previewAspect: '1600 / 950',
    full: {
      id: 'full', title: 'Landing-page reference', description: 'The complete platform landing page. This is project context, rather than a capture of the scheduling or assessment interfaces.',
      src: '/images/projects/inneraura/landing-page.webp', alt: 'Complete InnerAura platform landing page', width: 1600, height: 3846,
    },
    details: [],
  },
}
export function inspectionCropStyle(capture: InspectionCapture) {
  if (!capture.crop) return {}
  const [x, y, width, height] = capture.crop
  return {
    backgroundImage: `url("${capture.src}")`,
    backgroundSize: `${capture.width / width * 100}% ${capture.height / height * 100}%`,
    backgroundPosition: `${x / (capture.width - width) * 100}% ${y / (capture.height - height) * 100}%`,
    aspectRatio: `${width} / ${height}`,
  }
}

