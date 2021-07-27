<template>
  <div class="content">
    <div class="es_gift-card-summary-page container margin_30_20">
      <a class="back-button" href="" @click.prevent="$router.push(`/carduri-cadou/${$router.currentRoute.params.id}`)">
        Inapoi
      </a>
      <div class="row">
        <div class="col-lg-6 col-md-6 pt-2 p-4 bg_gray">
          <div class="row mt-6">
            <div class="col-md-7">
              <img :src="getSelectedGiftCard.card_design.absolute_image_url" width="100%">
              <div class="d-flex flex-inline justify-content-between mt-4">
                <h6>Total</h6>
                <h6>{{ getSelectedGiftCard.value }} Ron</h6>
              </div>
              <div class="d-flex flex-inline mt-4">
                <h6 class="mr-5 mb-0">De la</h6>
                <p class="mb-0">{{ getSelectedGiftCard.from_name }}</p>
              </div>

              <div class="d-flex flex-inline mt-4">
                <h6 class="mr-4">Trimis</h6>
                <p class="mb-0">{{ getDate }}</p>
              </div>

              <div class="d-flex flex-inline mt-4">
                <h6 class="mr-4">Pentru</h6>
                <div class="d-flex flex-column">
                  <p class="mb-0">{{ getSelectedGiftCard.name }}</p>
                  <p class="mb-0">{{ getSelectedGiftCard.email }}</p>
                </div>
              </div>

              <div v-if="!!getSelectedGiftCard.message">
                <div class="d-flex flex-inline mt-4">
                  <h6 class="mr-4">Mesaj</h6>
                  <p class="mb-0">{{ getSelectedGiftCard.message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <small>De pe cardul tau va fi incasata suma de {{ getSelectedGiftCard.value }} Lei. Se va trimite un email la {{ getSelectedGiftCard.email }} in data de {{ getDate }} cu un voucher in valoare de {{ getSelectedGiftCard.value }} Ron, care poate fi valorificat in aplicatia Ease pentru IOS sau Android sau pe site-ul nostru www.ease.ro</small>
            <small>Cardurile Cadou Ease sunt nerambursabile.</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 pt-2 p-4">
          <div v-if="isPaymentConfirmed" class="d-flex flex-column align-items-center">
            <div class="title d-flex flex-column align-items-center">
              <figure>
                <img
                  src="@/assets/png/succes.png"
                  alt=""
                  class="lazy"
                >
              </figure>
              <h3 class="px-10 text-center">COMANDA A FOST TRIMISA!</h3>
            </div>
            <p>Comanda Nr. {{ getSelectedGiftCard.gift_card_id }}</p>
            <p class="my-6 px-8">{{ getSelectedGiftCard.name }} va primi in data de {{ getDate }} un email cu un card cadou in valoare de {{ getSelectedGiftCard.value }} Ron.</p>
          </div>
          <div v-else>
            <h3 class="mb-4">Sumar Comanda</h3>
            <es-payment-details />
            <div class="d-flex justify-content-center">
              <button
                class="btn btn-sm btn-pink btn-pill mt-4 mr-4 px-6"
                @click.prevent="onPay()"
              >
                Trimite Comanda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { PaymentDetails } from '@/components/shared/payment';

  export default Vue.extend({
    name: 'es-gift-card-summary',

    data: () => ({
      isPaymentConfirmed: false,
      polling: null,
    }),

    components: {
      'es-payment-details': PaymentDetails,
    },

    computed: {
      ...mapGetters({
        getSelectedGiftCard: 'giftCards/getSelectedGiftCard',
        getSelectedGiftCardSummary: 'giftCards/getSelectedGiftCardSummary',
        getPaymentStatus: 'giftCards/getPaymentStatus',
        isAuthenticated: 'session/isAuthenticated',
      }),
      getDate() {
        const date = this.getSelectedGiftCard.send_at;
        return new Date(date).toISOString().substr(0, 10);
      },
    },

    watch: {
      getSelectedGiftCardSummary(newVal) {
        if (newVal.status === 'succeeded') {
          this.isPaymentConfirmed = true;
          clearInterval(this.polling);
        }
      },
      getPaymentStatus(newVal) {
        if (newVal.payment) {
          this.isPaymentConfirmed = true;
        } else {
          this.polling = setInterval(this.fetchGiftCardSummary(this.getSelectedGiftCard.id), 5000);
        }
      },
    },

    methods: {
      ...mapActions({
        onGiftCardPay: 'giftCards/onGiftCardPay',
        fetchGiftCardSummary: 'giftCards/fetchGiftCardSummary',
      }),
      onPay() {
        this.onGiftCardPay();
      },
    },
  });
</script>
