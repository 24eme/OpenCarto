import { ref } from 'vue'

const STORAGE_KEY = "postes";

const postesRef = ref(lireStorage())

export { postesRef }

// les valeurs de start et end sont incluses
export const range = (start, end, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i <= end; i += step) {
    output.push(i);
  }

  return output;
};

function lireStorage() {
  const brut = localStorage.getItem(STORAGE_KEY);
  if (!brut) return [];
  try {
    return JSON.parse(brut);
  } catch (e) {
    console.error("Données corrompues dans localStorage, réinitialisation.", e);
    return [];
  }
}

export function ecrireStorage(postes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(postes));
  postesRef.value = postes;
}

export function fetchPostes() {
  return postesRef.value;
}

export function refreshPostes() {
  postesRef.value = lireStorage()
}

export function createPoste(poste) {
  const nouveauPoste = {
    ...poste,
    id: crypto.randomUUID(),
    creeLe: new Date().toISOString(),
  }
  ecrireStorage([...postesRef.value, nouveauPoste])
  return nouveauPoste
}
