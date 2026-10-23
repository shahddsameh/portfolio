<script setup lang="ts">
import { useId } from 'vue'
import { foldedMapPosterPanels, mapBorder, mapCrops, mapFrame, mapPaper, mapPlate, mapSources } from '@/artwork/foldedMapLayout'

const id = `map-poster-${useId()}`
const panels = foldedMapPosterPanels()
</script>

<template>
  <svg class="folded-map-poster" :viewBox="`0 0 ${mapFrame.width} ${mapFrame.height}`" role="img" aria-label="Mwasalaty route comparison and Cairo map, printed on a folded transport map">
    <defs>
      <radialGradient :id="`${id}-shadow`"><stop stop-color="var(--text)" stop-opacity=".24" /><stop offset="1" stop-color="var(--text)" stop-opacity="0" /></radialGradient>
      <g :id="`${id}-plate`">
        <rect :width="mapPlate.width" :height="mapPlate.height" :fill="mapPaper" />
        <rect :x="mapBorder" :y="mapBorder" :width="mapPlate.width - mapBorder * 2" :height="mapPlate.height - mapBorder * 2" fill="#f8f9fb" />
        <svg v-for="(area, i) in mapCrops" :key="i" :x="area.print[0]" :y="area.print[1]" :width="area.print[2]" :height="area.print[3]" :viewBox="area.crop.join(' ')" preserveAspectRatio="none" overflow="hidden">
          <image :href="mapSources[area.source].src" :width="mapSources[area.source].width" :height="mapSources[area.source].height" />
        </svg>
        <rect :x="mapBorder" :y="mapBorder" :width="mapPlate.width - mapBorder * 2" :height="mapPlate.height - mapBorder * 2" fill="#faf7f1" style="mix-blend-mode: multiply" />
      </g>
    </defs>
    <ellipse cx="580" cy="428" rx="550" ry="46" :fill="`url(#${id}-shadow)`" />
    <g v-for="(panel, i) in panels" :key="i">
      <g v-for="(triangle, j) in panel.triangles" :key="j" :transform="triangle.matrix">
        <clipPath :id="`${id}-${i}-${j}`"><polygon :points="triangle.clip" /></clipPath>
        <g :clip-path="`url(#${id}-${i}-${j})`">
          <use :href="`#${id}-plate`" />
          <rect :width="mapPlate.width" :height="mapPlate.height" fill="black" :opacity="panel.shade" />
        </g>
      </g>
    </g>
  </svg>
</template>
