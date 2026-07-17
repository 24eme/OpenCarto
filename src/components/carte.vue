<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const etages = {
    "RDC": L.imageOverlay("/data/carte_placeholder_2.jpg", [[0, 0], [1414, 2000]]),
    "Étage 1": L.imageOverlay("/data/carte_placeholder.png", [[0, 0], [1081, 1536]]),
  }

  const map = L.map('carte', {
    contextmenu: true,
    zoomControl: true,
    minZoom: -3,
    maxZoom: 10,
    maxNativeZoom: 5,
    zoomSnap: 0,
    boxZoom: false,
    wheelDebounceTime: 100,
    crs: L.CRS.Simple,
    layers: [etages.RDC],
  })

  L.control.layers(etages).addTo(map)
  map.fitBounds(etages.RDC.getBounds())
})
</script>

<template>
  <div>
    <div id="carte" style="height: 50dvh; width: 100%"></div>
  </div>
</template>
