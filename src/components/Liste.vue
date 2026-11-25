<script setup>
import { computed } from "vue";
import { PrefixPoste, getPrefixPoste } from "@/store/posteData.js";

const props = defineProps({
  postes: { type: Array, default: () => [] },
});

const emit = defineEmits(["posteSelected"]);

const ORDRE_TYPES = Object.keys(PrefixPoste);

const sortedPostes = computed(() => {
  let postes = {};
  console.log(props.postes);
  for(let p of props.postes) {
    if(!postes[p.zone]) {
      postes[p.zone] = [];
    }
    postes[p.zone].push(p);
    postes[p.zone] = postes[p.zone].sort((a, b) => {
      const ia = ORDRE_TYPES.indexOf(a.typePoste);
      const ib = ORDRE_TYPES.indexOf(b.typePoste);
      const ka = ia === -1 ? Infinity : ia;
      const kb = ib === -1 ? Infinity : ib;
      if (ka !== kb) return ka - kb;
      return (parseInt(a.idPoste) || 0) - (parseInt(b.idPoste) || 0);
    })
  }
  return postes;
});
</script>

<template>
  <div class="px-2 mt-3">
  <h1>Liste des postes</h1>
  <div v-for="(postes,typePoste) in sortedPostes">
    <h2 class="mt-3">{{ typePoste }}</h2>
    <div class="list-group fs-5">
      <button class="list-group-item list-group-item-action" v-for="poste in postes" :key="poste.id" @click="emit('posteSelected', poste)" :class="poste.statut == 'FAIT' ? 'list-group-item-success' : ''">
      <div class="d-flex w-100 justify-content-between">
        <span><span class="badge rounded-pill text-bg-dark">{{getPrefixPoste(poste.typePoste)}}{{ poste.idPoste }}</span><span class="ms-4">{{ poste.typePoste }}</span></span>
        <span class="font-monospace" v-if="poste.pourcentage_conso == -1">NPPS</span>
        <span class="font-monospace" v-else>{{ poste.pourcentage_conso }} %</span>
      </div>
      </button>
    </div>
  </div>
  </div>
</template>
