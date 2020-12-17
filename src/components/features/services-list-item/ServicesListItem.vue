<!-- eslint-disable -->
<template>
  <div class="es_services-list-item transition-3d-hover my-2">
    <div class="strip">
      <figure>
        <!-- <img :src="service.absolute_image_url_small" :data-src="service.absolute_image_url_small" class="img-fluid lazy" alt=""> -->
        <img src="https://ease-be.herokuapp.com/beauty/img_small/eyebrows/definire_sprancene_cu_ata.jpg" data-src="https://ease-be.herokuapp.com/beauty/img_small/eyebrows/definire_sprancene_cu_ata.jpg" alt="poza" class="img-fluid lazy" />
        <span v-if="service.discount" class="ribbon off">{{ service.discount }}% off</span>
      </figure>
      <div class="p-2">
        <div class="d-flex justify-content-between">
          <router-link :to="to">
            <h5>{{ service.name }}</h5>
          </router-link>
          <strong v-if="service.duration">{{ service.duration }} min</strong>
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
      to: {
        type: String,
        required: true,
      },
    },
  });
</script>
