<template>
  <div class="es_additional-services-container">
    <h4 class="my-4">Adauga</h4>
    <div
      v-for="service in services"
      :key="service.uuid"
      :class="`extra-services-container row my-4 ml-0 ${ selectedServices.find(item => item.uuid === service.uuid) ? 'selected' : '' }`"
    >
      <div class="d-flex flex-row p-2 w-100" @click="onServiceSelect(service)">
        <img
          :src="service.absolute_image_url_small"
          :data-src="service.absolute_image_url_small"
          class="img-fluid lazy"
          alt=""
          width="80px"
          height="60px"
        >
        <div class="d-flex flex-column flex-grow-1 ml-2 px-2">
          <h5>{{ service.name }} | {{ service.duration }} min</h5>
          <p v-if="service.description">{{ service.description }}</p>
          <h6>{{ service.price || 49 }} Ron</h6>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <a
        class="btn btn-sm btn-pink btn-pill mt-4 px-6"
        href=""
        @click.prevent="$emit('on-continue', selectedServices)"
      >
        Continua
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { ComplementaryService } from '@/interfaces/Services';

  export default Vue.extend({
    name: 'es-additional-services',

    props: {
      services: {
        type: Array,
        default: null,
      },
    },

    data: () => ({
      selectedServices: [] as ComplementaryService[],
    }),

    methods: {
      onServiceSelect(service: ComplementaryService): void {
        /* eslint-disable */
        const { uuid, is_four_hands } = service;
        const exists = this.selectedServices.find(item => item.uuid === uuid);

        if (exists) {
          this.selectedServices = this.selectedServices.filter(item => item.uuid !== uuid);
        } else if (is_four_hands) {
          this.selectedServices = [{ uuid, is_four_hands }];
        } else {
          this.selectedServices = this.selectedServices.filter(item => !item.is_four_hands);
          this.selectedServices.push({ uuid, is_four_hands });
        }
      },
    },
  });
</script>
