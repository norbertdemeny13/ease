<!-- eslint-disable -->
<template>
  <div class="why-us-container bg_gray">
    <div class="container margin_30_40">
      <div class="main_title center">
        <h2>{{ $t('views.home.we_title') }}</h2>
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
            <h3 class="my-3">{{ $t('views.home.we_card1_title') }}</h3>
            <p>{{ $t('views.home.we_card1_description') }}</p>
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
            <h3 class="my-3">{{ $t('views.home.we_card2_title') }}</h3>
            <p>{{ $t('views.home.we_card2_description') }}</p>
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
            <h3 class="my-3">{{ $t('views.home.we_card3_title') }}</h3>
            <p>{{ $t('views.home.we_card3_description') }}</p>
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
