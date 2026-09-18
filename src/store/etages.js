import { reactive } from 'vue'


export const etagesConfig = reactive([
  {
    id: 'rdc',
    label: 'RDC',
    image: '/data/carte_placeholder_2.jpg',
    bounds: [[0, 0], [1414, 2000]],
  },
  {
    id: 'etage1',
    label: 'Étage 1',
    image: '/data/carte_placeholder.png',
    bounds: [[0, 0], [1081, 1536]],
  },
])

export function etageid2label(etageid) {
  return etagesConfig.find((etage) => etage.id === etageid).label;
}

function normalizeLabel(label) {
  return label
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ajouterEtage(label, image, bounds) {
  const cle = normalizeLabel(label)
  etagesConfig.push({ id: cle, label: label, image: image, bounds: bounds })
  return cle
}
