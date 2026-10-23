import type { WebGPURenderer } from 'three/webgpu'
import { mapAngles, mapCamera, mapCrops, mapHeight, mapPlate, mapSources, mapWidths } from './foldedMapLayout'

export interface FoldedMapController {
  setFold(amount: number): void
  resize(): void
  setPaper(paper: string, dark: boolean): void
  dispose(): void
}

function imageFrom(src: string, signal: AbortSignal): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const abort = () => { image.src = ''; reject(new DOMException('Artwork disposed', 'AbortError')) }
    signal.addEventListener('abort', abort, { once: true })
    const done = () => signal.removeEventListener('abort', abort)
    image.onload = () => { done(); resolve(image) }
    image.onerror = () => { done(); reject(new Error('Project image unavailable')) }
    if (signal.aborted) abort()
    else image.src = src
  })
}

/** Demand-rendered paper geometry. The texture contains only crops of real product captures. */
export async function createFoldedMap(canvas: HTMLCanvasElement, signal: AbortSignal, paper: string, dark: boolean): Promise<FoldedMapController> {
  const [THREE, TSL, results, planner] = await Promise.all([
    import('three/webgpu'), import('three/tsl'),
    imageFrom(mapSources.results.src, signal),
    imageFrom(mapSources.planner.src, signal),
  ])
  signal.throwIfAborted()
  let disposed = false
  const renderer: WebGPURenderer = new THREE.WebGPURenderer({ canvas, alpha: true, antialias: true })
  renderer.onDeviceLost = () => {
    if (!disposed && !signal.aborted) canvas.dispatchEvent(new Event('artwork-unavailable'))
  }
  try { await renderer.init() } catch (error) { renderer.dispose(); throw error }
  if (signal.aborted) { renderer.dispose(); signal.throwIfAborted() }
  renderer.setPixelRatio(Math.min(2, Math.max(1.5, devicePixelRatio || 1)))
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-mapCamera.halfWidth, mapCamera.halfWidth, 3, -3, .1, 60)
  camera.position.set(...mapCamera.eye)
  camera.lookAt(...mapCamera.target)
  const ambient = new THREE.HemisphereLight(0xffffff, 0xb8a895, 1.1)
  scene.add(ambient)
  const light = new THREE.DirectionalLight(0xfff7ed, 1.8)
  light.position.set(-4, 8, 7)
  light.target.position.set(0, 1.7, 0)
  light.castShadow = true
  light.shadow.mapSize.set(2048, 2048)
  Object.assign(light.shadow.camera, { left: -9, right: 9, top: 8, bottom: -8, near: .1, far: 30 })
  light.shadow.bias = -.0006
  light.shadow.normalBias = .025
  light.shadow.radius = 4
  scene.add(light, light.target)

  const plate = document.createElement('canvas')
  plate.width = mapPlate.width
  plate.height = mapPlate.height
  const ink = plate.getContext('2d')!
  const mapTexture = new THREE.CanvasTexture(plate)
  mapTexture.colorSpace = THREE.SRGBColorSpace
  mapTexture.anisotropy = 8
  function printPlate(color: string) {
    ink.fillStyle = color
    ink.fillRect(0, 0, plate.width, plate.height)
    // Preserve every screenshot's aspect ratio. Different crops occupy the map's panels.
    ink.fillStyle = '#f8f9fb'
    ink.fillRect(42, 42, 2716, 976)
    for (const area of mapCrops) {
      const [sx, sy, sw, sh] = area.crop
      const [dx, dy, dw, dh] = area.print
      ink.drawImage(area.source === 'results' ? results : planner, sx, sy, sw, sh, dx, dy, dw, dh)
    }
    // Fine paper grain is generated at runtime, never baked into the source captures.
    let seed = 919
    for (let i = 0; i < 85000; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) | 0
      const x = (seed >>> 0) % plate.width
      seed = (Math.imul(seed, 1664525) + 1013904223) | 0
      const y = (seed >>> 0) % plate.height
      ink.fillStyle = i % 2 ? 'rgba(55,42,35,.035)' : 'rgba(255,255,255,.05)'
      ink.fillRect(x, y, 1, 1)
    }
    mapTexture.needsUpdate = true
  }
  printPlate(paper)

  const grainCanvas = document.createElement('canvas')
  grainCanvas.width = grainCanvas.height = 128
  const grainContext = grainCanvas.getContext('2d')!
  const grainData = grainContext.createImageData(128, 128)
  for (let i = 0; i < grainData.data.length; i += 4) {
    const value = 116 + Math.floor(Math.random() * 24)
    grainData.data.set([value, value, value, 255], i)
  }
  grainContext.putImageData(grainData, 0, 0)
  const grainTexture = new THREE.CanvasTexture(grainCanvas)
  grainTexture.wrapS = grainTexture.wrapT = THREE.RepeatWrapping
  grainTexture.repeat.set(20, 8)
  const front = new THREE.MeshStandardNodeMaterial({ roughness: .96, metalness: 0, side: THREE.FrontSide })
  // A diffuse fill preserves printed screenshot colors while directional light
  // remains visible on the creases and paper grain.
  front.colorNode = TSL.texture(mapTexture).mul(TSL.float(.7))
  front.emissiveNode = TSL.texture(mapTexture).mul(TSL.float(.6))
  front.normalNode = TSL.bumpMap(TSL.texture(grainTexture), TSL.float(.018))
  const back = new THREE.MeshStandardNodeMaterial({ color: paper, roughness: 1, side: THREE.BackSide })

  const paperGroup = new THREE.Group()
  scene.add(paperGroup)
  const widths = mapWidths
  const totalWidth = widths.reduce((sum, width) => sum + width, 0)
  const height = mapHeight
  const panels: InstanceType<typeof THREE.Group>[] = []
  let uvOffset = 0
  for (const width of widths) {
    const hinge = new THREE.Group()
    const geometry = new THREE.PlaneGeometry(width, height, 36, 14)
    const uv = geometry.getAttribute('uv')
    const position = geometry.getAttribute('position')
    for (let i = 0; i < uv.count; i++) {
      uv.setX(i, uvOffset + uv.getX(i) * width / totalWidth)
      const x = position.getX(i) / width + .5
      const y = position.getY(i) / height + .5
      position.setZ(i, .018 * Math.sin(x * Math.PI) * Math.sin(y * Math.PI))
    }
    geometry.computeVertexNormals()
    const face = new THREE.Mesh(geometry, front)
    face.position.set(width / 2, height / 2, 0)
    face.castShadow = face.receiveShadow = true
    const reverse = new THREE.Mesh(geometry, back)
    reverse.position.copy(face.position)
    reverse.position.z = -.008
    reverse.castShadow = true
    hinge.add(face, reverse)
    paperGroup.add(hinge)
    panels.push(hinge)
    uvOffset += width / totalWidth
  }
  // A broad contact shadow grounds the sheet without the hard stage-like cast
  // shadow of an infinitely distant point light. Creases still receive real light.
  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = 512
  shadowCanvas.height = 128
  const shadowContext = shadowCanvas.getContext('2d')!
  const shadowData = shadowContext.createImageData(512, 128)
  for (let y = 0; y < 128; y++) for (let x = 0; x < 512; x++) {
    const alpha = Math.exp(-Math.pow((x - 256) / 185, 6) - Math.pow((y - 64) / 28, 2))
    const index = (y * 512 + x) * 4
    shadowData.data.set([48, 37, 29, Math.round(alpha * 120)], index)
  }
  shadowContext.putImageData(shadowData, 0, 0)
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas)
  const shadowStrength = TSL.uniform(.7)
  const shadow = new THREE.MeshBasicNodeMaterial({ color: 0x000000, transparent: true, depthWrite: false })
  shadow.opacityNode = TSL.texture(shadowTexture).a.mul(shadowStrength)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 2), shadow)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -.04
  floor.position.set(.25, -.04, .8)
  scene.add(floor)

  let amount = 1
  let target = 1
  let frame = 0
  const render = () => { if (!disposed) renderer.render(scene, camera) }
  function pose() {
    const angles = mapAngles.map(angle => angle * amount)
    const projectedWidth = widths.reduce((sum, width, i) => sum + width * Math.cos(angles[i]), 0)
    let x = -projectedWidth / 2
    let z = 0
    panels.forEach((panel, i) => {
      panel.position.set(x, 0, z)
      panel.rotation.y = angles[i]
      x += widths[i] * Math.cos(angles[i])
      z -= widths[i] * Math.sin(angles[i])
    })
    render()
  }
  function animate() {
    if (disposed) return
    amount += (target - amount) * .13
    if (Math.abs(target - amount) < .001) { amount = target; frame = 0; pose(); return }
    pose()
    frame = requestAnimationFrame(animate)
  }
  const controller: FoldedMapController = {
    setFold(value) { target = Math.max(0, Math.min(1.7, value)); if (!frame && !disposed) frame = requestAnimationFrame(animate) },
    resize() {
      if (disposed) return
      const box = canvas.getBoundingClientRect()
      if (!box.width || !box.height) return
      renderer.setSize(box.width, box.height, false)
      const halfWidth = mapCamera.halfWidth
      const halfHeight = halfWidth * box.height / box.width
      Object.assign(camera, { left: -halfWidth, right: halfWidth, top: halfHeight, bottom: -halfHeight })
      camera.updateProjectionMatrix()
      pose()
    },
    setPaper(color, isDark) { printPlate(color); back.color.set(color); shadowStrength.value = isDark ? .95 : .7; ambient.intensity = isDark ? 1 : 1.1; render() },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      const geometries = new Set<InstanceType<typeof THREE.BufferGeometry>>()
      scene.traverse(object => { if (object instanceof THREE.Mesh) geometries.add(object.geometry) })
      geometries.forEach(geometry => geometry.dispose())
      front.dispose(); back.dispose(); shadow.dispose(); mapTexture.dispose(); grainTexture.dispose(); shadowTexture.dispose()
      light.shadow.dispose(); renderer.dispose()
      plate.width = grainCanvas.width = shadowCanvas.width = 1
    },
  }
  controller.setPaper(paper, dark)
  controller.resize()
  return controller
}
