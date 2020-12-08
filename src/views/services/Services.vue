<!-- eslint-disable -->
<template>
  <div class="content">
    <div class="container margin_30_20">
      <filter-bar />
      <services-list :services="services" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { ServicesList } from '@/components/features/services-list';
  import { FilterBar } from '@/components/features/filter-bar';
  import { SERVICES } from '@/constants/services';

  export default Vue.extend({
    name: 'es-services',

    components: {
      'services-list': ServicesList,
      'filter-bar': FilterBar,
    },

    data: () => ({
      services: SERVICES,
    }),

    mounted() {
      (window as any).initEase();
    },
  });
</script>
