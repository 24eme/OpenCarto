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
  }).on("click", function (e) {
    const allPoints = document.querySelectorAll(".leaflet-marker-poste");
    allPoints.forEach((p) =>
      p.classList.remove("leaflet-marker-poste-selected"),
    );
    L.DomUtil.addClass(e.target._icon, "leaflet-marker-poste-selected");
  })
}
