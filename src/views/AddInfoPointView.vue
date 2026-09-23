<script setup>
import { pointData } from "@/store/pointData.js";
import { etagesConfig, etageid2label } from "@/store/etages.js";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import Autocomplete from "@/components/Autocomplete.vue";
import { fetchPoints } from "@/store/points";

const route = useRoute();
const existingZones = ref([]);

existingZones.value = [...new Set(fetchPoints().map((p) => p.zone))].sort()

if (existingZones.value.length < 1) {
    existingZones.value = ["Faux plafond", "Derrière la colonne"];
}

if (!pointData.idPiege || pointData.idPiege === "0") {
    pointData.idPiege = String(Math.floor(Math.random() * 101));
}

pointData.etage = route.params.etage;

const etageLabel = computed(() => {
    const label = etageid2label(pointData.etage);
    return label.match(/^[aeéiouh]/i) ? "à l'" + label : "au " + label;
})
</script>

<template>
    <div class="vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
                <div class="col-auto d-flex me-3">
                    <RouterLink
                        :to="{
                            name: 'etage',
                            params: { etage: pointData.etage },
                        }"
                    >
                        <i class="bi bi-arrow-left-square fs-1 align-self-center" style="color: black;"></i></RouterLink>
                </div>
                <div class="col-auto flex-grow-1">
                    <h1 class="m-0">Ajouter un point</h1>
                </div>
            </div>
        </nav>

        <div class="container vstack justify-content-start">
            <div class="my-2">
                <!-- mettre par défaut l'étage sur lequel il est -->
                <h3>Le point sera placé {{ etageLabel }}</h3>
            </div>

            <div class="my-2">
                <label for="zoneText" class="h4 form-label">Zone</label>

                <Autocomplete
                    id="zoneText"
                    @filter="(zone) => (pointData.zone = zone)"
                    name="autocomplete-zones"
                    placeholder="ex. : Faux plafond, …"
                    :options="existingZones"
                ></Autocomplete>
            </div>

            <div class="my-2 mb-auto">
                <label for="typeSelect" class="h4 form-label"
                    >Type de piège</label
                >
                <select
                    id="typeSelect"
                    class="form-select"
                    aria-label="select-type-piege"
                    v-model="pointData.typePiege"
                >
                    <option value="Câlin">Câlin</option>
                    <option value="Bisous">Bisous</option>
                    <option value="Carresse">Carresse</option>
                </select>
            </div>

            <hr />

            <div class="my-2 text-center">
                <p class="fs-3">
                    Numéro du piège<br />
                    <small>à reporter sur l'installation</small>
                </p>

                <p class="display-1 bg-secondary-subtle py-4">
                    {{ pointData.idPiege }}
                </p>
            </div>
        </div>

        <div class="m-1 row">
            <RouterLink :to="{ name: 'prisePhoto' }" class="btn btn-primary">
                Continuer
            </RouterLink>
        </div>
    </div>
</template>

<style></style>
