<!-- eslint-disable -->
<template>
  <div class="content">
    <div class="container margin_30_20">
      <filter-bar />
      <services-list-skeleton v-if="isFetching" />
      <services-list v-else :services="services" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { ServicesList, ServicesListSkeleton } from '@/components/features/services-list';
  import { FilterBar } from '@/components/features/filter-bar';

  export default Vue.extend({
    name: 'es-services',

    components: {
      'services-list': ServicesList,
      'services-list-skeleton': ServicesListSkeleton,
      'filter-bar': FilterBar,
    },

    computed: {
      ...mapGetters({
        getServices: 'getServices',
        isFetching: 'isFetching',
      }),

      services() {
        // todo change it based on api
        return Object.keys(this.getServices)
          .map(item => ({ category: item, list: this.getServices[item] }));
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
