/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';
import instance from '@/main';
import { store } from '@/store';

export interface State extends ModuleState {
  isFetching: boolean;
  elites: [];
  selectedElite: {};
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    elites: [],
    selectedElite: {},
  }) as State,

  actions: {
    async fetchElites({ state }, params) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/admin/elites');
        Vue.set(state, 'elites', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchElite({ state }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/admin/elites/${id}`);
        Vue.set(state, 'selectedElite', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getElites: state => state.elites,
    getSelectedElite: state => state.selectedElite,
  } as GetterTree<State, RootState>,

  mutations: {} as MutationTree<State>,
};
