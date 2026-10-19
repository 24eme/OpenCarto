<script setup>
import { etagesConfig, etageid2label } from "@/store/etages";

const props = defineProps({
    point: Object,
});

defineEmits(["close", "next", "prev"]);

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
                    <div class="text-secondary text-center" style="display: none;">
                        <small>{{ point.id }}</small>
                    </div>
                </div>
            </div>

            <div class="row mx-auto">
              <RouterLink
                  :to="{ name: 'suiviInfestation' }"
                  class="btn btn-primary btn-suivi-infestation"
              >
                  Modifier le niveau d'infestation
              </RouterLink>
            </div>
            <hr />

        </div>
        <div class="d-flex justify-content-center prev-next-btn-container">
          <button class="btn-light theme-primary" type="button" data-astro-cid-suf5bgbc="" @click="$emit('prev')"><div class="sub-prev-next-btn-container"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path>
            <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path>
          </svg>Précédent</div></button>

          <button class="btn-light theme-primary" type="button" data-astro-cid-suf5bgbc="" @click="$emit('next')"><div class="sub-prev-next-btn-container">Suivant<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"></path>
            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"></path>
          </svg></div></button>
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
