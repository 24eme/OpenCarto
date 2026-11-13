<script setup>
import { inject } from "vue";
import { getPrefixPoste } from '@/store/posteData';

const props = defineProps({
    poste: Object,
});

const poste = props.poste || inject("selectedPoste");

defineEmits(["close"]);
</script>

<template>
    <div class="fixed-bottom card">
        <h5 class="card-header">
            Poste
            <strong>
                {{ getPrefixPoste(poste.typePoste) }}{{ poste.idPoste }}
            </strong>
            <span class="float-end cursor-pointer" @click="$emit('close')">
                ×
            </span>
        </h5>

        <slot></slot>
    </div>
</template>

<style>
.card {
    max-height: 60dvh;
}
.card:has(.full-card) {
    height: 90dvh;
    max-height: 90dvh;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-not-allowed {
    cursor: not-allowed;
}
</style>
