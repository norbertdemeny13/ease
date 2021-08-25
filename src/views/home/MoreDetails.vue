<!-- eslint-disable -->
<template>
  <div class="more-details">
    <div class="pb-6 pt-0">
      <div class="d-flex">
        <img
          src="@/assets/jpg/servicii.jpg"
          alt="Servicii"
        >
      </div>
      <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">{{ $t('views.home.md_row1_title') }}</h3>
        <p class="my-2 text-left">{{ $t('views.home.md_row1_description') }}</p>
        <router-link class="btn btn-pink btn-pill gradient mt-4 px-6" to="/servicii">{{ $t('generic.reserve_now') }}</router-link>
      </div>
    </div>
    <div class="py-6">
      <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">{{ $t('views.home.md_row2_title') }}</h3>
        <p class="my-2 text-left">{{ $t('views.home.md_row2_description') }}</p>
        <router-link class="btn btn-small btn-pink btn-pill gradient mt-4 px-6" to="/abonamente">{{ $t('generic.activate_now') }}</router-link>
      </div>
      <div class="d-flex reverse-order">
        <img
          src="@/assets/jpg/abonamente.jpg"
          alt="Abonamente"
        >
      </div>
    </div>
    <div class="py-6">
      <div class="d-flex">
        <img
          src="@/assets/jpg/faq.jpg"
          alt="Faq"
        >
      </div>
      <div class="col-md-6 text-content col-lg-6 text-center mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">{{ $t('views.home.md_row3_title') }}</h3>
        <p class="my-2 text-left">{{ $t('views.home.md_row3_description') }}</p>
        <router-link class="btn btn-pink btn-pill gradient mt-4 px-6" to="/intrebari-frecvente">{{ $t('generic.learn_more') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-home-more-details',
  });
</script>
