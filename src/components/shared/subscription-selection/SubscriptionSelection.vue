<!-- eslint-disable -->
<template>
  <div v-if="showSubscription">
    <div class="head">
      <h3>Abonamente</h3>
    </div>
    <div class="main">
      <div class="es-subscription-selection-container">
        <div v-if="hasActiveSubscription" class="row">
          <div class="col-8">
            <div v-if="getSubscription" class="active-subscription d-flex justify-content-between align-items-center py-4 px-4">
              <h6 v-if="getActiveSubscription().subscription.category === 'beauty'">{{ `${$t('generic.services')}` }} {{ `${$t(getActiveSubscription().subscription.primary_service_name)}` }} ({{ getActiveSubscription().uses_left }})</h6>
              <h6 v-else-if="getActiveSubscription().subscription.category === 'fitness'">{{ `${$t('generic.serviceFitness')}` }} ({{ getActiveSubscription().uses_left }})</h6>
              <h6 v-else>{{ `${$t('generic.serviceMassage')}` }} {{ `${getActiveSubscription().subscription.duration} min` }} ({{ getActiveSubscription().uses_left }})</h6>
              <h6>{{ getActiveSubscription().state === 'active' ? 'Activ' : 'Anulat' }}</h6>
            </div>
          </div>
        </div>
        <div v-else-if="hasSubscription">
          <div v-if="getAvailableSubscription" class="col-8">
            <div v-if="getAvailableSubscription" class="active-subscription d-flex justify-content-between align-items-center py-4 px-4">
              <h6>{{ `${$t('generic.services')} ${getAvailableSubscription.name} ${getAvailableSubscription.monthly ? 'lunar' : 'anual'}` }}</h6>
              <h6>{{ getActiveSubscription().state === 'active' ? 'Activ' : 'Anulat' }}</h6>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="my-2">
            <h5>{{ $t('activate_subscription') }}</h5>
            <p class="my-2">{{ $t('activate_subscription_for_discount') }}</p>
            <div class="d-flex flex-column">
              <div class="pricing-card-small mb-4" v-for="subscription in getSubscriptionItems" :key="subscription.id">
                <div class="card-body" @click.prevent="onSubscriptionSelect(subscription)">
                  <h3 class="pricing-plan-title d-flex align-items-center"><span class="badge badge-pill offer-badge">{{ subscription.discount }} %</span></h3>
                  <div class="d-flex justify-content-between flex-column mt-4 mb-2 width-100">
                    <div>
                      <h3>{{ $t(subscription.name) }}</h3>
                      <div class="d-flex flex-column">
                        <span v-for="(detail, i) in subscription.small_descriptions" :key="i">{{ $t(detail) }}</span>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="bold">{{ `${subscription.price.price} Lei` }}<span>/{{ `${subscription.monthly ? 'pe luna' : 'pe an'}` }}</span></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-subscription-selection',

    data: () => ({
      activeSubscription: null,
      availableSubscription: null,
      subscriptionType: '',
    }),

    computed: {
      ...mapGetters({
        getSelectedSubscription: 'subscriptions/getActiveSubscription',
        getActiveSubscriptions: 'subscriptions/getActiveSubscriptions',
        getSubscriptions: 'subscriptions/getSubscriptions',
        getServiceById: 'services/getServiceById',
      }),
      showSubscription() {
        // TODO: Check if the same category for subscription and service
        let show = false;

        if (this.hasActiveSubscription) {
          show = !!this.getSubscription;
        } else if (this.hasSubscription) {
          show = !!this.getAvailableSubscription;
        } else {
          show = this.getSubscriptionItems.length;
        }

        return show;
      },
      getSubscriptionItems() {
        const { category } = this.getServiceById;
        let subscriptions = this.getSubscriptions;

        if (category === 'single') {
          subscriptions = subscriptions
            .filter(subscription => subscription.type === 'MassageSubscription');
        }

        if (category === 'couple') {
          subscriptions = subscriptions
            .filter(subscription => subscription.type !== 'MassageSubscription');
        }

        return subscriptions;
      },
      getSubscription() {
        return this.getActiveSubscription()?.subscription;
      },
      getAvailableSubscription() {
        return this.availableSubscription?.subscription;
      },
      hasActiveSubscription() {
        return !!this.getActiveSubscription();
      },
      hasSubscription() {
        const { getActiveSubscriptions } = this;
        return getActiveSubscriptions && !!Object.keys(getActiveSubscriptions)
          .filter(item => getActiveSubscriptions[item]).length;
      },
    },

    async created() {
      const { type } = this.getServiceById;

      if (type.includes('Beauty')) {
        this.subscriptionType = 'beauty';
      } else if (type.includes('Fitness')) {
        this.subscriptionType = 'fitness';
      } else {
        this.subscriptionType = 'massages';
      }

      this.setServiceCategory(this.subscriptionType);
      await this.fetchSubscriptionsByType(this.subscriptionType);
      await this.fetchActiveSubscriptions();
    },

    methods: {
      ...mapActions({
        fetchActiveSubscriptions: 'subscriptions/fetchActiveSubscriptions',
        fetchSubscriptionsByType: 'subscriptions/fetchSubscriptionsByType',
        setSubscription: 'subscriptions/setSubscription',
        setActivePayment: 'services/setActivePayment',
        setServiceCategory: 'services/setServiceCategory',
      }),

      getActiveSubscription() {
        // const subscrType = this.subscriptionType === 'massages'
        // ? 'massage' : this.subscriptionType;
        const { getActiveSubscriptions } = this;

        const activeSubscription = getActiveSubscriptions.length
          && getActiveSubscriptions.filter(subscription => subscription.state === 'active');

        // TODO: Remove if all works fine

        // const activeSubscrKey = getActiveSubscriptions && Object.keys(getActiveSubscriptions)
        //   .filter(item => getActiveSubscriptions[item]) as unknown as string;

        // const availableSubscription: Subscription = !!activeSubscrKey
        //   && getActiveSubscriptions[activeSubscrKey];

        if (activeSubscription) {
          this.activeSubscription = activeSubscription;
          this.$emit('set-active-subscription', activeSubscription);
        }
        // else if (availableSubscription) {
        //   this.availableSubscription = availableSubscription as any;
        //   this.$emit('set-active-subscription', availableSubscription);
        // }

        return activeSubscription[0];
      },

      onSubscriptionSelect(subscription) {
        this.setSubscription(
          {
            ...subscription,
            label: `${subscription.name} ${subscription.uses > 1 ? subscription.uses : ''}`.trim(),
            price: subscription.price,
          },
        );
        this.setActivePayment(true);
        this.$router.push('/abonamente/rezerva');
      },
    },
  });
</script>

<style type="text/css">
  .es-subscription-selection-container .card-body {
    padding: 10px 20px;
  }

  .es-subscription-selection-container .active-subscription {
    background-color: #f1fdec;
    border-radius: 5px;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  }
</style>
