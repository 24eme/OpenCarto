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


        <div class="fabs" role="group" aria-label="Floating action buttons">
            <RouterLink
                :to="{ name: 'addInfoPoint' }"
                class="fab"
                title="Ajoute un poste"
                aria-label="Ajoute un poste"
            >
                <i class="d-flex bi bi-geo-alt lh-1">
                    <i class="bi bi-plus stack stack-be"></i>
                </i>
            </RouterLink>
        </div>

        <TableInfoPoint
            v-if="selectedPoint"
            :point="selectedPoint"
            @close="selectedPoint = null"
        ></TableInfoPoint>
    </main>
</template>

<style>
.fabs {
    --_viewport-margin: 5vmin;

    position: fixed;
    z-index: 1000;

    inset-block: auto var(--_viewport-margin);
    inset-inline: auto var(--_viewport-margin);

    display: flex;
    flex-direction: column-reverse;
    place-items: center;
    gap: var(--_viewport-margin);
}

.fab {
    --_size: 2rem;

    padding: calc(var(--_size) / 2);
    border-radius: 50%;
    aspect-ratio: 1;

    box-shadow:
        rgba(0, 0, 0, 0.15) 0px 15px 25px,
        rgba(0, 0, 0, 0.5) 0px 5px 10px;

    background: var(--bs-primary);
    color: var(--bs-light);
    text-align: center;

    &:is(:active, :hover, :focus-visible) {
        background: var(--bs-link-hover-color);
    }

    &:active {
        @media (prefers-reduced-motion: no-preference) {
            transform: translateY(5%);
        }
    }

    & > i {
        font-size: calc(var(--_size) / 1.2);
    }

    & .bi {
        &.stack {
            position: absolute;
            text-shadow:
                -2px -2px 0 var(--bs-primary),
                2px -2px 0 var(--bs-primary),
                -2px 2px 0 var(--bs-primary),
                2px 2px 0 var(--bs-primary);
        }

        &.stack-be {
            /* bottom-end */
            bottom: 0.5rem;
            right: 0.5rem;
        }
    }
}
</style>
