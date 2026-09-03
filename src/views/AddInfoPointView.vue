<script setup>
import { pointData } from "@/store/pointData.js";
import { etagesConfig } from "@/store/etages.js";

if (!pointData.idPiege || pointData.idPiege === "0") {
    pointData.idPiege = String(Math.floor(Math.random() * 101));
}
</script>

<template>
    <div class="vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
                <div class="col-auto d-flex me-3">
                    <RouterLink :to="{ name: 'home' }">
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
                <label for="etageSelect" class="h4 form-label"
                    >Choix de l'étage</label
                >
                <select
                    id="etageSelect"
                    class="form-select"
                    v-model="pointData.etage"
                >
                    <option v-for="etage in etagesConfig" :value="etage.id">
                        {{ etage.label }}
                    </option>
                </select>
            </div>

            <div class="my-2">
                <label for="secteurText" class="h4 form-label">Secteur</label>

                <input
                    id="secteurText"
                    class="form-control"
                    type="text"
                    placeholder="ex. : Faux plafond, ..."
                    v-model="pointData.secteur"
                />
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
