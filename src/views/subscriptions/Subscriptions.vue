<template>
  <div class="subscriptions-container">
    <div class="container margin_30_40">
      <div class="row">
        <div class="col-xl-5 col-lg-5 col-md-5 px-6">
          <div class="row">
            <figure>
              <img
                src="@/assets/png/pagina-abonamente@2x.png"
                class="img-fluid lazy"
                alt=""
              >
            </figure>
          </div>
        </div>
        <div class="col-xl-7 col-lg-7 col-md-7">
          <div class="p-5 text-center">
            <h4>Abonamentele Ease</h4>
            <h6 class="py-2 px-8">Bucura-te de servicii wellness la tine, in timp ce economisesti 20% - 25% din fiecare rezervare</h6>
            <div class="d-flex justify-content-center">
              <a
                class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                href=""
                @click.prevent="onContinue"
              >
                Activeaza
              </a>
            </div>
          </div>
          <div class="subscriptions-list d-flex flex-row">
            <div class="d-flex flex-column align-items-center" @click="type = 'massage'">
              <button class="btn pb-0">Masaj</button>
              <span v-if="type === 'massage'"><em /></span>
            </div>
            <div class="d-flex flex-column align-items-center" @click="type = 'beauty'">
              <button class="btn pb-0">Beauty</button>
              <span v-if="type === 'beauty'"><em /></span>
            </div>
            <div class="d-flex flex-column align-items-center" @click="type = 'fitness'">
              <button class="btn pb-0">Fitness</button>
              <span v-if="type === 'fitness'"><em /></span>
            </div>
          </div>
          <div class="subscriptions-list-information bg_gray p-5">
            <div v-for="info in getInfo" :key="info.value">
              <div v-if="info.type === type" class="d-flex flex-row">
                <div class="d-flex flex-column align-items-center" @click="interval = 'monthly'">
                  <button :class="`btn btn-nav-pill px-16 ${interval === 'monthly' ? 'active' : 'border-right-0'}`">Lunar</button>
                </div>
                <div class="d-flex flex-column align-items-center" @click="interval = 'yearly'">
                  <button :class="`btn btn-nav-pill px-16 ${interval === 'yearly' ? 'active' : 'border-left-0'}`">Anual</button>
                </div>
              </div>
              <div class="d-flex flex-column mt-4">
                <div v-for="item in info.content" :key="item.interval">
                  <div v-if="item.interval === interval">
                    <div
                      v-for="(contentInfo, index) in item.info"
                      :key="index"
                      class="d-flex align-items-center"
                    >
                      <h4><i class="icon_check_alt2 mr-4" /></h4>
                      <h5>{{ contentInfo.label }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
  <!-- /bg_gray -->
</template>

<script lang="ts">
  import Vue from 'vue';
  /* eslint-disable */
  import { SUBSCRIPTIONS_INFORMATION } from '@/constants/subscriptions-information';

  export default Vue.extend({
    name: 'es-subscriptions',

    data: () => ({
      type: 'massage',
      interval: 'monthly',
    }),

    computed: {
      getInfo() {
        return SUBSCRIPTIONS_INFORMATION.filter(item => item.type === this.type);
      },
    },
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
