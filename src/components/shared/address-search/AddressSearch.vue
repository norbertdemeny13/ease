<template>
  <div class="address-search-container">
    <div class="d-flex flex-row align-items-center form-group">
      <input
        ref="search"
        v-model="location"
        placeholder="Introdu o locatie"
        class="form-control ml-4 no_border_r pr-4"
        type="text"
      >
      <a v-if="location" href="" @click.prevent="location = null"><i class="ml-n4 icon_trash" /></a>
    </div>
    <div v-if="hasError" class="alert alert-danger ml-4" role="alert">
      <span>Ease nu este deocamdata disponibil in aceasta locatie. Ne extindem rapid, revino curand. Serviciile sunt disponibile momentan in Cluj sau Bucuresti.</span>
    </div>
    <div v-else-if="!location && isFirstTime" class="alert alert-primary ml-4" role="alert">
      <span>Pentru a vizualiza preturile si disponibilitatea serviciilor te rog sa  introduci orasul sau adresa.</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { VICINITIES } from '@/constants/available-vicinity';

  export default Vue.extend({
    name: 'es-address-search',

    props: {
      isFirstTime: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      location: null,
      hasError: false,
    }),

    computed: {
      ...mapGetters({
        getLocation: 'getLocation',
      }),
    },

    mounted() {
      (window as any).checkAndAttachMapScript(this.initLocationSearch);
    },

    methods: {
      ...mapActions({
        setLocation: 'setLocation',
      }),
      initLocationSearch() {
        const autocomplete = new (window as any).google.maps.places.Autocomplete(this.$refs.search);
        autocomplete.setFields(['geometry', 'formatted_address', 'name', 'vicinity']);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!VICINITIES.includes(place.vicinity)) {
            this.hasError = true;
          } else {
            this.hasError = false;
            this.setLocation(place);
          }
          this.location = place.formatted_address;
        });
      },
    },
  });
</script>
