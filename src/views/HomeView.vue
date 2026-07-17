<script setup>
import Carte from '../components/carte.vue';
import { ref } from 'vue';

const clientName = ref('Potel & Chabot');
</script>

<template>
  <main>
    <div class="text-center">
      <h1><strong>SUIVI DE L'INFESTATION</strong></h1>
      <h2>{{ clientName }}</h2>
    </div>
    <Carte />
      <div class="d-grid gap-2 col-11 mx-auto mb-2 fixed-bottom">
        <RouterLink to="/addPoint" class="btn btn-primary">
          Ajouter un point
        </RouterLink>
      </div>
  </main>
</template>
