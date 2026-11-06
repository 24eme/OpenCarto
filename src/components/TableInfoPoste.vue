<script setup>
import { inject } from "vue";
import { etagesConfig, etageid2label } from "@/store/etages";

const props = defineProps({
    poste: Object,
});

const poste = props.poste || inject("selectedPoste");

defineEmits(["next", "prev"]);

function formatDate(datestring) {
    const date = new Date(datestring);
    return date.toLocaleDateString();
}
</script>

<template>
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

            <div class="row mx-auto px-4">
               <RouterLink
                  :to="{ name: 'posteHistory' }"
                  class="btn btn-outline-primary"
              >
                  Voir l'historique
              </RouterLink>
              <router-view></router-view>
            </div>

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
