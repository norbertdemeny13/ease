/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isFetching: boolean;
  cards: [];
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    cards: [],
  }) as State,

  actions: {
    async fetchCards({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/services');
        commit('setCards', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getCards: state => state.cards,
  } as GetterTree<State, RootState>,

  mutations: {
    setCards(state, cards) {
      Vue.set(state, 'cards', cards);
    },
  } as MutationTree<State>,
};
