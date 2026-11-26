import { ref } from 'vue'

const STORAGE_KEY = "datas";
const ZONE_FALLBACK = "SANS_ZONE"; // au cas où zone serait vide

function lireStorage() {
  const brut = localStorage.getItem(STORAGE_KEY);
  if (!brut) return { plans: [], passageId: null, postes: [] };
  try {
    const parsed = JSON.parse(brut);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      console.error("Format de storage invalide, réinitialisation.");
      return { plans: [], passageId: null, postes: [] };
    }

    return {
      plans: parsed.plans ?? [],
      passageId: parsed.passageId ?? null,
      postes: parsed.postes ?? [],
    };
  } catch (e) {
    console.error("Données corrompues dans localStorage, réinitialisation.", e);
    return { plans: [], passageId: null, postes: [] };
  }
}

const datasRef = ref(lireStorage())
const postesRef = ref(datasRef.value.postes)

export { postesRef, datasRef }

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

export function ecrireStorage(postes) {
  datasRef.value.postes = postes;
  postesRef.value = postes;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datasRef.value));
}

export function ecrirePlans(plans) {
  datasRef.value.plans = plans;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datasRef.value));
}

export function ecrirePassageId(passageId) {
  datasRef.value.passageId = passageId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datasRef.value));
}

export function fetchPostes() {
  return postesRef.value;
}

export function fetchDatas() {
  return datasRef.value;
}

export function refreshPostes() {
  datasRef.value = lireStorage();
  postesRef.value = datasRef.value.postes;
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

export function updateConsommation(id, pourcentage, commentaire, anomalies) {
  const nouveaux = postesRef.value.map((p) => {
    if (p.id !== id) {
      return p;
    }

    const maj = { ...p, pourcentage_conso: pourcentage };

    if (commentaire !== undefined) {
      maj.commentaire_suivi_conso = commentaire;
    }
    if (anomalies !== undefined) {
      maj.anomalies = anomalies;
    }

    return maj;
  });

  ecrireStorage(nouveaux);
}
