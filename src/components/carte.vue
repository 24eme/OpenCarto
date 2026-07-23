<script setup>
import { onMounted, watch } from 'vue'
import { etagesConfig } from '../store/etages.js'
import { fetchPoints } from '../store/points.js'

let map = null
let controle = null
const groupes = {}

function construireGroupeEtage(cle, etage) {
  const calque = L.imageOverlay(etage.image, etage.bounds)
  const marqueurs = L.layerGroup()
  const groupe = L.layerGroup([calque, marqueurs])
  groupe.marqueurs = marqueurs
  groupe.bounds = etage.bounds
  groupes[cle] = { groupe, label: etage.label }
  return groupes[cle]
}

async function chargerPoints() {
  try {
    const points = await fetchPoints()
    points.forEach((point) => {
      const groupe = groupes[point.etage]
      if (!groupe || !point.coordonnees) return

      L.marker([point.coordonnees.lat, point.coordonnees.lng])
        .bindPopup(`<strong>${point.secteur}</strong>`)
        .addTo(groupe.groupe.marqueurs)
    })
  } catch (e) {
    console.error('Impossible de charger les points :', e)
  }
}

onMounted(async () => {

  Object.entries(etagesConfig).forEach(([cle, etage]) => construireGroupeEtage(cle, etage))

  map = L.map('carte', {
    contextmenu: true,
    zoomControl: true,
    minZoom: -3,
    maxZoom: 10,
    maxNativeZoom: 5,
    zoomSnap: 0,
    boxZoom: false,
    wheelDebounceTime: 100,
    crs: L.CRS.Simple,
  })

  const controleCalques = {}
  Object.values(groupes).forEach(({ groupe, label }) => {
    controleCalques[label] = groupe
  })
  controle = L.control.layers(controleCalques).addTo(map)

  const premiereEntree = Object.values(groupes)[0]
  if (premiereEntree) {
    premiereEntree.groupe.addTo(map)
    map.fitBounds(premiereEntree.groupe.bounds)
  }

  await chargerPoints()

// watcher qui se declenche lorsque lutilisateur ajoute un nouveau plan parce que la length de l'objet
// etagesConfig change. Ensuite, on va comparer l'entrée avec ce quon a deja dans les groupes
  watch(
    () => Object.keys(etagesConfig).length,
    () => {
      Object.entries(etagesConfig).forEach(([cle, etage]) => {
        if (groupes[cle]) return

        const { groupe, label } = construireGroupeEtage(cle, etage)
        controle.addOverlay(groupe, label)
      })
    }
  )

})
</script>

<template>
  <div>
    <div id="carte" style="height: 70dvh; width: 100%"></div>
    <div class="d-grid gap-2 col-11 mx-auto mb-2 fixed-bottom">
      <button class="btn btn-primary" type="button" @click="$router.push('/addPoint')">
        Ajouter un point
      </button>
    </div>
  </div>
</template>
