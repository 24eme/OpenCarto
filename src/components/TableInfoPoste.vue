<script setup>
import {
    computed,
    inject,
    onMounted,
    onUnmounted,
    ref,
    watch,
} from "vue";
import { useRoute } from "vue-router";
import { postesRef, ecrireStorage } from "@/store/postes";
import { etageid2label } from "@/store/etages";
import { PosteStatuts, newHistoryEntry, AnomaliesSuivi, getNomPoste } from "@/store/posteData";

const props = defineProps({
    poste: Object,
});

const route = useRoute();
const selectedPoste = inject("selectedPoste", null);

const poste = computed(() => {
    if (props.poste) {
        return props.poste;
    }
    const depuisStore = postesRef.value.find((p) => p.id === route.params.poste);
    return depuisStore ?? selectedPoste;
});

defineEmits(["next", "prev"]);

const PAS = 10;
const VALEURS = Array.from({ length: 100 / PAS + 1 }, (_, i) => i * PAS);
const VALEUR_NON_SUIVI = -1;
const LABEL_NON_SUIVI = "Ne peut pas suivre la conso";
const AUTRE_KEY = "autre";

const pourcentageConso = ref(0);
const anomalies = ref({});
const detailAutre = ref("");

const anomaliesOuvertes = ref(false);
const anomaliesDropdownRef = ref(null);

function onClickOutside(e) {
    if (
        anomaliesDropdownRef.value &&
        !anomaliesDropdownRef.value.contains(e.target)
    ) {
        anomaliesOuvertes.value = false;
    }
}
onMounted(() => document.addEventListener("click", onClickOutside));
onUnmounted(() => document.removeEventListener("click", onClickOutside));

const anomaliesSelectionneesCount = computed(
    () => Object.values(anomalies.value).filter((a) => a.checked).length
);

const autreCoche = computed(
    () => anomalies.value[AUTRE_KEY]?.checked === true
);

function initFromPoste(p) {
    if (!p) {
      return;
    }
    pourcentageConso.value =
        p.pourcentage_conso == null ? 0 : p.pourcentage_conso;
    anomalies.value = Object.fromEntries(
        Object.entries(AnomaliesSuivi).map(([key, label]) => [
            key,
            { label, checked: p.anomalies?.[key]?.checked ?? false },
        ])
    );
    detailAutre.value = p.anomalies?.[AUTRE_KEY]?.detail ?? "";
}

initFromPoste(poste.value);

watch(poste, (newPoste) => {
    initFromPoste(newPoste);
});

function valider() {
    if (!poste.value) {
      return;
    }
    if (autreCoche.value && !detailAutre.value.trim()) {
        alert("Merci de préciser l'anomalie « Autre ».");
        return;
    }

    poste.value.pourcentage_conso = pourcentageConso.value;
    poste.value.anomalies = Object.fromEntries(
        Object.entries(anomalies.value).map(([key, { label, checked }]) => {
            const entry = { label, checked };
            if (key === AUTRE_KEY) {
                entry.detail = checked ? detailAutre.value.trim() : "";
            }
            return [key, entry];
        })
    );
    poste.value.statut = PosteStatuts.FAIT;
    if (!poste.value.history) {
        poste.value.history = [];
    }
    const commentaireHistory =
        pourcentageConso.value === VALEUR_NON_SUIVI ? LABEL_NON_SUIVI : "";
    poste.value.history.push(newHistoryEntry(poste.value, commentaireHistory));
    ecrireStorage(postesRef.value);
}

function formatDate(datestring) {
    const date = new Date(datestring);
    return date.toLocaleDateString();
}
</script>

<template>
    <div class="row overflow-auto">
        <div class="col-sm-3 mx-auto align-self-stretch" v-if="poste.photo">
            <figure class="figure">
                <img
                    class="figure-img img-fluid d-block mx-auto"
                    :src="poste.photo"
                    alt="Photo du poste"
                />
            </figure>
        </div>

        <div class="col px-3">
            <div class="table-responsive">
                <table class="table table-striped-columns">
                    <tbody>
                        <tr>
                            <td>Créé le</td>
                            <td>{{ formatDate(poste.creeLe) }}</td>
                        </tr>
                        <tr>
                            <td>Étage</td>
                            <td>{{ etageid2label(poste.etage) }}</td>
                        </tr>
                        <tr>
                            <td>Zone</td>
                            <td>{{ poste.zone }}</td>
                        </tr>
                        <tr>
                            <td>Type de poste</td>
                            <td>{{ getNomPoste(poste.typePoste) }}</td>
                        </tr>
                        <tr>
                            <td>Consommation</td>
                            <td>
                                <select
                                    v-model.number="pourcentageConso"
                                    class="form-select form-select-sm"
                                >
                                    <option
                                        v-for="val in VALEURS"
                                        :key="val"
                                        :value="val"
                                    >
                                        {{ val }}%
                                    </option>
                                    <option :value="VALEUR_NON_SUIVI">
                                        {{ LABEL_NON_SUIVI }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Anomalies</td>
                            <td>
                                <div
                                    class="dropdown position-relative"
                                    ref="anomaliesDropdownRef"
                                >
                                    <button
                                        type="button"
                                        class="btn btn-outline-secondary btn-sm w-100 d-flex justify-content-between align-items-center"
                                        :aria-expanded="anomaliesOuvertes"
                                        aria-controls="anomalies-dropdown"
                                        @click="anomaliesOuvertes = !anomaliesOuvertes"
                                    >
                                        <span>
                                            {{
                                                anomaliesSelectionneesCount > 0
                                                    ? `${anomaliesSelectionneesCount} anomalie(s) sélectionnée(s)`
                                                    : "Aucune anomalie"
                                            }}
                                        </span>
                                        <i
                                            class="bi bi-chevron-down transition-rotate"
                                            :class="{ 'rotate-180': anomaliesOuvertes }"
                                        ></i>
                                    </button>
                                    <div
                                        v-show="anomaliesOuvertes"
                                        id="anomalies-dropdown"
                                        class="dropdown-menu show w-100 p-2 mt-1"
                                        style="max-height: 250px; overflow-y: auto"
                                    >
                                        <div
                                            v-for="(anomalie, key) in anomalies"
                                            :key="key"
                                            class="form-check"
                                        >
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                :id="`anomalie-${key}`"
                                                v-model="anomalie.checked"
                                            />
                                            <label
                                                class="form-check-label"
                                                :for="`anomalie-${key}`"
                                            >
                                                {{ anomalie.label }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="autreCoche">
                            <td>
                                <label for="detailAutre" class="fw-normal mb-0">
                                    Précision « Autre »
                                </label>
                            </td>
                            <td>
                                <input
                                    id="detailAutre"
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="detailAutre"
                                    placeholder="Précisez l'anomalie constatée"
                                    maxlength="500"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-secondary text-center" style="display: none">
                    <small>{{ poste.id }}</small>
                </div>
            </div>

            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-primary" @click="valider">
                    Valider
                </button>
            </div>
        </div>

        <router-view></router-view>
    </div>

    <div
        class="hstack bg-body-secondary gap-1 prev-next-btn-container border-top shadowed-top"
    >
        <button class="vstack btn btn-container" @click="$emit('prev')">
            <span class="bi bi-chevron-double-left"></span>
            Préc.
        </button>
        <RouterLink
            :to="{ name: 'editInfoPoste' }"
            class="vstack btn btn-container"
        >
            <span class="bi bi-pencil-square"></span>
            Modifier
        </RouterLink>
        <RouterLink
            :to="{ name: 'posteHistory' }"
            class="vstack btn btn-container"
        >
            <span class="bi bi-layer-backward"></span>
            Voir l'historique
        </RouterLink>
        <button class="vstack btn btn-container" @click="$emit('next')">
            <span class="bi bi-chevron-double-right"></span>
            Suiv.
        </button>
    </div>
</template>

<style scoped>
.card {
    max-height: 50dvh;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-not-allowed {
    cursor: not-allowed;
}

.transition-rotate {
    transition: transform 0.2s ease;
}
.rotate-180 {
    transform: rotate(-180deg);
}
</style>
