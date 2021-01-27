<template>
  <div class="content">
    <div class="es_service-details-page container margin_30_20">
      <a class="back-button" href="" @click.prevent="onBack">
        Inapoi
      </a>
      <es-service-details-skeleton v-if="isFetching" />
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
            @on-count-change="onCountChange"
          />

          <es-additional-services
            v-if="additionalServices.length"
            :services="additionalServices"
            @on-remove-service="onRemoveAdditionalService"
          />

          <div v-if="canAddAdditionalServices" class="d-flex justify-content-start">
            <router-link class="mt-4" :to="`/new/servicii/${$router.currentRoute.params.type}`">
              <i class="icon_plus" />
              Mai Adauga Un Serviciu
            </router-link>
          </div>
          <div class="d-flex justify-content-center">
            <a
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              href=""
              @click.prevent="onContinue"
            >
              Continua
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
  import AdditionalServices from './AdditionalServices.vue';
  import ServiceDetailSkeleton from './ServiceDetailSkeleton.vue';

  export default Vue.extend({
    name: 'es-service-details',

    components: {
      'es-complementary-services': ComplementaryServices,
      'es-additional-services': AdditionalServices,
      'es-service-details-skeleton': ServiceDetailSkeleton,
    },

    computed: {
      ...mapGetters({
        getServiceById: 'getServiceById',
        getSelectedServices: 'getSelectedServices',
        isFetching: 'isFetching',
      }),

      canAddAdditionalServices() {
        const isFitness = this.service.category === 'fitness';
        const additionalServicesCount = this.getSelectedServices.length;
        return !isFitness && additionalServicesCount < 4;
      },

      service() {
        /* eslint-disable */
        const mainService = this.getSelectedServices[0];
        const services = mainService?.complementary_services || [];
        const complementaryServices = services
          .map(item => ({ selectedCount: 0, ...item }));
        return { ...mainService, complementary_services: complementaryServices || [] };
      },

      additionalServices() {
        return this.getSelectedServices.slice(1);
      },
    },

    async created() {
      await this.$store.commit('setSelectedService', { service: this.getServiceById, method: 'create' });
    },

    methods: {
      onBack() {
        const { service } = this;
        this.$router.push(`/servicii/${this.$router.currentRoute.params.type}`);
        this.$store.commit('removeSelectedServices');
      },
      onCountChange() {
        this.$store.commit('setSelectedService', { service: this.service, method: 'update' });
      },
      onContinue() {
        this.$router.push(`${this.$router.currentRoute.path}/rezerva`);
      },
      onRemoveAdditionalService(service) {
        this.$store.commit('removeSelectedService', service);
      },
    },
  });
</script>
