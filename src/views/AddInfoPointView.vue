<script setup>
  import { pointData } from '../store/pointData.js'
  import { etagesConfig } from '../store/etages.js'

  const etages = {}

  Object.entries(etagesConfig).forEach(([cle, etage]) => {
    etages[cle] = etage.label
  })

  if (!pointData.idPiege || pointData.idPiege === '0') {
    pointData.idPiege = String(Math.floor(Math.random() * 101))
  }
</script>

<template>
    <div class="text-center">
    <h1 class="mb-5">Ajout d'un point</h1>

    <h2>Étage</h2>

    <!-- mettre par défaut l'étage sur lequel il est -->
    <select v-model="pointData.etage">
        <option v-for="(etage, cle) in etages" :value="cle">
        {{ etage }}
        </option>
    </select>

    <h2 class="mt-5">Secteur</h2>

    <input type="text" placeholder="ex. : faux plafond, ..." v-model="pointData.secteur" />

    <h2 class="mt-5">Type de piège</h2>
    <select class="form-select" aria-label="select-type-piege" v-model="pointData.typePiege">
        <option value="Câlin">Câlin</option>
        <option value="Bisous">Bisous</option>
        <option value="Carresse">Carresse</option>
    </select>

    <h2 class="mt-5 mb-0">Numéro du piège</h2>
    <small>à reporter sur l'installation</small>
    <br/>

    <!-- ; -->
    <span class="border">
        <span class="px-3">{{pointData.idPiege}}</span>
    </span>

    <div class="d-grid gap-2 col-11 mx-auto mb-2 fixed-bottom">
        <RouterLink to="/prisePhoto" class="btn btn-primary">
        Valider les informations
        </RouterLink>
    </div>
    </div>
</template>

<style>

</style>
