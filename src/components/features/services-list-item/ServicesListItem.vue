<!-- eslint-disable -->
<template>
  <div class="es_services-list-item transition-3d-hover my-2">
    <div class="strip">
      <figure>
        <img :src="service.absolute_image_url_small" :data-src="service.absolute_image_url_small" class="img-fluid lazy" alt="">
        <span v-if="service.discount" class="ribbon off">{{ service.discount }}% off</span>
      </figure>
      <div class="p-2">
        <div class="d-flex justify-content-between">
          <router-link :to="`/servicii/${service.category}`">
            <h5>{{ service.name }}</h5><strong>{{ service.time }}</strong>
          </router-link>
        </div>
        <p class="text-secondary">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-services-list-item',

    props: {
      service: {
        type: Object,
        required: true,
      },
    },
  });
</script>
