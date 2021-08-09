<!-- eslint-disable -->
<template>
  <div class="es_services-container content">
    <div class="container margin_30_20">
      <es-address-bar />
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
      }),

      services() {
        return this.getServices.filter(service => service.category !== 'promotions');
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
      this.fetchServices();
      this.$store.commit('services/removeSelectedServices');
    },

    mounted() {
      window.initEase();
    },

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
      }),
    },
  });
</script>
