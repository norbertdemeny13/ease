<template>
  <div class="es_client-subscriptions-container content">
    <div class="row">
      <div class="col-md-6">
        <h4>{{ $t('generic.subscription_details') }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div v-if="hasSubscription">
          <h6 class="mt-4">{{ getActiveSubscription.subscription.name }} ({{ getActiveSubscription.uses_left }})</h6>
          <ul class="summary_list">
            <div v-if="getActiveSubscription.state === 'active'">
              <li>{{ $t('views.client_dashboard.subscriptions.next_bill') }}</li>
              <li><strong>{{ getActiveSubscription.active_until.substr(0, 10) }}</strong></li>
            </div>
            <li><strong>{{ $t('generic.subscription') }}</strong>{{ getActiveSubscription.subscription.monthly ? 'Lunar' : 'Anual' }}</li>
            <li><strong>{{ $t('generic.status') }}</strong>{{ getActiveSubscription.state === 'active' ? 'Activ' : 'Anulat' }}</li>
            <li><strong>{{ $t('generic.price') }}</strong>{{ getActiveSubscription.subscription.price.price }}/{{ getActiveSubscription.subscription.monthly ? 'luna' : 'an' }}</li>
          </ul>
          <div v-if="getActiveSubscription.state === 'active'" class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-4"
              @click="onCancel"
            >
              {{ $t('generic.activate_a_subscription') }}
            </button>
            <button
              class="btn btn-sm btn-pink btn-pill ml-2 my-4 px-4"
              @click="onModify"
            >
              {{ $t('generic.change_subscription') }}
            </button>
          </div>
          <button
            v-else
            class="btn btn-sm btn-pink btn-pill ml-2 my-4 px-4"
            @click="$router.push('/abonamente')"
          >
            {{ $t('generic.activate_a_subscription') }}
          </button>
        </div>
        <div v-else>
          <div class="d-flex align-items-center justify-content-between">
            <h4>{{ $t('views.client_dashboard.subscriptions.description') }}</h4>
          </div>
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill my-4 px-6"
              @click="$router.push('/abonamente')"
            >
              {{ $t('generic.activate_a_subscription') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <es-confirm-modal v-model="isCancelSubscriptionModalOpen" cta="Da, Anuleaza" @on-confirm="onContinue()">
      <template slot="title">{{ $t('generic.cancel_subscription') }}</template>
      <template slot="message">
        <p>{{ $t('subscription.cancel.title') }}</p>
      </template>
    </es-confirm-modal>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-client-subscriptions',

    data: () => ({
      isCancelSubscriptionModalOpen: false,
    }),

    computed: {
      ...mapGetters({
        getActiveSubscription: 'subscriptions/getActiveSubscription',
      }),
      getCurrentYear() {
        return new Date().getFullYear();
      },
      hasSubscription() {
        const hasActiveSubscription = this.getActiveSubscription?.state === 'active';
        const hasUsesLeft = this.getActiveSubscription?.uses_left > 0;
        return hasActiveSubscription
          ? true
          : hasUsesLeft;
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
      onCancel() {
        this.isCancelSubscriptionModalOpen = true;
      },
      onModify() {
        // on modify
      },
      onContinue() {
        this.cancelActiveSubscription(this.getActiveSubscription.id);
      },
    },
  });
</script>
