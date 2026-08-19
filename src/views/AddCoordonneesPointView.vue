<script setup>
import { onMounted, useTemplateRef, ref } from "vue";
import { useRouter } from "vue-router";
import { pointData, reinitialiserPointData } from "../store/pointData.js";
import { createPoint } from "../store/points.js";
import Carte from "../components/carte.vue";
import Notification from "@/components/Notification.vue";

const router = useRouter();
const enregistrement = ref(false);
const erreur = ref(null);

function valider() {
    enregistrement.value = true;
    erreur.value = null;
    try {
        createPoint({ ...pointData });
        reinitialiserPointData();
        router.push({ name: "home" });
    } catch (e) {
        erreur.value = "Impossible d'enregistrer le point. Réessaie.";
    } finally {
        enregistrement.value = false;
    }
}

function updatePointCoordinate(coordinates) {
    pointData.coordonnees = coordinates;
}
</script>

<template>
  <nav class="navbar bg-body-tertiary">
      <div class="container justify-content-start">
          <div class="col-auto d-flex me-3">
              <RouterLink :to="{ name: 'prisePhoto' }">
                  <i class="bi bi-arrow-left-square fs-1 align-self-center" style="color: black;"></i></RouterLink>
          </div>
          <div class="col-auto flex-grow-1">
              <h1 class="m-0">Positionner le point</h1>
          </div>
          <p class="text-muted align-center">
              Fais défiler la carte pour placer le viseur au bon endroit
          </p>
      </div>
  </nav>
    <div class="text-center">
        <div class="carte-wrapper">
            <Carte
                carteId="carte"
                carteHeight="70dvh"
                carteWidth="100%"
                hasCoordinatesSelector="true"
                :layer="pointData.etage"
                @move="updatePointCoordinate"
            ></Carte>
        </div>

        <Notification
            v-if="erreur"
            level="danger"
            :message="erreur"
            @close="erreur = null"
        />

        <div class="d-grid gap-2 col-11 mx-auto mt-3">
            <button
                class="btn btn-primary"
                type="button"
                @click="valider"
                :disabled="enregistrement"
            >
                Valider l'emplacement
            </button>
        </div>
    </div>
</template>

<style>
.carte-wrapper {
    position: relative;
}

.viseur {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    line-height: 1;
    color: #dc3545;
    pointer-events: none;
    z-index: 1000;
    user-select: none;
}
</style>
