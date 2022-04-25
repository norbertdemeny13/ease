<template>
  <div class="content">
    <div class="es_service-details-page container margin_30_20">
      <div class="d-flex justify-content-between">
        <a class="back-button" href="" @click.prevent="onBack">
          {{ $t('generic.back') }}
        </a>
        <div v-if="$router.currentRoute.query.pro_id" class="d-flex align-items-center">
          <div class="profile-pic-container">
            <figure>
              <img v-if="getElite.avatar_path" :src="getElite.avatar_path" alt="Profile Pic" class="radius-50">
              <img v-else src="@/assets/png/avatar-profesionist.png" alt="Profile Pic">
            </figure>
          </div>
          <div class="d-flex align-getElites-center flex-column ml-2">
            <span>Rezervi cu</span>
            <span class="text-center">{{ getElite.display_name }}</span>
            <div class="ml-2"><i class="icon_star" /><span class="mt-1 ml-2">{{ Number(getElite.rating) > 0 ? getElite.rating : '0.0' }}</span></div>
          </div>
        </div>
      </div>
      <es-service-details-skeleton v-if="isFetching" />
      <div v-else class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-6 image-container">
          <img :src="service.absolute_image_url_large" width="100%" height="auto">
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6">
          <h2>{{ $t(service.name) }}</h2>
          <p>{{ $t(service.description) }}</p>

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
              {{ $t('generic.add_more') }}
            </a>
          </div>
          <div class="d-flex justify-content-end">
            <a
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              href=""
              @click.prevent="onContinue"
            >
              {{ $t('generic.continue') }}
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
        getElite: 'elite/getElite',
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
      const { query } = this.$router.currentRoute;

      if (query && query.pro_id) {
        this.fetchElite({ id: query.pro_id });
      }

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
        fetchElite: 'elite/fetchElite',
        createReservation: 'services/createReservation',
      }),

      async onAddAdditionalService() {
        let paramType = this.$router.currentRoute.params.type;
        const proId = this.$router.currentRoute.query.pro_id;

        if (proId) {
          paramType += `?pro_id=${proId}`;
        }

        if (this.isAuthenticated) {
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

          await this.$store.dispatch('services/createReservation', proId);
          await this.$router.push(`/new/servicii/${paramType}`);
        } else {
          this.$root.$emit('on-show-login');
        }
      },

      onBack() {
        const { query } = this.$router.currentRoute;
        let endpoint = query?.pro_id
          ? `/servicii/${this.$router.currentRoute.params.type}?pro_id=${query.pro_id}`
          : `/servicii/${this.$router.currentRoute.params.type}`;
        this.$router.push(endpoint);
        this.$store.commit('services/removeSelectedServices');
        this.$store.commit('services/removeReservationDetails');
      },

      onCountChange() {
        this.$store.commit('services/setSelectedService', { service: this.service, method: 'update' });
      },

      async onContinue() {
        const { query } = this.$router.currentRoute;
        const eliteId = query?.pro_id;
        const { id, type } = this.$router.currentRoute.params;
        const serviceType = type === 'fitness' ? type : 'beauty';

        if (this.isAuthenticated) {
          if (this.getUser.userType === 'elite') {
            this.$toasts.toast({
              id: 'warning-toast',
              intent: 'warning',
              message: this.$t('toast.login_as_client'),
              title: this.$t('toast.warning_title'),
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
            await this.$store.dispatch('services/createReservation', eliteId);
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

<style type="text/css" scoped>
  i.icon_star {
    color: #fad055;
    font-size: 1.3rem;
  }

  .profile-pic-container img {
    width: 60px;
    height: 60px;
  }
</style>
