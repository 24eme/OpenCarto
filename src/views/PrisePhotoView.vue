<script setup>
import { ref } from "vue";
import { posteData } from "@/store/posteData.js";
import { etageid2label } from "@/store/etages";

const inputPhoto = ref(null);

function ouvrirCamera() {
    inputPhoto.value.click();
}

function onPhotoSelected(event) {
    const file = event.target.files[0];
    if (file) {
        posteData.photo = URL.createObjectURL(file);
    }
}
</script>

<template>
    <div class="vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start">
                <div class="col-auto d-flex me-3">
                    <RouterLink :to="{ name: 'addInfoPoste' }">
                        <i
                            class="bi bi-arrow-left-square fs-1 align-self-center"
                            style="color: black"
                        ></i
                    ></RouterLink>
                </div>
                <div class="col-auto flex-grow-1">
                    <h1 class="m-0">Ajout du poste</h1>
                </div>
            </div>
        </nav>

        <div class="vstack justify-content-start gap-1">
            <div class="border bg-light rounded-1 p-3 pb-0 mt-1">
                <h6>Information sur le poste :</h6>
                <div class="row row-cols-2 row-cols-sm-4">
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-geo-fill fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Étage</h3>
                            <p>{{ etageid2label(posteData.etage) }}</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-brilliance fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Type de poste</h3>
                            <p>{{ posteData.typePoste }}</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-columns fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Zone</h3>
                            <p>{{ posteData.zone }}</p>
                        </div>
                    </div>
                    <div class="col d-flex align-items-start">
                        <i
                            class="bi bi-columns fs-4 me-2"
                            aria-hidden="true"
                        ></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-5">Numéro du poste</h3>
                            <p>{{ posteData.idPoste }}</p>
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

            <div class="flex-grow-1" v-if="posteData.photo">
                <img
                    :src="posteData.photo"
                    class="img-fluid d-block mx-auto"
                    style="max-height: 50svh"
                    @click="ouvrirCamera"
                />
            </div>

            <div v-else class="flex-grow-1"></div>

            <div>
                <div class="vstack gap-2 m-1">
                    <textarea
                        v-if="posteData.photo"
                        id="descriptionPhotoTextArea"
                        class="mt-2 form-control"
                        rows="2"
                        v-model="posteData.descriptionPhoto"
                        placeholder="Description de l'emplacement (optionel)"
                    ></textarea>
                    <div class="buttons-container picture-button-container">
                        <RouterLink
                            v-if="!posteData.photo"
                            :to="{ name: 'rapport' }"
                            class="btn btn-primary custom-btn-primary border-button"
                        >
                            Continuer sans photo
                        </RouterLink>

                        <button
                            v-if="!posteData.photo"
                            class="btn btn-light custom-btn-primary"
                            type="button"
                            @click="ouvrirCamera"
                        >
                            Prendre une photo du poste en place
                        </button>

                    <RouterLink
                        v-else
                        :to="{ name: 'rapport' }"
                        class="btn btn-primary custom-btn-primary"
                    >
                        Continuer
                    </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
