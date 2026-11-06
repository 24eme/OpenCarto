<script setup>
import { inject } from "vue";

const props = defineProps({
    poste: Object,
});

const poste = props.poste || inject("selectedPoste");

defineEmits(["close"]);
</script>

<template>
    <div class="fixed-bottom card">
        <h5 class="card-header">
            Poste n° {{ poste.idPoste }}
            <span class="float-end cursor-pointer" @click="$emit('close')">
                ×
            </span>
        </h5>

        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    max-height: 60dvh;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-not-allowed {
    cursor: not-allowed;
}
</style>
