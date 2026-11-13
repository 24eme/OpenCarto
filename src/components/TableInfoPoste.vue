<script setup>
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { postesRef, ecrireStorage } from "@/store/postes";
import { etageid2label } from "@/store/etages";
import { PosteStatuts, newHistoryEntry } from "@/store/posteData";

const props = defineProps({
    poste: Object,
});

const route = useRoute();

const selectedPoste = inject("selectedPoste", null);


const poste = computed(() => {
  if (props.poste) {
    return props.poste;
  }
  const depuisStore = postesRef.value.find((p) => p.id === route.params.poste);
  return depuisStore ?? selectedPoste;
});

defineEmits(["next", "prev"]);

function formatDate(datestring) {
    const date = new Date(datestring);
    return date.toLocaleDateString();
}

function anomalies2array(poste) {
  const anomalies = []
  for (const anomalie in poste.anomalies) {
    if (poste.anomalies[anomalie].checked === false) {
      continue;
    }
    anomalies.push(poste.anomalies[anomalie])
  }
  return anomalies;
}

function setDisparuOrArchive(statut) {
    poste.value.statut = statut;
    poste.value.idPoste = "disparu";
    poste.value.history.push(newHistoryEntry(poste.value));
    ecrireStorage(postesRef.value)
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
                                <td>Consommation</td>
                                <td>{{ poste.pourcentage_conso }}%</td>
                            </tr>
                            <tr>
                                <td>Anomalies</td>
                                <td>{{ anomalies2array(poste).length }}</td>
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
                  :to="{ name: 'suiviInfestation', params: { etage: $route.params.etage, poste: poste.id } }"
                  class="btn btn-primary btn-suivi-infestation"
              >
                  Saisir le niveau d'infestation
              </RouterLink>
            </div>

            <hr />

            <div class="row mb-3 mx-auto px-4">
               <RouterLink
                  :to="{ name: 'posteHistory' }"
                  class="btn btn-outline-primary"
              >
                  Voir l'historique
              </RouterLink>
              <router-view></router-view>
            </div>

            <hr />

            <div
                v-if="poste.statut !== PosteStatuts.DISPARU
                      && poste.statut !== PosteStatuts.ARCHIVE"
                class="row mx-auto mt-2 px-4"
            >
                <fieldset class="danger-zone rounded pb-2 gap-2">
                    <legend>Zone de danger</legend>

                    <div class="vstack gap-2 mx-auto">
                        <button
                            @click="setDisparuOrArchive(PosteStatuts.DISPARU)"
                            class="btn btn-outline-secondary"
                        >
                            Poste disparu
                        </button>
                        <button
                            @click="setDisparuOrArchive(PosteStatuts.ARCHIVE)"
                            class="btn btn-outline-secondary"
                        >
                            Archiver le poste
                        </button>
                    </div>
                </fieldset>
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
.danger-zone {
    border: 1px dashed lch(48 61 24);

    legend {
        margin-top: -1em;
        width: fit-content;
        background-color: white;
    }
}
</style>
