<template>
  <div class="content">
    <div class="es_gift-card-summary-page container margin_30_20">
      <a class="back-button" href="" @click.prevent="$router.push(`/carduri-cadou/${$router.currentRoute.params.id}`)">
        {{ $t('generic.back') }}
      </a>
      <div class="row">
        <div class="col-lg-6 col-md-6 pt-2 p-4">
          <div class="row">
            <div class="col-md-12">
              <div class="box_order">
                <div class="main custom-gift-container">
                  <img :src="getSelectedGiftCard.card_design.absolute_image_url" width="100%">
                  <div class="d-flex flex-inline mt-4">
                    <h6 class="mr-5 mb-0">{{ $t('generic.total') }}</h6>
                    <h6>{{ getSelectedGiftCard.value }} {{ $t('generic.lei') }}</h6>
                  </div>
                  <div class="d-flex flex-inline mt-4">
                    <h6 class="mr-5 mb-0">{{ $t('generic.from') }}</h6>
                    <p class="mb-0">{{ getSelectedGiftCard.from_name }}</p>
                  </div>

                  <div class="d-flex flex-inline mt-4">
                    <h6 class="mr-4">{{ $t('generic.sent') }}</h6>
                    <p class="mb-0">{{ getDate }}</p>
                  </div>

                  <div class="d-flex flex-inline mt-4">
                    <h6 class="mr-4">{{ $t('generic.for') }}</h6>
                    <div class="d-flex flex-column">
                      <p class="mb-0">{{ getSelectedGiftCard.name }}</p>
                      <p class="mb-0">{{ getSelectedGiftCard.email }}</p>
                    </div>
                  </div>

                  <div v-if="!!getSelectedGiftCard.message">
                    <div class="d-flex flex-inline mt-4">
                      <h6 class="mr-4">{{ $t('generic.message') }}</h6>
                      <p class="mb-0">{{ getSelectedGiftCard.message }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <small>{{ $t('views.giftcards.giftcard_summary_info', { ammount: getSelectedGiftCard.value, email: getSelectedGiftCard.email, date: getDate, total: getSelectedGiftCard.value }) }}</small><br>
            <small>{{ $t('views.giftcards.giftcard_summary_info2') }}</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 pt-2 p-4">
          <div v-if="isPaymentConfirmed" class="d-flex flex-column align-items-center box_order">
            <div class="main">
              <div class="title d-flex flex-column align-items-center">
                <figure>
                  <img
                    src="@/assets/svg/succes.svg"
                    alt=""
                    class="lazy"
                  >
                </figure>
                <h3 class="px-10 text-center">{{ $t('generic.order_was_sent') }}</h3>
              </div>
              <p class="text-center">Comanda Nr. {{ getSelectedGiftCard.gift_card_id }}</p>
              <p class="my-6 px-8 text-center">{{ getSelectedGiftCard.name }} va primi in data de {{ getDate }} un email cu un card cadou in valoare de {{ getSelectedGiftCard.value }} Lei.</p>
            </div>
          </div>
          <div v-else>
            <div class="box_order">
              <div class="head">
                <h3 class="">{{ $t('generic.order_sum') }}</h3>
              </div>
              <div class="main">
                <es-payment-details />
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-sm btn-pink btn-pill mt-4 px-6"
                @click.prevent="onPay()"
              >
                {{ $t('generic.send_order') }}
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
