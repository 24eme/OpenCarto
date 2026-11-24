<script setup>
import UploadPlan from "../components/uploadPlan.vue";
import { etagesConfig } from "@/store/etages";
import { fetchPostes } from "@/store/postes";
import { ref, computed, onMounted } from "vue";
import AnnexesPDF from "@/components/AnnexesPDF.vue";
import { jsPDF } from "jspdf";

let clientName = ref("Potel & Chabot");
let url = null;
const etages = ref(etagesConfig);
const modaleOuverte = ref(false);
const postes = ref(fetchPostes());
const statistiquesOpened = ref(false);
const statistiquesOpenedIcon = computed(() => ({
    "bi-chevron-contract": statistiquesOpened.value === true,
    "bi-chevron-expand": statistiquesOpened.value === false,
}))

function getNbPostes(etage) {
    return postes.value.filter((p) => p.etage === etage).length;
}
// Possible de le faire en computed, mais complexifie le code
// const getNbPostes = (etage) =>
//    computed(() => postes.filter((p) => p.etage === etage).length);

function generateStats() {
    const stats = [];
    stats.push({ name: "Nombre total de postes", value: postes.value.length });

    const types = [...new Set(postes.value.map((p) => p.typePoste))];
    const zones = [...new Set(postes.value.map((p) => p.zone))];

    types.forEach((t) => {
        const filtered = postes.value.filter((p) => p.typePoste === t);
        stats.push({
            name: `Nombre de ${t}`,
            value: filtered.length,
        });

        stats.push({
            name: `Consommation des ${t} (moy.)`,
            value:
                parseFloat(
                    filtered.reduce(
                        (total, cv) => cv.pourcentage_conso + total,
                        0,
                    ) / filtered.length,
                ).toFixed(2) + "%",
        });
    });

    zones.forEach((z) => {
        const filtered = postes.value.filter((p) => p.zone === z);
        stats.push({
            name: `Consommation dans la zone ${z} (moy.)`,
            value:
                parseFloat(
                    filtered.reduce(
                        (total, cv) => cv.pourcentage_conso + total,
                        0,
                    ) / filtered.length,
                ).toFixed(2) + "%",
        });
    });

    return stats;
}

const annexesPdfRef = ref();
const pdfGenerationButton = ref();

const show = false;


onMounted(() => {
  const annexesHtml = annexesPdfRef.value.annexesHtml;
  const params = new URLSearchParams(window.location.search);
  if(params.get('url')) {
    localStorage.setItem("url", params.get('url'));
  }
  if(params.get('client')) {
    localStorage.setItem("client", params.get('client'));
  }
  if(localStorage.getItem('client')) {
    clientName.value = localStorage.getItem('client');
  }
  window.addEventListener("click", function (e) {
    if (e.target == pdfGenerationButton.value) {
      generatePdfAnnexes(annexesHtml);
    }
  });
});


function generatePdfAnnexes(annexesHtml) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format:"a4",
  });

  const annexesContent = annexesHtml.innerHTML

  doc.html("<div style='display:flex; flex-direction:column;'>" + annexesContent + "</div>", {
    callback: function (doc) {
      doc.save("rapport_annexes.pdf");
    },
    x: 20,
    y: 20,
    width: 750,
    windowWidth: 750,
  });
}
</script>

<template>
    <main class="container-fluid g-0 vstack fullscreen">
        <nav class="navbar bg-body-tertiary">
            <div class="container justify-content-start margin-container">
                <div class="col-auto d-flex me-3">
                    <i onclick="document.location.href = localStorage.getItem('url')"
                        class="bi bi-arrow-left-square fs-1 align-self-center"
                    ></i>
                </div>
                <div class="col-auto">
                    <h1 class="m-0">{{ clientName }}</h1>
                </div>
            </div>
        </nav>

        <div class="container">
            <h1 class="mt-4">Liste des étages</h1>

            <div class="list-group fs-5 mt-3 mb-4">
              <RouterLink class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" v-for="etage in etages"
                  :to="{
                      name: 'etage',
                      params: { etage: etage.id },
                  }"
                  >{{ etage.label }} <span class="badge text-bg-primary rounded-pill">{{ getNbPostes(etage.id) }} postes</span>
              </RouterLink>
            </div>


            <div class="">
              <div
              @click="modaleOuverte = true"
              class="btn btn-outline-primary fs-6">
              <i class="bi bi-plus"></i>
                Ajouter un étage
              </div>
            </div>

          <hr />

            <div>
              <AnnexesPDF v-show="show" ref="annexesPdfRef"
              :postes="postes"
              >

              </AnnexesPDF>

              <button class="btn btn-outline-primary btn-send-tournee custom-btn-primary" ref="pdfGenerationButton"
              >
                Envoyer dans la tournée
              </button>
            </div>

            <hr />

            <h1 @click="statistiquesOpened = !statistiquesOpened">
                Statistiques
                <span
                    class="float-end bi"
                    :class="statistiquesOpenedIcon"
                ></span>
            </h1>
            <div class="d-flex flex-wrap gap-1 mb-2"
                v-if="statistiquesOpened"
            >
                <div
                    class="flex-grow-1 border rounded p-2 text-center"
                    v-for="stat in generateStats()"
                >
                    <h6>{{ stat.name }}</h6>
                    <div class="big-number fw-bold text-primary">
                        {{ stat.value }}
                    </div>
                </div>
            </div>
        </div>
    </main>

    <UploadPlan
        v-if="modaleOuverte"
        @fermer="modaleOuverte = false"
    ></UploadPlan>

</template>

<style scoped>
.big-number {
    font-size: 2rem;
}

.btn-send-tournee {
  display: flex;
  margin: 40px auto;
  justify-content: center;
  font-weight: normal;
  width: 20rem ;
}
</style>
