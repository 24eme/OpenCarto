<script setup>
import { onMounted, watch, inject } from "vue";
import { etagesConfig } from "@/store/etages.js";
import { posteData, PosteStatuts } from "@/store/posteData.js";
import { fetchPostes } from "@/store/postes.js";
import {
    toLeafletMarker,
    selectPoste,
    leafletAddClass,
} from "@/leaflet/utils.js";

const props = defineProps({
    carteId: String,
    carteWidth: String,
    carteHeight: String,
    hasCoordinatesSelector: Boolean,
    layer: String,
});

const emit = defineEmits(["move", "posteSelected"]);

let controle = null;
const groupes = [];
const selectedPoste = inject("selectedPoste", undefined);

function construireGroupeEtage(etage) {
    const calque = L.imageOverlay(etage.image, etage.bounds);
    const marqueurs = L.layerGroup();
    const layerGroupe = L.layerGroup([calque, marqueurs]);
    layerGroupe.bounds = etage.bounds;
    groupes.push({ layerGroupe, label: etage.label, id: etage.id });
    return groupes.at(-1);
}

function chargerPostes() {
    try {
        const postes = fetchPostes();
        postes.forEach((poste) => {
            const groupe = groupes.find((g) => g.id === poste.etage);
            if (!groupe || !poste.coordonnees) return;

            const leafletMarker = toLeafletMarker(poste)
                .on("click", () => emit("posteSelected", poste))
                .addTo(groupe.layerGroupe);

            leafletAddClass(
                leafletMarker._icon,
                PosteStatuts.getInfos(poste.statut).class,
            );
        });
    } catch (e) {
        console.error("Impossible de charger les postes :", e);
    }
}

onMounted(() => {
    etagesConfig.forEach((etage) => construireGroupeEtage(etage));

    const map = L.map(props.carteId, {
        contextmenu: true,
        zoomControl: true,
        minZoom: -3,
        maxZoom: 10,
        maxNativeZoom: 5,
        zoomSnap: 0,
        boxZoom: false,
        wheelDebounceTime: 100,
        crs: L.CRS.Simple,
        attributionControl: false,
    });

    L.control.attribution({ position: "bottomleft" }).addTo(map);

    function mettreAJourCoordonnees() {
        const centre = map.getCenter();
        emit("move", { lat: centre.lat, lng: centre.lng });
    }

    const controleCalques = {};
    groupes.forEach((groupe) => {
        controleCalques[groupe.label] = groupe.layerGroupe;
    });
    controle = L.control.layers(controleCalques).addTo(map);

    const initialLayerIndex = groupes.findIndex(
        (groupe) => groupe.id === props.layer,
    );
    const initialLayer =
        initialLayerIndex !== -1 ? groupes[initialLayerIndex] : groupes.at(0);

    initialLayer.layerGroupe.addTo(map);
    map.fitBounds(initialLayer.layerGroupe.bounds);

    chargerPostes();
    mettreAJourCoordonnees();
    map.on("move", mettreAJourCoordonnees);

    if (selectedPoste) {
        watch(selectedPoste, selectPoste, { immediate: true });
    }
});

// watcher qui se declenche lorsque l'utilisateur ajoute un nouveau plan parce que la length de l'objet
// etagesConfig change. Ensuite, on va comparer l'entrée avec ce qu'on a deja dans les groupes
watch(
    () => etagesConfig.length,
    () => {
        etagesConfig.forEach((etage) => {
            if (groupes.find((g) => g.label === etage.label)) return;

            const newEtage = construireGroupeEtage(etage);
            controle.addBaseLayer(newEtage.layerGroupe, newEtage.label);
        });
    },
);
</script>

<template>
    <div
        :id="carteId"
        :style="{ height: carteHeight, width: carteWidth }"
    ></div>
    <div v-if="hasCoordinatesSelector" class="viseur">
        <span>{{ posteData.idPoste }}</span>
    </div>
</template>

<style>
.leaflet-marker-poste > div {
    color: #fff;
    border: 2px solid;
    border-radius: 50%;
    text-align: center;

    background-color: lch(from var(--accent) l c h);
    border-color: lch(from var(--accent) calc(l - 20) c h);
    color: black;
}

.leaflet-marker-poste-selected > div {
    background: var(--bs-warning-bg-subtle) !important;
    color: var(--bs-body-color) !important;
    border: 2px solid var(--bs-warning) !important;
}

.leaflet-marker-done > div {
    --accent: lch(83 53 135);
    color: #111;
}
.leaflet-marker-current > div {
    --accent: lch(75 40 25);
    color: #111;
}
.leaflet-marker-todo > div {
    --accent: lch(48 61 24);
    color: #eee;
}
</style>