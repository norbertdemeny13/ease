<template>
  <div class="content">
    <div class="es_service-details-page container margin_30_20">
      <div class="d-flex justify-content-between">
        <router-link class="back-button" href="" :to="getToRoute">
          {{ $t('generic.back') }}
        </router-link>
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
      <div v-if="isFetching">Fetching ...</div>
      <div v-else class="row my-4">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <img :src="service.absolute_image_url_large" width="500" height="350">
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6">
          <h2>{{ $t(service.name) }}</h2>
          <p>{{ $t(service.description) }}</p>

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
              {{ $t('generic.add') }}
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
  import { mapGetters } from 'vuex';
  import { ComplementaryServices } from '@/components/shared/complementary-services';

  export default Vue.extend({
    name: 'es-additional-service-details',

    components: {
      'es-complementary-services': ComplementaryServices,
    },

    computed: {
      ...mapGetters({
        getElite: 'elite/getElite',
        getServiceById: 'services/getServiceById',
        getSelectedServices: 'services/getSelectedServices',
        isFetching: 'services/isFetching',
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
        const proId = this.$router.currentRoute.query.pro_id;
        const { uuid } = this.getSelectedServices[0];
        let endpoint = `/servicii/${this.$router.currentRoute.params.type}/${uuid}`;

        if (proId) {
          endpoint += `?pro_id=${proId}`;
        }

        return endpoint;
      },
    },

    created() {
      const { query } = this.$router.currentRoute;

      if (query && query.pro_id) {
        this.fetchElite({ id: query.pro_id });
      }
    },

    methods: {
      async onContinue() {
        const { service } = this;
        const { type } = this.$router.currentRoute.params;
        const serviceType = type === 'fitness' ? type : 'beauty';
        const selectedService = {
          ...this.service,
          serviceType,
          tempServiceId: nanoid(),
        };

        await this.$store.commit('services/setSelectedService', { service: selectedService, method: 'new' });
        await this.$store.dispatch('services/setServiceCategory', serviceType);
        await this.$store.dispatch('services/createExtraServiceReservation');
        this.$router.push(this.getToRoute);
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
