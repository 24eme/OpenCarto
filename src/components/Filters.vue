<script setup>
import { ref } from "vue";

const props = defineProps({});
const filters = ref();

const emit = defineEmits(["filter"]);

function toggle(event) {
    const filter = event.target;
    filter.classList.toggle("selected");

    filters.value = [];
    const allSelectedFilters =
        document.querySelectorAll(".badge-filter.selected") || [];
    allSelectedFilters.forEach((f) => {
        filters.value.push(f.dataset.filter);
    });

    emit("filter", filters);
}
</script>

<template>
    <div class="wrapper">
        <span
            @click="toggle"
            data-filter="wisebox"
            class="badge-filter shadowed"
        >
            Wisebox
        </span>
        <span
            @click="toggle"
            data-filter="ekomille"
            class="badge-filter shadowed"
        >
            Ekomille
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
    z-index: 401; /* leaflet-pane z-index = 400 */
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
        background-color: lch(
            from var(--filter_background-color) calc(l - 5) c h
        );
    }

    &.selected {
        --filter_background-color: lch(48.54 81.77 283.39);
        border-color: lch(48.54 81.77 283.39);
        color: lch(99 0.5 285);
    }
}
</style>
