<template>
  <div class="es_reserve-service-container">
    <div class="container margin_30_40">
      <router-link class="back-button mb-2" :to="getToRoute()">Inapoi</router-link>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-6 pt-2 p-4 bg_gray">
          <div v-if="isReservationConfirmed" class="d-flex flex-column align-items-center">
            <div class="title d-flex flex-column align-items-center">
              <figure>
                <img
                  src="@/assets/png/succes.png"
                  alt=""
                  class="lazy"
                >
              </figure>
              <h3 class="px-10 text-center">REZERVAREA  A FOST TRIMISA!</h3>
            </div>
            <p class="my-6 px-8">Vei primi in curand o notificare cu detaliile profesionistului tau. </p>
          </div>
          <div v-else>
            <es-address-details @on-show-address-modal="isAddressModalOpen = true" />
            <es-payment-details />
            <es-subscription-selection @set-active-subscription="setActiveSubscription" />
            <div class="d-flex my-4 justify-content-center">
              <button
                class="btn btn-sm btn-pink btn-pill px-6"
                :disabled="!getCards.length"
                @click.prevent="onPay()"
              >
                Trimite Rezervarea
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <es-service-summary
            :date="getSelectedDate"
            :time="getSelectedTime"
            :active-subscription="activeSubscription"
            :is-payment-view="true"
          />
        </div>
      </div>
    </div>
    <!-- /container -->
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
  import { ServiceSummary } from '@/components/shared/service-summary';
  import { PaymentDetails } from '@/components/shared/payment';
  import { SubscriptionSelection } from '@/components/shared/subscription-selection';
  import { AddressModal } from '@/components/shared/address-modal';
  import { AddressDetails } from '@/components/shared/address-details';

  export default Vue.extend({
    name: 'es-reserve-service-payment',

    components: {
      'es-address-details': AddressDetails,
      'es-address-modal': AddressModal,
      'es-service-summary': ServiceSummary,
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
        getReservationDetails: 'services/getReservationDetails',
        getServiceById: 'services/getServiceById',
        getSelectedTime: 'services/getSelectedTime',
        getSelectedDate: 'services/getSelectedDate',
        isAuthenticated: 'session/isAuthenticated',
      }),
    },

    watch: {
      async getAddresses(newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          await this.createReservation();
          await this.createExtraServiceReservation();
        }
      },

      getReservationDetails(newVal) {
        if (newVal.status === 'waiting_confirmation') {
          this.isReservationConfirmed = true;
        }
      },
    },

    async created() {
      const { type } = this.$router.currentRoute.params;
      this.isMassageView = type === 'single' || type === 'couple';
      await this.fetchAddresses();
      if (this.getAddresses.length > 0) {
        await this.createReservation();
        await this.createExtraServiceReservation();
      }
    },

    methods: {
      ...mapActions({
        payServiceReservation: 'services/payServiceReservation',
        fetchAddresses: 'address/fetchAddresses',
        createReservation: 'services/createReservation',
        createExtraServiceReservation: 'services/createExtraServiceReservation',
      }),

      getToRoute() {
        const { id, type } = this.$router.currentRoute.params;
        return this.isMassageView ? `/servicii/masaj?type=${type}` : `/servicii/${type}/${id}/rezerva`;
      },

      onPay() {
        if (!this.getAddresses.length) {
          this.isAddressModalOpen = true;
          this.$toasts.toast({
            id: 'address-toast',
            title: 'Action required',
            message: 'Te rugam sa introduci adresa pentru a continua reservarea.',
          });
          return;
        }
        this.payServiceReservation();
      },

      setActiveSubscription(subscription) {
        this.activeSubscription = subscription;
      },
    },
  });
</script>
