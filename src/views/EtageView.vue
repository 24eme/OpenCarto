<script setup>
import Carte from "../components/carte.vue";
import TableInfoPoint from "@/components/TableInfoPoint.vue";
import FAB from "@/components/FAB.vue"
import { etagesConfig } from "@/store/etages";
import { fetchPoints } from "@/store/points";
import { provide, readonly, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const clientName = ref("Potel & Chabot");
const points = ref(fetchPoints());
const selectedPoint = ref();
const loadedEtage = ref();

watch(() => route.params.etage, checkEtage, { immediate: true });
watch(selectedPoint, (point) => {
    if (point === undefined) {
        router.push({ name: "etage" });
    } else {
        router.push({ name: "pointInfos", params: { point: point.id } });
    }
});

selectedPoint.value = points.value.find((p) => p.id === route.params.point);

provide("selectedPoint", readonly(selectedPoint))

const nextPoint = computed(() => {
    const etagePoints = points.value.filter((p) => p.etage === loadedEtage.value)
    let currentPointIndex = etagePoints.findIndex((p) => p.id === selectedPoint.value.id)
    currentPointIndex++

    if (currentPointIndex >= etagePoints.length) {
        currentPointIndex = 0;
    }

    return etagePoints.at(currentPointIndex);
})

function checkEtage(etage) {
    if (etagesConfig.find(({ id }) => id === etage) === undefined) {
        router.push({ name: "home" }); // pseudo 404
    }
    loadedEtage.value = etage;
}
</script>

<template>
    <main class="container-fluid g-0 vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
                <div class="col-auto d-flex me-3">
                    <RouterLink :to="{ name: 'home' }">
                        <i
                            class="bi bi-arrow-left-square fs-1 align-self-center"
                        ></i
                    ></RouterLink>
                </div>
                <div class="col-auto flex-grow-1">
                    <h1 class="m-0">Suivi de l'infestation</h1>
                    <small>{{ clientName }}</small>
                </div>
            </div>
        </nav>

        <Carte
            carteId="carte"
            carteHeight="100%"
            carteWidth="100%"
            :layer="loadedEtage"
            @pointSelected="(point) => (selectedPoint = point)"
        />

        <FAB
            mainTitle="Ajoute un poste"
            :mainLink="{ name: 'addInfoPoint' }"
            :mainIcons="{ main: 'bi-geo-alt', stack: 'bi-plus' }"
        ></FAB>

        <!-- <router-view> => Nested view visible dans router/index.js -->
        <!-- correspond à /:etage/p/:point et charge TableInfoPoint -->
        <!-- évite de reconstruire une view complète avec une nouvelle -->
        <!-- carte juste pour afficher les infos d'un point -->
        <router-view is="TableInfoPoint"
                v-if="selectedPoint"
                :point="selectedPoint"
                @close="selectedPoint = undefined"
                @next="selectedPoint = nextPoint"
        </router-view>
    </main>
</template>

<style>
</style>
