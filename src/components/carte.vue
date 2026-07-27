<script setup>
import { onMounted, watch } from "vue";
import { etagesConfig } from "../store/etages.js";
import { fetchPoints } from "../store/points.js";

const props = defineProps({
    carteId: String,
    carteWidth: String,
    carteHeight: String,
    hasCoordinatesSelector: Boolean,
    layer: String,
});

const emit = defineEmits(["move"]);

let map = null;
let controle = null;
let centerCoordinates = { lat: 0.0, lng: 0.0 };
const groupes = {};

function construireGroupeEtage(cle, etage) {
    const calque = L.imageOverlay(etage.image, etage.bounds);
    const marqueurs = L.layerGroup();
    const groupe = L.layerGroup([calque, marqueurs]);
    groupe.marqueurs = marqueurs;
    groupe.bounds = etage.bounds;
    groupes[cle] = { groupe, label: etage.label };
    return groupes[cle];
}

function chargerPoints() {
    try {
        const points = fetchPoints();
        points.forEach((point) => {
            const groupe = groupes[point.etage];
            if (!groupe || !point.coordonnees) return;

            L.marker([point.coordonnees.lat, point.coordonnees.lng])
                .bindPopup(`<strong>${point.secteur}</strong>`)
                .addTo(groupe.groupe.marqueurs);
        });
    } catch (e) {
        console.error("Impossible de charger les points :", e);
    }
}

onMounted(() => {
    Object.entries(etagesConfig).forEach(([cle, etage]) =>
        construireGroupeEtage(cle, etage),
    );

    map = L.map(props.carteId, {
        contextmenu: true,
        zoomControl: true,
        minZoom: -3,
        maxZoom: 10,
        maxNativeZoom: 5,
        zoomSnap: 0,
        boxZoom: false,
        wheelDebounceTime: 100,
        crs: L.CRS.Simple,
    });

    function mettreAJourCoordonnees() {
        const centre = map.getCenter();
        centerCoordinates = { lat: centre.lat, lng: centre.lng };
        emit("move", centerCoordinates);
    }

    const controleCalques = {};
    Object.values(groupes).forEach(({ groupe, label }) => {
        controleCalques[label] = groupe;
    });
    controle = L.control.layers(controleCalques).addTo(map);

    const initialLayer = Object.keys(groupes).includes(props.layer)
        ? groupes[props.layer]
        : Object.values(groupes)[0];

    initialLayer.groupe.addTo(map);
    map.fitBounds(initialLayer.groupe.bounds);

    chargerPoints();
    mettreAJourCoordonnees();
    map.on("move", mettreAJourCoordonnees);

    // watcher qui se declenche lorsque lutilisateur ajoute un nouveau plan parce que la length de l'objet
    // etagesConfig change. Ensuite, on va comparer l'entrée avec ce quon a deja dans les groupes
    watch(
        () => Object.keys(etagesConfig).length,
        () => {
            Object.entries(etagesConfig).forEach(([cle, etage]) => {
                if (groupes[cle]) return;

                const { groupe, label } = construireGroupeEtage(cle, etage);
                controle.addOverlay(groupe, label);
            });
        },
    );
});
</script>

<template>
    <div>
        <div
            :id="carteId"
            :style="{ height: carteHeight, width: carteWidth }"
        ></div>
        <div v-if="hasCoordinatesSelector" class="viseur">＋</div>
    </div>
</template>
