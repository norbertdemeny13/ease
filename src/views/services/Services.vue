<!-- eslint-disable -->
<template>
  <div class="es_services-container content">
    <div class="container margin_30_20">
      <es-address-bar />
      <services-list-skeleton v-if="isFetching" />
      <services-list v-else :services="services" :location="getLocation" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { AddressBar } from '@/components/features/address-bar';
  import { ServicesList, ServicesListSkeleton } from '@/components/features/services-list';
  import { SERVICES } from '@/constants/services';

  export default Vue.extend({
    name: 'es-services',

    components: {
      'es-address-bar': AddressBar,
      'services-list': ServicesList,
      'services-list-skeleton': ServicesListSkeleton,
    },

    computed: {
      ...mapGetters({
        getLocation: 'getLocation',
        getServices: 'getServices',
        isFetching: 'isFetching',
      }),

      hasError(): boolean {
        const vicinity = this.getLocation?.vicinity;
        return vicinity && !['Cluj-Napoca', 'Bucharest'].includes(vicinity);
      },

      services() {
        // todo change it based on api
        return SERVICES;
        // return Object.keys(this.getServices)
        // .map(item => ({ category: item, list: this.getServices[item] }));
      },
    },

    watch: {
      isFetching(newVal) {
        if (!newVal) {
          setTimeout(() => {
            (window as any).initEase();
          }, 0);
        }
      },
    },

    created() {
      this.fetchServices();
    },

    mounted() {
      (window as any).initEase();
    },

    methods: {
      ...mapActions({
        fetchServices: 'fetchServices',
      }),
    },
  });
</script>
