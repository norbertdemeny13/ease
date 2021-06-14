/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isFetching: boolean;
  cards: [];
  selectedCard: any;
  stripeCards: [];
  publicKey: string;
  clientSecret: string;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    publicKey: '',
    clientSecret: '',
    cards: [],
    selectedCard: null,
    stripeCards: [],
  }) as State,

  actions: {
    resetCards({ state, commit }) {
      commit('setCards', []);
      Vue.set(state, 'stripeCards', []);
    },
    async fetchCards({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/cards');
        commit('setCards', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async removeCard({ state, commit }, card) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.destroy(`/users/cards/${card.id}`);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async setDefaultCard({ state, commit }, card) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.update(`/users/cards/${card.id}`);
        commit('setCards', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    setSelectedCard({ state }, card) {
      Vue.set(state, 'selectedCard', card);
    },
    setStripeCard({ state }, card) {
      state.stripeCards.push(card as never);
    },
    removeStripeCards({ state }) {
      Vue.set(state, 'stripeCards', []);
    },
    async addCard({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/cards/new');
        const { publicKey, clientSecret } = data;
        Vue.set(state, 'publicKey', publicKey);
        Vue.set(state, 'clientSecret', clientSecret);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getCards: (state) => {
      if (state.stripeCards.length > state.cards.length) {
        return state.stripeCards;
      }
      return state.cards;
    },
    getSelectedCard: state => state.selectedCard,
    getStripeCards: (state) => state.stripeCards,
    getCardInfo: state => ({
      publicKey: state.publicKey,
      clientSecret: state.clientSecret,
    }),
  } as GetterTree<State, RootState>,

  mutations: {
    setCards(state, cards) {
      Vue.set(state, 'cards', cards);
      if (state.stripeCards.length === 0) {
        Vue.set(state, 'stripeCards', cards);
      }
    },
  } as MutationTree<State>,
};
