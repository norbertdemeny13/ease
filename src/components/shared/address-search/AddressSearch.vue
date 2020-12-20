<template>
  <div class="address-search-container">
    <div class="form-group ml-4">
      <input
        ref="search"
        v-model="location"
        placeholder="Introdu o locatie"
        class="form-control no_border_r"
        type="text"
      />
    </div>
    <div v-if="hasError" class="error-message ml-4">
      <span>Ease nu este eocamdata disponibil in aceasta locatie. Ne extindem rapid, revino curand. Serviciile sunt disponibile momentan in Cluj sau Bucuresti.</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-address-search',

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
          if (!['Cluj-Napoca', 'Bucharest'].includes(place.vicinity)) {
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
