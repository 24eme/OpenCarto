<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { pointData, reinitialiserPointData } from '../store/pointData.js'
import { createPoint } from '../store/points.js'
import { etagesConfig } from '../store/etages.js'

const router = useRouter()
const enregistrement = ref(false)
const erreur = ref(null)
let map = null

onMounted(() => {
  const etage = etagesConfig[pointData.etage] ?? Object.values(etagesConfig)[0]
  const calque = L.imageOverlay(etage.image, etage.bounds)

  map = L.map('carte', {
    contextmenu: false,
    zoomControl: true,
    minZoom: -3,
    maxZoom: 10,
    maxNativeZoom: 5,
    zoomSnap: 0,
    boxZoom: false,
    wheelDebounceTime: 100,
    crs: L.CRS.Simple,
    layers: [calque],
  })

  map.fitBounds(calque.getBounds())

  mettreAJourCoordonnees()
  map.on('move', mettreAJourCoordonnees)
})

function mettreAJourCoordonnees() {
  const centre = map.getCenter()
  pointData.coordonnees = { lat: centre.lat, lng: centre.lng }
}

async function valider() {
  enregistrement.value = true
  erreur.value = null
  try {
    await createPoint({ ...pointData })
    reinitialiserPointData()
    router.push('/')
  } catch (e) {
    erreur.value = "Impossible d'enregistrer le point. Réessaie."
  } finally {
    enregistrement.value = false
  }
}
</script>

<template>
  <div class="text-center">
    <h1 class="mb-3">Positionner le point</h1>
    <p class="text-muted">Fais défiler la carte pour placer le viseur au bon endroit</p>

    <div class="carte-wrapper">
      <div id="carte" style="height: 60dvh; width: 100%"></div>
      <div class="viseur">＋</div>
    </div>

    <p v-if="erreur" class="text-danger mt-2">{{ erreur }}</p>

    <div class="d-grid gap-2 col-11 mx-auto mt-3">
      <button class="btn btn-primary" type="button" @click="valider" :disabled="enregistrement">
        Valider l'emplacement
      </button>
    </div>
  </div>
</template>

<style scoped>
.carte-wrapper {
  position: relative;
}

.viseur {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  line-height: 1;
  color: #dc3545;
  pointer-events: none;
  z-index: 1000;
  user-select: none;
}
</style>
