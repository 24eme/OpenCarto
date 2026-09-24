<script setup>
import { etagesConfig, etageid2label } from "@/store/etages";

const props = defineProps({
    point: Object,
});

defineEmits(["close", "next"]);

function formatDate(datestring) {
    const date = new Date(datestring);
    return date.toLocaleDateString();
}
</script>

<template>
    <div class="fixed-bottom card">
        <h5 class="card-header">
            Point n° {{ point.idPiege }}
            <span class="fs-6 cursor-not-allowed bi bi-pencil"></span>
            <span class="float-end cursor-pointer" @click="$emit('close')">
                ×
            </span>
        </h5>
        <div class="d-flex justify-content-center">
            <span style="user-select: none;" class=" cursor-pointer" @click="$emit('next')">
                Suivant »
            </span>
        </div>
        <div class="row overflow-auto">
            <div class="col-sm-3 mx-auto align-self-stretch" v-if="point.photo">
                <figure class="figure">
                    <img class="figure-img img-fluid d-block mx-auto" :src="point.photo" alt="Photo du piège"></img>
                </figure>
            </div>
            <div class="col px-3">
                <div class="table-responsive">
                    <table class="table table-stripped">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Valeur</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr>
                                <td>Étage</td>
                                <td>{{ etageid2label(point.etage) }}</td>
                            </tr>
                            <tr>
                                <td>Zone</td>
                                <td>{{ point.zone }}</td>
                            </tr>
                            <tr>
                                <td>Type de piège</td>
                                <td>{{ point.typePiege }}</td>
                            </tr>
                            <tr>
                                <td>Photo</td>
                                <td v-if="!point.photo">
                                    <i class="bi bi-camera"></i> Ajouter
                                </td>
                                <td v-else>Modifier</td>
                            </tr>
                            <tr>
                                <td>Créé le</td>
                                <td>{{ formatDate(point.creeLe) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-secondary text-center">
                        <small>{{ point.id }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    max-height: 50dvh;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-not-allowed {
    cursor: not-allowed;
}
</style>
