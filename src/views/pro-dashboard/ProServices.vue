<template>
  <div class="es_pro-password-container content">
    <h4>{{ $t('views.pro_dashboard.qualifications') }}</h4>
    <es-cards-container>
      <es-card v-for="service in servicesList" :id="service.id" :key="service.id" :title="service.title">
        <template v-slot>
          <div v-for="item in service.items" :key="item.id">
            <div class="checkboxes">
              <label class="container_check">{{ item.title }}
                <input type="checkbox">
                <span class="checkmark" />
              </label>
            </div>
          </div>
        </template>
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
    name: 'es-pro-services',
    components: {
      'es-card': Card,
      'es-cards-container': CardsContaienr,
    },

    computed: {
      ...mapGetters({ getServices: 'services/getServices', getServicesByType: 'services/getServicesByType' }),

      servicesList() {
        // const { services } = this;
        // return Object.keys(services);
        return [
          {
            title: 'Fitness',
            id: 'fitness',
            items: [
              { title: 'Muscle', },
              { title: 'Joga', },
              { title: 'Hit', },
              { title: 'Running', },
            ],
          },
          {
            title: 'Masaj',
            id: 'masaj',
            items: [
              { title: 'massage.ease_swedish', },
              { title: 'massage.profund', },
              { title: 'massage.sport', },
              { title: 'massage.complete_relaxation', },
              { title: 'massage.anti_cellulite', },
              { title: 'massage.reflexo', },
              { title: 'massage.antenatal', },
            ],
          },
        ];
      }
    },

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
        fetchAllServices: 'services/fetchAllServices',
        fetchServicesByType: 'services/fetchServicesByType',
      }),
      onSave() {
        // do something
      },
    },

    async created() {
      await this.fetchServices();
      await this.fetchAllServices();
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
