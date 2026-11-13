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
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Numéro de poste</th>
        <th>Type de poste</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="poste in sortedPostes"
        :key="poste.id"
        role="button"
        @click="emit('posteSelected', poste)"
      >
        <td>{{getPrefixPoste(poste.typePoste)}}{{ poste.idPoste }}</td>
        <td>{{ poste.typePoste }}</td>
        <td>{{ poste.statut }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>



</style>
