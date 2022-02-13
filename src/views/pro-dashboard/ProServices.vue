<template>
  <div class="es_pro-password-container content">
    <h4>{{ $t('views.pro_dashboard.qualifications') }}</h4>
    <es-cards-container>
      <es-card v-for="service in servicesList" :id="service.id" :key="service.id" :title="service.title">
        <template v-slot>
          <div v-for="item in service.items" :key="item.id">
            <div class="checkboxes">
              <label :class="`container_check ${getClass(item.id)}`" @click.prevent="onAddService(item)">
                {{ $t(item.name) }}
                {{ `${service.category === 'massage' ? item.duration : ''}` }}
                {{ `${service.category === 'massage' ? 'min' : ''}` }}
                <input type="checkbox" :checked="user.service_ids.includes(item.id) ? 'checked' : ''">
                <span class="checkmark" />
              </label>
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
        getServices: 'services/getServices',
        getUser: 'session/getUser',
      }),

      servicesList() {
        const filteredServices = this.getServices
          .filter(({ category }) => category !== 'promotions')
          .map(item => ({
            ...item,
            id: item.category,
            items: item.items
              .filter(({ name }) => name !== 'couple')
              .map(({ services }) => services)
              .map((item) => item),
          }));
        return filteredServices
          .map(item => ({ ...item, items: item.items[0]}));
      }
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
        fetchServices: 'services/fetchServices',
        updateElite: 'session/updateElite',
        fetchUser: 'session/getUser',
      }),
      getClass(itemId) {
        const selectedItem = this.services.filter(({ id }) => id == itemId);
        const status = selectedItem.length ? selectedItem[0].status : '';
        return status;
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
