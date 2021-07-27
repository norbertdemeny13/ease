/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  activated: boolean;
  activeSubscription: any;
  activeSubscriptions: any[];
  errors: [];
  isFetching: boolean;
  selectedSubscription: any;
  subscriptions: any[];
  allSubscriptions: any[];
}

export default {
  namespaced: true,

  state: () => ({
    activated: false,
    activeSubscription: null,
    activeSubscriptions: [],
    errors: [],
    isFetching: false,
    selectedSubscription: null,
    subscriptions: [],
    allSubscriptions: [],
  }) as State,

  actions: {
    resetSelectedSubscription({ state, commit }) {
      Vue.set(state, 'selectedSubscription', null);
    },
    async fetchSubscriptionsByType({ state, rootState, commit }, type) {
      const city_id = (rootState as any).address.location
        ? (rootState as any).address.location.city_id
        : sessionStorage.getItem('city_id');
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/users/subscriptions/${type}`, {
          params: {
            city_id,
          },
        });
        commit('setSubscriptions', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async activateSubscription({ state, rootState, commit }) {
      const city_id = (rootState as any).address.location
        ? (rootState as any).address.location.city_id
        : sessionStorage.getItem('city_id');
      const subscriptionId = (rootState as any).subscriptions.selectedSubscription.id;
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create(`users/user_subscriptions/activate/${subscriptionId}`, {
          city_id,
        });
        Vue.set(state, 'activeSubscription', data);
        Vue.set(state, 'activated', true);
      } catch ({ response: reason }) {
        Vue.set(state, 'errors', [reason]);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async cancelSubscription({ state, commit }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create(`/users/user_subscriptions/cancel/${id}`);
        commit('setActiveSubscription', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchActiveSubscriptions({ state, commit }, type) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/user_subscriptions');
        if (data) {
          commit('setActiveSubscription', data);
          commit('setActiveSubscriptions', [data]);
        }
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchSubscriptions({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/subscriptions');
        commit('setAllSubscriptions', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    setSubscription({ state, commit }, subscription) {
      Vue.set(state, 'selectedSubscription', subscription);
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getActivatedStatus: state => state.activated,
    getErrors: state => state.errors,
    getActiveSubscription: state => state.activeSubscription,
    getActiveSubscriptions: state => state.activeSubscriptions,
    getSelectedSubscription: state => state.selectedSubscription,
    getSubscriptions: state => state.subscriptions,
    getAllSubscriptions: state => state.allSubscriptions,
  } as GetterTree<State, RootState>,

  mutations: {
    setActiveSubscription(state, subscription) {
      Vue.set(state, 'activeSubscription', subscription);
    },
    setActiveSubscriptions(state, subscriptions) {
      Vue.set(state, 'activeSubscriptions', subscriptions);
    },
    setSubscriptions(state, subscriptions) {
      Vue.set(state, 'subscriptions', subscriptions);
    },
    setAllSubscriptions(state, subscriptions) {
      Vue.set(state, 'allSubscriptions', subscriptions);
    },
    setSelectedSubscription(state, subscription) {
      Vue.set(state, 'selectedSubscription', subscription);
    }
  } as MutationTree<State>,
};
