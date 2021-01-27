<template>
  <div class="es_reserve-service-container">
    <div class="container margin_30_40">
      <router-link class="back-button mb-2" :to="getToRoute">Inapoi</router-link>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-6 pt-2 bg_gray">
          <h5 class="pl-5 my-2">Alege Data</h5>
          <div class="date-container col-12 owl-carousel owl-theme categories_carousel_in pl-5">
            <div
              v-for="day in getDays"
              :key="day.id"
              class="day-item"
              @click="selectDate(day)"
            >
              <p class="day">{{ day.value }}</p>
              <p class="day-string">{{ day.name }}</p>
              <span v-if="day.id === selectedDate.id"><em /></span>
            </div>
          </div>
          <div class="hour-container my-2 pl-5">
            <div
              v-for="item in getHours"
              :key="item.id"
              :class="`hour-item m-2 ${selectedTime && selectedTime.id === item.id ? 'selected': ''}`"
              @click="selectTime(item)"
            >
              <p class="time  mb-0">{{ item.hour }}: {{ item.minute == '0' ? '00': item.minute }}</p>
              <p class="price mb-0">{{ item.price }} Lei</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <es-service-summary
            :date="selectedDate"
            :time="selectedTime"
          />
          <div class="d-flex justify-content-center">
            <a
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              href=""
              @click.prevent="onContinue"
            >
              Continua
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
  <!-- /bg_gray -->
</template>

<script>
  import Vue from 'vue';
  import $ from 'jquery';
  import { mapGetters } from 'vuex';
  import {
    getNextMonth,
    getNextHours,
  } from '@/utils/date-helpers';
  import { ServiceSummary } from '@/components/shared/service-summary';

  export default Vue.extend({
    name: 'es-reserve-service',

    components: {
      'es-service-summary': ServiceSummary,
    },

    data: () => ({
      selectedDate: null,
      selectedTime: null,
    }),

    computed: {
      ...mapGetters({
        getServiceById: 'getServiceById',
        getSelectedServices: 'getSelectedServices',
        isAuthenticated: 'isAuthenticated',
      }),
      getDays() {
        return getNextMonth();
      },
      getHours() {
        const prices = [];
        this.getSelectedServices.forEach((item) => {
          item.prices.forEach((n, i) => {
            if (prices[i]) {
              prices[i].price += parseInt(n.price, 10);
            } else {
              prices[i] = { ...n, price: parseInt(n.price, 10) };
            }
          });
        });
        const { date } = this.selectedDate;
        return prices ? getNextHours(prices, date) : [];
      },
      getToRoute() {
        const { id, type } = this.$router.currentRoute.params;
        const isMassageView = type === 'single' || type === 'couple';
        return isMassageView ? `/servicii/masaj?type=${type}` : `/servicii/${type}/${id}`;
      },
    },

    mounted() {
      window.initDayCarousel();
    },

    created() {
      const [day] = this.getDays;
      this.selectedDate = day;
      const [hour] = this.getHours;
      this.selectedTime = hour;
    },

    methods: {
      onContinue() {
        if (this.isAuthenticated) {
          console.log('nothing happens for now');
        } else {
          $('#sign-in').trigger('click');
        }
      },
      selectDate(item) {
        this.selectedDate = item;
        const [hour] = this.getHours;
        this.selectedTime = hour;
      },
      selectTime(item) {
        this.selectedTime = item;
      },
    },
  });
</script>
