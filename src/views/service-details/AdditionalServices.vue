<template>
  <div>
    <h4 class="my-4">Servicii Aditionale</h4>
    <div class="added-services-container row my-4 ml-0">
      <div v-for="service in services" :key="service.id" class="d-flex flex-column p-4 m-2 w-100">
        <div class="d-flex alig-items-center justify-content-between">
          <h5 class="m-0">{{ service.name }}</h5>
          <img
            src="@/assets/icons/trash-can.svg"
            class="img-fluid lazy mr-2"
            alt=""
            width="13px"
            height="13px"
            @click="$emit('on-remove-service', service)"
          >
        </div>
        <div
          v-for="item in getComplementaryServices(service).services"
          :key="item.id"
          class="d-flex justify-content-between align-items-center flex-inline"
        >
          <span>{{ item.selectedCount }} x {{ item.name }}</span>
          <span>{{ item.selectedCount * parseInt(item.price, 10) }} Lei</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-service-details-additional-services',
    props: {
      services: {
        type: Array,
        required: true,
      },
    },

    methods: {
      getComplementaryServices(service) {
        /* eslint-disable */
        const services = service.complementary_services || [];
        const selectedComplementaryServices = services
          .filter(service => service.selectedCount > 0)
          .map(({ id, complementary_service, selectedCount }) => ({
            name: complementary_service.name,
            price: complementary_service.price,
            id,
            selectedCount,
          }));
        return {
          name: service.name,
          services: selectedComplementaryServices,
        };
      },
    },
  });
</script>
