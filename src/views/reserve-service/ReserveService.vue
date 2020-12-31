<template>
  <div class="es_reserve-service-container">
    <div class="container margin_30_40">
      <router-link class="back-button" :to="`/servicii/${$router.currentRoute.params.type}/${$router.currentRoute.params.id}`">Inapoi</router-link>
      <div class="row">
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
        <div class="col-lg-6 col-md-6"><span>Something else goes here</span></div>
      </div>
    </div>
    <!-- /container -->
  </div>
  <!-- /bg_gray -->
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import {
    getNextMonth,
    getNextHours,
  } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-reserve-service',

    data: () => ({
      selectedDate: null,
      selectedTime: null,
    }),

    computed: {
      ...mapGetters({
        getServiceById: 'getServiceById',
      }),
      getDays(): any[] {
        return getNextMonth();
      },
      getHours(): any[] {
        const { prices } = this.getServiceById;
        const { date } = this.selectedDate as any;
        return prices ? getNextHours(prices, date) : [];
      },
    },

    mounted() {
      (window as any).initDayCarousel();
    },

    created() {
      const [day] = this.getDays;
      this.selectedDate = day;
    },

    methods: {
      selectDate(item: any) {
        this.selectedDate = item;
      },
      selectTime(item: any) {
        this.selectedTime = item;
      },
    },
  });
</script>
