<template>
  <div class="es_subscription-details-container">
    <div class="container margin_30_20">
      <a href="" class="back-button mb-2" @click.prevent="onBack">Inapoi</a>
      <div class="main_title center">
        <h2 v-if="!fetchedSubscription">Alege un abonament</h2>
      </div>
      <es-address-bar />
      <!-- /row -->
      <es-pricing-plan-card-skeleton v-if="isFetching" :times="fetchedSubscription ? 1 : 2" />
      <div v-else :class="`row es_subscriptions-list-container ${showSubscriptions ? '' : 'disabled'} ${fetchedSubscription ? 'has-filters' : ''}`">
        <div v-if="fetchedSubscription" class="form-group col-md-4">
          <h3>{{ getFilter.title }}</h3>
          <label>{{ getFilter.description }}</label>
          <div class="choices-container d-flex my-2">
            <button
              v-for="choice in getFilter.choices"
              :key="choice.value"
              :class="`${getFilter.choices.length === 1 ? 'col-3' : 'col'} btn btn-choice btn-small border px-6 mr-4 ${ choice.value === duration ? 'active' : ''}`"
              @click="setValue(choice.key, choice.value)"
            >
              {{ choice.label }}
            </button>
          </div>
        </div>
        <es-pricing-plan-card
          v-for="card in getSubscriptionsInformation"
          :key="card.id"
          :item="card"
          :show-title="false"
          @on-select="onSelect($event)"
        />
      </div>
    </div>
    <!-- /container -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  /* eslint-disable */
  import { PricingPlanCard, PricingPlanCardSkeleton } from '@/components/shared/pricing-plan';
  import { SUBSCRIPTION_FILTERS } from '@/constants/subscriptions-information';

  export default Vue.extend({
    name: 'es-subscription-details',

    components: {
      'es-pricing-plan-card': PricingPlanCard,
      'es-pricing-plan-card-skeleton': PricingPlanCardSkeleton,
    },

    data: () => ({
      duration: 60,
      isSelected: false,
      fetchedSubscription: false,
      serviceType: '',
      subscriptionType: '',
    }),

    created() {
      const { params, query } = this.$router.currentRoute;
      const period = query.tip === 'monthly' ? '?monthly=true' : '?monthly=false';
      const serviceType = params.type === 'massage' ? 'massages' : params.type;
      this.serviceType = serviceType;
      this.fetchSubscriptionsByType(`${serviceType}${period}`);
    },

    computed: {
      ...mapGetters({
        getSubscriptions: 'subscriptions/getSubscriptions',
        isAuthenticated: 'session/isAuthenticated',
        isFetching: 'subscriptions/isFetching',
        getLocation: 'address/getLocation',
        getLocationError: 'address/getLocationError',
      }),

      showSubscriptions(): boolean {
        const cityId = sessionStorage.getItem('city_id');
        const addressFromStorage = cityId === 'null' ? null : cityId;

        const location = this.getLocation
          ? this.getLocation
          : addressFromStorage;

        return this.getLocationError
          ? false
          : location;
      },

      getFilter() {
        return SUBSCRIPTION_FILTERS
          .find(filter => filter.type === 'massage')
      },
      getSubscriptionsInformation(): Record<string, any> {

        return this.getSubscriptions
          .map((subscription: any) => ({
            ...subscription,
            label: `${subscription.name} ${subscription.uses > 1 ? subscription.uses : ''}`,
          }));
      },
    },

    watch: {
      duration(newVal, oldVal) {
        if (newVal !== oldVal) {
          const { params, query } = this.$router.currentRoute;
          const period = query.tip === 'monthly' ? '?monthly=true' : '?monthly=false';
          this.fetchSubscriptionsByType(`${this.subscriptionType}${period}&duration=${newVal}`);
        }
      },
    },

    methods: {
      ...mapActions({
        fetchSubscriptionsByType: 'subscriptions/fetchSubscriptionsByType',
      }),
      onBack(): void {
        if (this.isSelected) {
          this.fetchSubscriptionsByType(this.serviceType);
          this.isSelected = false;
        } else {
          this.$router.push('/abonamente');
        }
        this.fetchedSubscription = false;
      },
      onSelect(subscription: any): void {
        if (!this.isAuthenticated) {
          this.$root.$emit('on-show-login');
          return;
        }

        const { params, query } = this.$router.currentRoute;
        const period = query.tip === 'monthly' ? '?monthly=true' : '?monthly=false';

        const { type } = subscription;
        if (this.fetchedSubscription) {
          this.$store.commit('subscriptions/setSelectedSubscription', subscription);
          this.$router.push('/abonamente/rezerva');
        } else {
          this.isSelected = true;
          if (type.includes('Massage')) {
            const massageType = type.includes('Couple') ? 'couple_massage' : 'single_massage';
            this.subscriptionType = massageType;
            this.fetchSubscriptionsByType(`${massageType}${period}&duration=${this.duration}`);
            this.fetchedSubscription = true;
          } else {
            this.$store.commit('subscriptions/setSelectedSubscription', subscription);
            this.$router.push('/abonamente/rezerva');
          }
        }
      },
      setValue(key: string, value: string) {
        this.$data[key] = value;
      },
    },
  });
</script>
