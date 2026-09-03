const STORAGE_KEY = 'points'

function lireStorage() {
  const brut = localStorage.getItem(STORAGE_KEY)
  if (!brut) return []
  try {
    return JSON.parse(brut)
  } catch (e) {
    console.error('Données corrompues dans localStorage, réinitialisation.', e)
    return []
  }
}

export function ecrireStorage(points) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(points))
}

export function fetchPoints() {
  return lireStorage()
}

export function createPoint(point) {
  const points = lireStorage()

  const nouveauPoint = {
    ...point,
    id: crypto.randomUUID(),
    creeLe: new Date().toISOString(),
  }

  points.push(nouveauPoint)
  ecrireStorage(points)

  return nouveauPoint
}

export function toLeafletMarker(point) {
  return L.marker([point.coordonnees.lat, point.coordonnees.lng], {
      icon: new L.DivIcon({
          iconSize: [25, 25],
          className: "leaflet-marker-poste",
          html: `<div>${point.idPiege}</div>`,
      }),
  }).bindPopup(`<strong>${point.zone}</strong>`);
}
