import { ref } from 'vue'

const STORAGE_KEY = "postes";
const TYPE_FALLBACK = "SANS_TYPE"; // au cas où typePoste serait null

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
    const parsed = JSON.parse(brut);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      console.error("Format de storage invalide, réinitialisation.");
      return [];
    }

    return Object.values(parsed).flatMap((groupe) =>
      groupe && typeof groupe === "object" ? Object.values(groupe) : []
    );
  } catch (e) {
    console.error("Données corrompues dans localStorage, réinitialisation.", e);
    return [];
  }
}

export function ecrireStorage(postes) {
  const structure = {};

  for (const poste of postes) {
    const type = poste.typePoste || TYPE_FALLBACK;
    if (!structure[type]) {
      structure[type] = {};
    }
    structure[type][poste.id] = poste;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(structure));
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
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    creeLe: new Date().toISOString(),
  }
  ecrireStorage([...postesRef.value, nouveauPoste])
  return nouveauPoste
}

export function updateConsommation(id, pourcentage) {
  const nouveaux = postesRef.value.map((p) =>
    p.id === id ? { ...p, pourcentage_conso: pourcentage } : p
  );
  ecrireStorage(nouveaux);
}
