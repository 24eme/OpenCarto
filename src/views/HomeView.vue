<script setup>
import UploadPlan from "../components/uploadPlan.vue";
import { etagesConfig } from "@/store/etages";
import { fetchDatas, fetchPostes } from "@/store/postes";
import { NomPoste, getNomPoste } from "@/store/posteData";
import { ref, computed, onMounted } from "vue";
import AnnexesPDF from "@/components/AnnexesPDF.vue";
import { jsPDF } from "jspdf";

let urlAPI = ""
let clientName = ref("Potel & Chabot");
let url = null;
const etages = ref(etagesConfig);
const modaleOuverte = ref(false);
const datas = ref(fetchDatas());
const postes = ref(fetchPostes());


function getNbPostes(etage) {
    return postes.value.filter((p) => p.etage === etage).length;
}
// Possible de le faire en computed, mais complexifie le code
// const getNbPostes = (etage) =>
//    computed(() => postes.filter((p) => p.etage === etage).length);

function generateStats() {
    const stats = [];
    stats.push({ name: "Nombre total de postes", value: postes.value.length });


    const types = [...new Set(Object.keys(NomPoste))];

    types.forEach((t) => {
        const filtered = postes.value.filter((p) => p.typePoste === t);

        stats.push({
            name: `${getNomPoste(t)}`,
            value: filtered.length,
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
      save(postes.value);
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


async function save(postes) {
  const res = await fetch(urlAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postes),
  })
  if (! res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
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

            <div class="d-flex flex-column align-items-center gap-2 mb-2">
              <h1>Récapitulatif</h1>
                <div
                    class="border rounded p-2 text-center stat-block"
                    v-for="stat in generateStats()"
                    :key="stat.name"
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

.stat-block {
    width: 20rem;
    max-width: 100%;
}
</style>
