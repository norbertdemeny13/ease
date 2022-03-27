<template>
  <b-card :title="$t('views.pro_dashboard.qualifications')">
    <b-row>
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
                <p class="mt-1 mb-1">{{ $t('generic.message_couple_t1') }}</p>
                <div
                  v-for="serviceItem in getMassageServices(item, 1).services"
                  :key="serviceItem.id"
                  class="d-flex"
                >
                  <div class="checkboxes mr-2">
                    <label :class="`container_check ${getClass(serviceItem.id)}`" @click.prevent="onAddService(serviceItem)">
                      {{ $t(serviceItem.name) }}
                      {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                      {{ `${service.category === 'massage' ? 'min' : ''}` }}
                      <input type="checkbox" :checked="user.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                      <span class="checkmark" />
                    </label>
                  </div>
                  <div v-if="getClass(serviceItem.id) === 'pending' && !disabled" class="checkboxes">
                    <label class="container_check accepted" @click.prevent="onApproveService(serviceItem)">
                      Accept
                      <input type="checkbox" :checked="user.approvedItems.includes(serviceItem.id) ? 'checked' : ''">
                      <span class="checkmark" />
                    </label>
                  </div>
                </div>
                <p class="mt-1 mb-1">{{ $t('generic.message_couple_t2') }}</p>
                <div
                  v-for="serviceItem in getMassageServices(item, 2).services"
                  :key="serviceItem.id"
                  class="d-flex"
                >
                  <div class="checkboxes">
                    <label :class="`container_check ${getClass(serviceItem.id)}`" @click.prevent="onAddService(serviceItem)">
                      {{ $t(serviceItem.name) }}
                      {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                      {{ `${service.category === 'massage' ? 'min' : ''}` }}
                      <input type="checkbox" :checked="user.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                      <span class="checkmark" />
                    </label>
                    <div v-if="getClass(serviceItem.id) === 'pending' && !disabled" class="checkboxes">
                      <label class="container_check accepted" @click.prevent="onApproveService(serviceItem)">
                        Accept
                        <input type="checkbox" :checked="user.approvedItems.includes(serviceItem.id) ? 'checked' : ''">
                        <span class="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="mt-1 mb-1">{{ $t(item.name) }}</p>
                <div
                  v-for="serviceItem in item.services"
                  :key="serviceItem.id"
                  class="d-flex"
                >
                  <div class="checkboxes mr-2">
                    <label :class="`container_check ${getClass(serviceItem.id)}`" @click.prevent="onAddService(serviceItem)">
                      {{ $t(serviceItem.name) }}
                      {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                      {{ `${service.category === 'massage' ? 'min' : ''}` }}
                      <input type="checkbox" :checked="user.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                      <span class="checkmark" />
                    </label>
                  </div>
                  <div v-if="getClass(serviceItem.id) === 'pending' && !disabled" class="checkboxes">
                    <label class="container_check accepted" @click.prevent="onApproveService(serviceItem)">
                      Accept
                      <input type="checkbox" :checked="user.approvedItems.includes(serviceItem.id) ? 'checked' : ''">
                      <span class="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </es-card>
      </es-cards-container>
    </b-row>
  </b-card>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { BCard, BRow, BFormCheckbox } from 'bootstrap-vue';
  import { Card, CardsContaienr } from '@/components/shared/card';
  import { ForgotPasswordModal } from '@/components/shared/forgot-password-modal';
  import { ResetPasswordModal } from '@/components/shared/reset-password-modal';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-elite-services',

    components: {
      BCard,
      BRow,
      BFormCheckbox,
      'es-card': Card,
      'es-cards-container': CardsContaienr,
    },

    props: {
      userData: {
        type: Object,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      services: [],
      user: {
        service_ids: [],
        approvedItems: [],
      },
    }),

    computed: {
      ...mapGetters({
        getServices: 'services/getProServices',
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

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchProServices',
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
        if (this.disabled) {
          return;
        }

        const index = this.user.service_ids.indexOf(item.id);
        if (index > -1) {
          this.user.service_ids.splice(index, 1);
        } else {
          this.user.service_ids.push(item.id);
        }
      },
      onApproveService(item) {
        if (this.disabled) {
          return;
        }

        const index = this.user.approvedItems.indexOf(item.id);
        if (index > -1) {
          this.user.approvedItems.splice(index, 1);
        } else {
          this.user.approvedItems.push(item.id);
        }
      },
      updateServices() {
        if (this.userData.services) {
          const serviceIds = this.userData.services.map(({ service }) => service.id)
          this.user.service_ids = serviceIds;
          this.services = this.userData.services.map(({ status, service }) => ({ status, id: service.id }));
        }
      },
    },

    async created() {
      await this.fetchServices();
      await this.updateServices();
    }
  });
</script>
