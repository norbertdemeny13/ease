<template>
  <div class="es_subscription-details-container">
    <div class="container margin_30_20">
      <a href="" class="back-button mb-2" @click.prevent="onBack">{{ $t('generic.back') }}</a>
      <div class="main_title center">
        <h2 v-if="!fetchedSubscription">{{ $t('views.subscriptions.choose') }}</h2>
      </div>
      <es-address-bar :disabled="disabledAddress" @on-address-change="onAddressChange" />
      <!-- /row -->
      <es-pricing-plan-card-skeleton v-if="isFetching" :times="fetchedSubscription ? 1 : 2" />
      <div v-else :class="`row es_subscriptions-list-container mt-8 ${showSubscriptions ? '' : 'disabled'} ${fetchedSubscription ? 'has-filters' : ''}`">
        <div v-if="fetchedSubscription" class="form-group col-md-4">
          <h3>{{ $t(getFilter.title) }}</h3>
          <label>{{ $t(getFilter.description) }}</label>
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

<script>
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
      disabledAddress: false,
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
        isFetching: 'subscriptions/getIsFetching',
        getLocation: 'address/getLocation',
        getLocationError: 'address/getLocationError',
        getUser: 'session/getUser',
      }),

      showSubscriptions() {
        const cityId = localStorage.getItem('city_id');
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
      getSubscriptionsInformation() {
        return this.getSubscriptions
          .map((subscription) => ({
            ...subscription,
            label: `${this.$t(subscription.name)} ${subscription.uses > 1 ? subscription.uses : ''}`.trim(),
            name: subscription.type === 'BeautySubscription' ? subscription.primary_service_name : subscription.name,
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
        fetchLocation: 'address/fetchLocation',
        fetchSubscriptionsByType: 'subscriptions/fetchSubscriptionsByType',
        setDefaultAddress: 'address/setDefaultAddress',
      }),
      onBack() {
        if (this.isSelected) {
          this.fetchSubscriptionsByType(this.serviceType);
          this.isSelected = false;
        } else {
          this.$router.push('/abonamente');
        }
        this.disabledAddress = false;
        this.fetchedSubscription = false;
      },
      onSelect(subscription) {
        if (!this.isAuthenticated) {
          this.$root.$emit('on-show-login');
          return;
        }

        // show address modal if address is not set
        if (!this.getUser.addresses.length) {
          this.$root.$emit('on-show-address-modal');
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
            this.disabledAddress = true;
          } else {
            this.$store.commit('subscriptions/setSelectedSubscription', subscription);
            this.$router.push('/abonamente/rezerva');
          }
        }
      },
      setValue(key, value) {
        this.$data[key] = value;
      },
      async onAddressChange(address) {
        if (!this.isAuthenticated) {
          await this.fetchLocation(address);
        }

        const { params, query } = this.$router.currentRoute;
        const period = query.tip === 'monthly' ? '?monthly=true' : '?monthly=false';
        const id = address?.id;
        const cityId = address?.city?.id;
        const endpoint = period ? `${this.serviceType}${period}` : this.serviceType;

        if (cityId) {
          await this.setDefaultAddress({ id, cityId });
        }

        await this.fetchSubscriptionsByType(endpoint);
      },
    },
  });
</script>
