<script setup lang="ts">
import { useId } from 'vue'
import { foldedMapPosterPanels, mapCrops, mapPlate, mapSources } from '@/artwork/foldedMapLayout'

const id = `map-poster-${useId()}`
const panels = foldedMapPosterPanels()
</script>

<template>
  <svg class="folded-map-poster" viewBox="0 0 1140 600" role="img" aria-label="Mwasalaty route comparison and Cairo map, printed on a folded transport map">
    <defs>
      <radialGradient :id="`${id}-shadow`"><stop stop-color="var(--text)" stop-opacity=".24" /><stop offset="1" stop-color="var(--text)" stop-opacity="0" /></radialGradient>
      <g :id="`${id}-plate`">
        <rect :width="mapPlate.width" :height="mapPlate.height" fill="var(--bg)" />
        <rect x="42" y="42" width="2716" height="976" fill="#f8f9fb" />
        <svg v-for="(area, i) in mapCrops" :key="i" :x="area.print[0]" :y="area.print[1]" :width="area.print[2]" :height="area.print[3]" :viewBox="area.crop.join(' ')" preserveAspectRatio="none" overflow="hidden">
          <image :href="mapSources[area.source].src" :width="mapSources[area.source].width" :height="mapSources[area.source].height" />
        </svg>
      </g>
    </defs>
    <ellipse cx="570" cy="510" rx="535" ry="48" :fill="`url(#${id}-shadow)`" />
    <g v-for="(panel, i) in panels" :key="i" :transform="panel.matrix">
      <svg :width="panel.sourceWidth" :height="mapPlate.height" :viewBox="`${panel.sourceX} 0 ${panel.sourceWidth} ${mapPlate.height}`" overflow="hidden">
        <use :href="`#${id}-plate`" />
        <rect :x="panel.sourceX" :width="panel.sourceWidth" :height="mapPlate.height" fill="black" :opacity="panel.shade" />
      </svg>
    </g>
  </svg>
</template>
