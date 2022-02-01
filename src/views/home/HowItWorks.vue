<!-- eslint-disable -->
<template>
  <div class="how-it-works-container bg_gray">
    <div class="container py-6">
      <div class="main_title center">
        <h2>{{ $t('generic.how_it_works') }}</h2>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/png/lazy-placeholder-100-100-white.png"
                :data-src="image1"
                alt=""
                width="150"
                height="167"
                class="lazy"
              >
            </figure>
            <h3 class="text-center">{{ $t('views.home.hit_card1_title') }}</h3>
            <p  class="text-center">{{ $t('views.home.hit_card1_description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/png/lazy-placeholder-100-100-white.png"
                :data-src="image2"
                alt=""
                width="150"
                height="167"
                class="lazy"
              >
            </figure>
            <h3 class="text-center">{{ $t('views.home.hit_card2_title') }}</h3>
            <p class="text-center">{{ $t('views.home.hit_card2_description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how">
            <figure>
              <img
                src="@/assets/png/lazy-placeholder-100-100-white.png"
                :data-src="image3"
                alt=""
                width="150"
                height="167"
                class="lazy"
              >
            </figure>
            <h3 class="text-center">{{ $t('views.home.hit_card3_title') }}</h3>
            <p class="text-center">{{ $t('views.home.hit_card3_description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import image1 from '@/assets/svg/homepage_1.svg';
  import image2 from '@/assets/svg/homepage_2.svg';
  import image3 from '@/assets/svg/homepage_3.svg';

  export default Vue.extend({
    name: 'es-home-how-it-works',
    data: () => ({
      image1,
      image2,
      image3,
    }),
  });
</script>
