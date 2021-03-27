/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { GIFT_CARD } from '@/interfaces/GiftCards';
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
  giftCard: GIFT_CARD;
  giftCards: GIFT_CARD[];
  paymentSetup: any;
  selectedGiftCard: any;
  paymentStatus: any;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    giftCard: {} as GIFT_CARD,
    giftCards: [],
    paymentSetup: {},
    selectedGiftCard: {},
    paymentStatus: {},
  }) as State,

  actions: {
    async createGiftCard({ state }, form) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/virtual_gift_cards', {
          gift_card: {
            ...form,
            from_name: form.name,
          },
        });
        Vue.set(state, 'selectedGiftCard', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async onGiftCardPay({ state, rootState }) {
      const cardId = state.selectedGiftCard.card_design.id;
      const selectedPaymentCard = rootState.cards.selectedCard;

      if (!selectedPaymentCard) {
        dispatchToast({
          title: 'Eroare',
          message: 'Te rugam sa selectezi metoda de plata',
          intent: 'warning',
        });
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
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getGiftCard: state => state.giftCard,
    getGiftCards: state => state.giftCards,
    getPaymentSetup: state => state.paymentSetup,
    getPaymentStatus: state => state.paymentStatus,
    getSelectedGiftCard: state => state.selectedGiftCard,
  } as GetterTree<State, RootState>,

  mutations: {

  } as MutationTree<State>,
};
