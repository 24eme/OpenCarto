import { reactive } from "vue";

export const PosteStatuts = Object.freeze({
  A_FAIRE: "A_FAIRE",
  EN_COURS: "EN_COURS",
  FAIT: "FAIT",

  getInfos: function (statut) {
    const infos = {
      [PosteStatuts.A_FAIRE]: {
        description: "Poste à faire",
        class: "leaflet-marker-todo",
      },
      [PosteStatuts.EN_COURS]: {
        description: "Poste en cours",
        class: "leaflet-marker-current",
      },
      [PosteStatuts.FAIT]: {
        description: "Poste fait",
        class: "leaflet-marker-done",
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
