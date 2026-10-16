<script setup>
import { ref, computed } from "vue";
import { pointData } from "@/store/pointData.js";

const VALEURS = new Array("0%", "30%", "50%", "80%", "100%");

const indexSlider = ref(0);

const updateIndex = (event) => {
  indexSlider.value = Number(event.target.value);
}
const backgroundSizeStyle = computed(() => {
  const pourcentage = (indexSlider.value / 4) * 100;
  return `${pourcentage}% 100%`;
});

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
            <input type="range" id="rangeConso" ref="rangeConso" min="0" :max="4" value="0" list="range-values" step="1" @input="updateIndex" :style="{ backgroundSize: backgroundSizeStyle }" class="" />
          </div>

          <datalist id="range-values">
            <option
              v-for="(val, index) in VALEURS"
              :key="index"
              :class="{ 'active-label': index === indexSlider }"
              :value="index"
              :label="val"
            </option>
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

.custom-slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0, 10px;
}

datalist {
  display: flex;
  flex-direction: row;
  gap:34px;
  align-self: center;
  width: 17.5rem;
}

datalist option {
  all: unset;
}

.active-label {
  color: #274351 !important;
    -webkit-text-stroke: 1.2px #274351;
}

.range {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15px;
  width: 20rem;
  align-self: center;
}

input[type="range"] {
  -webkit-appearance: none;
  background:  #274351;
  height: 2.5rem;
  border-radius: 5px;
  width: 19.5rem;
  margin: 2px;
  background-image: linear-gradient(#c8cf5a);
  background-size: 0% 100%;
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #6b94be;
  width: 3.9rem;
  height: 2rem;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  background-color: #6b94be ;
  width: 3.9rem;
  height: 2.5rem;
  border-radius: 10%;
  border: none;
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
  padding: 15px;
  border-radius: 5px;
}

</style>
