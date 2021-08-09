/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { GiftCard } from '@/interfaces/GiftCards';
import { api } from '@/services/api';
import instance from '@/main';
import { nanoid } from 'nanoid';

const dispatchToast = (
  { title, message, intent }: {
    title: string;
    message: string;
    intent: string;
  },
) => {
  (instance as any).$toasts.toast({
    id: nanoid(),
    intent,
    title,
    message,
  });
};

export interface State extends ModuleState {
  isFetching: boolean;
  giftCard: GiftCard;
  giftCards: GiftCard[];
  paymentSetup: any;
  selectedGiftCard: any;
  selectedGiftCardSummary: any;
  paymentStatus: any;
  giftCardHistory: any;
  creditEaseHistory: any;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    giftCard: {} as GiftCard,
    giftCards: [],
    paymentSetup: {},
    selectedGiftCard: {},
    selectedGiftCardSummary: {},
    paymentStatus: {},
    giftCardHistory: [],
    creditEaseHistory: [],
  }) as State,

  actions: {
    async createGiftCard({ state }, form) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/virtual_gift_cards', {
          gift_card: {
            ...form,
          },
        });
        Vue.set(state, 'selectedGiftCard', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchGiftCardSummary({ state }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/users/virtual_gift_cards/${id}/summary`);
        Vue.set(state, 'selectedGiftCardSummary', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async onGiftCardPay({ state, rootState }) {
      const cardId = state.selectedGiftCard.id;
      const selectedPaymentCard = rootState.cards.selectedCard;

      if (!selectedPaymentCard) {
        dispatchToast({
          title: 'Eroare',
          message: 'Te rugam sa selectezi metoda de plata',
          intent: 'warning',
        });
        return;
      }

      Vue.set(state, 'isFetching', true);

      try {
        const { data } = await api.create(`/users/virtual_gift_cards/${cardId}/checkout`, {
          payment_type: selectedPaymentCard.token_id ? 'token' : 'card',
          payment_method_id: selectedPaymentCard.token_id
            ? selectedPaymentCard.token_id
            : selectedPaymentCard.payment_method_id,
        });
        Vue.set(state, 'paymentStatus', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async setGiftCard({ state }, card) {
      Vue.set(state, 'giftCard', card);
    },
    async fetchGiftCardPaymentSetup({ state }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/virtual_gift_cards/payment_setup');
        Vue.set(state, 'paymentSetup', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchGiftCards({ state }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/virtual_gift_cards');
        Vue.set(state, 'giftCards', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchGiftCardsOrderHistory({ state }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/user_gift_cards');
        Vue.set(state, 'giftCardHistory', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchCreditOrderHistory({ state }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/user/ease_credit_history');
        Vue.set(state, 'creditEaseHistory', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async applyGiftCard({ state }, code) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/user/apply_gift_card', {
          promo_code: code,
        });
      } catch {
        (instance as any).$toasts.toast({
          id: nanoid(),
          intent: 'error',
          title: 'Atentie!',
          message: 'Cod validare incorect! Incearca din nou sau ia legatura cu noi sa te ajutam!',
        });
      }
      finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getGiftCard: state => state.giftCard,
    getGiftCards: state => state.giftCards,
    getPaymentSetup: state => state.paymentSetup,
    getPaymentStatus: state => state.paymentStatus,
    getSelectedGiftCard: state => state.selectedGiftCard,
    getSelectedGiftCardSummary: state => state.selectedGiftCardSummary,
    getGiftCardsHistory: state => state.giftCardHistory,
    getCreditEaseHistory: state => state.creditEaseHistory,
  } as GetterTree<State, RootState>,

  mutations: {
  } as MutationTree<State>,
};
