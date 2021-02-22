/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { USER } from '@/interfaces/user';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isAuth: boolean;
  isFetchingUser: boolean;
  user: USER;
}

export default {
  namespaced: true,

  state: () => ({
    isAuth: false,
    isFetchingUser: false,
    user: {},
  }) as State,

  actions: {
    setToken({ state }, pass) {
      if (pass === 'qazwsx') {
        Vue.set(state, 'isAuth', true);
      }
    },
    async jwtLogin({ state, commit }, jwt) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.update('/users/sessions', {
          refresh_token: jwt.slice(2),
        });
        commit('setUser', data);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async login({ state, commit }, credentials) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('/users/sessions', {
          ...credentials,
        });
        commit('setUser', data);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async forgotPassword({ state, commit }, email) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('/user/forgot_password', {
          email,
        });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async resetPassword({ state, commit }, password) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('/user/reset_password', {
          new_password: password,
          token: state!.user!.access_token,
        });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async logout({ state, commit }) {
      commit('setUser', null);
      localStorage.removeItem('jwt');
    },
    async signUp({ state, commit, dispatch }, credentials) {
      const { email, password } = credentials;
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('/user', {
          user: {
            ...credentials,
          },
        });
        dispatch('login', { email, password });
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async requestValidationCode({ state, commit }, phone_number) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('/user/phone_number', {
          phone_number,
        });

        const newData = {
          ...state.user,
          phone_number,
        };

        commit('setUser', newData);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async validatePhoneNumber({ state, commit }, code) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('/user/verify_code', {
          code,
          phone_number: state.user.phone_number,
        });
        const newData = {
          ...state.user,
          phone_number_confirmed: data.phone_number_confirmed,
        };
        commit('setUser', newData);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isAuth: state => state.isAuth,
    isFetchingUser: state => state.isFetchingUser,
    getUser: state => state.user,
    getToken: state => state.user && state.user.access_token,
    isAuthenticated: ({ user }) => user && (user as any)?.access_token,
  } as GetterTree<State, RootState>,

  mutations: {
    setUser(state: State, data: any) {
      if (data) {
        localStorage.setItem('jwt', `Jh${data.refresh_token}`);
      }
      Vue.set(state, 'user', data);
    },
  } as MutationTree<State>,
};
