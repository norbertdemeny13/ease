/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isFetching: boolean;
  activeReservations: [];
  pastReservations: [];
  upcomingReservations: [];
}

export default {
  namespaced: true,

  state: () => ({
    activeReservations: [],
    isFetching: false,
    pastReservations: [],
    upcomingReservations: [],
  }) as State,

  actions: {
    async fetchActiveReservations({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/reservations/active');
        Vue.set(state, 'activeReservations', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchUpcomingReservations({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/reservations/upcoming');
        Vue.set(state, 'upcomingReservations', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchPastReservations({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/reservations/past');
        Vue.set(state, 'pastReservations', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    getActiveReservations: state => state.activeReservations,
    getPastReservations: state => state.pastReservations,
    getUpcomingReservations: state => state.upcomingReservations,
  } as GetterTree<State, RootState>,
};
