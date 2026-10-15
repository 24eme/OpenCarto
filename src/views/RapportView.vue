<script setup>
import { ref, onMounted } from "vue";
import { pointData } from "@/store/pointData.js";

const rangeConso = ref(null);

onMounted(() => {
    rangeConso.value.addEventListener("input", () => {
      const min = rangeConso.value.min;
      const max = rangeConso.value.max;
      const currentValue = rangeConso.value.value;

      rangeConso.value.style.backgroundSize = ((currentValue - min) / (max - min)) * 100 + "% 100%";
    })
  })
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
            <input type="range" id="rangeConso" ref="rangeConso" min="0" max="100" value="0" list="range-values" step="25" class="" />
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

.custom-slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0, 10px;
}

datalist {
  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/
  gap:40px;
  align-self: center;
  writing-mode: vertical-lr;
  width: 20rem;
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
  background-image: linear-gradient(#6b94be);
  background-size: 0% 100%;
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #c8cf5a;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  background-color: #c8cf5a ;
  width: 3rem;
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
