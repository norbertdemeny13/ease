<template>
  <div class="es_client-password-container content">
    <h4>Calificari</h4>

    {{servicesList}}
    <cards-contaienr>
      <card v-for="service in servicesList" :id="service" :key="service" :title="service">
        <template v-slot>service</template>
      </card>
    </cards-contaienr>
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { Card, CardsContaienr } from '@/components/shared/card';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';

  export default Vue.extend({
    name: 'es-client-services',
    components: { Card, CardsContaienr },

    data() {
      return {
        services: {}
      }
    },

    computed: {
      ...mapGetters({ getServices: 'services/getServices', getServicesByType: 'services/getServicesByType' }),

      servicesList() {
        return Object.keys(this.services);
      }
    },

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
        fetchServicesByType: 'services/fetchServicesByType',
      })
    },

    async created() {
      await this.fetchServices();

      this.getServices.forEach(service => {
        this.services[service.title] = {};
        service.items
          .filter(subService => subService.name)
          .forEach(async subService => {
            await this.fetchServicesByType({ type: subService.name });
            this.services[service.title][subService.name] = {};

            this.getServicesByType.forEach(serviceType => {
              if (this.getServicesByType.length === 1) {
                this.services[service.title][subService.name] = serviceType.services.map(service => service.name);
              } else {
                this.services[service.title][subService.name][serviceType.name] = serviceType.services.map(service => service.name);
              }
            });
          });
      });
    }
  });
</script>
