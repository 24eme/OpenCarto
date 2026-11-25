<script setup>
import { ref, watch } from 'vue'
import { getNomPoste } from '@/store/posteData'

const props = defineProps({
  filtersList: {
    type: Array,
    required: true,
  },
  selected: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['filter'])

const filters = ref([...props.selected])

watch(
  () => props.selected,
  (val) => {
    filters.value = [...val]
  }
)

function toggle(key) {
  const i = filters.value.indexOf(key)
  if (i === -1) filters.value.push(key)
  else filters.value.splice(i, 1)

  emit('filter', [...filters.value])
}

function estSelectionne(key) {
  return filters.value.includes(key)
}
</script>

<template>
  <div class="wrapper">
    <span
      v-for="filter in filtersList"
      :key="filter.key"
      :data-filter="filter.key"
      class="badge-filter shadowed"
      :class="{ selected: estSelectionne(filter.key) }"
      @click="toggle(filter.key)"
    >
      {{ getNomPoste(filter.value.toLowerCase()) }}
    </span>
  </div>
</template>

<style scoped>

.wrapper {
  margin: 1rem 0;
  width: 100%;
  position: absolute;
  display: block;
  overflow-x: visible;
  z-index: 401;
}
.badge-filter {
  --filter_background-color: lch(99 0.5 285);

  margin: 0 5px;
  padding: 0.35em 0.65em;
  font-weight: 700;
  cursor: pointer;

  background-color: var(--filter_background-color);
  border: 1px solid;
  border-color: lch(60 2.6 251);
  border-radius: 10%;

  &:hover {
    background-color: lch(from var(--filter_background-color) calc(l - 5) c h);
  }

  &.selected {
    --filter_background-color: lch(48.54 81.77 283.39);
    border-color: lch(48.54 81.77 283.39);
    color: lch(99 0.5 285);
  }
}
</style>
