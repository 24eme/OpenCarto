<script setup>
import Carte from "../components/carte.vue";
import TableInfoPoste from "@/components/TableInfoPoste.vue";
import FAB from "@/components/FAB.vue"
import { etagesConfig } from "@/store/etages";
import { fetchPostes } from "@/store/postes";
import { provide, readonly, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const clientName = ref("Potel & Chabot");
const postes = ref(fetchPostes());
const selectedPoste = ref();
const loadedEtage = ref();

const nextPoste = computed(() => {
    const etagePostes = postes.value.filter((p) => p.etage === loadedEtage.value)
    let currentPosteIndex = etagePostes.findIndex((p) => p.id === selectedPoste.value.id)
    currentPosteIndex++

    if (currentPosteIndex >= etagePostes.length) {
        currentPosteIndex = 0;
    }

    return etagePostes.at(currentPosteIndex);
})

const prevPoste = computed(() => {
    const etagePostes = postes.value.filter((p) => p.etage === loadedEtage.value)
    let currentPosteIndex = etagePostes.findIndex((p) => p.id === selectedPoste.value.id)
    currentPosteIndex--

    if (currentPosteIndex < 0) {
        currentPosteIndex = etagePostes.length - 1;
    }

    return etagePostes.at(currentPosteIndex);
})

watch(() => route.params.etage, checkEtage, { immediate: true });
watch(selectedPoste, (poste) => {
    if (poste === undefined) {
        router.push({ name: "etage" });
    } else {
        router.push({ name: "posteInfos", params: { poste: poste.id } });
    }
});

selectedPoste.value = postes.value.find((p) => p.id === route.params.poste);

provide("selectedPoste", readonly(selectedPoste))

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
            @posteSelected="(poste) => (selectedPoste = poste)"
        />

        <FAB
            mainTitle="Ajouter un poste"
            :mainLink="{ name: 'addInfoPoste' }"
            :mainIcons="{ main: 'bi-geo-alt', stack: 'bi-plus' }"
        ></FAB>

        <!-- <router-view> => Nested view visible dans router/index.js -->
        <!-- correspond à /:etage/p/:poste et charge TableInfoPoste -->
        <!-- évite de reconstruire une view complète avec une nouvelle -->
        <!-- carte juste pour afficher les infos d'un poste -->
        <router-view is="TableInfoPoste"
                v-if="selectedPoste"
                :poste="selectedPoste"
                @close="selectedPoste = undefined"
                @next="selectedPoste = nextPoste"
                @prev="selectedPoste = prevPoste"
        </router-view>
    </main>
</template>

<style>
</style>
