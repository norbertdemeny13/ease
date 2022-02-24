<template>
  <div class="es_reserve-service-container">
    <div class="container margin_30_40">
      <router-link class="back-button mb-2" :to="getToRoute">{{ $t('generic.back') }}</router-link>
      <es-reserve-service-skeleton v-if="isFetching" />
      <div v-else class="row mt-4">
        <div class="col-lg-6 col-md-6 mb-4">
          <div class="box_order">
            <div class="head">
              <h3 class="text-center">{{ $t('calendar.title') }}</h3>
            </div>
            <div class="main">
              <div class="date-container col-12 owl-carousel owl-theme categories_carousel_in">
                <div
                  v-for="day in getDays"
                  :key="day.id"
                  :class="`day-item ${day.disabled ? 'disabled' : ''}`"
                  @click="day.disabled ? '' : selectDate(day)"
                >
                  <p class="day">{{ day.value }}</p>
                  <p class="day-string">{{ day.name }}</p>
                  <span v-if="day.id === selectedDate.id"><em /></span>
                </div>
              </div>
              <div class="hour-container my-2">
                <div
                  v-for="item in getHours"
                  :key="item.id"
                  :class="`hour-item m-2 ${selectedTime && selectedTime.id === item.id ? 'selected': ''} ${item.disabled ? 'disabled' : ''}`"
                  @click="selectTime(item)"
                >
                  <p class="time  mb-0">{{ item.time }}</p>
                  <p class="price mb-0">{{ item.price }} Lei</p>
                </div>
              </div>
            </div>
            <div v-if="!getHours.length" class="p-2">
              <img src="@/assets/svg/no-time.svg" width="40" height="40">
              <p>{{ $t('calendar.elite_unavailable') }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <es-service-summary
            :date="selectedDate"
            :time="selectedTime"
            :show-total="false"
          />
          <div class="d-flex justify-content-end">
            <button
              :disabled="!selectedTime"
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              @click.prevent="onContinue"
            >
              {{ $t('generic.continue') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { nanoid } from 'nanoid';
  import { getMonthDays } from '@/utils/date-helpers';
  import { ServiceSummary } from '@/components/shared/service-summary';
  import ReserveServiceSkeleton from './ReserveServiceSkeleton.vue';

  export default Vue.extend({
    name: 'es-reserve-service',

    components: {
      'es-service-summary': ServiceSummary,
      'es-reserve-service-skeleton': ReserveServiceSkeleton,
    },

    data: () => ({
      selectedDate: null,
      selectedTime: null,
      getDays: [],
    }),

    computed: {
      ...mapGetters({
        getServiceById: 'services/getServiceById',
        getSelectedServices: 'services/getSelectedServices',
        getReservationDetails: 'services/getReservationDetails',
        isAuthenticated: 'session/isAuthenticated',
        isFetching: 'services/isFetching',
      }),
      getHours() {
        const hours = this.getReservationDetails?.reservation_calendar || [];
        return hours
          .map(item => ({ ...item, id: nanoid() }))
          .filter(({ disabled }) => !disabled);
      },
      getToRoute() {
        const { id, type } = this.$router.currentRoute.params;
        const isMassageView = type === 'single' || type === 'couple';
        return isMassageView ? `/servicii/masaj?type=${type}` : `/servicii/${type}/${id}`;
      },
    },

    watch: {
      async isFetching() {
        await this.$nextTick();
        window.initDayCarousel();
        this.setTime();
      },
    },

    mounted() {
      window.initDayCarousel();
    },

    created() {
      this.setTime();
    },

    methods: {
      ...mapActions({
        addServiceReservationDate: 'services/addServiceReservationDate',
        setSelectedDate: 'services/setSelectedDate',
        setSelectedTime: 'services/setSelectedTime',
        getReservationCalendar: 'services/getReservationCalendar',
      }),
      async onContinue() {
        if (this.isAuthenticated) {
          await this.addServiceReservationDate();
          const path = `${this.$router.currentRoute.fullPath}/plata`;
          this.$router.push(path);
        } else {
          this.$root.$emit('on-show-login');
        }
      },
      async selectDate(item) {
        this.setSelectedDate(item);
        this.selectedDate = item;
        await this.getReservationCalendar();
        const [hour] = this.getHours;
        this.setSelectedTime(hour);
        this.selectedTime = hour;
        window.initDayCarousel();
      },
      selectTime(item) {
        this.setSelectedTime(item);
        this.selectedTime = item;
      },
      setTime() {
        const reservationDates = this.getReservationDetails?.reservation_dates || [];
        const days = getMonthDays(reservationDates);
        const [day] = days;
        const [hour] = this.getHours;

        this.getDays = days;
        this.setSelectedDate(day);
        this.selectedDate = day;
        this.setSelectedTime(hour);
        this.selectedTime = hour;
      },
    },
  });
</script>

<style type="text/css" scoped>
  .disabled {
    color: #acacac;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
