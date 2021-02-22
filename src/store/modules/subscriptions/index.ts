/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isFetching: boolean;
  selectedSubscription: any;
  subscriptions: any[];
  activated: boolean;
  errors: [];
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    subscriptions: [],
    selectedSubscription: null,
    activated: false,
    errors: [],
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
        Vue.set(state, 'activated', true);
      } catch ({ response: reason }) {
        Vue.set(state, 'errors', [reason]);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getActivatedStatus: state => state.activated,
    getErrors: state => state.errors,
    getSelectedSubscription: state => state.selectedSubscription,
    getSubscriptions: state => state.subscriptions,
  } as GetterTree<State, RootState>,

  mutations: {
    setSubscriptions(state, subscriptions) {
      Vue.set(state, 'subscriptions', subscriptions);
    },
    setSelectedSubscription(state, subscription) {
      Vue.set(state, 'selectedSubscription', subscription);
    }
  } as MutationTree<State>,
};
