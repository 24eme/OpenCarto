<script setup>
import { etagesConfig, etageid2label } from "@/store/etages";

const props = defineProps({
    poste: Object,
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
            Poste n° {{ poste.idPoste }}
            <span class="fs-6 cursor-not-allowed bi bi-pencil"></span>
            <span class="float-end cursor-pointer" @click="$emit('close')">
                ×
            </span>
        </h5>

        <div class="row overflow-auto">
            <div class="col-sm-3 mx-auto align-self-stretch" v-if="poste.photo">
                <figure class="figure">
                    <img class="figure-img img-fluid d-block mx-auto" :src="poste.photo" alt="Photo du poste"></img>
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
                                <td>{{ etageid2label(poste.etage) }}</td>
                            </tr>
                            <tr>
                                <td>Zone</td>
                                <td>{{ poste.zone }}</td>
                            </tr>
                            <tr>
                                <td>Type de poste</td>
                                <td>{{ poste.typePoste}}</td>
                            </tr>
                            <tr>
                                <td>Photo</td>
                                <td v-if="!poste.photo">
                                    <i class="bi bi-camera"></i> Ajouter
                                </td>
                                <td v-else>Modifier</td>
                            </tr>
                            <tr>
                                <td>Créé le</td>
                                <td>{{ formatDate(poste.creeLe) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-secondary text-center" style="display: none;">
                        <small>{{ poste.id }}</small>
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
          <button class="hstack gap-2 btn btn-light fw-semibold" type="button" @click="$emit('prev')">
              <i class="bi bi-chevron-double-left"></i>
              Précédent
          </button>

          <button class="hstack gap-2 btn btn-light fw-semibold" type="button" @click="$emit('next')">
              Suivant
              <i class="bi bi-chevron-double-right"></i>
          </button>
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
