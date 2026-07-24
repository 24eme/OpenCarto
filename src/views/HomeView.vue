<script setup>
  import Carte from '../components/carte.vue';
  import UploadPlan from '../components/uploadPlan.vue';
  import { ref } from 'vue';

  const clientName = ref('Potel & Chabot');
  const modaleOuverte = ref(false);
</script>

<template>
    <main>
        <div class="text-center">
            <h1><strong>SUIVI DE L'INFESTATION</strong></h1>
            <div class="row">
                <h2 class="col-10">{{ clientName }}</h2>
                <button
                    class="col-2 mb-1 btn btn-secondary"
                    @click="modaleOuverte = true"
                >
                    +
                </button>
            </div>
            <UploadPlan v-if="modaleOuverte" @fermer="modaleOuverte = false" />
        </div>
        <Carte carteId="carte" carteHeight="70dvh" carteWidth="100%" />
        <div class="d-grid gap-2 col-11 mx-auto mb-2 fixed-bottom">
            <RouterLink to="/addInfoPoint" class="btn btn-primary">
                Ajouter un point
            </RouterLink>
        </div>
    </main>
</template>
