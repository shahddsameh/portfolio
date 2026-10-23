/** Shared by the first-paint SVG and the interactive renderer. No GPU imports. */
export const mapPlate = { width: 2800, height: 1060 }
export const mapFrame = { width: 1140, height: 480 }
export const mapPaper = '#f0eade'
export const mapBorder = 58
export const mapWidths = [2.8, 4.8, 1.85, 2.75]
export const mapAngles = [.58, -.23, .61, -.5]
export const mapHeight = 4.1
export const mapCamera = { eye: [.2, -11.5, 27] as const, target: [0, 1.7, 0] as const, halfWidth: 5.55 }
const cameraDistance = Math.hypot(...mapCamera.eye.map((value, i) => value - mapCamera.target[i]))
export const mapCameraFov = 2 * Math.atan(mapCamera.halfWidth * mapFrame.height / mapFrame.width / cameraDistance) * 180 / Math.PI
export const mapSources = {
  results: { src: '/images/projects/mwasalaty/route-results.webp', width: 1600, height: 1125 },
  details: { src: '/images/projects/mwasalaty/route-details.webp', width: 1600, height: 1381 },
}
type Rect = readonly [number, number, number, number]
export const mapCrops: readonly { source: keyof typeof mapSources; crop: Rect; print: Rect }[] = [
  { source: 'results', crop: [0, 0, 1600, 68], print: [58, 58, 2684, 114.07] },
  { source: 'results', crop: [80, 100, 450, 200], print: [90, 215, 490, 217.78] },
  { source: 'details', crop: [82, 438, 465, 114], print: [90, 485, 490, 120.13] },
  { source: 'details', crop: [562, 438, 465, 114], print: [90, 640, 490, 120.13] },
  { source: 'results', crop: [82, 329, 946, 253], print: [90, 795, 490, 131.05] },
  { source: 'results', crop: [80, 150, 550, 74], print: [700, 235, 850, 114.36] },
  { source: 'results', crop: [82, 329, 946, 253], print: [680, 420, 1400, 374.42] },
  { source: 'results', crop: [1060, 330, 456, 680], print: [2180, 210, 530, 790.35] },
]

/** Tessellate the same perspective projection before Three loads. No GPU dependency. */
export function foldedMapPosterPanels(amount = 1) {
  const angles = mapAngles.map(angle => angle * amount)
  const [ex, ey, ez] = mapCamera.eye
  const [tx, ty, tz] = mapCamera.target
  const distance = Math.hypot(ex - tx, ey - ty, ez - tz)
  const forward = [(ex - tx) / distance, (ey - ty) / distance, (ez - tz) / distance]
  const horizontal = Math.hypot(forward[0], forward[2])
  const right = [forward[2] / horizontal, 0, -forward[0] / horizontal]
  const up = [-forward[1] * forward[0] / horizontal, horizontal, -forward[1] * forward[2] / horizontal]
  const halfWidth = mapCamera.halfWidth + Math.max(0, 1 - amount) * .85
  const scale = mapFrame.width / (halfWidth * 2)
  function project(x: number, y: number, z: number) {
    const dx = x - tx, dy = y - ty, dz = z - tz
    const perspective = distance / (distance - dx * forward[0] - dy * forward[1] - dz * forward[2])
    return [mapFrame.width / 2 + (dx * right[0] + dz * right[2]) * scale * perspective, mapFrame.height / 2 - (dx * up[0] + dy * up[1] + dz * up[2]) * scale * perspective]
  }
  const total = mapWidths.reduce((sum, width) => sum + width, 0)
  let x = -mapWidths.reduce((sum, width, i) => sum + width * Math.cos(angles[i]), 0) / 2
  let z = 0
  let sourceX = 0
  return mapWidths.map((width, i) => {
    const nextX = x + width * Math.cos(angles[i])
    const nextZ = z - width * Math.sin(angles[i])
    const sourceWidth = width / total * mapPlate.width
    const triangles = Array.from({ length: 12 }, (_, strip) => {
      const left = strip / 12, rightEdge = (strip + 1) / 12
      const sx = sourceX + sourceWidth * left, sw = sourceWidth / 12, h = mapPlate.height
      const tl = project(x + (nextX - x) * left, mapHeight, z + (nextZ - z) * left)
      const tr = project(x + (nextX - x) * rightEdge, mapHeight, z + (nextZ - z) * rightEdge)
      const bl = project(x + (nextX - x) * left, 0, z + (nextZ - z) * left)
      const br = project(x + (nextX - x) * rightEdge, 0, z + (nextZ - z) * rightEdge)
      const first = [(tr[0] - tl[0]) / sw, (tr[1] - tl[1]) / sw, (bl[0] - tl[0]) / h, (bl[1] - tl[1]) / h]
      const second = [(br[0] - bl[0]) / sw, (br[1] - bl[1]) / sw, (br[0] - tr[0]) / h, (br[1] - tr[1]) / h]
      // Overlap clip edges slightly so mobile antialiasing cannot expose white seams.
      const bleed = 4, diagonal = bleed * Math.hypot(1 / sw, 1 / h)
      return [
        { matrix: `matrix(${[...first, tl[0] - first[0] * sx, tl[1] - first[1] * sx].join(' ')})`, clip: `${sx - bleed},${-bleed} ${sx + sw * (1 + diagonal + bleed / h)},${-bleed} ${sx - bleed},${h * (1 + diagonal + bleed / sw)}` },
        { matrix: `matrix(${[...second, br[0] - second[0] * (sx + sw) - second[2] * h, br[1] - second[1] * (sx + sw) - second[3] * h].join(' ')})`, clip: `${sx + sw + bleed},${-h * (diagonal + bleed / sw)} ${sx + sw + bleed},${h + bleed} ${sx - sw * (diagonal + bleed / h)},${h + bleed}` },
      ]
    }).flat()
    const panel = { triangles, shade: [.09, 0, .055, .015][i] * amount }
    x = nextX; z = nextZ; sourceX += sourceWidth
    return panel
  })
}
