<script setup>
import UploadPlan from "../components/uploadPlan.vue";
import { etagesConfig } from "@/store/etages";
import { fetchPoints } from "@/store/points";
import { ref } from "vue";

const clientName = ref("Potel & Chabot");
const etages = ref(etagesConfig);
const modaleOuverte = ref(false);
const points = fetchPoints();

function getNbPoints(etage) {
    return points.filter((p) => p.etage === etage).length;
}
// Possible de le faire en computed, mais complexifie le code
// const getNbPoints = (etage) =>
//    computed(() => points.filter((p) => p.etage === etage).length);
</script>

<template>
    <main class="container-fluid g-0 vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
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
                            <th class="text-end">Nb de pièges</th>
                            <th class="ms-auto"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="etage in etages">
                            <td>{{ etage.label }}</td>
                            <td class="text-end">
                                {{ getNbPoints(etage.id) }} points
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
        </div>
    </main>

    <UploadPlan
        v-if="modaleOuverte"
        @fermer="modaleOuverte = false"
    ></UploadPlan>

</template>

<style></style>
