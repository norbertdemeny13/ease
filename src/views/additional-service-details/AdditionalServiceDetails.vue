<template>
  <div class="content">
    <div class="es_service-details-page container margin_30_20">
      <router-link class="back-button" href="" :to="getToRoute">
        Inapoi
      </router-link>
      <div v-if="isFetching">Fetching ...</div>
      <div v-else class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <img :src="service.absolute_image_url_large" width="500" height="350">
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6">
          <h2>{{ service.name }}</h2>
          <p>{{ service.description }}</p>

          <es-complementary-services
            v-if="service.complementary_services.length"
            :services="service.complementary_services"
            :name="service.name"
          />

          <div class="d-flex justify-content-center">
            <a
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              href=""
              @click.prevent="onContinue"
            >
              Adauga
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import { ComplementaryServices } from '@/components/shared/complementary-services';

  export default Vue.extend({
    name: 'es-additional-service-details',

    components: {
      'es-complementary-services': ComplementaryServices,
    },

    computed: {
      ...mapGetters({
        getServiceById: 'getServiceById',
        getSelectedServices: 'getSelectedServices',
        isFetching: 'isFetching',
      }),

      service() {
        /* eslint-disable */
        const mainService = this.getServiceById;
        const services = mainService.complementary_services || [];
        const complementaryServices = services
          .map(item => ({ selectedCount: 0, ...item }));
        return { ...mainService, complementary_services: complementaryServices || [] };
      },

      getToRoute() {
        const { uuid } = this.getSelectedServices[0];
        return `/servicii/${this.$router.currentRoute.params.type}/${uuid}`;
      },
    },

    async created() {
      await this.$store.commit('setSelectedService', { service :this.getServiceById, method: 'create' });
    },

    methods: {
      onContinue() {
        const { service } = this;
        this.$store.commit('setSelectedService', { service, method: 'update' });
        this.$router.push(this.getToRoute);
      },
    },
  });
</script>
