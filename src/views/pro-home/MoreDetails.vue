<!-- eslint-disable -->
<template>
  <div class="more-details bg_gray">
    <div class="pb-6 pt-0">
      <div class="d-flex">
        <img
          src="@/assets/jpg/servicii.jpg"
          alt="Servicii"
        >
      </div>
      <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">{{ $t('views.pro_home.photo1_title') }}</h3>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo1_text1') }}</p>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo1_text2') }}</p>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo1_text3') }}</p>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo1_text4') }}</p>
      </div>
    </div>
    <div class="py-6 d-flex justify-content-between">
      <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
        <h3 class="text-left">{{ $t('views.pro_home.photo2_title') }}</h3>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo2_text1') }}</p>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo2_text2') }}</p>
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
        <h3 class="text-left">{{ $t('views.pro_home.photo3_title') }}</h3>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo3_text1') }}</p>
        <p class="my-2 text-left">{{ $t('views.pro_home.photo3_text2') }}</p>
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
