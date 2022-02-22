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
            <div class="card-number" v-html="getCardInfo(card)" />
            <div :class="`d-flex flex-row align-items-center justify-content-${card.primary ? 'between' : 'end'} mt-2`">
              <div v-if="card.primary">
                <span class="icon_check_alt" />
                <span class="ml-2">{{ $t('generic.main_card') }}</span>
              </div>
              <a href="" class="mr-2" @click.prevent.stop="onRemove(card)">
                <i class="icon_trash_alt" />
                {{ $t('generic.delete') }}
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
    <es-confirm-modal v-model="isConfirmModalOpen" @on-confirm="onContinue()">
      <template slot="title">{{ getConfirmationModalTitle }}</template>
      <template slot="message">
        <span v-html="getConfirmationModalMessage" />
      </template>
    </es-confirm-modal>
    <es-credit-card-modal v-if="isCreditCardModalOpen" v-model="isCreditCardModalOpen" />
  </div>
</template>

<script lang="ts">
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
      modalMessage: '',
      method: '',
    }),

    computed: {
      ...mapGetters({ getCards: 'cards/getCards' }),

      getConfirmationModalTitle(): string {
        return this.modalTitle;
      },

      getConfirmationModalMessage(): string {
        return this.modalMessage;
      },
    },

    watch: {
      isConfirmModalOpen(newVal) {
        if (!newVal) {
          this.fetchCards();
          if (this.method === 'remove' && this.getCards.length > 0) {
            (this as any).$toasts.toast({
              id: 'remove-card',
              title: this.$t('toast.success_title'),
              message: this.$t('toast.remove_card'),
              intent: 'success',
            });
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
    },

    methods: {
      ...mapActions({
        fetchCards: 'cards/fetchCards',
        setDefaultCard: 'cards/setDefaultCard',
        removeCard: 'cards/removeCard',
        addCard: 'cards/addCard',
      }),

      getCardInfo(card: any): string {
        return `&#128179; ${card.brand && card.brand.toUpperCase()} **** ${card.last4} (exp: ${card.exp_month}/${card.exp_year})`;
      },

      addPayment() {
        this.addCard();
        this.isCreditCardModalOpen = true;
      },

      onSelect(card: any): void {
        if (card.main) {
          return;
        }

        this.method = 'select';
        this.selectedCard = card;
        this.modalTitle = this.$t('views.client_dashboard.payment_methods.change_default_card_title').toString();
        this.modalMessage = `${this.$t('generic.set_question').toString()} ${this.getCardInfo(card)} ${this.$t('generic.set_primary_card').toString()}`;
        this.isConfirmModalOpen = true;
      },

      onRemove(card: any): void {
        this.method = 'remove';
        this.selectedCard = card;
        this.modalTitle = this.$t('views.client_dashboard.payment_methods.delete_card').toString();
        this.modalMessage = `${this.$t('generic.cards_delete').toString()} ${this.getCardInfo(card)}?`;
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

  .client-payment-card-item.active,
  .client-payment-card-item:hover {
    border: 1px solid #d00078;
  }

  .icon_check_alt {
    color: #70d7b7;
  }
</style>
