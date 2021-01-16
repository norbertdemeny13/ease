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
      <a v-if="getLocation && !homePage" href="" class="ml-2" @click.prevent="$emit('on-cancel')">Inapoi</a>
    </div>
    <div v-if="getLocationError && !homePage" class="alert alert-danger ml-4" role="alert">
      <span>Ease nu este deocamdata disponibil in aceasta locatie. Ne extindem rapid, revino curand. Serviciile sunt disponibile momentan in Cluj sau Bucuresti.</span>
    </div>
    <div v-else-if="!location && !homePage" class="alert alert-primary ml-4" role="alert">
      <span>Pentru a vizualiza preturile si disponibilitatea serviciilor te rog sa  introduci orasul sau adresa.</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-address-search',

    props: {
      homePage: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      location: null,
    }),

    computed: {
      ...mapGetters({
        getLocation: 'getLocation',
        getLocationError: 'getLocationError',
      }),
    },

    watch: {
      getLocation(newVal) {
        if (!newVal) {
          this.location = null;
        }
      },
    },

    mounted() {
      (window as any).checkAndAttachMapScript(this.initLocationSearch);
    },

    created() {
      const savedLocation = sessionStorage.getItem('address') || null;
      this.location = this.getLocation ? this.getLocation.formatted_address : savedLocation;
    },

    methods: {
      ...mapActions({
        fetchLocation: 'fetchLocation',
      }),
      initLocationSearch() {
        const autocomplete = new (window as any).google.maps.places.Autocomplete(this.$refs.search);
        autocomplete.setFields(['geometry.location', 'formatted_address', 'name', 'vicinity']);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          this.fetchLocation(place);
          this.location = place.formatted_address;
        });
      },
    },
  });
</script>
