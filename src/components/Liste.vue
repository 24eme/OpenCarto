<script setup>
defineProps({
  postes: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['posteSelected'])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Numéro de poste</th>
        <th>Type de poste</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="poste in postes"
        :key="poste.id"
        role="button"
        @click="emit('posteSelected', poste)"
      >
        <td>{{ poste.idPoste }}</td>
        <td>{{ poste.typePoste }}</td>
        <td>{{ poste.statut }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>



</style>
