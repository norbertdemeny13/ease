<template>
  <main>
    <div class="hero_single">
      <div class="opacity-mask">
        <div class="container">
          <div class="row justify-content-lg-start justify-content-md-center">
            <div class="col-xl-6 col-lg-8 text-center">
              <h1>Servicii wellness de 5 stele cand si unde doresti</h1>
              <p>Iti aducem profesionisti cu experienta, atent selectionati, la usa ta</p>
              <form method="post" action="grid-listing-filterscol.html">
                <div class="row no-gutters custom-search-input">
                  <div class="col-lg-10">
                    <div class="form-group">
                      <input
                        id="autocomplete"
                        class="form-control no_border_r"
                        type="text"
                        placeholder="Introdu orasul sau adresa"
                      >
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <button class="btn_1 gradient" type="submit">Rezerva</button>
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
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DownloadApp from './DownloadApp.vue';
  import HowItWorks from './HowItWorks.vue';
  import MoreDetails from './MoreDetails.vue';
  import WhyUs from './WhyUs.vue';

  export default Vue.extend({
    name: 'es-home',

    components: {
      'es-download-app': DownloadApp,
      'es-how-it-works': HowItWorks,
      'es-more-details': MoreDetails,
      'es-why-us': WhyUs,
    },

    mounted() {
      (window as any).initEase();
    },
  });
</script>
