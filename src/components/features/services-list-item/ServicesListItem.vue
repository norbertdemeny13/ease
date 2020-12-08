<!-- eslint-disable -->
<template>
  <div class="es_services-list-item transition-3d-hover my-2">
    <div class="strip">
      <figure>
        <span v-if="service.discount" class="ribbon off">{{ service.discount }}% off</span>
      </figure>
      <div class="p-2">
        <div class="d-flex justify-content-between">
          <h5>{{ service.title }}</h5><strong>{{ service.time }}</strong>
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
      service: Object,
    },
  });
</script>
