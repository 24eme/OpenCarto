import { reactive } from "vue";

export const PosteStatuts = Object.freeze({
  CREE: "CREE",
  A_FAIRE: "A_FAIRE",
  MODIFICATION: "MODIFICATION",
  FAIT: "FAIT",
  DISPARU: "DISPARU",
  REMPLACE: "REMPLACE",
  ARCHIVE: "ARCHIVE",

  getInfos: function (statut) {
    const infos = {
      [PosteStatuts.CREE]: {
        libelle: "Création",
        icon: "bi bi-plus-circle-fill text-secondary",
        description: "Création du poste",
        class: "leaflet-marker-done",
      },
      [PosteStatuts.A_FAIRE]: {
        libelle: "À faire",
        icon: "bi bi-clock-fill text-warning",
        description: "Poste à faire",
        class: "leaflet-marker-todo",
      },
      [PosteStatuts.MODIFICATION]: {
        libelle: "Modification",
        icon: "bi bi-shadows text-warning",
        description: "Modification du poste",
        class: "leaflet-marker-todo",
      },
      [PosteStatuts.FAIT]: {
        libelle: "Fait",
        icon: "bi bi-check-circle-fill text-success",
        description: "Poste fait",
        class: "leaflet-marker-done",
      },
      [PosteStatuts.DISPARU]: {
        libelle: "Disparu",
        icon: "bi bi-dash-circle-dotted text-warning",
        description: "Poste disparu",
        class: "leaflet-marker-missing",
      },
      [PosteStatuts.REMPLACE]: {
        libelle: "Remplacé",
        icon: "bi bi-arrow-left-right",
        description: "Poste remplacé",
        class: "leaflet-marker-swapped",
      },
      [PosteStatuts.ARCHIVE]: {
        libelle: "Archivé",
        icon: "bi bi-archive-fill text-secondary",
        description: "Poste archivé",
        class: "leaflet-marker-archived",
      },
    };

    return infos[statut] || infos[PosteStatuts.A_FAIRE];
  },
});

const HistoryItem = Object.freeze({
  order: 0,
  timestamp: null,
  statut: null,
  comment: "",
  data: "",
});

export function newHistoryEntry(posteData, comment = "") {
  const { id, creeLe, history, statut, ...usefulData } = posteData;
  const newEntry = Object.seal(Object.assign({}, HistoryItem));

  newEntry.timestamp = new Date();
  newEntry.order = posteData.history.length + 1;
  newEntry.comment = comment;
  newEntry.statut = posteData.statut;
  newEntry.data = { ...usefulData };

  return Object.freeze(newEntry);
}

export const posteData = reactive({
  statut: PosteStatuts.A_FAIRE,
  etage: null,
  zone: null,
  typePoste: null,
  idPoste: "0",
  photo: null,
  coordonnees: null, // { lat, lng } rempli dans addCoordonneesPoste.vue
  pourcentage_conso: "0",
  history: [],
});

export function reinitialiserPosteData() {
  posteData.statut = PosteStatuts.A_FAIRE;
  posteData.etage = null;
  posteData.zone = "";
  posteData.typePoste = "";
  posteData.idPoste = null;
  posteData.photo = null;
  posteData.coordonnees = null;
  posteData.pourcentage_conso = "0";
  posteData.history = [];
}
