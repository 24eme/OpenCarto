<script setup>

</script>

<template>
  <div class="text-center">
    <h1 class="mb-5">Ajout d'un point</h1>

    <h2>Étage</h2>
    <input type="radio">etage 1</input>
    <input type="radio">rdc</input>

    <h2 class="mt-5">Secteur</h2>
    <input type="text" placeholder="ex. : faux plafond, ..."></input>

    <h2 class="mt-5">Type de piège</h2>
    <select class="form-select" aria-label="select-type-piege">
      <option value="1" selected>Câlin</option>
      <option value="2">Bisous</option>
      <option value="3">Carresse</option>
    </select>

    <h2 class="mt-5 mb-0">Numéro du piège</h2>
    <small>à reporter sur l'installation</small>
    <br/>
    <span class="border">
      <span class="px-3">XV78</span>
    </span>
    <div class="d-grid gap-2 col-11 mx-auto mb-2 fixed-bottom">
      <a class="btn btn-primary" type="button">
        Valider
      </a>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
