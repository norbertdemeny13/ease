<!-- eslint-disable -->
<template>
  <div class="how-it-works-container">
    <div class="container py-6">
      <div class="main_title center">
        <h2>{{ $t('views.pro_home.how_it_works') }}</h2>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div class="box_how d-flex flex-column justify-content-center">
            <h1>1</h1>
            <h3>{{ $t('views.pro_home.how_it_works_card1_title') }}</h3>
            <p>{{ $t('views.pro_home.how_it_works_card1_message') }}</p>
            <div class="d-flex justify-content-center col-md-12">
              <router-link
                class="mt-4"
                to="/easepro/intrebari-frecvente"
              >{{ $t('views.pro_home.learn_more') }}</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how d-flex flex-column justify-content-center">
            <h1>2</h1>
            <h3>{{ $t('views.pro_home.how_it_works_card2_title') }}</h3>
            <p>{{ $t('views.pro_home.how_it_works_card2_message') }}</p>
            <div class="d-flex justify-content-center col-md-12">
              <router-link
                class="mt-4"
                to="/easepro/intrebari-frecvente"
              >{{ $t('views.pro_home.learn_more') }}</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="box_how d-flex flex-column justify-content-center">
            <h1>3</h1>
            <h3>{{ $t('views.pro_home.how_it_works_card3_title') }}</h3>
            <p>{{ $t('views.pro_home.how_it_works_card3_message') }} </p>
            <div class="d-flex justify-content-center col-md-12">
              <router-link
                class="mt-4"
                to="/easepro/intrebari-frecvente"
              >{{ $t('views.pro_home.learn_more') }}</router-link>
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
