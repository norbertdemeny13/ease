<!-- eslint-disable -->
<template>
  <div class="pricing-plan-container" id="pricing-plan-container">
    <div class="container">
      <h1 v-if="showTitle" class="text-center pricing-table-title">Abonamente</h1>

      <ul v-if="showTitle" class="nav nav-pills justify-content-center pricing-tab" id="pricing-tab" role="tablist">
        <li class="nav-item" @click="selectedType = 'monthly'">
          <a class="nav-link active" id="monthly-tab" data-toggle="pill" href="#monthly" role="tab" aria-controls="monthly"
            aria-selected="true">Lunar</a>
        </li>
        <li class="nav-item" @click="selectedType = 'yearly'">
          <a class="nav-link" id="yearly-tab" data-toggle="pill" href="#yearly" role="tab" aria-controls="yearly"
            aria-selected="false">Anual</a>
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
            <div v-for="item in subscription.subscriptionList" :key="item.type" class="col-md-4">
              <div class="card pricing-card">
                <div class="card-body">
                  <h3 class="pricing-plan-title d-flex align-items-center">{{ item.label }}<span class="badge badge-pill offer-badge ml-auto">{{ item.discount }}</span></h3>
                  <p class="h1 pricing-plan-original-cost"><del>{{ item.priceBeforeDiscount }}</del></p>
                  <p class="h1 pricing-plan-cost">{{ item.price }}<span class="currency"> Ron</span></p>
                  <ul class="pricing-plan-features">
                    <li v-for="(benefit, i) in item.benefits" :key="`${item.type}-${i}`"><i class="icon_check" />5GB file storage</li>
                  </ul>
                  <a href="#" class="btn pricing-plan-purchase-btn" @click.prevent="$router.push(`/abonamente/${item.type}?tip=${subscription.filterKey}`)">Alege</a>
                  <div class="text-center">
                    <a href="#" class="pricing-plan-link">Afla mai multe</a>
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

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'es-pricing-plan',

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
