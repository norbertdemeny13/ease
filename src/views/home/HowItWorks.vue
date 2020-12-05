<!-- eslint-disable -->
<template>
  <div class="how-it-works-container bg_gray">
    <div class="container margin_30_40">
      <div class="main_title center">
        <span><em /></span>
        <h2>Cum functioneaza?</h2>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/png/lazy-placeholder-100-100-white.png"
                :data-src="image"
                alt=""
                width="150"
                height="167"
                class="lazy"
              >
            </figure>
            <h3>Rezerva in cateva secunde</h3>
            <p>Rezerva servicii profesionale de masaj beauty si fitness de pe telefonul tau sau de pe ease.ro</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/png/lazy-placeholder-100-100-white.png"
                :data-src="image"
                alt=""
                width="150"
                height="167"
                class="lazy"
              >
            </figure>
            <h3>Tu alegi data, ora si locatia</h3>
            <p>Profesionistii sosesc la locatia aleasa de tine, oricand de luni pana duminica, de la 07:00 la 23:00</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/png/lazy-placeholder-100-100-white.png"
                :data-src="image"
                alt=""
                width="150"
                height="167"
                class="lazy"
              >
            </figure>
            <h3>Ajungem rapid la tine</h3>
            <p>Profesionistul ajunge la tine cu toate echipamentele necesare, in doar 60 de minute sau rezerva in avans</p>
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
    name: 'es-home-how-it-works',
    data: () => ({
      image,
    }),
  });
</script>
