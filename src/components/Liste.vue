<script setup>
import { computed } from "vue";
import { PrefixPoste, getPrefixPoste } from "@/store/posteData.js";

const props = defineProps({
  postes: { type: Array, default: () => [] },
});

const ORDRE_TYPES = Object.keys(PrefixPoste);

const sortedPostes = computed(() => {
  return [...props.postes].sort((a, b) => {
    const ia = ORDRE_TYPES.indexOf(a.typePoste);
    const ib = ORDRE_TYPES.indexOf(b.typePoste);
    const ka = ia === -1 ? Infinity : ia;
    const kb = ib === -1 ? Infinity : ib;
    if (ka !== kb) return ka - kb;
    return (parseInt(a.idPoste) || 0) - (parseInt(b.idPoste) || 0);
  });
});
</script>

<template>
  <div class="px-2 mt-3">
  <h1>Liste des postes</h1>
  <div class="list-group fs-6">
    <button class="list-group-item list-group-item-action" v-for="poste in sortedPostes" :key="poste.id" @click="emit('posteSelected', poste)" :class="poste.statut == 'FAIT' ? 'list-group-item-success' : ''">
    <div class="d-flex w-100 justify-content-between">
      <span><span class="badge rounded-pill text-bg-dark">Poste N° {{getPrefixPoste(poste.typePoste)}}{{ poste.idPoste }}</span></span>
      <small>{{ poste.typePoste }}</small>
      <span>{{ poste.zone ? poste.zone : "Aucun" }}</span>
    </div>
    </button>
  </div>
  </div>
</template>
