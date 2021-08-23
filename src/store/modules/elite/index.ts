/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { USER } from '@/interfaces/user';
import { api } from '@/services/api';
import instance from '@/main';
import { nanoid } from 'nanoid';

export interface State extends ModuleState {
  isFetching: boolean;
  elite: any;
  eliteFavorites: [];
  eliteReviews: [];
  statistics: any;
  stripeSSO: any;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    elite: {},
    eliteFavorites: [],
    eliteReviews: [],
    stripeSSO: null,
  }) as State,

  actions: {
    async fetchElite({ state, commit }, { id }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/users/elite/${id}`);
        Vue.set(state, 'elite', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async registerEliteStripe({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('elite/express_account?authorization_code=ac_IsxLpJbhdnEOumCuk4tDbaQ4U7wfNpJz');
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchStripeSSO({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/elite/stripe_sso');
        Vue.set(state, 'stripeSSO', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchEliteReviews({ state, commit }, { id }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/users/elite/${id}/reviews`);
        Vue.set(state, 'eliteReviews', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchStatistics({ state, commit }, user) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/elite/statistics');
        commit('setStatistics', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async addEliteFavourite({ state, commit }, { id }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.update(`user/add_elite_favorite/${id}`);
        console.log(data, 'data');
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async removeEliteFavourite({ state, commit }, { id }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.update(`user/remove_elite_favorite/${id}`);
        console.log(data, 'data');
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchEliteFavorites({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('user/elite_favorites');
        Vue.set(state, 'eliteFavorites', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    getStatistics: state => state.statistics,
    getStripeSSO: state => state.stripeSSO,
    getElite: state => state.elite,
    getEliteReviews: state => state.eliteReviews,
    getEliteFavorites: state => state.eliteFavorites,
  } as GetterTree<State, RootState>,

  mutations: {
    setStatistics(state: State, data: any) {
      Vue.set(state, 'statistics', data);
    },
  } as MutationTree<State>,
};
