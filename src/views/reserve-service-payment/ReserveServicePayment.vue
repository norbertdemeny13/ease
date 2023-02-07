<template>
  <div class="es_reserve-service-container bg_gray">
    <div class="container margin_30_40">
      <router-link v-if="!isReservationConfirmed" class="back-button mb-2" :to="getToRoute()">Inapoi</router-link>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-6 mb-4">
          <div class="box_order">
            <div v-show="!isReservationConfirmed" class="head">
              <h3>Plata si Adresa</h3>
            </div>
            <div v-if="isReservationConfirmed" class="d-flex flex-column align-items-center main">
              <div class="title d-flex flex-column align-items-center">
                <figure>
                  <img
                    src="@/assets/svg/succes.svg"
                    alt=""
                    width="75px"
                    class="lazy"
                  >
                </figure>
                <h3 class="px-10 text-center">{{ $t('reservation_sent_successfully') }}</h3>
              </div>
              <p class="my-6 px-8 text-center">{{ $t('reservation_sent_successfully_text') }} </p>
              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                  @click.prevent="$router.push('/client/rezervarile-mele')"
                >
                  {{ $t('generic.my_reservations') }}
                </button>
              </div>
            </div>
            <div v-else>
              <div v-if="!getCards.length" class="alert alert-danger" role="alert">
                <span>{{ $t('generic.please_add_a_payment_method') }}</span>
              </div>
              <div class="">
                <div class="main">
                  <es-address-details @on-show-address-modal="isAddressModalOpen = true" />
                  <es-payment-details />
                </div>
              </div>
            </div>
          </div>
          <div v-show="!isReservationConfirmed" class="mt-4 mb-4 box_order">
            <es-subscription-selection @set-active-subscription="setActiveSubscription" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <es-reservation-summary
            :date="getSelectedDate"
            :time="getSelectedTime"
            :is-reservation-confirmed="isReservationConfirmed"
            :elite-id="getReservationDetails.target_elite_id"
          />
          <div v-if="!isReservationConfirmed" class="d-flex my-4 justify-content-end">
            <button
              class="btn btn-sm btn-pink btn-pill px-6"
              :disabled="!getCards.length"
              @click.prevent="onPay()"
            >
              {{ $t('summary.sendReservation') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
      :is-massage-view="isMassageView"
    />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { ReservationSummary } from '@/components/shared/reservation-summary';
  import { PaymentDetails } from '@/components/shared/payment';
  import { SubscriptionSelection } from '@/components/shared/subscription-selection';
  import { AddressModal } from '@/components/shared/address-modal';
  import { AddressDetails } from '@/components/shared/address-details';

  export default Vue.extend({
    name: 'es-reserve-service-payment',

    components: {
      'es-address-details': AddressDetails,
      'es-address-modal': AddressModal,
      'es-reservation-summary': ReservationSummary,
      'es-payment-details': PaymentDetails,
      'es-subscription-selection': SubscriptionSelection,
    },

    data: () => ({
      activeSubscription: null,
      isAddressModalOpen: false,
      isMassageView: null,
      isReservationConfirmed: false,
    }),

    computed: {
      ...mapGetters({
        getAddresses: 'address/getAddresses',
        getCards: 'cards/getCards',
        getSelectedCard: 'cards/getSelectedCard',
        getReservationDetails: 'services/getReservationDetails',
        getServiceById: 'services/getServiceById',
        getSelectedTime: 'services/getSelectedTime',
        getSelectedDate: 'services/getSelectedDate',
        isAuthenticated: 'session/isAuthenticated',
      }),
    },

    watch: {
      getReservationDetails(newVal) {
        if (newVal.status === 'waiting_confirmation') {
          this.isReservationConfirmed = true;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      },
    },

    async created() {
      const { type } = this.$router.currentRoute.params;
      this.isMassageView = type === 'single' || type === 'couple';
      await this.fetchAddresses();
    },

    methods: {
      ...mapActions({
        payServiceReservation: 'services/payServiceReservation',
        fetchCards: 'cards/fetchCards',
        fetchAddresses: 'address/fetchAddresses',
        createReservation: 'services/createReservation',
        createExtraServiceReservation: 'services/createExtraServiceReservation',
      }),

      getToRoute() {
        const { id, type } = this.$router.currentRoute.params;
        return `/servicii/${type}/${id}/rezerva`;
      },

      async onPay() {
        const paymentMethodId = this.getSelectedCard.payment_method_id;

        if (!this.getAddresses.length) {
          this.isAddressModalOpen = true;
          this.$toasts.toast({
            id: 'address-toast',
            title: this.$t('toast.warning_title'),
            message: this.$t('toast.no_address'),
          });
          return;
        }

        if (!this.getReservationDetails) {
          await this.createReservation();
          await this.createExtraServiceReservation();
        }

        if (!paymentMethodId) {
          await this.fetchCards();
        }
        this.payServiceReservation();
      },

      setActiveSubscription(subscription) {
        this.activeSubscription = subscription;
      },
    },
  });
</script>
