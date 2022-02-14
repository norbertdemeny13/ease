/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isFetching: boolean;
  activeReservations: [];
  canceledReservation: null;
  pastReservations: [];
  upcomingReservations: [];
  reservation: any;
}

export default {
  namespaced: true,

  state: () => ({
    activeReservations: [],
    isFetching: false,
    pastReservations: [],
    upcomingReservations: [],
    canceledReservation: null,
    reservation: null,
  }) as State,

  actions: {
    async fetchActiveReservations({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/reservations/active');
        Vue.set(state, 'activeReservations', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchUpcomingReservations({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/reservations/upcoming');
        Vue.set(state, 'upcomingReservations', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchPastReservations({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/reservations/past');
        Vue.set(state, 'pastReservations', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async showReservation({ state, commit }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/users/reservations/${id}`);
        Vue.set(state, 'reservation', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async cancelReservation({ state, commit }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create(`/users/reservations/${id}/cancel`);
        Vue.set(state, 'canceledReservation', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    getActiveReservations: state => state.activeReservations,
    getPastReservations: state => state.pastReservations,
    getUpcomingReservations: state => state.upcomingReservations,
    getReservation: state => state.reservation,
    getCanceledReservation: state => state.canceledReservation,
  } as GetterTree<State, RootState>,
};
