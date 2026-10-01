<script setup>
import { ref } from "vue";
import { pointData } from "@/store/pointData.js";
</script>



<template>
  <div class="vstack fullscreen rapport">
      <nav class="navbar bg-body-tertiary">
          <div class="container justify-content-start">
              <div class="col-auto d-flex me-3">

                <RouterLink :to="{ name: 'prisePhoto' }">
                    <i
                        class="bi bi-arrow-left-square fs-1 align-self-center"
                        style="color: black"
                    ></i
                ></RouterLink>
              </div>
              <div class="col-auto flex-grow-1">
                  <h1 class="m-0">Rapport</h1>
              </div>
          </div>
      </nav>

      <div class="container vstack rapport">
        <div class="my-2 custom-slider">
          <label for="rangeConso" class="h5 form-label fw-bold">Pourcentage de  Consommation</label>
          <div class="range">
            <input type="range" id="rangeConso" min="0" max="100" value="0" list="range-values" step="25" class="" />
          </div>

          <datalist id="range-values">
            <option value="0" label="0%"></option>
            <option value="30" label="30%"></option>
            <option value="50" label="50%"></option>
            <option value="80" label="80%"></option>
            <option value="100" label="100%"></option>
          </datalist>
        </div>
        <div class="vstack gap-2 m-1 rapport-text-area">
          <label for="textRapport" class="h5 form-label fw-bold">Rapport d'Intervention</label>
          <textarea
            id="rapportIntervention"
            placeholder="Ajouter un rapport d'intervention"
          ></textarea>
        </div>
      </div>

      <div class="m-1 row">
        <RouterLink
            :to="{ name: 'addCoordonneesPoint' }"
            class="btn btn-primary"
        >
            Valider
        </RouterLink>
      </div>
  </div>
</template>


<style scoped>
datalist {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  writing-mode: vertical-lr;
  width: 20rem;
}

option {
  padding: 0;
}

input[type="range"] {
  width: 20rem;
  margin: 0;
}

#rapportIntervention {
  height: 20rem;
}

.h5 {
  margin-bottom: 20px;
  background-color: #f1f3f5;
  padding: 12px;
  border-radius: 5px;
}
html, body, #app  {
  height: 100%;
}

.container.rapport {
  justify-content: space-around;
}

.rapport-text-area {
  flex: unset;
}

.rapport-text-area > textarea {
  border: 1.5px lightslategray dotted;
  padding: 15px;;
  border-radius: 5px;;
}



</style>
