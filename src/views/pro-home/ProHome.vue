<template>
  <div class="content">
    <div class="hero pro-hero">
      <div class="opacity-mask">
        <div class="container">
          <div class="row pt-6 px-6">
            <div class="col-md-8">
              <div class="text-center text-content mt-4 d-flex align-items-start flex-column justify-content-center">
                <h3 class="text-left">Castiga mai multi bani, pe termenii tai</h3>
                <p class="my-2 text-left">Ofera servicii de masaj, beauty sau fitness pe platforma de wellness cu cei mai multi utilizatori activi din Romania</p>
                <button
                  class="btn btn-pink btn-pill mt-4 px-6"
                  @click="onSubmit"
                >
                  Aplica acum
                </button>
              </div>
            </div>
          </div>
          <!-- /row -->
        </div>
      </div>
      <div class="wave hero" />
    </div>
    <!-- /hero_single -->
    <es-work-with-us />
    <es-more-details />
    <es-how-it-works />
    <div class="text-center text-content m-4 p-4 d-flex align-items-center flex-column justify-content-center bg_gray">
      <div class="row">
        <div class="col-md-8 offset-2">
          <h3 class="text-center">Daca ai experienta, pasiune pentru wellness si dorinta de a castiga mai multi bani, incepe sa lucrezi cu Ease!</h3>
          <button
            class="btn btn-pink btn-pill mt-4 px-6"
            @click="onSubmit"
          >
            Aplica acum
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import HowItWorks from './HowItWorks.vue';
  import MoreDetails from './MoreDetails.vue';
  import WorkWithUs from './WorkWithUs.vue';

  export default Vue.extend({
    name: 'es-pro-home',

    components: {
      'es-how-it-works': HowItWorks,
      'es-more-details': MoreDetails,
      'es-work-with-us': WorkWithUs,
    },

    mounted() {
      (window as any).initEase();
    },

    methods: {
      onSubmit(): void {
        this.$root.$emit('on-show-elite-register');
      },
    },
  });
</script>
