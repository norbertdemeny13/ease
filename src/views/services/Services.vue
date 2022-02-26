<!-- eslint-disable -->
<template>
  <div class="es_services-container content">
    <div class="container margin_30_20">
      <es-address-bar @on-address-change="onAddressChange" />
      <services-list-skeleton v-if="isFetching" />
      <services-list
        v-else
        :services="services"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { ServicesList, ServicesListSkeleton } from '@/components/features/services-list';

  export default Vue.extend({
    name: 'es-services',

    components: {
      'services-list': ServicesList,
      'services-list-skeleton': ServicesListSkeleton,
    },

    computed: {
      ...mapGetters({
        getServices: 'services/getServices',
        isFetching: 'services/isFetching',
        getLocation: 'address/getLocation',
      }),

      services() {
        return this.getServices;
      },
    },

    watch: {
      isFetching(newVal) {
        if (!newVal) {
          setTimeout(() => {
            window.initEase();
          }, 0);
        }
      },
    },

    created() {
      const { query } = this.$router.currentRoute;

      if (query && query.pro_id) {
        this.fetchServices(query.pro_id);
      } else {
        this.fetchServices();
      }
      this.$store.commit('services/removeSelectedServices');
    },

    mounted() {
      window.initEase();
    },

    methods: {
      ...mapActions({
        fetchLocation: 'address/fetchLocation',
        fetchServices: 'services/fetchServices',
        setDefaultAddress: 'address/setDefaultAddress',
      }),
      async onAddressChange(address) {
        await this.fetchLocation(address);
        await this.fetchServices(this.getLocation.city_id);
      },
    },
  });
</script>
