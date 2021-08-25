<!-- eslint-disable -->
<template>
  <div class="pricing-plan-container" id="pricing-plan-container">
    <div class="container">
      <h1 v-if="showTitle" class="text-center pricing-table-title">{{ $t('generic.subscriptions') }}</h1>

      <ul v-if="showTitle" class="nav nav-pills justify-content-center pricing-tab" id="pricing-tab" role="tablist">
        <li class="nav-item" @click="selectedType = 'monthly'">
          <a class="nav-link active" id="monthly-tab" data-toggle="pill" href="#monthly" role="tab" aria-controls="monthly"
            aria-selected="true">{{ $t('generic.monthly') }}</a>
        </li>
        <li class="nav-item" @click="selectedType = 'yearly'">
          <a class="nav-link" id="yearly-tab" data-toggle="pill" href="#yearly" role="tab" aria-controls="yearly"
            aria-selected="false">{{ $t('generic.anual') }}</a>
        </li>
      </ul>

      <div class="tab-content pricing-tab-content" id="pricing-tab-content">
        <div
          v-for="subscription in subscriptions"
          :key="subscription.value"
          role="tabpanel"
          :class="`tab-pane ${selectedType === subscription.value ? 'active': ''}`"
          :id="subscription.value"
          :aria-labelledby="`${subscription.value}-tab`"
        >
          <div class="row">
            <es-pricing-plan-card
              v-for="item in subscription.subscriptionList"
              :key="item.category"
              :item="item"
              :to="`/abonamente/${item.category}?tip=${subscription.filterKey}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import PricingPlanCard from './PricingPlanCard.vue';

  export default Vue.extend({
    name: 'es-pricing-plan',

    components: {
      'es-pricing-plan-card': PricingPlanCard,
    },

    props: {
      showTitle: {
        type: Boolean,
        default: true,
      },
      subscriptions: {
        type: Array,
        required: true,
      },
    },

    data: () => ({
      selectedType: 'monthly',
    }),
  });
</script>
