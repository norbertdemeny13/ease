<template>
  <div class="ml-2 box_order">
    <div class="head">
      <h3>{{ $t('lbl_reservation_summary') }}</h3>
    </div>
    <div class="main">
      <ul>
        <li>{{ $t('generic.date') }}<span>{{ getDate }}</span></li>
        <li>{{ $t('generic.hour') }}<span>{{ getHour }}</span></li>
      </ul>
      <ul>
        <li v-if="isCoupleMassage" class="d-flex justify-content-between">
          <strong>{{ $t('generic.couple_massage') }} {{ selectedReservation.reservation_service.massage_one.service.duration }} min</strong><span>{{ `${selectedReservation.reservation_service.price} Lei` }}</span>
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
        <li class="d-flex justify-content-between"><strong>{{ $t('bookings.details.subTotal') }}</strong> {{ `${selectedReservation.total} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.subscription_service_discount, 10) > 0" class="d-flex justify-content-between"><strong>Numele abonamentului activ</strong> - {{ `${selectedReservation.subscription_service_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.subscription_discount, 10) > 0" class="d-flex justify-content-between"><strong> {{ $t('summary.subscriptionDiscount') }}</strong> - {{ `${selectedReservation.subscription_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.promo_code_discount, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('summary.promo_code') }}</strong> - {{ `${selectedReservation.promo_code_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.gift_card_discount, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('summary.easeCredit') }}</strong> - {{ `${selectedReservation.gift_card_discount} Lei` }}</li>
        <li v-if="parseInt(selectedReservation.ease_credit_used, 10) > 0" class="d-flex justify-content-between"><strong>{{ $t('summary.easeCredit') }}</strong> - {{ `${selectedReservation.ease_credit_used} Lei` }}</li>
        <li class="total d-flex justify-content-between"><strong>{{ $t('summary.total') }}</strong> {{ `${selectedReservation.to_pay} Lei` }}</li>
        <es-divider v-if="!isReservationConfirmed" />
        <div v-if="!isReservationConfirmed" class="promo-code-container">
          <div class="form-group col-md-8">
            <label>{{ $t('summary.add_promo_code_or_giftcard') }}</label>
            <div class="d-flex align-items-center">
              <input
                id="promo"
                v-model="promoCode"
                type="text"
                class="form-control"
                name="promo"
              >
              <div class="ml-4">
                <a href="" class="my-4" @click.prevent="activatePromo({ promoCode })">
                  {{ $t('summary.apply') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { isEqual } from 'lodash-es';
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

      isReservationConfirmed: {
        default: false,
        type: Boolean,
      },
    },

    data: () => ({
      hourPrice: 0,
      promoCode: '',
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
          const therapeuticFormPriceOne = new Number(reservationService.massage_one.therapeutic_form.price || 0);
          const therapeuticFormPriceTwo = new Number(reservationService.massage_two.therapeutic_form.price || 0);
          const massageOne = {
            name: reservationService.massage_one.service.name,
            price: reservationService.massage_one.price,
            id: reservationService.massage_one.id,
            complementaryServices: reservationService.massage_one.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
            therapeuticForm:therapeuticFormPriceOne > 0
              ? {
                  name: reservationService.massage_one.therapeutic_form.name,
                  price: reservationService.massage_one.therapeutic_form.price,
                }
              : null,
          };
          const massageTwo = {
            name: reservationService.massage_two.service.name,
            price: reservationService.massage_two.price,
            id: reservationService.massage_two.id,
            complementaryServices: reservationService.massage_two.complementary_massages
              .map(item => ({ name: item.name, price: item.price, id: item.id })),
            therapeuticForm: therapeuticFormPriceTwo > 0 
              ? {
                  name: reservationService.massage_two.therapeutic_form.name,
                  price: reservationService.massage_two.therapeutic_form.price,
                }
              : null,
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
          return [formattedService];
        }
        return reservationService;
      },
    },

    created() {
      this.selectedReservation = this.getReservationDetails;
    },

    watch: {
      getReservationDetails(newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          this.selectedReservation = newVal;
        }
      },
    },

    methods: {
      ...mapActions({
        activatePromo: 'services/activatePromo',
      }),
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
