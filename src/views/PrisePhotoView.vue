<script setup>
import { ref } from "vue";
import { pointData } from "@/store/pointData.js";

const inputPhoto = ref(null);

function ouvrirCamera() {
    inputPhoto.value.click();
}

function onPhotoSelected(event) {
    const file = event.target.files[0];
    if (file) {
        pointData.photo = URL.createObjectURL(file);
    }
}
</script>

<template>
    <div class="vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
                <div class="col-auto d-flex me-3">
                    <RouterLink :to="{ name: 'addInfoPoint' }">
                        <i
                            class="bi bi-arrow-left-square fs-1 align-self-center"
                            style="color: black"
                        ></i
                    ></RouterLink>
                </div>
                <div class="col-auto flex-grow-1">
                    <h1 class="m-0">Ajout du piège</h1>
                </div>
            </div>
        </nav>

        <div class="container vstack justify-content-start">
            <input
                ref="inputPhoto"
                type="file"
                accept="image/*"
                capture="environment"
                class="d-none"
                @change="onPhotoSelected"
            />

            <div class="flex-grow-1" v-if="pointData.photo">
                <img
                    :src="pointData.photo"
                    class="img-fluid"
                    @click="ouvrirCamera"
                />
            </div>

            <div v-else class="flex-grow-1"></div>

            <div>
                <div class="vstack gap-2 m-1">
                    <button
                        v-if="!pointData.photo"
                        class="btn btn-primary"
                        type="button"
                        @click="ouvrirCamera"
                    >
                        Prendre une photo
                    </button>
                    <RouterLink
                        v-else
                        :to="{ name: 'addCoordonneesPoint' }"
                        class="btn btn-primary"
                    >
                        Valider
                    </RouterLink>
                    <RouterLink
                        v-if="!pointData.photo"
                        :to="{ name: 'addCoordonneesPoint' }"
                        class="btn btn-light"
                    >
                        Valider sans photo
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
