<template>
  <div class="address-search-container">
    <div class="d-flex flex-row align-items-center justify-content-center form-group">
      <input
        ref="search"
        v-model="location"
        :placeholder="$t('generic.enter_location')"
        class="form-control no_border_r pr-4"
        type="text"
      >
      <a v-if="location" href="" @click.prevent="location = null"><i class="ml-n4 icon_trash" /></a>
      <a v-if="getLocation && !homePage" href="" class="ml-2" @click.prevent="$emit('on-cancel')">Inapoi</a>
    </div>
    <div v-if="getLocationError && !homePage" class="alert alert-danger" role="alert">
      <span>{{ $t('user_address.outside_of_area') }}</span>
    </div>
    <div v-else-if="showAlert" class="alert alert-primary" role="alert">
      <span>{{ $t('user_address.add.city') }}</span>
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
        getLocation: 'address/getLocation',
        getLocationError: 'address/getLocationError',
      }),
      showAlert(): boolean {
        const { location, homePage } = this;
        const cityId = localStorage.getItem('city_id');
        const addressFromStorage = cityId === 'null' ? null : cityId;

        const savedLocation = location || addressFromStorage;
        return !savedLocation && !homePage;
      },
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
      const savedLocation = localStorage.getItem('address') === 'null'
        ? null
        : localStorage.getItem('address');

      this.location = this.getLocation ? this.getLocation.formatted_address : savedLocation;
    },

    methods: {
      ...mapActions({
        fetchLocation: 'address/fetchLocation',
        fetchServices: 'services/fetchServices',
      }),
      initLocationSearch(): void {
        const autocomplete = new (window as any).google.maps.places.Autocomplete(this.$refs.search);
        autocomplete.setFields(['geometry.location', 'formatted_address', 'name', 'address_component']);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          this.fetchLocation(place);
          this.$emit('on-address-change', place);
          this.location = place.formatted_address;
        });
      },
    },
  });
</script>
