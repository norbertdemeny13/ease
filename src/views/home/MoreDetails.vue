<!-- eslint-disable -->
<template>
  <div class="more-details">
    <div class="container-fluid">
      <div class="row">
        <div class="custom-container-info custom-home-container pb-6 pt-0 mt-0">
          <div class="d-flex col-sm-12 col-lg-6 custom-image-padding">
            <img
              src="@/assets/jpg/servicii.jpg"
              alt="Servicii"
            >
          </div>
          <div class="text-content mt-4 pl-3 pr-3 col-sm-12 col-lg-6">
            <div class="d-flex align-items-start flex-column justify-content-center custom-text">
              <h3>{{ $t('views.home.md_row1_title') }}</h3>
              <p class="my-2">{{ $t('views.home.md_row1_description') }}</p>
              <router-link class="btn btn-pink btn-pill gradient mt-4 px-6" to="/servicii">{{ $t('generic.reserve_now') }}</router-link>
            </div>
          </div>
        </div>
        <div class="custom-container-info custom-home-container py-6">
          <div class="text-content mt-4 pl-3 pr-3 col-sm-12 col-lg-6">
            <div class="d-flex align-items-start flex-column justify-content-center reverse-order custom-text">
              <h3>{{ $t('views.home.md_row2_title') }}</h3>
              <p class="my-2">{{ $t('views.home.md_row2_description') }}</p>
              <router-link class="btn btn-small btn-pink btn-pill gradient mt-4 px-6" to="/abonamente">{{ $t('generic.activate_now') }}</router-link>
            </div>
          </div>
          <div class="d-flex reverse-order col-sm-12 col-lg-6 custom-image-padding">
            <img
              src="@/assets/jpg/abonamente.jpg"
              alt="Abonamente"
            >
          </div>
        </div>
        <div class="custom-container-info custom-home-container pt-6">
          <div class="d-flex col-sm-12 col-lg-6 custom-image-padding">
            <img
              src="@/assets/jpg/faq.jpg"
              alt="Faq"
            >
          </div>
          <div class="text-content mt-4 pl-3 pr-3 col-sm-12 col-lg-6">
            <div class="d-flex align-items-start flex-column justify-content-center custom-text">
              <h3>{{ $t('views.home.md_row3_title') }}</h3>
              <p class="my-2">{{ $t('views.home.md_row3_description') }}</p>
              <router-link class="btn btn-pink btn-pill gradient mt-4 px-6" to="/intrebari-frecvente">{{ $t('generic.learn_more') }}</router-link>
            </div>
          </div>
        </div>
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
