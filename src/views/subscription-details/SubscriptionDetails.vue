<template>
  <div class="subscription-details-container">
    <div class="container margin_30_20">
      <div class="main_title center">
        <h2>Alege un abonament</h2>
      </div>
      <!-- /row -->
      <es-pricing-plan :show-title="false" :subscriptions="getSubscriptionsInformation" />
    </div>
    <!-- /container -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  /* eslint-disable */
  import { PricingPlan } from '@/components/shared/pricing-plan';
  import { SUBSCRIPTIONS_INFORMATION } from '@/constants/subscriptions-information';

  export default Vue.extend({
    name: 'es-subscription-detailss',

    components: {
      'es-pricing-plan': PricingPlan,
    },

    computed: {
      getSubscriptionsInformation() {
        return SUBSCRIPTIONS_INFORMATION;
      },
    },
  });
</script>
