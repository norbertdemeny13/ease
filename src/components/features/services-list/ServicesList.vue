<!-- eslint-disable -->
<template>
  <div class="es_services-list-container my-4">
    <div v-for="service in services" :key="service.id" class="row">
      <div class="col-12"><h2 class="title_small">{{ service.title }}</h2></div>
      <div v-if="service.description" class="col-12"><p class="text-secondary">{{ service.description }}</p></div>
        <div v-if="service.hasCarousel" class="col-12 owl-carousel owl-theme categories_carousel_in">
          <services-list-item v-for="item in service.list" :key="item.id" :service="item" />
        </div>
        <template v-else>
          <div v-for="item in service.list" :key="item.id" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
           <services-list-item :service="item" />
         </div>
        </template>
      <!-- /strip grid -->
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { ServicesListItem } from '@/components/features/services-list-item';

  export default Vue.extend({
    name: 'es-services-list',

    components: {
      'services-list-item': ServicesListItem,
    },

    props: {
      services: Array,
    },
  });
</script>
