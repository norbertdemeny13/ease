<template>
  <div class="es_client-payments-container content">
    <h2>{{ $t('generic.cards') }}</h2>
    <div class="row">
      <div class="col-md-8">
        <div v-if="getCards.length">
          <div
            v-for="card in getCards"
            :key="card.id"
            :class="`${card.primary ? 'active' : ''} client-payment-card-item`"
            @click.prevent="onSelect(card)"
          >
            <div class="d-flex align-items-center">
              <img
                :src="getImagePath(card.brand)"
                :alt="card.brand"
                width="30"
                height="30"
                class="lazy ml-n1 mr-1"
              >
              <div class="card-number" v-html="getCardInfo(card)" />
            </div>
            <div :class="`d-flex flex-row align-items-center justify-content-${card.primary ? 'between' : 'end'} mt-2`">
              <div v-if="card.primary">
                <span class="icon_check_alt" />
                <span class="ml-2">{{ $t('generic.main_card') }}</span>
              </div>
              <a href="" class="mr-2" @click.prevent.stop="onRemove(card)">
                <i class="icon_trash_alt" />
              </a>
            </div>
          </div>
        </div>
        <div v-else class="d-flex align-items-center justify-content-between my-2 mx-4">
          <h4>{{ $t('views.client_dashboard.payment_methods.description') }}</h4>
        </div>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click.prevent="addPayment()"
          >
            {{ $t('views.client_dashboard.payment_methods.add') }}
          </button>
        </div>
      </div>
    </div>
    <es-confirm-modal
      v-model="isConfirmModalOpen"
      :confirm-cta="getConfirmationCta"
      :cancel-cta="getCancelCta"
      :has-confirm-cta="!!getConfirmationCta"
      @on-confirm="onContinue()"
    >
      <template slot="title">{{ getConfirmationModalTitle }}</template>
      <template slot="message">
        <div v-if="method === 'select'">
          <span class="mr-1">{{ $t('generic.set_question') }}</span>
          <img
            :src="getImagePath(selectedCard.brand)"
            :alt="selectedCard.brand"
            width="30"
            height="30"
            class="lazy mr-1"
          >
          <span class="mr-1">{{ selectedCard && getCardInfo(selectedCard) }}</span>
          <span>{{ $t('generic.set_primary_card') }}</span>
        </div>
        <template v-if="method === 'remove'">
          <div v-if="selectedCard.primary && isActiveSubscription">
            {{ $t('user.subscriptions_active') }}
          </div>
          <div v-else>
            <span class="mr-1">{{ $t('generic.cards_delete') }}</span>
            <img
              :src="getImagePath(selectedCard.brand)"
              :alt="selectedCard.brand"
              width="30"
              height="30"
              class="lazy mr-1"
            >
            <span>{{ selectedCard && getCardInfo(selectedCard) }}?</span>
          </div>
        </template>
      </template>
    </es-confirm-modal>
    <es-credit-card-modal
      v-if="isCreditCardModalOpen"
      v-model="isCreditCardModalOpen"
      @on-cancel="isCreditCardModalOpen = false"
    />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { CreditCardModal } from '@/components/shared/credit-card-modal';

  export default Vue.extend({
    name: 'es-client-payments',

    components: {
      'es-credit-card-modal': CreditCardModal,
    },

    data: () => ({
      isConfirmModalOpen: false,
      isCreditCardModalOpen: false,
      selectedCard: null,
      modalTitle: '',
      method: '',
    }),

    computed: {
      ...mapGetters({
        getActiveSubscription: 'subscriptions/getActiveSubscription',
        getCards: 'cards/getCards',
      }),

      isActiveSubscription() {
        return this.getActiveSubscription?.state === 'active';
      },

      getConfirmationModalTitle() {
        return this.modalTitle;
      },

      getConfirmationCta() {
        const removeCta = this.isActiveSubscription && this.selectedCard?.primary ? null : this.$t('cards.delete');
        return this.method === 'select' ? this.$t('generic.confirm_cta') : removeCta;
      },

      getCancelCta() {
        const removeCta = this.isActiveSubscription ? this.$t('form.button') : '';
        return this.method === 'select' ? this.$t('generic.cancel_cta') : removeCta;
      },
    },

    watch: {
      isConfirmModalOpen(newVal) {
        if (!newVal) {
          this.fetchCards();
          if (this.method === 'remove' && this.getCards.length > 0) {
            // (this as any).$toasts.toast({
            //   id: 'remove-card',
            //   title: this.$t('toast.success_title'),
            //   message: this.$t('toast.remove_card'),
            //   intent: 'success',
            // });
          }
        }
      },
      isCreditCardModalOpen(newVal) {
        if (!newVal) {
          this.fetchCards();
        }
      },
    },

    created() {
      this.fetchCards();
      this.fetchActiveSubscriptions();
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
        setDefaultCard: 'cards/setDefaultCard',
        removeCard: 'cards/removeCard',
        addCard: 'cards/addCard',
        fetchActiveSubscriptions: 'subscriptions/fetchActiveSubscriptions',
      }),

      getCardInfo(card) {
        const brand = ['amex', 'American Express'].includes(card.brand) ? 'AMEX' : card.brand.toUpperCase();

        return `${brand} **** ${card.last4} (exp: ${card.exp_month}/${card.exp_year})`;
      },

      getImagePath(brand) {
        const path = require.context('@/assets/svg');
        const localBrand = brand.toLowerCase();
        const svg = ['visa', 'mastercard'].includes(localBrand) ? localBrand : 'amex';
        return path(`./${svg}.svg`);
      },

      addPayment() {
        this.addCard();
        this.isCreditCardModalOpen = true;
      },

      onSelect(card) {
        if (card.primary) {
          return;
        }

        this.method = 'select';
        this.selectedCard = card;
        this.modalTitle = this.$t('views.client_dashboard.payment_methods.change_default_card_title').toString();
        this.isConfirmModalOpen = true;
      },

      onRemove(card) {
        this.method = 'remove';
        this.selectedCard = card;
        this.modalTitle = this.$t('views.client_dashboard.payment_methods.delete_card').toString();
        this.isConfirmModalOpen = true;
      },

      async onContinue() {
        if (this.method === 'select') {
          await this.setDefaultCard(this.selectedCard);
        }

        if (this.method === 'remove') {
          await this.removeCard(this.selectedCard);
        }
      },
    },
  });
</script>

<style type="text/scss">
  .client-payment-card-item {
    border: 1px solid #cccccc;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8px 0;
    padding: 16px;
  }

  .client-payment-card-item:hover {
    border: 1px solid #70d7b7;
  }

  .client-payment-card-item.active {
    border: 2px solid #70d7b7;
  }

  .icon_check_alt {
    color: #70d7b7;
  }
</style>
