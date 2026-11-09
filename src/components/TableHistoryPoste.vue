<script setup>
import { inject } from "vue";
import { RouterLink } from "vue-router";
import { PosteStatuts } from "@/store/posteData";

const props = defineProps({
    poste: Object,
});

const dateTimeLocale = globalThis.navigator.language;
const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
};
const timeOptions = {
    hour: "numeric",
    minute: "numeric",
};
const poste = props.poste || inject("selectedPoste");
const history = poste.value.history;

function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString(dateTimeLocale, dateOptions);
}

function formatTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString(dateTimeLocale, timeOptions);
}

function getStatutInfo(statut) {
    return PosteStatuts.getInfos(statut);
}

function getDiff(index) {
    const diff = calculateDiff(index);
    const current = history[index].data;
    let build = [];

    Object.keys(diff).forEach((k) => {
        build.push({ type: k, old: diff[k], new: current[k] });
    });

    return build;
}

function calculateDiff(index) {
    if (index === 0) {
        return {};
    }

    const o1 = history[index].data;
    const o2 = history[index - 1].data;

    return Object.fromEntries(
        Object.entries(o2).filter(([k, v]) => {
            return o1[k] !== v;
        }),
    );
}
</script>

<template>
    <div class="p-3 full-card">
        <div class="fs-3">
            <span class="cursor-pointer bi bi-clock-history"></span>
            Historique du poste
        </div>

        <div class="fs-6">
            <RouterLink :to="{ name: 'posteInfos' }">
                <span class="cursor-pointer bi bi-arrow-left"></span> Retour
            </RouterLink>
        </div>

        <hr class="mb-0" />

        <div class="vstack">
            <div class="history-item" v-for="(item, index) in history">
                <p>{{ formatDate(item.timestamp) }}</p>
                <div class="hstack gap-2 flex-wrap">
                    <div class="text-secondary">
                        {{ formatTime(item.timestamp) }}
                    </div>
                    <div class="border border-subtle rounded p-2 lh-1">
                        <span :class="getStatutInfo(item.statut).icon"></span>
                    </div>
                    <div>
                        <p class="m-0 fw-bold">
                            {{ getStatutInfo(item.statut).description }}
                        </p>
                        <p v-if="item.comment" class="m-0 text-secondary">
                            {{ item.comment }}
                        </p>
                    </div>
                    <details v-if="getDiff(index).length" class="ms-auto">
                        <summary>Changements</summary>
                        <div
                            class="overflow-hidden"
                            v-for="(diff, type) in getDiff(index)"
                        >
                            <p class="fw-bold text-capitalize">
                                {{ diff.type }}
                            </p>
                            <p>
                                <span
                                    class="badge text-decoration-line-through bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis"
                                >
                                    {{ diff.old || "null" }}
                                </span>
                                <span class="mx-2">→</span>
                                <span
                                    class="badge bg-success-subtle border border-success-subtle text-success-emphasis"
                                >
                                    {{ diff.new }}
                                </span>
                            </p>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.full-card {
    overflow-y: auto;
}

.history-item {
    padding: 10px 0px;

    &:not(:last-child) {
        border-bottom: 1px lch(88 0 0) solid;
    }
}
</style>
