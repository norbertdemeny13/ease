<!-- eslint-disable -->
<template>
  <div class="why-us-container bg_gray">
    <div class="container margin_30_40">
      <div class="main_title center">
        <span><em /></span>
        <h2>De ce Ease?</h2>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/icons/paper.svg"
                alt=""
                width="35"
                height="35"
                class="lazy"
              >
            </figure>
            <h3>Preturi transparente</h3>
            <p class="mt-3">Stii exact cat platesti pentru fiecare serviciu, fara taxe ascunse</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/icons/user.svg"
                alt=""
                width="35"
                height="35"
                class="lazy"
              >
            </figure>
            <h3>Experienta personalizata</h3>
            <p class="mt-3">Alege genul profesionistului, adauga servicii sau solicita mai multi profesionisti pentru rezervarea ta</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/icons/clock.svg"
                alt=""
                width="35"
                height="35"
                class="lazy"
              >
            </figure>
            <h3>Timpul tau conteaza</h3>
            <p class="mt-3">Fara timp irosit in trafic, fara sali de asteptare si fara locuri aglomerate. Ease aduce wellness-ul la tine!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-home-why-us',
  });
</script>
