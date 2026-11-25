<script setup>
import { ref } from 'vue';
import { posteData, getNomPoste } from "@/store/posteData.js";


const annexesHtml = ref();
defineExpose({ annexesHtml });

const props = defineProps({
    postes: Object,
})

function anomalies2array(poste) {
  const anomalies = []
  for (const anomalie in poste.anomalies) {
    if (poste.anomalies[anomalie].checked === false) {
      continue;
    }
    anomalies.push(poste.anomalies[anomalie])
  }
  return anomalies;
}

const locale = globalThis.navigator.language
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const datePassage = new Date().toLocaleString(locale, options);
</script>


<template>
<div ref="annexesHtml" class="annexes-container">
  <div style="display: flex; justify-content: space-around; gap: 50px;">
    <img src="./../assets/logo_aurouze.png" style="display: block; max-width: 100px; max-height: 40px; width: 238px; height: 82px; margin: 40px auto;"></img>

    <div>
      <h1 style="border:0.2px black solid; font-size: 14px; width: 600px; font-weight: bold; padding:5px; background-color: #add8e6; text-align: center;">Traçabilité: Plan de Prévention et de Lutter Anti Nuisible</h1>

      <table style="border: 0.2px black solid; border-collapse: collapse; font-size: 10px; width: 600px; font-weight: 800;">
        <thead>
          <tr>
            <th style="border: 0.2px black solid; border-collapse: collapse; text-align: center; font-weight: bold; background-color:  #add8e6;">CONTRÔLE DU DISPOSITIF DE PREVENTION</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border: 0.2px black solid; border-collapse: collapse;">
              <td>CLIENT : </td>
          </tr>
          <tr>
            <td style="border: 0.2px black solid; border-collapse: collapse;">ADRESSE : </td>
          </tr>
          <tr>
              <td style="border: 0.2px black solid; border-collapse: collapse;">DATE : {{ datePassage }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  <table style="font-size: 9px; border: 0.2px black solid; width: 750px; font-weight: 800; margin-top: 40px;">
    <thead>
      <tr>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">Localisation</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">Etage</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">Zone</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">N° poste</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">Type de poste</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center; width: 1px;;" scope="col">Conso.</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">Anomalies</th>
        <th style="border: 0.2px black solid; border-collapse: collapse; font-weight: 800; text-align: center;" scope="col">Commentaire</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="poste in postes">
        <th style="border: 0.2px black solid; border-collapse: collapse; text-align: center;" scope="row">Adresse</th>
        <td style="border: 0.2px black solid; border-collapse: collapse; text-align: center;">{{ JSON.parse(JSON.stringify((poste.etage))) }}</td>
        <td style="border: 0.2px black solid; border-collapse: collapse; text-align: center;">{{ JSON.parse(JSON.stringify((poste.zone))) }}</td>
        <td style="border: 0.2px black solid; border-collapse: collapse; text-align: center;">{{ JSON.parse(JSON.stringify((poste.idPoste))) }}</td>
        <td style="border: 0.2px black solid; border-collapse: collapse; text-align: center;">{{ JSON.parse(JSON.stringify((getNomPoste(poste.typePoste)))) }}</td>

        <td style="border: 0.2px black solid; border-collapse: collapse; text-align: center;"> {{ JSON.parse(JSON.stringify((poste.pourcentage_conso))) }} %</td>
        <td style="border: 0.2px black solid; border-collapse: collapse; text-align: center; padding-top: 18px;">
          <ul v-for="anomalie in anomalies2array(poste)" style="padding-left: 0; list-style-type: none ;" >
            <li>
              - {{ JSON.parse(JSON.stringify((anomalie.label))) }}
            </li>
          </ul>
        </td>

        <td style="border: 0.2px black solid; border-collapse: collapse;"></td>
      </tr>
    </tbody>
  </table>

  <div style="margin: 0 auto;">
    <img src="./../assets/test-carte.png" style="margin-top: 250px; width: 800px;"></img>
  </div>


</div>
</template>


<style>
</style>
