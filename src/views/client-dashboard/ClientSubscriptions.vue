<template>
  <div class="es_client-subscriptions-container content">
    <div class="row">
      <div class="col-md-6">
        <h2>{{ $t('generic.subscription_details') }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <div v-if="hasSubscription">
          <h6 class="mt-4">
            {{ $t('generic.califications') }}: {{ getActiveSubscription.subscription.category === 'beauty' ? $t(getActiveSubscription.subscription.primary_service_name) : $t(getActiveSubscription.subscription.name) }}
            <span v-if="getActiveSubscription.category === 'massage'">{{ getActiveSubscription.subscription.duration ? `${getActiveSubscription.subscription.duration} min` : '' }}</span>
          </h6>
          <ul class="summary_list">
            <div v-if="hasActiveSubscription">
              <li><strong>{{ $t('views.client_dashboard.subscriptions.next_bill') }} </strong>{{ getActiveSubscription.state === 'active' ? getActiveSubscription.active_until.substr(0, 10) : getActiveSubscription.active_from.substr(0, 10) }}</li>
            </div>
            <li><strong>{{ $t('generic.subscription') }}</strong>{{ $t(getActiveSubscription.subscription.name) }}</li>
            <li><strong>{{ $t('generic.status') }}</strong>{{ hasActiveSubscription ? 'Activ' : 'Anulat' }}</li>
            <li><strong>{{ $t('generic.price') }}</strong>{{ getActiveSubscription.subscription.price.price }} Ron/{{ getActiveSubscription.subscription.monthly ? $t('generic.monthly') : $t('generic.year') }}</li>
          </ul>
          <div v-if="hasActiveSubscription" class="d-flex justify-content-start">
            <button
              class="btn btn-sm btn-pink btn-pill mr-2 my-4 px-4"
              @click="onModify"
            >
              {{ $t('generic.change_subscription') }}
            </button>
            <button
              class="btn btn-sm btn-pill btn-secondary-account my-4 px-4"
              @click="onCancel"
            >
              {{ $t('generic.cancel_subscription') }}
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
          <div class="d-flex justify-content-start">
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
    <es-subscription-modal
      v-if="isSubscriptionModalOpen"
      :id="getActiveSubscription.subscription.id"
      v-model="isSubscriptionModalOpen"
      :user-id="getActiveSubscription.id"
      :active-subscription="getActiveSubscription"
    />
    <es-confirm-modal v-model="isCancelSubscriptionModalOpen" cta="Da, Anuleaza" reverse @on-confirm="onContinue()">
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
  import { SubscriptionModal } from '@/components/shared/subscription-modal';

  export default Vue.extend({
    name: 'es-client-subscriptions',

    components: {
      'es-subscription-modal': SubscriptionModal,
    },

    data: () => ({
      isCancelSubscriptionModalOpen: false,
      isSubscriptionModalOpen: false,
    }),

    computed: {
      ...mapGetters({
        getActiveSubscription: 'subscriptions/getActiveSubscription',
      }),
      getCurrentYear() {
        return new Date().getFullYear();
      },
      hasSubscription() {
        const hasUsesLeft = this.getActiveSubscription?.uses_left > 0;
        return this.hasActiveSubscription
          ? true
          : hasUsesLeft;
      },
      hasActiveSubscription() {
        return this.getActiveSubscription?.state === 'upcoming' || this.getActiveSubscription?.state === 'active';
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
        this.isSubscriptionModalOpen = true;
      },
      onContinue() {
        this.cancelActiveSubscription(this.getActiveSubscription.id);
      },
    },
  });
</script>
