<template>
  <div class="subscription-details-container">
    <div class="container margin_30_20">
      <a href="" class="back-button mb-2" @click.prevent="onBack">Inapoi</a>
      <div class="main_title center">
        <h2 v-if="!fetchedSubscription">Alege un abonament</h2>
      </div>
      <!-- /row -->
      <es-pricing-plan-card-skeleton v-if="isFetching" :times="fetchedSubscription ? 1 : 2" />
      <div v-else>
        <div v-if="!getSubscriptionsInformation.length">
          <p>Ne pare rau dar acest tip de abonament nu este disponibil</p>
        </div>
        <div v-else :class="`row ${fetchedSubscription ? 'has-filters' : ''}`">
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
            :benefits="getBenefits"
            :show-title="false"
            @on-select="onSelect($event)"
          />
        </div>
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
  import { SUBSCRIPTIONS_INFORMATION, SUBSCRIPTION_FILTERS, BENEFITS } from '@/constants/subscriptions-information';

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
      const period = query.tip === 'lunar' ? '?monthly=true' : '?monthly=false';
      const serviceType = params.type === 'masaj' ? 'massages' : params.type;
      this.serviceType = serviceType;
      this.fetchSubscriptionsByType(`${serviceType}${period}`);
    },

    computed: {
      ...mapGetters({
        getSubscriptions: 'subscriptions/getSubscriptions',
        isFetching: 'subscriptions/isFetching',
      }),
      getBenefits() {
        return BENEFITS;
      },
      getFilter() {
        return SUBSCRIPTION_FILTERS
          .find(filter => filter.type === 'massage')
      },
      getSubscriptionsInformation(): Record<string, any> {
        const { query } = this.$router.currentRoute;
        const subscriptionType = query.tip;
        return this.getSubscriptions
          .filter(({ monthly }: { monthly: boolean }) => subscriptionType === 'lunar' ? monthly : !monthly)
          .map((subscription: any) => ({
            ...subscription,
            label: `${subscription.name} ${subscription.uses > 1 ? subscription.uses : ''}`,
            price: subscription.price.price,
            benefits: BENEFITS.slice(0, 2),
          }));
      },
    },

    watch: {
      duration(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchSubscriptionsByType(`${this.subscriptionType}?duration=${newVal}`);
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
        const { type } = subscription;
        if (this.fetchedSubscription) {
          this.$store.commit('subscriptions/setSelectedSubscription', subscription);
          this.$router.push('/abonamente/rezerva');
        } else {
          this.isSelected = true;
          if (type.includes('Massage')) {
            const massageType = type.includes('Couple') ? 'couple_massage' : 'single_massage';
            this.subscriptionType = massageType;
            this.fetchSubscriptionsByType(`${massageType}?duration=${this.duration}`);
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
