<script setup>
import { ref, computed, inject, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postesRef, ecrireStorage } from "@/store/postes";
import { posteData, AnomaliesSuivi, newHistoryEntry } from "@/store/posteData.js";

const anomaliesOuvertes = ref(false);
const anomalies = ref(
  Object.fromEntries(
    Object.entries(AnomaliesSuivi).map(([key, label]) => [
      key,
      { label, checked: false },
    ])
  )
);

const props = defineProps({
  isPremierPassage: Boolean,
});

const route = useRoute();
const router = useRouter();

const poste = computed(() => {
  if (props.isPremierPassage) {
    return posteData;
  }

  return postesRef.value.find((p) => p.id === route.params.poste);
});

const PAS = 10;
const VALEURS = Array.from(
  { length: 100 / PAS + 1 },
  (_, i) => `${i * PAS}%`
);

const indexSlider = ref(poste.value.pourcentage_conso ?? 0);
const commentaire = ref(poste.value.commentaire_suivi_conso);

const updateIndex = (event) => {
  indexSlider.value = Number(event.target.value);
};

const backgroundSizeStyle = computed(() => {
  return `${indexSlider.value}% 100%`;
});

const indexActif = computed(() => indexSlider.value / PAS);

function chargerAnomalies(source = {}) {
  for (const key of Object.keys(anomalies.value)) {
    anomalies.value[key].checked = source[key]?.checked ?? false;
  }
}

const valider = () => {
  const anomaliesData = Object.fromEntries(
    Object.entries(anomalies.value).map(([key, { label, checked }]) => [
      key,
      { label, checked },
    ])
  );

  poste.value.commentaire_suivi_conso = commentaire.value;
  poste.value.pourcentage_conso = indexSlider.value;
  poste.value.anomalies = anomaliesData;

  if (props.isPremierPassage) {
    router.push({ name: "addCoordonneesPoste" });
  } else {
    poste.value.history.push(newHistoryEntry(poste.value))
    ecrireStorage(postesRef.value)
    router.push({ name: "posteInfos" });
  }
};

const locale = globalThis.navigator.language
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

</script>


<template>
  <div class="vstack fullscreen rapport">
      <nav class="navbar bg-body-tertiary">
          <div class="container justify-content-start margin-container">
              <div class="col-auto d-flex me-3">

                <RouterLink v-if="isPremierPassage === false" :to="{ name: 'etage' }">
                    <i
                        class="bi bi-arrow-left-square fs-1 align-self-center"
                        style="color: black"
                    ></i
                ></RouterLink>
                <RouterLink v-else :to="{ name: 'prisePhoto' }">
                    <i
                        class="bi bi-arrow-left-square fs-1 align-self-center"
                        style="color: black"
                    ></i
                ></RouterLink>
              </div>
              <div class="col-auto flex-grow-1">
                  <h1 class="m-0">Rapport de Suivi</h1>
              </div>
              <h5 class="h5-date">{{ new Date().toLocaleString(locale, options) }}</h5>
          </div>
      </nav>

      <div class="container vstack rapport">
        <div v-if="isPremierPassage === false" class="my-2 custom-slider">
          <label for="rangeConso" class="h5 form-label fw-bold">Pourcentage de  Consommation</label>
          <div class="range">
            <input
              type="range"
              id="rangeConso"
              ref="rangeConso"
              min="0"
              max="100"
              step="10"
              :value="indexSlider"
              list="range-values"
              @input="updateIndex"
              :style="{ backgroundSize: backgroundSizeStyle }"
            />
          </div>

          <datalist id="range-values">
            <option
              v-for="(val, index) in VALEURS"
              :key="index"
              :class="{ 'active-label': index === indexActif }"
              :value="index * PAS"
              :label="val"
            ></option>
          </datalist>
        </div>

        <div class="vstack gap-2 m-1 rapport-text-area">
          <label for="informationsComplementaireTextArea" class="h5 form-label fw-bold">Rapport de Suivi </label>
          <div class="my-2">
            <button
            type="button"
            class="btn btn-light w-100 d-flex justify-content-between align-items-center fw-bold h5 mb-0"
            :aria-expanded="anomaliesOuvertes"
            aria-controls="anomalies-panel"
            @click="anomaliesOuvertes = !anomaliesOuvertes">
              <span>Anomalies constatées</span>
              <i class="bi bi-chevron-down transition-rotate" :class="{ 'rotate-180': anomaliesOuvertes }"></i>
          </button>

            <div
            v-show="anomaliesOuvertes"
            id="anomalies-panel"
            class="vstack gap-2 anomalies-list mt-2">
              <div
              v-for="(anomalie, key) in anomalies"
              :key="key"
              class="form-check">
              <input
              class="form-check-input"
              type="checkbox"
              :id="`anomalie-${key}`"
              v-model="anomalie.checked"/>
                <label class="form-check-label" :for="`anomalie-${key}`">
                  {{ anomalie.label }}
                </label>
              </div>
            </div>
          </div>
          <textarea
            id="informationsComplementaireTextArea" v-model="commentaire" placeholder="Ajouter un rapport de suivi d'infestation"
          ></textarea>
        </div>
      </div>

      <div class="m-2 row">
        <button class="btn btn-primary custom-btn-primary" @click="valider">
          Valider
        </button>
      </div>
  </div>
</template>


<style scoped>

.custom-slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
}

datalist {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
    width: 100%;
  font-size: 0.7rem;
}

datalist option {
  all: unset;
    width: 3ch;
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
    width: 100%;
}

input[type="range"] {
    -webkit-appearance: none;
    background: #274351;
    border-radius: 5px;
    background-image: linear-gradient(#c8cf5a);
    background-size: 0% 100%;
    background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #6b94be;
  height: 2rem;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  background-color: #6b94be;
  height: 2.5rem;
  border-radius: 10%;
  border: none;
}

#informationsComplementaireTextArea {
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

.anomalies-list {
  padding: 15px;
}

.transition-rotate {
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(-180deg);
}

</style>
