/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';

export interface State extends ModuleState {
  activated: boolean;
  activeSubscription: any;
  activeSubscriptions: any[];
  availableSubscriptions: any[];
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
    availableSubscriptions: [],
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
    async fetchSubscriptionsByType({ state, commit }, type) {
      const city_id = sessionStorage.getItem('city_id');
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/users/subscriptions/${type}`, {
          params: {
            city_id,
          },
        });
        commit('setSubscriptions', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async activateSubscription({ state, rootState, commit }) {
      const city_id = sessionStorage.getItem('city_id');
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
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
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
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async fetchAvailableSubscriptions({ state, commit }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/subscriptions/available_subscriptions_to_change', {
          params: {
            active_subscription_id: id,
          },
        });
        commit('setAvailableSubscriptions', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async fetchSubscriptions({ state, rootState, commit }) {
      Vue.set(state, 'isFetching', true);
      const city_id = (rootState as any).address.location
        ? (rootState as any).address.location.city_id
        : sessionStorage.getItem('city_id');
      try {
        const { data } = await api.find('/users/subscriptions', {
          params: {
            city_id,
          }
        });
        commit('setAllSubscriptions', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async changeSubscription({ state, commit }, { activeId, newId }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/user_subscriptions/change', {
          active_user_subscription_id: activeId,
          new_subscription_id: newId,
        });
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    setSubscription({ state, commit }, subscription) {
      Vue.set(state, 'selectedSubscription', subscription);
    },
  } as ActionTree<State, RootState>,

  getters: {
    getIsFetching: state => state.isFetching,
    getActivatedStatus: state => state.activated,
    getErrors: state => state.errors,
    getActiveSubscription: state => state.activeSubscription,
    getActiveSubscriptions: state => state.activeSubscriptions,
    getAvailableSubscriptions: state => state.availableSubscriptions,
    getSelectedSubscription: state => state.selectedSubscription,
    getSubscriptions: state => state.subscriptions,
    getAllSubscriptions: state => state.allSubscriptions,
  } as GetterTree<State, RootState>,

  mutations: {
    setActiveSubscription(state, subscription) {
      const localSubscription = !subscription.length ? subscription : subscription.find((item: any) => item.state === 'upcoming' || item.state === 'active');
      Vue.set(state, 'activeSubscription', localSubscription);
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
    setAvailableSubscriptions(state, subscriptions) {
      Vue.set(state, 'availableSubscriptions', subscriptions);
    },
    setSelectedSubscription(state, subscription) {
      Vue.set(state, 'selectedSubscription', subscription);
    }
  } as MutationTree<State>,
};
