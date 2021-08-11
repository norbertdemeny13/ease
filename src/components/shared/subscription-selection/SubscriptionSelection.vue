<!-- eslint-disable -->
<template>
  <div class="es-subscription-selection-container py-4 pr-12">
    <div v-if="hasActiveSubscription" class="row">
      <div class="col-8">
        <div v-if="getSubscription" class="active-subscription d-flex justify-content-between align-items-center py-4 px-4">
          <h6>{{ `Ab. ${getSubscription.name} ${getSubscription.monthly ? 'lunar' : 'anual'}` }} ({{ getActiveSubscription().uses_left }})</h6>
          <h6>{{ getSelectedSubscription.state === 'active' ? 'Activ' : 'Anulat' }}</h6>
        </div>
      </div>
    </div>
    <div v-else-if="hasSubscription">
      <div class="col-8">
        <div class="active-subscription d-flex justify-content-between align-items-center py-4 px-4">
          <h6>{{ `Ab. ${getAvailableSubscription.name} ${getAvailableSubscription.monthly ? 'lunar' : 'anual'}` }}</h6>
          <h6>{{ getSelectedSubscription.state === 'active' ? 'Activ' : 'Anulat' }}</h6>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="my-2">
        <h5>Activeaza un abonament</h5>
        <p class="my-2">Ai discount de 20% sau 25% la toate sedintele de masaj si sedintele incluse la abonament nu expira</p>
        <div class="d-flex flex-column">
          <div class="pricing-card-small mb-4" v-for="subscription in getSubscriptions" :key="subscription.id">
            <div class="card-body" @click.prevent="onSubscriptionSelect(subscription)">
              <h3 class="pricing-plan-title d-flex align-items-center"><span class="badge badge-pill offer-badge mr-auto">{{ subscription.discount }} %</span></h3>
              <div class="d-flex justify-content-between mt-4 mb-2">
                <div>
                  <h6>{{ subscription.name }}</h6>
                  <div class="d-flex flex-column">
                    <span v-for="(detail, i) in subscription.small_descriptions" :key="i">{{ detail }}</span>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <h6 class="bold">{{ `${subscription.price.price} Lei` }}</h6>
                  <span>{{ `${subscription.monthly ? 'pe luna' : 'pe an'}` }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { Subscription } from '@/interfaces/Subscription';

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
      getSubscription(): Record<string, any> {
        return (this.activeSubscription as any)?.subscription;
      },
      getAvailableSubscription(): Record<string, any> {
        return (this.availableSubscription as any)?.subscription;
      },
      hasActiveSubscription(): boolean {
        return !!this.getActiveSubscription();
      },
      hasSubscription(): boolean {
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

      getActiveSubscription(): Subscription {
        const subscrType: string = this.subscriptionType === 'massages' ? 'massage' : this.subscriptionType as unknown as string;
        const { getActiveSubscriptions } = this;

        const activeSubscription: Subscription = getActiveSubscriptions
          && getActiveSubscriptions[subscrType];

        const activeSubscrKey = getActiveSubscriptions && Object.keys(getActiveSubscriptions)
          .filter(item => getActiveSubscriptions[item]) as unknown as string;

        const availableSubscription: Subscription = !!activeSubscrKey
          && getActiveSubscriptions[activeSubscrKey];

        if (activeSubscription) {
          this.activeSubscription = activeSubscription as any;
          this.$emit('set-active-subscription', activeSubscription);
        } else if (availableSubscription) {
          this.availableSubscription = availableSubscription as any;
          this.$emit('set-active-subscription', availableSubscription);
        }

        return activeSubscription;
      },

      onSubscriptionSelect(subscription: Subscription): void {
        this.setSubscription(
          {
            ...subscription,
            label: `${subscription.name} ${subscription.uses > 1 ? subscription.uses : ''}`,
            price: subscription.price.price,
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
