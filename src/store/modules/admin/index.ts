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
      let qs = Object.keys(params)
        .filter(key => params[key])
        .filter(key => key !== 'serviceIds')
        .map(key => `${key}=${params[key]}`)
        .join('&');
      if (params?.serviceIds?.length) {
        params.serviceIds.forEach((item: number) => {
          qs += `&service_id[]=${item}`;
        });
      }

      try {
        const { data } = await api.find(`/admin/elites?${qs}`);
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
    async updateElite({ state }, { elite }) {
      Vue.set(state, 'isFetching', true);
      const { id } = elite;
      try {
        const { data } = await api.update(`/admin/elites/${id}`, {
          elite: {
            ...state.selectedElite,
            ...elite,
          },
        });
        Vue.set(state, 'selectedElite', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async removeEliteReview({ state }, { eliteId, reviewId }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.destroy(`/admin/elites/${eliteId}/delete_review/${reviewId}`);
        // Vue.set(state, 'selectedElite', data);
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
