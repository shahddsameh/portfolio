/** Shared by the first-paint SVG and the interactive renderer. No GPU imports. */
export const mapPlate = { width: 2800, height: 1060 }
export const mapWidths = [2.55, 4.25, 1.45, 2.75]
export const mapAngles = [-.52, .22, -.25, .45]
export const mapHeight = 4.35
export const mapCamera = { eye: [.15, 9.5, 18] as const, target: [0, 1.9, 0] as const, halfWidth: 5.7 }
export const mapSources = {
  results: { src: '/images/projects/mwasalaty/route-results.webp', width: 1600, height: 1125 },
  planner: { src: '/images/projects/mwasalaty/route-planning.webp', width: 1600, height: 1763 },
}
type Rect = readonly [number, number, number, number]
export const mapCrops: readonly { source: keyof typeof mapSources; crop: Rect; print: Rect }[] = [
  { source: 'results', crop: [0, 0, 1600, 68], print: [42, 42, 2716, 115.43] },
  { source: 'planner', crop: [80, 540, 920, 1100], print: [70, 210, 535, 639.67] },
  { source: 'results', crop: [80, 100, 940, 200], print: [690, 225, 1360, 289.36] },
  { source: 'results', crop: [80, 329, 950, 252], print: [690, 565, 1360, 360.76] },
  { source: 'results', crop: [1060, 330, 456, 680], print: [2140, 187, 570, 850] },
]

/** Project each paper plane through the same orthographic camera, before Three loads. */
export function foldedMapPosterPanels() {
  const [ex, ey, ez] = mapCamera.eye
  const [tx, ty, tz] = mapCamera.target
  const distance = Math.hypot(ex - tx, ey - ty, ez - tz)
  const forward = [(ex - tx) / distance, (ey - ty) / distance, (ez - tz) / distance]
  const horizontal = Math.hypot(forward[0], forward[2])
  const right = [forward[2] / horizontal, 0, -forward[0] / horizontal]
  const up = [-forward[1] * forward[0] / horizontal, horizontal, -forward[1] * forward[2] / horizontal]
  const scale = 1140 / (mapCamera.halfWidth * 2)
  function project(x: number, y: number, z: number) {
    const dx = x - tx, dy = y - ty, dz = z - tz
    return [570 + (dx * right[0] + dz * right[2]) * scale, 300 - (dx * up[0] + dy * up[1] + dz * up[2]) * scale]
  }
  const total = mapWidths.reduce((sum, width) => sum + width, 0)
  let x = -mapWidths.reduce((sum, width, i) => sum + width * Math.cos(mapAngles[i]), 0) / 2
  let z = 0
  let sourceX = 0
  return mapWidths.map((width, i) => {
    const nextX = x + width * Math.cos(mapAngles[i])
    const nextZ = z - width * Math.sin(mapAngles[i])
    const top = project(x, mapHeight, z)
    const topRight = project(nextX, mapHeight, nextZ)
    const bottom = project(x, 0, z)
    const sourceWidth = width / total * mapPlate.width
    const matrix = [
      (topRight[0] - top[0]) / sourceWidth, (topRight[1] - top[1]) / sourceWidth,
      (bottom[0] - top[0]) / mapPlate.height, (bottom[1] - top[1]) / mapPlate.height,
      top[0], top[1],
    ]
    const panel = { sourceX, sourceWidth, matrix: `matrix(${matrix.join(' ')})`, shade: [.045, 0, .07, .015][i] }
    x = nextX; z = nextZ; sourceX += sourceWidth
    return panel
  })
}
