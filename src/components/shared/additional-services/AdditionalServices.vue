<template>
  <div class="es_additional-services-container container">
    <h3 class="my-4">{{ $t('generic.add') }}</h3>
    <div
      v-for="service in services"
      :key="service.uuid"
      :class="`extra-services-container row my-4 ${ selectedServices.find(item => item.uuid === service.uuid) ? 'selected' : '' }`"
    >
      <div class="d-flex p-2 w-100" @click="onServiceSelect(service)">
        <img
          :src="service.absolute_image_url_small"
          :data-src="service.absolute_image_url_small"
          class="img-fluid lazy"
          alt=""
          width="80px"
          height="60px"
        >
        <div class="d-flex flex-column flex-grow-1 ml-2 px-2 custom-text">
          <h5>{{ $t(service.name) }}</h5>
          <p v-if="service.description">{{ $t(service.description) }}</p>
          <h6>{{ service.is_four_hands ? $t('generic.from') : '' }} {{ service.price || 49 }} Lei</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-additional-services',

    props: {
      services: {
        type: Array,
        default: null,
      },
    },

    data: () => ({
      selectedServices: [],
    }),

    created() {
      /* eslint-disable */
      const selectedAdditionalServices = this.services
        .filter(item => item.selectedCount > 0)
        .map(({ uuid, is_four_hands, id }) => ({ uuid, is_four_hands, id }) );
      this.selectedServices = selectedAdditionalServices;
    },

    watch: {
      services(newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          this.selectedServices = this.services
            .filter(item => item.selectedCount > 0)
            .map(({ uuid, is_four_hands, id }) => ({ uuid, is_four_hands, id }) );
        }
      },
    },

    methods: {
      onServiceSelect(service) {
        /* eslint-disable */
        const { uuid, is_four_hands, id } = service;
        const exists = this.selectedServices.find(item => item.uuid === uuid);

        if (exists) {
          this.selectedServices = this.selectedServices.filter(item => item.uuid !== uuid);
        } else if (is_four_hands) {
          this.selectedServices = [{ uuid, is_four_hands, id }];
        } else {
          this.selectedServices = this.selectedServices.filter(item => !item.is_four_hands);
          this.selectedServices.push({ uuid, is_four_hands, id });
        }

        const selectedIds = this.selectedServices.map(({ uuid }) => uuid);
        this.services.map(item => item.selectedCount = selectedIds.includes(item.uuid) ? 1 : 0);
      },
    },
  });
</script>
