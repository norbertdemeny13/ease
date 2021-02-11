<template>
  <div class="subscriptions-container">
    <div class="hero inner_pages">
      <div class="opacity-mask" data-opacity-mask="rgba(0, 0, 0, 0.6)">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <h1>Abonamentele Ease</h1>
              <p>Bucura-te de servicii wellness la tine, in timp ce economisesti 20% - 25% din fiecare rezervare</p>
              <a href="" class="btn_1" @click.prevent="scrollToElement()">Activeaza</a>
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
        <h2>Why Submit to FooYes</h2>
        <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
      </div>

      <div class="row justify-content-center align-items-center add_bottom_15">
        <div class="col-lg-6">
          <div class="box_about">
            <h3>Boost your Bookings</h3>
            <p class="lead">Est falli invenire interpretaris id, magna libris sensibus mel id.</p>
            <p>Per eu nostrud feugiat. Et quo molestiae persecuti neglegentur. At zril definitionem mei, vel ei choro volumus. An tota nulla soluta has, ei nec essent audiam, te nisl dignissim vel. Ex velit audire perfecto pro, ei mei doming vivendo legendos. Cu sit magna zril, an odio delectus constituto vis. Vis ludus omnesque ne, est veri quaeque ad.</p>
            <img src="@/assets/png/arrow_about.png" alt="" class="arrow_1">
          </div>
        </div>
        <div class="col-lg-6 text-center d-none d-lg-block">
          <img
            src="@/assets/svg/about_1.svg"
            alt=""
            class="img-fluid"
            width="250"
            height="250"
          >
        </div>
      </div>
      <!-- /row -->
      <div class="row justify-content-center align-items-center add_bottom_15">
        <div class="col-lg-6 text-center d-none d-lg-block">
          <img
            src="@/assets/svg/about_2.svg"
            alt=""
            class="img-fluid"
            width="250"
            height="250"
          >
        </div>
        <div class="col-lg-6">
          <div class="box_about">
            <h3>Manage Easly</h3>
            <p class="lead">Est falli invenire interpretaris id, magna libris sensibus mel id.</p>
            <p>Per eu nostrud feugiat. Et quo molestiae persecuti neglegentur. At zril definitionem mei, vel ei choro volumus. An tota nulla soluta has, ei nec essent audiam, te nisl dignissim vel. Ex velit audire perfecto pro, ei mei doming vivendo legendos. Cu sit magna zril, an odio delectus constituto vis. Vis ludus omnesque ne, est veri quaeque ad.</p>
            <img src="@/assets/png/arrow_about.png" alt="" class="arrow_2">
          </div>
        </div>
      </div>
      <!-- /row -->
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-6">
          <div class="box_about">
            <h3>Reach New Customers</h3>
            <p class="lead">Est falli invenire interpretaris id, magna libris sensibus mel id.</p>
            <p>Per eu nostrud feugiat. Et quo molestiae persecuti neglegentur. At zril definitionem mei, vel ei choro volumus. An tota nulla soluta has, ei nec essent audiam, te nisl dignissim vel. Ex velit audire perfecto pro, ei mei doming vivendo legendos. Cu sit magna zril, an odio delectus constituto vis. Vis ludus omnesque ne, est veri quaeque ad.</p>
          </div>
        </div>
        <div class="col-lg-6 text-center d-none d-lg-block">
          <img
            src="@/assets/svg/about_3.svg"
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
  /* eslint-disable */
  import { PricingPlan } from '@/components/shared/pricing-plan';
  import { SUBSCRIPTIONS_INFORMATION } from '@/constants/subscriptions-information';

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
      getSubscriptionsInformation() {
        return SUBSCRIPTIONS_INFORMATION;
      },
    },

    mounted() {
      (window as any).initEase();
    },

    methods: {
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
    width: 60px;
    height: 4px;
    background-color: #d00078;
    display: block;
  }
</style>
