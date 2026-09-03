<script setup>
import Carte from "../components/carte.vue";
import UploadPlan from "../components/uploadPlan.vue";
import TableInfoPoint from "@/components/TableInfoPoint.vue";
import { ref } from "vue";

const clientName = ref("Potel & Chabot");
const modaleOuverte = ref(false);
const selectedPoint = ref(null);
</script>

<template>
    <main class="container g-0 vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
                <div class="col-auto d-flex me-3">
                    <i
                        class="bi bi-arrow-left-square fs-1 align-self-center"
                    ></i>
                </div>
                <div class="col-auto flex-grow-1">
                    <h1 class="m-0">Suivi de l'infestation</h1>
                    <small>{{ clientName }}</small>
                </div>
            </div>
        </nav>

        <UploadPlan
            v-if="modaleOuverte"
            @fermer="modaleOuverte = false"
        ></UploadPlan>

        <Carte
            class="flex-grow-1"
            carteId="carte"
            carteHeight="100%"
            carteWidth="100%"
            @pointSelected="(point) => (selectedPoint = point)"
        />

        <div class="m-1 row column-gap-1">
            <button
                class="col-2 btn btn-secondary"
                @click="modaleOuverte = true"
            >
                +
            </button>

            <RouterLink
                :to="{ name: 'addInfoPoint' }"
                class="col btn btn-primary"
            >
                Ajouter un point
            </RouterLink>
        </div>

        <TableInfoPoint
            v-if="selectedPoint"
            :point="selectedPoint"
            @close="selectedPoint = null"
        ></TableInfoPoint>
    </main>
</template>
