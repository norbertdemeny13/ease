<!-- eslint-disable -->
<template>
  <div class="es_reserve-subscription-container">
    <div class="container margin_30_40">
      <a href="" class="back-button mb-2" @click.prevent="onBack">Inapoi</a>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-6 p-8 bg_gray">
          <h3>Detalii abonament</h3>
          <div class="main">
            <div class="d-flex justify-content-between pb-2 align-items-center flex-inline">
              <h5>{{ getSelectedSubscription.label }}</h5>
              <h6>{{ getSelectedSubscription.price.price }} Ron / {{ getSelectedSubscription.monthly ? 'Luna' : 'An' }}</h6>
            </div>
            <div class="d-flex border-top pt-4 justify-content-between align-items-center flex-inline">
              <h6>Subtotal</h6><h6>{{ getSelectedSubscription.price.price }} Ron</h6>
            </div>
            <div class="d-flex justify-content-between align-items-center flex-inline">
              <h6>Total</h6><h6>{{ getSelectedSubscription.price.price }} Ron</h6>
            </div>
            <div class="mt-4"><small>Prin apasarea butonului “Activeaza”, accepti Termenii si Conditiile noastre si Politica de Confidentialitate si activezi abonamentul Ritual masaj lunar de 60 minute. Abonamentul se reinnoieste automat in fiecare luna la data la care te-ai abonat, pana cand il anulezi. In fiecare luna se va efectua o plata automata de pe cardul tau pentru care primesti o sedinta de masaj (cu durata aleasa de tine). Poti sa anulezi abonamentul in orice moment, gratuit din aplicatie, de pe site-ul nostru ease.ro  sau apeland serviciu clienti.</small></div>
          </div>
        </div>
        <div v-if="isSubscriptionActivated" class="col-lg-6 col-md-6 p-8">
          <div class="title d-flex flex-column align-items-center">
            <figure>
              <img
                src="@/assets/png/succes.png"
                alt=""
                class="lazy"
              >
            </figure>
            <h3 class="px-10 text-center">Felicitari, abonamentul tau a fost activat!</h3>
          </div>
          <p class="my-6 px-8">Vezi mai multe detalii despre abonamentul tau pe ease.ro sau in aplicatie</p>
          <p class="px-8">Doresti mai mult de o singura sedinta de masaj pe luna?
          Ai 20% discount la toate sedintele de masaj rezervate pe langa sedinta de masaj inclusa la abonamentul tau lunar. Discountul se aplica automat la check-out</p>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-sm btn-pink btn-pill mt-4 px-6"
              @click.prevent="$router.push('/servicii')"
            >
              Rezerva acum
            </button>
          </div>
        </div>
        <div v-else class="col-lg-6 col-md-6 p-8">
          <es-address-details @on-show-address-modal="isAddressModalOpen = true" />
          <es-payment-details>
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                @click.prevent="activateSubscription()"
                :disabled="!getCards.length"
              >
                Activeaza
              </button>
            </div>
          </es-payment-details>
        </div>
      </div>
    </div>
    <!-- /container -->
    <es-address-modal
      v-if="isAddressModalOpen"
      v-model="isAddressModalOpen"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { PaymentDetails } from '@/components/shared/payment';
  import { AddressModal } from '@/components/shared/address-modal';
  import { AddressDetails } from '@/components/shared/address-details';

  export default Vue.extend({
    name: 'es-subscription-payment-view',

    components: {
      'es-address-details': AddressDetails,
      'es-address-modal': AddressModal,
      'es-payment-details': PaymentDetails,
    },

    data: () => ({
      showAddPayment: false,
      selectedCard: null,
      isSubscriptionActivated: false,
      isAddressModalOpen: false,
      polling: 0,
    }),

    computed: {
      ...mapGetters({
        getActiveSubscription: 'subscriptions/getActiveSubscription',
        getActivatedStatus: 'subscriptions/getActivatedStatus',
        getSelectedSubscription: 'subscriptions/getSelectedSubscription',
        getCards: 'cards/getCards',
        isFetching: 'cards/isFetching',
        getActivePayment: 'services/getActivePayment',
      }),
    },

    watch: {
      getActiveSubscription(newVal): void {
        if (newVal && newVal.state === 'payment_pending') {
          this.initialisePaymentCheck();
          (this as any).$toasts.toast({
            id: 'subscription-toast',
            intent: 'success',
            title: 'Felicitari!',
            message: 'Abonamentul tau este in curs de activare. Te rugam sa astepti cateva secunde pana plata va fi activata cu success.',
          });
        }
      },

      getCards(newVal): void {
        if (newVal && newVal.length) {
          const [selectedCard] = newVal.filter((item: any) => item.primary);
          this.selectedCard = selectedCard ? selectedCard.id : newVal[0].id;
        }
      },
    },

    beforeDestroy() {
      clearInterval(this.polling);
    },

    created() {
      this.fetchCards();
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
        addCard: 'cards/addCard',
        fetchActiveSubscriptions: 'subscriptions/fetchActiveSubscriptions',
        activateSubscription: 'subscriptions/activateSubscription',
      }),

      initialisePaymentCheck(): void {
        this.polling = setInterval(() => {
          this.fetchActiveSubscriptions();
        }, 3000);
      },

      getAddress(): string {
        return sessionStorage.getItem('address') as string;
      },
      onBack(): void {
        if (this.getActivePayment) {
          this.$router.back();
        } else {
          this.$router.push('/abonamente');
        }
      },
    },
  });
</script>
