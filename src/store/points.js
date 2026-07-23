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

export async function fetchPoints() {
  return lireStorage()
}

export async function createPoint(point) {
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
