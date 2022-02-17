<template>
  <div class="es_pro-password-container content">
    <h4>{{ $t('views.pro_dashboard.qualifications') }}</h4>
    <es-cards-container>
      <es-card
        v-for="service in servicesList"
        :id="service.id"
        :key="service.id"
        :title="service.title"
      >
        <template v-slot>
          <div v-for="item in service.items" :key="item.id" class="col-md-12">
            <div v-if="item.name === 'couple'">
              <p class="mt-3 mb-3">{{ $t('generic.message_couple_t1') }}</p>
              <div v-for="serviceItem in getMassageServices(item, 1).services" :key="serviceItem.id">
                <div class="checkboxes">
                  <label :class="`container_check ${getClass(serviceItem.id)}`" @click.prevent="onAddService(serviceItem)">
                    {{ $t(serviceItem.name) }}
                    {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                    {{ `${service.category === 'massage' ? 'min' : ''}` }}
                    <input type="checkbox" :checked="user.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                    <span class="checkmark" />
                  </label>
                </div>
              </div>
              <p class="mt-3 mb-3">{{ $t('generic.message_couple_t2') }}</p>
              <div v-for="serviceItem in getMassageServices(item, 2).services" :key="serviceItem.id">
                <div class="checkboxes">
                  <label :class="`container_check ${getClass(serviceItem.id)}`" @click.prevent="onAddService(serviceItem)">
                    {{ $t(serviceItem.name) }}
                    {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                    {{ `${service.category === 'massage' ? 'min' : ''}` }}
                    <input type="checkbox" :checked="user.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                    <span class="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="mt-3 mb-3">{{ $t(item.name) }}</p>
              <div v-for="serviceItem in item.services" :key="serviceItem.id">
                <div class="checkboxes">
                  <label :class="`container_check ${getClass(serviceItem.id)}`" @click.prevent="onAddService(serviceItem)">
                    {{ $t(serviceItem.name) }}
                    {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                    {{ `${service.category === 'massage' ? 'min' : ''}` }}
                    <input type="checkbox" :checked="user.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                    <span class="checkmark" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </es-card>
    </es-cards-container>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-sm btn-pink btn-pill my-4 px-6"
        @click.prevent="onSave()"
      >
        {{ $t('generic.save') }}
      </button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { Card, CardsContaienr } from '@/components/shared/card';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-pro-services',
    components: {
      'es-card': Card,
      'es-cards-container': CardsContaienr,
    },

    data: () => ({
      services: [],
      user: {
        service_ids: [],
      },
    }),

    computed: {
      ...mapGetters({
        getServices: 'services/getProServices',
        getUser: 'session/getUser',
      }),

      servicesList() {
        const filteredServices = this.getServices
          .filter(({ category }) => category !== 'promotions')
          .map(item => ({
            ...item,
            id: item.category,
          }));
        return filteredServices;
      },
    },

    watch: {
      getUser(newVal, oldVal) {
        const isDifferent = !isEqual(newVal.services, oldVal.services);
        if (isDifferent) {
          this.$toasts.toast({
            id: 'update-toast',
            title: this.$t('toast.congrats_title'),
            message: this.$t('toast.account_update'),
            intent: 'success',
          });
          this.fetchUser();
          this.updateServices();
        }
      },
    },

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchProServices',
        updateElite: 'session/updateElite',
        fetchUser: 'session/getUser',
      }),
      getClass(itemId) {
        const selectedItem = this.services.filter(({ id }) => id == itemId);
        const status = selectedItem.length ? selectedItem[0].status : '';
        return status;
      },
      getMassageServices(services, elitesRequired) {
        const filteredServices = {
          ...services,
          services: services.services.filter(service => service.elites_required === elitesRequired),
        };
        return filteredServices;
      },

      onSave() {
        this.updateElite(this.$data);
      },
      onAddService(item) {
        const index = this.user.service_ids.indexOf(item.id);
        if (index > -1) {
          this.user.service_ids.splice(index, 1);
        } else {
          this.user.service_ids.push(item.id);
        }
      },
      updateServices() {
        if (this.getUser.services) {
          const serviceIds = this.getUser.services.map(({ service }) => service.id)
          this.user.service_ids = serviceIds;
          this.services = this.getUser.services.map(({ status, service }) => ({ status, id: service.id }));
        }
      },
    },

    async created() {
      await this.fetchServices();
      this.updateServices();
    }
  });
</script>
