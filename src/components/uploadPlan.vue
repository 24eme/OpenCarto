<script setup>
import { ref } from 'vue'
import { ajouterEtage } from '../store/etages.js'

//avec vue on fait remonter les evenements
//la on envoit levenement pour fermer la modale
const emit = defineEmits(['fermer'])

const nomPlan = ref('')
const fichier = ref(null)

function onFichierSelectionne(event) {
  fichier.value = event.target.files[0] ?? null
}

function ajouter() {

  const url = URL.createObjectURL(fichier.value)
  const image = new Image()

  //on charge l'image dans un élément <img> invisible
  //uniquement pour lire ses dimensions réelles une fois décodée.
  image.onload = () => {
    const bounds = [[0, 0], [image.naturalHeight, image.naturalWidth]]
    ajouterEtage(nomPlan.value.trim(), url, bounds)
    emit('fermer')
  }


  image.src = url
}
</script>

<template>
  <div class="modal d-block" style="background: rgba(0,0,0,0.5)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajout d'un plan</h5>
          <button class="btn-close" @click="emit('fermer')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nom de l'étage</label>
            <input type="text" class="form-control" v-model="nomPlan" placeholder="ex. : Sous-sol" />
          </div>
          <div class="mb-3">
            <label class="form-label">Image du plan</label>
            <input type="file" accept="image/*" class="form-control" @change="onFichierSelectionne" />
          </div>
          <button class="btn btn-primary" type="button" @click="ajouter">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
