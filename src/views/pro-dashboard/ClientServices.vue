<template>
  <div class="es_client-password-container content">
    <h4>Calificari</h4>
    <es-cards-container>
      <es-card v-for="(service, i) in services" :id="i" :key="i" :title="i">
        <template v-slot>{{ service }}</template>
      </es-card>
    </es-cards-container>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { Card, CardsContaienr } from '@/components/shared/card';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';

  export default Vue.extend({
    name: 'es-client-services',
    components: {
      'es-card': Card,
      'es-cards-container': CardsContaienr,
    },

    data() {
      return {
        services: {}
      }
    },

    computed: {
      ...mapGetters({ getServices: 'services/getServices', getServicesByType: 'services/getServicesByType' }),

      servicesList() {
        const { services } = this;
        return Object.keys(services);
      }
    },

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
        fetchServicesByType: 'services/fetchServicesByType',
      }),
    },

    async created() {
      await this.fetchServices();
      const localServices = {};
      this.getServices.forEach(service => {
        localServices[service.title] = {};
        service.items
          .filter(subService => subService.name)
          .forEach(async subService => {
            await this.fetchServicesByType({ type: subService.name });
            localServices[service.title][subService.name] = {};

            this.getServicesByType.forEach(serviceType => {
              if (this.getServicesByType.length === 1) {
                localServices[service.title][subService.name] = serviceType.services.map(service => service.name);
              } else {
                localServices[service.title][subService.name][serviceType.name] = serviceType.services.map(service => service.name);
              }
            });
          });
      });
      await this.$nextTick();
      this.services = localServices;
    }
  });
</script>
