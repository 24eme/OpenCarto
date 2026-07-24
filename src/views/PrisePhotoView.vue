<script setup>
  import { ref } from 'vue'
  import { pointData } from '../store/pointData.js'

  const inputPhoto = ref(null)

  function ouvrirCamera() {
    inputPhoto.value.click()
  }

  function onPhotoSelected(event) {
    const file = event.target.files[0]
    if (file) {
      pointData.photo = URL.createObjectURL(file)
    }
  }
</script>

<template>
<div class="text-center">
    <h1 class="mb-5">Ajout du piège</h1>
    <input
        ref="inputPhoto"
        type="file"
        accept="image/*"
        capture="environment"
        style="display: none"
        @change="onPhotoSelected"
    />

    <img v-if="pointData.photo" :src="pointData.photo" class="mt-3" style="max-width: 100%;" />

    <div class="d-grid gap-2 col-11 mx-auto mt-2">
        <button v-if="! pointData.photo" class="btn btn-primary" type="button" @click="ouvrirCamera">
            Prendre une photo
        </button>
        <RouterLink v-else to="/addCoordonneesPoint" class="btn btn-primary">
            Valider
        </RouterLink>
        <RouterLink v-if="! pointData.photo" to="/addCoordonneesPoint" class="btn btn-light">
            Valider sans photo
        </RouterLink>
    </div>
</div>
</template>

<style>
</style>
