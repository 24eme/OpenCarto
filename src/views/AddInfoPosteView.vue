<script setup>
import { posteData } from "@/store/posteData.js";
import { etagesConfig, etageid2label } from "@/store/etages.js";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
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

existingZones.value = [...new Set(allPostes.value.map((p) => p.zone))].sort()

if (existingZones.value.length < 1) {
    existingZones.value = ["Faux plafond", "Derrière la colonne"];
}

posteData.etage = route.params.etage;

const etageLabel = computed(() => {
    const label = etageid2label(posteData.etage);
    return label.match(/^[aeéiouh]/i) ? "à l'" + label : "au " + label;
})

const availablePosteNumbers = computed(() => {
    const etagePostes = allPostes.value.filter(
        (p) => p.etage === posteData.etage,
    );
    const allPosteIdFromEtage = etagePostes
        .map((p) => p.idPoste)
        .map((i) => parseInt(i));

    const allPossibleIds = range(1, Math.max(...allPosteIdFromEtage) + 1);

    const available = allPossibleIds.filter(
        (i) => allPosteIdFromEtage.includes(i) === false,
    );

    return available;
});

if (!posteData.idPoste || posteData.idPoste === "0") {
    posteData.idPoste = availablePosteNumbers.value.at(0);
}

const isValidPosteId = computed(() => {
    return availablePosteNumbers.value.includes(parseInt(posteData.idPoste));
});
</script>

<template>
    <div class="vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
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

            <div class="my-2">
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
                >
                    <option value="wisebox">Wisebox</option>
                    <option value="mimetic">Mimetic </option>
                    <option value="ekomille">Ekomille</option>
                </select>
            </div>

            <hr />

            <div class="my-2 text-center">
                <p class="fs-3">
                    Numéro du poste<br />
                    <small>à reporter sur l'installation</small>
                </p>

                <input
                    v-model="posteData.idPoste"
                    class="display-1 bg-secondary-subtle py-4 text-center w-100"
                    :class="isValidPosteId ? '' : 'border-danger'"
                />

                <small>Numéros disponibles : {{ availablePosteNumbers }}</small>
            </div>

          <hr />

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
</style>
