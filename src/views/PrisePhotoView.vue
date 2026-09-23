<script setup>
import { ref } from "vue";
import { pointData } from "@/store/pointData.js";
import { etageid2label } from "@/store/etages";

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

        <div class="container vstack justify-content-start gap-1">
            <div class="border bg-light rounded-1 p-3 mt-1">
                <h6>Information sur le piège :</h6>
                <div class="row row-cols-2 py-2">
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-geo-fill fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Étage</h3>
                            <p>{{ etageid2label(pointData.etage) }}</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-brilliance fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Type de piège</h3>
                            <p>{{ pointData.typePiege }}</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-columns fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Zone</h3>
                            <p>{{ pointData.zone }}</p>
                        </div>
                    </div>
                </div>
            </div>

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

                <textarea
                    id="descriptionPhotoTextArea"
                    class="mt-2 form-control"
                    rows="2"
                    v-model="pointData.descriptionPhoto"
                    placeholder="Description de l'emplacement"
                ></textarea>
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
