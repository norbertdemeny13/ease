<!-- eslint-disable -->
<template>
  <div class="es_payment-details-container">
    <div v-show="!showAddPayment">
      <h5>Metoda de plata</h5>
      <div v-if="!!getCards.length">
        <p>Selecteaza metoda de plata</p>
        <div class="row mb-4">
          <div class="col-6">
            <div class="my-2 form-group">
              <div class="custom_select submit">
                <select name="credit-card" id="credit-card" class="form-control wide" v-model="selectedCard">
                  <option
                    v-for="card in getCards"
                    :key="card.id"
                    :value="card.id"
                  >
                    &#128179 &#10240 {{ card.brand.toUpperCase() }} **** {{ card.last4 }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="" class="mt-4" @click.prevent="addPayment()">
        <i class="icon_plus" />
        Adauga metoda de plata
      </a>
    </div>
    <div v-show="showAddPayment">
      <h5>Te rugam sa introduci datele</h5>
      <es-payment
        class="mt-4"
        :is-fetching="isFetching"
        @on-add-card="onAddCard"
        @on-cancel="showAddPayment = false"
        :is-authenticated="!!isAuthenticated"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { nanoid } from 'nanoid';
  import { Payment } from '@/components/shared/payment';

  export default Vue.extend({
    name: 'es-payment-detail-view',

    components: {
      'es-payment': Payment,
    },

    data: () => ({
      showAddPayment: false,
      selectedCard: null,
      isSubscriptionActivated: false,
    }),

    computed: {
      ...mapGetters({
        getSelectedSubscription: 'subscriptions/getSelectedSubscription',
        getErrors: 'subscriptions/getErrors',
        getCards: 'cards/getCards',
        isAuthenticated: 'session/isAuthenticated',
        isFetching: 'cards/isFetching',
      }),
    },

    watch: {
      getCards(newVal) {
        if (newVal && newVal.length) {
          const [selectedCard] = newVal.filter((item: any) => item.primary);
          this.selectedCard = selectedCard ? selectedCard.id : newVal[0].id;
        }
      },
      getErrors(newVal) {
        if (newVal.length) {
          newVal.forEach((error: any) => {
            (this as any).$toasts.toasts.push({
              title: 'Atentie!',
              intent: error.status === 400 ? 'error' : 'warning',
              message: error.data.error,
              id: nanoid(),
            });
          });
        }
      },
    },

    created() {
      if (this.isAuthenticated) {
        this.fetchCards();
      }
    },

    destroyed() {
      (window as any).destroyCustomSelect();
      this.removeStripeCards();
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
        removeStripeCards: 'cards/removeStripeCards',
        addCard: 'cards/addCard',
      }),

      async onAddCard() {
        if (this.isAuthenticated) {
          await this.fetchCards();
        }
        this.showAddPayment = false;
      },

      addPayment() {
        if (this.isAuthenticated) {
          this.addCard();
        }
        this.showAddPayment = true;
      },
    },
  });
</script>
