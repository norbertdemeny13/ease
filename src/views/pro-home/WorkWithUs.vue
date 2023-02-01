<!-- eslint-disable -->
<template>
  <div class="why-us-container">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>{{ $t('views.pro_home.work_with_us') }}</h2>
      </div>
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="box_how">
              <figure>
                <img
                  src="@/assets/svg/earn-more.svg"
                  alt=""
                  width="35"
                  height="35"
                >
              </figure>
              <h3 class="my-3">{{ $t('views.pro_home.work_with_us_card1_title') }}</h3>
              <p class="text-center">{{ $t('views.pro_home.work_with_us_card1_message') }}</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="box_how">
              <figure>
                <img
                  src="@/assets/svg/work-when-you-want.svg"
                  alt=""
                  width="35"
                  height="35"
                >
              </figure>
              <h3 class="my-3">{{ $t('views.pro_home.work_with_us_card2_title') }}</h3>
              <p class="text-center">{{ $t('views.pro_home.work_with_us_card2_message') }}</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="box_how">
              <figure>
                <img
                  src="@/assets/svg/security.svg"
                  alt=""
                  width="35"
                  height="35"
                >
              </figure>
              <h3 class="my-3">{{ $t('views.pro_home.work_with_us_card3_title') }}</h3>
              <p class="text-center">{{ $t('views.pro_home.work_with_us_card3_message') }}</p>
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
