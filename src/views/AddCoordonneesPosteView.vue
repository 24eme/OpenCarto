<script setup>
import { onMounted, useTemplateRef, ref } from "vue";
import { useRouter } from "vue-router";
import {
    posteData,
    reinitialiserPosteData,
} from "@/store/posteData.js";
import { createPoste } from "@/store/postes.js";
import Carte from "../components/carte.vue";
import Notification from "@/components/Notification.vue";
import FAB from "@/components/FAB.vue";

const router = useRouter();
const enregistrement = ref(false);
const erreur = ref(null);

function valider() {
    enregistrement.value = true;
    erreur.value = null;
    try {
        const newPoste = createPoste({ ...posteData });
        reinitialiserPosteData();
        router.push({ name: "posteInfos", params: { poste: newPoste.id } });
    } catch (e) {
        erreur.value = "Impossible d'enregistrer le poste. Réessaie.";
    } finally {
        enregistrement.value = false;
    }
}

function updatePosteCoordinate(coordinates) {
    posteData.coordonnees = coordinates;
}
</script>

<template>
    <main class="container-fluid g-0 vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start flex-nowrap">
                <div class="col-auto d-flex me-3">
                    <RouterLink :to="{ name: 'rapport' }">
                        <i
                            class="bi bi-arrow-left-square fs-1 align-self-center"
                        ></i
                    ></RouterLink>
                </div>
                <div class="col-auto flex-grow-1 flex-fill">
                    <h1 class="m-0">Positionner le poste</h1>
                    <small>
                        Fais défiler la carte pour placer le viseur au bon
                        endroit
                    </small>
                </div>
            </div>
        </nav>

        <div class="text-center flex-grow-1">
            <div class="carte-wrapper">
                <Carte
                    carteId="carte"
                    carteHeight="100%"
                    carteWidth="100%"
                    hasCoordinatesSelector
                    :layer="posteData.etage"
                    @move="updatePosteCoordinate"
                ></Carte>
            </div>
        </div>

        <Notification
            v-if="erreur"
            level="danger"
            :message="erreur"
            @close="erreur = null"
        />

        <FAB
            mainTitle="Valider le placement"
            :mainIcons="{ main: 'bi-check-lg' }"
            @click="valider"
        ></FAB>
    </main>
</template>

<style>
.carte-wrapper {
    position: relative;
    height: 100%;
}

.viseur {
    position: absolute;
    place-self: center;
    inset: 0;

    background: var(--bs-warning-bg-subtle);
    font-size: 12px;

    border: 2px solid var(--bs-warning);
    border-radius: 50%;
    width: 25px;
    height: 25px;

    pointer-events: none;
    z-index: 1000;
    user-select: none;

    & > span {
        margin-left: -100%;
        margin-right: -100%;
        text-align: center;
    }
}
</style>
