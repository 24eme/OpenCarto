import { reactive } from 'vue'

export const pointData = reactive({
  etage: null,
  zone: "",
  typePiege: '1',
  idPiege: '0',
  photo: null,
  coordonnees: null, // { lat, lng } rempli dans addCoordonneesPoint.vue
})

export function reinitialiserPointData() {
  pointData.etage = null
  pointData.zone = "";
  pointData.typePiege = '1'
  pointData.idPiege = '0'
  pointData.photo = null
  pointData.coordonnees = null
}
