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

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  /* eslint-disable */
  import { PricingPlan } from '@/components/shared/pricing-plan';

  export default Vue.extend({
    name: 'es-subscriptions',

    metaInfo: {
      title: 'Activeaza un abonament Ease si economisesti pana la 25%',
      titleTemplate: '',
      description: 'Beneficiaza de pana la 25% discount la toate serviciile Ease, plus te bucuri de prioritate la preluarea rezervarii tale de catre profesionisti la orele de varf.',
      meta: [
        { name: 'og:title', content: 'Activeaza un abonament Ease si economisesti pana la 25%' },
        { name: 'og:description', content: 'Beneficiaza de pana la 25% discount la toate serviciile Ease, plus te bucuri de prioritate la preluarea rezervarii tale de catre profesionisti la orele de varf.' },
        { name: 'og:image', content: require('@/assets/jpg/fb-thumb-abonamente.jpg'), },
      ],
    },

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
      getSubscriptionsInformation() {
        return this.getAllSubscriptions
          .map((subscription) => ({
            ...subscription,
            subscriptionList: subscription.data,
          }));
      },
    },

    created() {
      this.fetchSubscriptions();
    },

    mounted() {
      window.initEase();
    },

    methods: {
      ...mapActions({
        fetchSubscriptions: 'subscriptions/fetchSubscriptions',
      }),
      scrollToElement() {
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
