<template>
  <div class="ml-2 box_order">
    <div class="head">
      <h3>DETALII REZERVARE</h3>
    </div>
    <div class="main">
      <ul>
        <li>Data<span>{{ getDate }}</span></li>
        <li>Ora<span>{{ getHour }}</span></li>
      </ul>
      <ul>
        <li v-if="isCoupleMassage" class="d-flex justify-content-between">
          <strong>Masaj Cuplu, {{ selectedReservation.reservation_service.massage_one.service.duration }} min</strong><span>{{ `${selectedReservation.reservation_service.price} Lei` }}</span>
        </li>
        <template v-for="(service, i) in reservationServices">
          <li v-if="reservationServices.length > 1" :key="i">Serviciu {{ i + 1 }}</li>
          <li :key="`${service.id}-summary`" class="d-flex justify-content-between">
            <strong>{{ service.name }}</strong><span v-if="!isCoupleMassage">{{ `${service.price} Lei` }}</span>
          </li>
          <li v-for="complementaryService in service.complementaryServices" :key="`${complementaryService.id}-${service.id}`" class="d-flex justify-content-between ml-4">
            <strong>{{ complementaryService.name }}</strong> <span>{{ `${complementaryService.price} Lei` }}</span>
          </li>
          <li v-if="service.therapeuticForm && parseInt(service.therapeuticForm.price, 10) > 0" :key="service.therapeuticForm.id" class="d-flex justify-content-between ml-4">
            <strong>{{ service.therapeuticForm.name }}</strong> <span>{{ `${service.therapeuticForm.price} Lei` }}</span>
          </li>
        </template>
        <es-divider />
        <li class="d-flex justify-content-between"><strong>Subtotal</strong> {{ `${selectedReservation.total} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.ease_credit_used, 10) > 0" class="d-flex justify-content-between"><strong>Credit Used</strong> - {{ `${selectedReservation.ease_credit_used} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.subscription_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount abonament</strong> - {{ `${selectedReservation.subscription_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.promo_code_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount promo cod</strong> - {{ `${selectedReservation.promo_code_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.gift_card_discount, 10) > 0" class="d-flex justify-content-between"><strong>Discount card cadou</strong> - {{ `${selectedReservation.gift_card_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.subscription_service_discount, 10) > 0" class="d-flex justify-content-between"><strong>Abonament discount</strong> - {{ `${selectedReservation.subscription_service_discount} Lei` }}</li>
        <li class="total d-flex justify-content-between"><strong>Total</strong> {{ `${selectedReservation.to_pay} Lei` }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { getZonedDate, getHourPrice } from '@/utils/date-helpers';
  import { mapActions, mapGetters } from 'vuex';
  import { getZonedDateTime, getDifferenceInMinutes } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-reservation-summary',

    props: {
      date: {
        type: Object,
        required: true,
      },

      time: {
        type: Object,
        required: true,
      },
    },

    data: () => ({
      hourPrice: 0,
      selectedReservation: null,
    }),

    computed: {
      ...mapGetters({
        getReservationDetails: 'services/getReservationDetails',
      }),
      getDate() {
        const currentDate = this.date?.date;
        return currentDate
          ? getZonedDate(currentDate)
          : '';
      },
      getHour() {
        const { time } = this.time;
        return time;
      },
      isCoupleMassage() {
        return this.selectedReservation.reservation_service_type.includes('CoupleMassageReservation');
      },
      reservationServices() {
        const reservationType = this.selectedReservation.reservation_service_type;
        const reservationService = this.selectedReservation.reservation_service;

        if (reservationType === 'BeautyReservation') {
          const beautyService = reservationService.beauty_service_reservations;
          const formattedService = beautyService.map(item => ({ 
            name: item.service.name,
            price: item.price,
            id: item.id,
            complementaryServices: item.complementary_services
              .map(complementaryItem => ({ name: complementaryItem.complementary_service.name, price: complementaryItem.price, id: complementaryItem.id })),
          }));
          return formattedService;
        } else if (reservationType === 'CoupleMassageReservation') {
          const massageOne = {
            name: reservationService.massage_one.service.name,
            price: reservationService.massage_one.price,
            id: reservationService.massage_one.id,
            complementaryServices: reservationService.massage_one.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
          };
          const massageTwo = {
            name: reservationService.massage_two.service.name,
            price: reservationService.massage_two.price,
            id: reservationService.massage_two.id,
            complementaryServices: reservationService.massage_two.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
          };
          return [massageOne, massageTwo];
        } else if (reservationType === 'MassageReservation') {
          const message = {
            name: reservationService.service.name,
            price: reservationService.price,
            id: reservationService.id,
            complementaryServices: reservationService.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
            therapeuticForm: reservationService.therapeutic_form,
          };
          return [message];
        } else if (reservationType === 'FitnessReservation') {
          const formattedService = { 
            name: reservationService.service.name,
            price: reservationService.price,
            id: reservationService.id,
          };
          console.log('fasz', formattedService);
          return [formattedService];
        }
        return reservationService;
      },
    },

    created() {
      console.log(this.getReservationDetails, 'fasz');
      this.selectedReservation = this.getReservationDetails;
    },
  });
</script>

<style type="text/css">
  ul.summary_list {
    list-style: none;
    margin: 15px 0 25px 0;
    padding: 0;
  }

  ul.summary_list li {
    margin-bottom: 5px;
  }

  ul.summary_list li strong {
    display: inline-block;
    width: 150px;
  }

  @media (max-width: 767px) {
    ul.summary_list li strong {
      /* For less than 767px */
      display: block;
      width: auto;
    }
  }
</style>
