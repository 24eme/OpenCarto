<script setup>
import { posteData, PosteStatuts, getPrefixPoste } from "@/store/posteData.js";
import { etagesConfig, etageid2label } from "@/store/etages.js";
import { useRoute } from "vue-router";
import { ref, computed, watch, onMounted} from "vue";
import Autocomplete from "@/components/Autocomplete.vue";
import { fetchPostes, range } from "@/store/postes";

const route = useRoute();
const allPostes = ref(fetchPostes())
const existingZones = ref([]);

const lastZone = computed(() => {
    if (posteData.zone) {
        return posteData.zone;
    }

    const filtered = allPostes.value.filter((p) => p.etage === posteData.etage);

    if (filtered.length) {
        return filtered.at(-1).zone;
    }

    return "";
});
const lastType = computed(() => {
    if (posteData.typePoste) {
        return posteData.typePoste;
    }

    const filtered = allPostes.value.filter((p) => p.etage === posteData.etage);

    if (filtered.length) {
        return filtered.at(-1).typePoste;
    }

    return null;
});

existingZones.value = [...new Set(allPostes.value.map((p) => p.zone))].sort()

if (existingZones.value.length < 1) {
    existingZones.value = ["Faux plafond", "Derrière la colonne"];
}

posteData.etage = route.params.etage;
posteData.typePoste = lastType.value;
posteData.zone = lastZone.value;

const etageLabel = computed(() => {
    const label = etageid2label(posteData.etage);
    return label.match(/^[aeéiouh]/i) ? "à l'" + label : "au " + label;
})

const availablePosteNumbers = computed(() => {
    const etagePostes = allPostes.value.filter(
        (p) => p.etage === posteData.etage && p.typePoste === posteData.typePoste,
    );
    const allPosteIdFromEtage = etagePostes
        .map((p) => p.idPoste)
        .map((i) => parseInt(i))
        .filter((i) => Number.isInteger(i));

    if (allPosteIdFromEtage.length === 0) {
        return [1];
    }

    const allPossibleIds = range(1, Math.max(...allPosteIdFromEtage) + 1);

    const available = allPossibleIds.filter(
        (i) => allPosteIdFromEtage.includes(i) === false,
    );

    return available;
});

watch(
    () => posteData.typePoste,
    () => {
        posteData.idPoste = availablePosteNumbers.value.at(0);
    },
);

if (!posteData.idPoste || posteData.idPoste === "0") {
    posteData.idPoste = availablePosteNumbers.value.at(0);
}

const isValidPosteId = computed(() => {
    return availablePosteNumbers.value.includes(parseInt(posteData.idPoste));
});

const prefixPoste = computed (() => getPrefixPoste(posteData.typePoste));


const autocompleteZones = ref();
const isDisabled = ref(false);


onMounted(() => {
  const autocompleteOptions = autocompleteZones.value.children[1].children[1];
  const config = { attributes: true, attributeFilter: ["style"] };

  const callback = (mutationList, observer) => {
    const autocompleteOptionsDisplay = window.getComputedStyle(autocompleteOptions).getPropertyValue("display");

    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        if (autocompleteOptionsDisplay == "block") {
          isDisabled.value = true;
        } else {
          isDisabled.value = false;
        }
      }
    }
  }
  const observer = new MutationObserver(callback);
  observer.observe(autocompleteOptions, config);
});

</script>

<template>
    <div class="vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start margin-container">
                <div class="col-auto d-flex me-3">
                    <RouterLink
                        :to="{
                            name: 'etage',
                            params: { etage: posteData.etage },
                        }"
                    >
                        <i class="bi bi-arrow-left-square fs-1 align-self-center" style="color: black;"></i></RouterLink>
                </div>
                <div class="col-auto flex-grow-1">
                    <h1 class="m-0">Ajouter un poste</h1>
                </div>
            </div>
        </nav>

        <div class="container vstack justify-content-start">
            <div class="my-2">
                <!-- mettre par défaut l'étage sur lequel il est -->
                <h3>Le poste sera placé {{ etageLabel }}</h3>
            </div>

            <div class="my-2" ref="autocompleteZones">

                <label for="zoneText" class="h4 form-label">Zone</label>

                <Autocomplete
                    id="zoneText"
                    @filter="(zone) => (posteData.zone = zone)"
                    name="autocomplete-zones"
                    placeholder="ex. : Faux plafond, …"
                    :options="existingZones"
                    :initial-value="lastZone"
                ></Autocomplete>
            </div>

            <div class="my-2 mb-auto">
                <label for="typeSelect" class="h4 form-label">
                    Type de poste
                </label>
                <select
                    id="typeSelect"
                    class="form-select"
                    aria-label="select-type-poste"
                    v-model="posteData.typePoste"
                    :disabled="isDisabled"
                    :style="{ 'background-color': isDisabled ? 'white' : null }"
                >
                    <option value="wisebox">Wisebox</option>
                    <option value="mimetic">Mimetic </option>
                    <option value="ekomille">Ekomille</option>
                    <option value="boite-souris-secu">Boite souris sécurisée</option>
                    <option value="boite-rat-carton"> Boîte rat carton</option>
                </select>
            </div>

            <hr />

            <div class="my-2 text-center">
                <p class="fs-3">
                    Numéro du poste<br />
                    <small>à reporter sur l'installation</small>
                </p>

                <div class="poste-id-wrapper">
                  <span class="poste-id-prefix display-1">{{ prefixPoste }} -</span>
                  <input
                  v-model="posteData.idPoste"
                  class="display-1 bg-secondary-subtle py-4 text-center w-100"
                  :class="isValidPosteId ? '' : 'border-danger'"
                  inputmode="numeric"
                  @input="posteData.idPoste = posteData.idPoste.replace(/\D/g, '')"
                  />
                </div>

                Numéros disponibles : {{ availablePosteNumbers }}
            </div>
            <hr />

            <div class="my-2 text-center" v-if="getPrefixPoste(posteData.typePoste)">
              <p class="fs-3">
                Numéro interne de la machine
              </p>
              <input
              >
              </input>
              <hr />

            </div>
        </div>

        <div class="m-2 large-margin-top row">
            <component
                :is="isValidPosteId ? 'router-link' : 'span'"
                :to="{ name: 'prisePhoto' }"
                class="btn btn-primary custom-btn-primary"
                :class="isValidPosteId ? '' : 'disabled'"
            >
                Continuer
            </component>
        </div>
    </div>
</template>

<style scoped>
.large-margin-top {
    margin-top: 20% !important;
}

.poste-id-wrapper {
    position: relative;
}

.poste-id-prefix {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--bs-secondary-color);
    pointer-events: none;
    user-select: none;
}
</style>
