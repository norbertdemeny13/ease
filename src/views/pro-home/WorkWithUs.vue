<!-- eslint-disable -->
<template>
  <div class="why-us-container">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>Lucreaza cu noi</h2>
      </div>
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="box_how">
              <figure>
                <img
                  src="@/assets/icons/castiga-mai-multi-bani.svg"
                  alt=""
                  width="35"
                  height="35"
                  class="lazy"
                >
              </figure>
              <h3 class="my-3">Castiga mai mult</h3>
              <p>Ca profesionist independent Ease poti castiga pana la de 2-3 ori mai mult decat standardul in industrie</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="box_how">
              <figure>
                <img
                  src="@/assets/icons/lucreaza-cand-doresti.svg"
                  alt=""
                  width="35"
                  height="35"
                  class="lazy"
                >
              </figure>
              <h3 class="my-3">Pe termenii tai</h3>
              <p>Lucrezi cand doresti unde doresti. Nu exista cerinte pentru un numar minim de ore lucrate</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="box_how">
              <figure>
                <img
                  src="@/assets/icons/securitate.svg"
                  alt=""
                  width="35"
                  height="35"
                  class="lazy"
                >
              </figure>
              <h3 class="my-3">In siguranta</h3>
              <p>Fara timp irosit in trafic, fara sali de asteptare si fara locuri aglomerate. Ease aduce wellness-ul la tine!</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-home-pro-work-with-us',
  });
</script>
