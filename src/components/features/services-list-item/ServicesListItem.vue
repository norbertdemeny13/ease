<!-- eslint-disable -->
<template>
  <div @click="$router.push(to)" class="es_services-list-item transition-3d-hover my-2">
    <figure>
      <img :src="imagePath" :data-src="imagePath" class="img-fluid lazy" alt="">
      <span v-if="service.discount" class="ribbon off">{{ service.discount }}% off</span>
    </figure>
    <div class="p-2">
      <div class="d-flex justify-content-between">
        <h5>{{ service.name }}</h5>
        <strong v-if="service.duration">{{ service.duration }} min</strong>
      </div>
      <div class="d-flex justify-content-between">
        <span v-if="service.price_from">{{ service.price_from }} Ron</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-services-list-item',

    props: {
      imagePath: {
        required: true,
        type: String,
      },
      service: {
        type: Object,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
  });
</script>
