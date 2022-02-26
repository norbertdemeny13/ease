<template>
  <div class="subscriptions-container">
    <div class="hero inner_pages">
      <div class="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <h1>{{ $t('views.subscriptions.title') }}</h1>
              <p>{{ $t('views.subscriptions.title_description') }}</p>
              <a href="" class="btn_1" @click.prevent="scrollToElement()">{{ $t('generic.activate') }}</a>
            </div>
          </div>
          <!-- /row -->
        </div>
      </div>
      <div class="wave hero" />
    </div>
    <!-- /hero -->

    <div class="container margin_30_20">
      <div class="main_title center">
        <h2>{{ $t('views.subscriptions.title_2') }}</h2>
      </div>

      <div class="row justify-content-center align-items-center add_bottom_15 custom-subscription-card">
        <div class="col-lg-6">
          <div class="box_about">
            <h3>{{ $t('views.subscriptions.photo1_title') }}</h3>
            <p>{{ $t('views.subscriptions.photo1_body') }}</p>
            <img src="@/assets/png/arrow_about.png" alt="" class="arrow_1">
          </div>
        </div>
        <div class="col-lg-6 text-center ">
          <img
            src="@/assets/svg/subscription_1.svg"
            alt=""
            class="img-fluid"
            width="250"
            height="250"
          >
        </div>
      </div>
      <!-- /row -->
      <div class="row justify-content-center align-items-center add_bottom_15 custom-subscription-card">
        <div class="col-lg-6 text-center ">
          <img
            src="@/assets/svg/subscription_2.svg"
            alt=""
            class="img-fluid"
            width="250"
            height="250"
          >
        </div>
        <div class="col-lg-6">
          <div class="box_about">
            <h3>{{ $t('views.subscriptions.photo2_title') }}</h3>
            <p>{{ $t('views.subscriptions.photo2_body') }}</p>
            <img src="@/assets/png/arrow_about.png" alt="" class="arrow_2">
          </div>
        </div>
      </div>
      <!-- /row -->
      <div class="row justify-content-center align-items-center custom-subscription-card">
        <div class="col-lg-6">
          <div class="box_about">
            <h3>{{ $t('views.subscriptions.photo3_title') }}</h3>
            <p>{{ $t('views.subscriptions.photo3_body') }}</p>
          </div>
        </div>
        <div class="col-lg-6 text-center ">
          <img
            src="@/assets/svg/subscription_3.svg"
            alt=""
            class="img-fluid"
            width="250"
            height="250"
          >
        </div>
      </div>
      <!-- /row -->
      <es-pricing-plan :subscriptions="getSubscriptionsInformation" />
    </div>
    <!-- /container -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  /* eslint-disable */
  import { PricingPlan } from '@/components/shared/pricing-plan';

  export default Vue.extend({
    name: 'es-subscriptions',

    components: {
      'es-pricing-plan': PricingPlan,
    },

    data: () => ({
      type: 'massage',
      interval: 'monthly',
    }),

    computed: {
      ...mapGetters({
        getAllSubscriptions: 'subscriptions/getAllSubscriptions'
      }),
      getSubscriptionsInformation(): any {
        return this.getAllSubscriptions
          .map((subscription: any) => ({
            ...subscription,
            subscriptionList: subscription.data,
          }));
      },
    },

    created() {
      this.fetchSubscriptions();
    },

    mounted() {
      (window as any).initEase();
    },

    methods: {
      ...mapActions({
        fetchSubscriptions: 'subscriptions/fetchSubscriptions',
      }),
      scrollToElement(): void {
        const el = this.$el.getElementsByClassName('pricing-plan-container')[0];

        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
</script>

<style type="text/css" scoped>
  button:focus {
    box-shadow: none;
  }

  span em {
    background-color: #d00078;
    display: block;
    height: 4px;
    width: 60px;
  }
</style>
