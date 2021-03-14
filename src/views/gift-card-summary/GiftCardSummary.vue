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
              <img src="@/assets/jpg/Birthday-Gift-Card.jpg" width="100%">
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
                <p class="mb-0">13.03.2021</p>
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
            <small>De pe cardul tau va fi incasata suma de {{ getSelectedGiftCard.value }} Lei. Se va trimite un email la {{ getSelectedGiftCard.email }} in data de (25.05.2020) cu un voucher in valoare de ({{ getSelectedGiftCard.value }}), care poate fi valorificat in aplicatia Ease pentru IOS sau Android sau pe site-ul nostru www.ease.ro</small>
            <small>Cardurile Cadou Ease sunt nerambursabile.</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 pt-2 p-4">
          <h3 class="mb-4">Sumar Comanda</h3>
          <es-payment-details />
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-sm btn-pink btn-pill mt-4 mr-4 px-6"
              :disabled="isDisabled"
              @click.prevent="onPay()"
            >
              Trimite Comanda
            </button>
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

    components: {
      'es-payment-details': PaymentDetails,
    },

    data: () => ({
      email: null,
    }),

    computed: {
      ...mapGetters({
        getCards: 'cards/getCards',
        getSelectedGiftCard: 'giftCards/getSelectedGiftCard',
        isAuthenticated: 'session/isAuthenticated',
      }),

      isDisabled() {
        let disabled = false;
        if (this.isAuthenticated) {
          disabled = !this.getCards.length;
        }
        return disabled || !this.email;
      }
    },

    methods: {
      onPay() {
        this.$root.$emit('on-create-payment');
      },
    },
  });
</script>
