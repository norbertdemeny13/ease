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
            <a href="" class="mt-4" @click.prevent="onAddAdditionalService">
              <i class="icon_plus" />
              Mai Adauga Un Serviciu
            </a>
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
  import { nanoid } from 'nanoid';
  import { mapActions, mapGetters } from 'vuex';
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
        getReservationServices: 'services/getReservationServices',
        getReservationDetails: 'services/getReservationDetails',
        getServiceById: 'services/getServiceById',
        getSelectedServices: 'services/getSelectedServices',
        isFetching: 'services/isFetching',
        isAuthenticated: 'session/isAuthenticated',
        getUser: 'session/getUser',
      }),

      canAddAdditionalServices() {
        const isFitness = this.service.category === 'fitness';
        const additionalServicesCount = this.getSelectedServices.length;
        return !isFitness && additionalServicesCount < 4;
      },

      service() {
        const mainService = this.getSelectedServices[0];
        const services = mainService?.complementary_services || [];
        const complementaryServices = services
          .map(item => ({ selectedCount: 0, ...item }));
        /* eslint-disable */
        return { ...mainService, complementary_services: complementaryServices || [] };
      },

      additionalServices() {
        return this.getSelectedServices.slice(1);
      },
    },

    async created() {
      const { type } = this.$router.currentRoute.params;
      const serviceType = type === 'fitness' ? type : 'beauty';
      const selectedService = {
        ...this.getServiceById,
        serviceType,
        serviceCategory: 'main',
        tempServiceId: nanoid(),
      };
      if (!this.getSelectedServices.length) {
        await this.$store.commit('services/setSelectedService', { service: selectedService, method: 'create' });
      }
    },

    methods: {
      ...mapActions({
        createReservation: 'services/createReservation',
        fetchServiceById: 'services/fetchServiceById',
      }),

      async onAddAdditionalService() {
        const paramType = this.$router.currentRoute.params.type;
        if (this.isAuthenticated) {
          await this.$store.dispatch('services/createReservation');
          await this.$router.push(`/new/servicii/${paramType}`);
        } else {
          this.$root.$emit('on-show-login');
        }
      },

      onBack() {
        this.$router.push(`/servicii/${this.$router.currentRoute.params.type}`);
        this.$store.commit('services/removeSelectedServices');
        this.$store.commit('services/removeReservationDetails');
      },

      onCountChange() {
        this.$store.commit('services/setSelectedService', { service: this.service, method: 'update' });
      },

      async onContinue() {
        const { id, type } = this.$router.currentRoute.params;
        const serviceType = type === 'fitness' ? type : 'beauty';

        if (this.isAuthenticated) {
          if (this.getUser.userType === 'elite') {
            this.$toasts.toast({
              id: 'warning-toast',
              intent: 'warning',
              message: 'Pentru a continua, te rugam sa te autentifici cu un cont de client',
              title: 'Atentie',
            });

            return;
          }

          // show phone modal if address is not set
          if (!this.getUser.phone_number_confirmed) {
            this.$root.$emit('on-show-validate-phone-modal');
            return;
          }

          // show address modal if address is not set
          if (!this.getUser.addresses.length) {
            this.$root.$emit('on-show-address-modal');
            return;
          }

          if (!this.getReservationDetails || this.getReservationDetails?.status === 'waiting_confirmation') {
            await this.$store.dispatch('services/createReservation');
          }
          this.$router.push(`${this.$router.currentRoute.path}/rezerva`);
        } else {
          this.$root.$emit('on-show-login');
        }
      },

      async onRemoveAdditionalService(service) {
        await this.$store.dispatch('services/removeExtraServiceReservation', { id: service.id });
        await this.$store.commit('services/removeSelectedService', service);
      },
    },
  });
</script>
