<!-- eslint-disable -->
<template>
  <div class="es_payment-details-container">
    <div v-show="!showAddPayment">
      <h5>{{ $t('generic.payment_method') }}</h5>
      <div v-if="!!getLocalCards.length">
        <p>{{ $t('generic.select_payment_method') }}</p>
        <div class="row mb-4">
          <div class="col-sm-12 col-md-12 col-lg-8">
            <div class="my-2 form-group">
              <div class="custom_select submit">
                <select name="credit-card" id="credit-card" class="form-control wide" v-model="getSelectedCard">
                  <option
                    v-for="card in getFilteredCards"
                    :key="card.id"
                    :value="card.id"
                  >
                    {{ getCardBrand(card.brand) }} **** {{ card.last4 }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a v-if="isAddPaymentVisible" href="" class="mt-4" @click.prevent="addPayment()">
        <i class="icon_plus" />
        {{ $t('generic.add_new_payment_method') }}
      </a>
    </div>
    <div v-show="showAddPayment">
      <h5>{{ $t('generic.add_new_payment_method') }}</h5>
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
        getStripeCards: 'cards/getStripeCards',
        isAuthenticated: 'session/isAuthenticated',
        isFetching: 'cards/isFetching',
      }),

      getLocalCards(): any {
        return this.isAuthenticated
          ? this.getFilteredCards
          : this.getStripeCards;
      },

      getSelectedCard: {
        get(): any {
          return this.selectedCard;
        },
        set(newVal: string): void {
          const card: any = this.getLocalCards.find((item: any) => item.id === newVal);
          this.setSelectedCard(card);
        },
      },

      isSubscriptionRoute(): boolean {
        return this.$router.currentRoute.name === 'Rezerva Abonamente';
      },

      isAddPaymentVisible(): boolean {
        return !this.isSubscriptionRoute
          || (this.isSubscriptionRoute && !this.getLocalCards.length);
      },

      getFilteredCards(): any {
        return this.isSubscriptionRoute
          ? this.getCards.filter((card: any) => card.primary === true)
          : this.getCards;
      },
    },

    watch: {
      getCards(newVal) {
        if (newVal && newVal.length) {
          const card = newVal[newVal.length - 1];
          this.selectedCard = card.id;
          this.setSelectedCard(card);
        }
      },
      getErrors(newVal) {
        if (newVal.length) {
          newVal.forEach((error: any) => {
            (this as any).$toasts.toasts.push({
              title: this.$t('toast.error_title'),
              intent: error.status === 400 ? 'error' : 'warning',
              message: this.$t(error.data.error),
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
        setSelectedCard: 'cards/setSelectedCard',
        removeStripeCards: 'cards/removeStripeCards',
        addCard: 'cards/addCard',
      }),

      async onAddCard(card: any) {
        if (this.isAuthenticated) {
          await this.fetchCards();
        }
        this.selectedCard = card.id;
        this.setSelectedCard(card);
        this.showAddPayment = false;
      },

      addPayment() {
        if (this.isAuthenticated) {
          this.addCard();
        }
        this.showAddPayment = true;
      },

      getCardBrand(brand: any) {
        return ['amex', 'American Express'].includes(brand) ? 'AMEX' : brand.toUpperCase();
      },
    },
  });
</script>
