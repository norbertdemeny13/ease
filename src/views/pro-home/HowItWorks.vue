<!-- eslint-disable -->
<template>
  <div class="how-it-works-container">
    <div class="container py-6">
      <div class="main_title center">
        <h2>Cum functioneaza?</h2>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="box_how d-flex flex-column justify-content-center">
            <h1>1</h1>
            <h3>Aplica cu usurinta</h3>
            <p>Iti verificam identitatea, certificarile si experienta</p>
            <div class="d-flex justify-content-center col-md-12">
              <router-link
                class="mt-4"
                to="/ease/pro/intrebari-frecvente"
              >Afla mai multe</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how d-flex flex-column justify-content-center">
            <h1>2</h1>
            <h3>Primesti acces</h3>
            <p>Dupa un scurt interviu vei primi permisiunea sa iti activezi contul</p>
            <div class="d-flex justify-content-center col-md-12">
              <router-link
                class="mt-4"
                to="/ease/pro/intrebari-frecvente"
              >Afla mai multe</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how d-flex flex-column justify-content-center">
            <h1>3</h1>
            <h3>Castiga bani</h3>
            <p>Descarca aplicatia Elite si incepe sa accepti rezervari de la clienti </p>
            <div class="d-flex justify-content-center col-md-12">
              <router-link
                class="mt-4"
                to="/ease/pro/intrebari-frecvente"
              >Afla mai multe</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import image from '@/assets/svg/how.svg';

  export default Vue.extend({
    name: 'es-pro-home-how-it-works',
    data: () => ({
      image,
    }),
  });
</script>
