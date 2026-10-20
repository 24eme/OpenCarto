import { reactive } from "vue";

export const PosteStatuts = Object.freeze({
  A_FAIRE: "A_FAIRE",
  FAIT: "FAIT",
  DISPARU: "DISPARU",
  REMPLACE: "REMPLACE",
  ARCHIVE: "ARCHIVE",

  getInfos: function (statut) {
    const infos = {
      [PosteStatuts.A_FAIRE]: {
        description: "Poste à faire",
        class: "leaflet-marker-todo",
      },
      [PosteStatuts.FAIT]: {
        description: "Poste fait",
        class: "leaflet-marker-done",
      },
      [PosteStatuts.DISPARU]: {
        description: "Poste disparu",
        class: "leaflet-marker-missing",
      },
      [PosteStatuts.REMPLACE]: {
        description: "Poste remplacé",
        class: "leaflet-marker-swapped",
      },
      [PosteStatuts.ARCHIVE]: {
        description: "Poste archivé",
        class: "leaflet-marker-archived",
      },
    };

    return infos[statut] || infos[PosteStatuts.A_FAIRE];
  },
});

export const posteData = reactive({
  statut: PosteStatuts.A_FAIRE,
  etage: null,
  zone: "",
  typePoste: "1",
  idPoste: "0",
  photo: null,
  coordonnees: null, // { lat, lng } rempli dans addCoordonneesPoste.vue
});

export function reinitialiserPosteData() {
  posteData.statut = PosteStatuts.A_FAIRE;
  posteData.etage = null;
  posteData.zone = "";
  posteData.typePoste = "";
  posteData.idPoste = null;
  posteData.photo = null;
  posteData.coordonnees = null;
}
