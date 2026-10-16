import { reactive } from 'vue'

export const PointStatuts = Object.freeze({
  A_FAIRE: "A_FAIRE",
  EN_COURS: "EN_COURS",
  FAIT: "FAIT",

  getInfos: function (statut) {
    const infos = {
      [PointStatuts.A_FAIRE]: {
        description: "Point à faire",
        leafletClass: "leaflet-marker-todo",
      },
      [PointStatuts.EN_COURS]: {
        description: "Point en cours",
        leafletClass: "leaflet-marker-current",
      },
      [PointStatuts.FAIT]: {
        description: "Point fait",
        leafletClass: "leaflet-marker-done",
      },
    };

    return infos[statut] || infos[PointStatuts.A_FAIRE];
  },
});

export const pointData = reactive({
  statut: PointStatuts.A_FAIRE,
  etage: null,
  zone: "",
  typePiege: '1',
  idPiege: '0',
  photo: null,
  coordonnees: null, // { lat, lng } rempli dans addCoordonneesPoint.vue
})

export function reinitialiserPointData() {
  pointData.statut = PointStatuts.A_FAIRE
  pointData.etage = null
  pointData.zone = "";
  pointData.typePiege = '1'
  pointData.idPiege = '0'
  pointData.photo = null
  pointData.coordonnees = null
}
