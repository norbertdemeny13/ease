<template>
  <div class="es_client-subscriptions-container content">
    <div class="row">
      <div class="col-md-6">
        <h4>Detalii Abonament</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div v-if="getActiveSubscription && getActiveSubscription.state === 'active'">
          <h6 class="mt-4">{{ getActiveSubscription.subscription.name }} ({{ getActiveSubscription.uses_left }})</h6>
          <ul class="summary_list">
            <li>Urmatoarea data de facturare</li>
            <li><strong>{{ getActiveSubscription.active_until.substr(0, 10) }}</strong></li>
            <li><strong>Abonament</strong>{{ getActiveSubscription.subscription.monthly ? 'Lunar' : 'Anual' }}</li>
            <li><strong>Pret</strong>{{ getActiveSubscription.subscription.price.price }}/{{ getActiveSubscription.subscription.monthly ? 'luna' : 'an' }}</li>
          </ul>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-4"
              @click="onCancel"
            >
              Anuleaza un abonamentul
            </button>
            <button
              class="btn btn-sm btn-pink btn-pill ml-2 my-4 px-4"
              @click="onModify"
            >
              Modifica abonamentul
            </button>
          </div>
        </div>
        <div v-else>
          <div class="d-flex align-items-center justify-content-between">
            <h4>Momentan nu ai nici un abonament activ</h4>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-6"
              @click="$router.push('/abonamente')"
            >
              Activeaza un abonament
            </button>
          </div>
        </div>
      </div>
    </div>
    <es-confirm-modal v-model="isCancelSubscriptionModalOpen" cta="Da, Anuleaza" @on-confirm="onContinue()">
      <template slot="title">Anulare abonament</template>
      <template slot="message">
        <p>Esti sigur ca doresti sa anulezi abonamentul?</p>
      </template>
    </es-confirm-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { getNextM } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-client-subscriptions',

    data: () => ({
      isCancelSubscriptionModalOpen: false,
    }),

    computed: {
      ...mapGetters({
        getActiveSubscription: 'subscriptions/getActiveSubscription',
      }),
      getCurrentYear(): number {
        return new Date().getFullYear();
      },
    },

    watch: {
      getActiveSubscription(newVal) {
        if (newVal.state === 'cancelled') {
          (this as any).$toasts.toast({
            id: 'cancel-subscription',
            title: 'Anulat',
            message: `Abonamentul tau ${newVal.subscription.name} a fost anulat. Sedintele de masaj ramase nerezervate nu expira si le poti rezerva oricand. Poti reactiva acest abonament incepand cu 1.${getNextM()}.${this.getCurrentYear}`,
            intent: 'success',
          });
        }
      },
    },

    created() {
      this.fetchActiveSubscriptions();
    },

    methods: {
      ...mapActions({
        fetchActiveSubscriptions: 'subscriptions/fetchActiveSubscriptions',
        cancelActiveSubscription: 'subscriptions/cancelSubscription',
      }),
      onCancel(): void {
        this.isCancelSubscriptionModalOpen = true;
      },
      onModify(): void {
        // on modify
      },
      onContinue(): void {
        this.cancelActiveSubscription(this.getActiveSubscription.id);
      },
    },
  });
</script>
