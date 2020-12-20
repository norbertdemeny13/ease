<template>
  <div class="content">
    <div class="hero">
      <div class="opacity-mask">
        <div class="container">
          <div class="row justify-content-lg-start justify-content-md-center">
            <div class="col-xl-6 col-lg-8 text-center">
              <h4 class="mb-8">Servicii wellness de 5 stele cand si unde doresti</h4>
              <form>
                <div class="row no-gutters custom-search-input">
                  <div class="col-lg-10">
                    <es-address-search />
                  </div>
                  <div class="col-lg-2">
                    <button class="btn_1" type="button" @click="$router.push('/servicii')">Rezerva</button>
                  </div>
                </div>
                <!-- /row -->
              </form>
            </div>
          </div>
          <!-- /row -->
        </div>
      </div>
      <div class="wave hero" />
    </div>
    <!-- /hero_single -->
    <es-download-app />
    <es-how-it-works />
    <es-more-details />
    <es-why-us />
    <es-reserve-from-app />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { AddressSearch } from '@/components/shared/address-search';
  import { DownloadApp } from '@/components/shared/download-app';
  import HowItWorks from './HowItWorks.vue';
  import MoreDetails from './MoreDetails.vue';
  import ReserveFromApp from './ReserveFromApp.vue';
  import WhyUs from './WhyUs.vue';

  export default Vue.extend({
    name: 'es-home',

    components: {
      'es-address-search': AddressSearch,
      'es-download-app': DownloadApp,
      'es-how-it-works': HowItWorks,
      'es-more-details': MoreDetails,
      'es-reserve-from-app': ReserveFromApp,
      'es-why-us': WhyUs,
    },

    mounted() {
      (window as any).initEase();
    },
  });
</script>
