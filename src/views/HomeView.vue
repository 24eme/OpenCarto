<script setup>
import UploadPlan from "../components/uploadPlan.vue";
import { etagesConfig } from "@/store/etages";
import { fetchPostes } from "@/store/postes";
import { ref } from "vue";

const clientName = ref("Potel & Chabot");
const etages = ref(etagesConfig);
const modaleOuverte = ref(false);
const postes = ref(fetchPostes());

function getNbPostes(etage) {
    return postes.value.filter((p) => p.etage === etage).length;
}
// Possible de le faire en computed, mais complexifie le code
// const getNbPostes = (etage) =>
//    computed(() => postes.filter((p) => p.etage === etage).length);

function generateStats() {
    const stats = [];
    stats.push({ name: "Nombre total de postes", value: postes.value.length });

    const types = [...new Set(postes.value.map((p) => p.typePoste))];
    const zones = [...new Set(postes.value.map((p) => p.zone))];

    types.forEach((t) => {
        const filtered = postes.value.filter((p) => p.typePoste === t);
        stats.push({
            name: `Nombre de ${t}`,
            value: filtered.length,
        });

        stats.push({
            name: `Consommation des ${t} (moy.)`,
            value:
                parseFloat(
                    filtered.reduce(
                        (total, cv) => cv.pourcentage_conso + total,
                        0,
                    ) / filtered.length,
                ).toFixed(2) + "%",
        });
    });

    zones.forEach((z) => {
        const filtered = postes.value.filter((p) => p.zone === z);
        stats.push({
            name: `Consommation dans la zone ${z} (moy.)`,
            value:
                parseFloat(
                    filtered.reduce(
                        (total, cv) => cv.pourcentage_conso + total,
                        0,
                    ) / filtered.length,
                ).toFixed(2) + "%",
        });
    });

    return stats;
}
</script>

<template>
    <main class="container-fluid g-0 vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start margin-container">
                <div class="col-auto d-flex me-3">
                    <i
                        class="bi bi-arrow-left-square fs-1 align-self-center"
                    ></i>
                </div>
                <div class="col-auto">
                    <h1 class="m-0">Suivi de l'infestation</h1>
                    <small>{{ clientName }}</small>
                </div>
            </div>
        </nav>

        <div class="container">
            <h1 class="mt-4">Liste des étages</h1>
            <div class="table-responsive fs-5">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Étage</th>
                            <th class="text-end">Nb de postes</th>
                            <th class="ms-auto"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="etage in etages">
                            <td>{{ etage.label }}</td>
                            <td class="text-end">
                                {{ getNbPostes(etage.id) }} postes
                            </td>
                            <td class="text-end ms-auto">
                                <RouterLink
                                    :to="{
                                        name: 'etage',
                                        params: { etage: etage.id },
                                    }"
                                    >» Voir</RouterLink
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="float-end">
                    <div
                        @click="modaleOuverte = true"
                        class="btn btn-outline-primary fs-6"
                    >
                        <i class="bi bi-plus"></i>
                        Ajouter un étage
                    </div>
                </div>
            </div>

            <hr />

            <div class="d-flex flex-wrap gap-1 mb-2 overflow-x-scroll">
                <div
                    class="flex-grow-1 border rounded p-2 text-center"
                    v-for="stat in generateStats()"
                >
                    <h6>{{ stat.name }}</h6>
                    <div class="big-number fw-bold text-primary">
                        {{ stat.value }}
                    </div>
                </div>
            </div>
        </div>
    </main>

    <UploadPlan
        v-if="modaleOuverte"
        @fermer="modaleOuverte = false"
    ></UploadPlan>

</template>

<style scoped>
.big-number {
    font-size: 2rem;
}
</style>
