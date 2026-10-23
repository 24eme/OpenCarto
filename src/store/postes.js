const STORAGE_KEY = "postes";

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
}

export function fetchPostes() {
  return lireStorage();
}

export function createPoste(poste) {
  const current_postes = lireStorage();

  const nouveauPoste = {
    ...poste,
    id: crypto.randomUUID(),
    creeLe: new Date().toISOString(),
  };

  current_postes.push(nouveauPoste);
  ecrireStorage(current_postes);

  return nouveauPoste;
}
