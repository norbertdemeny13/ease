<!-- eslint-disable -->
<template>
  <div class="more-details bg_gray">
    <div class="container-fluid">
      <div class="row">
        <div class="custom-container-info pb-6 pt-0">
          <div class="d-flex col-sm-12 col-lg-6 custom-image-padding">
            <img
              src="@/assets/jpg/servicii.jpg"
              alt="Servicii"
            >
          </div>
          <div class="text-content mt-4 col-sm-12 col-lg-6">
            <div class="d-flex align-items-start flex-column justify-content-center custom-text">
              <h3 class="text-left">{{ $t('views.pro_home.photo1_title') }}</h3>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo1_text1') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo1_text2') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo1_text3') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo1_text4') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo1_text5') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo1_text6') }}
              </p>
            </div>
          </div>
        </div>
        <div class="custom-container-info y-6">
          <div class="text-content mt-4 pl-3 pr-3 col-sm-12 col-lg-6" >
            <div class="d-flex align-items-start flex-column justify-content-center reverse-order custom-text">
              <h3>{{ $t('views.pro_home.photo2_title') }}</h3>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo2_text1') }}
              </p>
              <p class="my-2" text-left>
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo2_text2') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo2_text3') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo2_text4') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo2_text2') }}
              </p>
            </div>
          </div>
          <div class="d-flex reverse-order col-sm-12 col-lg-6 custom-image-padding">
            <img
              src="@/assets/jpg/abonamente.jpg"
              alt="Abonamente"
            >
          </div>
        </div>
        <div class="custom-container-info py-6">
          <div class="d-flex col-sm-12 col-lg-6 custom-image-padding">
            <img
              src="@/assets/jpg/faq.jpg"
              alt="Faq"
            >
          </div>
          <div class="text-content mt-4 col-sm-12 col-lg-6">
            <div class="d-flex align-items-start flex-column justify-content-center custom-text">
              <h3 class="text-left">{{ $t('views.pro_home.photo3_title') }}</h3>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo3_text1') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo3_text2') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo3_text3') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo3_text4') }}
              </p>
              <p class="my-2 text-left">
                <img src="@/assets/svg/linie-web.svg" alt="linie">
                {{ $t('views.pro_home.photo3_text5') }}
              </p>
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
