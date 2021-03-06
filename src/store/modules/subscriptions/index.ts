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
  }) as State,

  actions: {
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
    async fetchActiveSubscriptions({ state, commit }, type) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/user_subscriptions');
        commit('setActiveSubscriptions', data);
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
  } as GetterTree<State, RootState>,

  mutations: {
    setActiveSubscriptions(state, subscriptions) {
      Vue.set(state, 'activeSubscriptions', subscriptions);
    },
    setSubscriptions(state, subscriptions) {
      Vue.set(state, 'subscriptions', subscriptions);
    },
    setSelectedSubscription(state, subscription) {
      Vue.set(state, 'selectedSubscription', subscription);
    }
  } as MutationTree<State>,
};
