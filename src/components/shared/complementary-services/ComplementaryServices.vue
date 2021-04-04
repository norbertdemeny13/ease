<template>
  <div class="es_additional-services-container">
    <h4 class="my-4">Adauga</h4>
    <div
      v-for="service in services"
      :key="service.id"
      class="extra-services-container row my-4 ml-0"
    >
      <div class="d-flex flex-row p-2 w-100">
        <img
          :src="service.complementary_service.absolute_image_url_small"
          :data-src="service.complementary_service.absolute_image_url_small"
          class="img-fluid lazy"
          alt=""
          width="80px"
          height="60px"
        >
        <div class="d-flex flex-column flex-grow-1 ml-2 px-2">
          <h5>{{ service.complementary_service.name }}</h5>
          <div class="d-flex justify-content-between">
            <p class="m-0">{{ service.complementary_service.price }} Lei {{ $router.currentRoute.params.type === 'nails' ? '/ unghie' : '' }}</p>
            <div class="form-group">
              <select
                v-model="service.selectedCount"
                class="form-control"
                @change="$emit('on-count-change')"
              >
                <option
                  v-for="item in getServiceCount"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-complementary-services',

    props: {
      services: {
        type: Array,
        default: null,
      },
    },

    computed: {
      getServiceCount() {
        return new Array(11)
          .fill(1).map((item, index) => ({ value: index, label: index }));
      },
    },
  });
</script>

<style type="text/css">
  .img-fluid {
    max-height: 100px;
  }
</style>
