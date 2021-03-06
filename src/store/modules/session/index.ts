/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { USER } from '@/interfaces/user';
import { api } from '@/services/api';
import instance from '@/main';
import { nanoid } from 'nanoid';

export interface State extends ModuleState {
  isAuth: boolean;
  isFetchingUser: boolean;
  user: USER;
  statistics: any;
}

export default {
  namespaced: true,

  state: () => ({
    isAuth: false,
    isFetchingUser: false,
    user: {},
    statistics: {},
  }) as State,

  actions: {
    setToken({ state }, pass) {
      if (pass === 'qazwsx') {
        Vue.set(state, 'isAuth', true);
      }
    },
    async updateUser({ state, commit }, user) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.update('/user', {
          settings: { ...user },
        });
        const newData = {
          ...state.user,
          ...data,
        };
        commit('setUser', newData);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async fetchStatistics({ state, commit }, user) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.find('/elite/statistics');
        commit('setStatistics', data);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async updateElite({ state, commit }, { user }) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.update('/elite', {
          ...state.user,
          ...user,
        });
        const newData = {
          ...state.user,
          ...data,
        };
        commit('setUser', newData);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async updateProfilePicture({ state, commit }, formData) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.update(
          '/elite/update_avatar',
          { data: formData },
          {
            contentType: 'multipart/form-data'
          } as any,
        );
        const newData = {
          ...state.user,
          ...data,
        };
        commit('setUser', newData);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async changePassword({ state, commit }, passwords) {
      Vue.set(state, 'isFetchingUser', true);
      const { userType } = state.user;

      try {
        const { data } = await api.create(`/${userType === 'elite' ? 'elite' : 'user'}/change_password`, {
          ...passwords,
        });

      } catch(reason) {
        const data = {
          error: 'Te rugam sa introduci parola corecta',
        };
        commit('common/setErrors', { data }, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
        (instance as any).$toasts.toast({
          id: nanoid(),
          title: 'Felicitari!',
          message: 'Parola a fost schimbata cu success!',
          intent: 'success',
        });
      }
    },
    async jwtLogin({ state, commit }, jwt) {
      Vue.set(state, 'isFetchingUser', true);
      const userType = localStorage.getItem('userType');
      try {
        const { data } = await api.update(`/${userType === 'elite' ? 'elites' : 'users'}/sessions`, {
          refresh_token: jwt.slice(2),
        });
        const { elite_id } = data;
        const newData = {
          ...data,
          userType: elite_id ? 'elite' : 'client',
        };
        commit('setUser', newData);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async getUser({ state, commit }) {
      Vue.set(state, 'isFetchingUser', true);
      const userType = localStorage.getItem('userType');
      try {
        const { data } = await api.find(`/${userType === 'elite' ? 'elite' : 'user'}`);
        const { elite_id } = data;
        const newData = {
          ...data,
          userType: elite_id ? 'elite' : 'client',
        };
        commit('setUser', newData);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async authLogin({ state, commit }) {
      const type = localStorage.getItem('userType');
      const endpoint = type === 'client'
        ? '/users/sessions'
        : '/elites/sessions';
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create(endpoint);
        const { elite_id } = data;
        const newData = {
          ...data,
          userType: elite_id ? 'elite' : 'client',
        };
        commit('setUser', newData);
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async login({ state, commit }, { credentials, type }) {
      const endpoint = type === 'client'
        ? '/users/sessions'
        : '/elites/sessions';
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create(endpoint, {
          ...credentials,
        });
        const { elite_id } = data;
        const newData = {
          ...data,
          userType: elite_id ? 'elite' : 'client',
        };
        commit('setUser', newData);
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
      localStorage.removeItem('auth');
      localStorage.removeItem('userType');
      sessionStorage.removeItem('address');
      sessionStorage.removeItem('city');
      sessionStorage.removeItem('city_id');
    },
    async signUp({ state, commit, dispatch }, { credentials, subscribe_to_marketing_emails_list, type }) {
      const endpoint = type === 'client'
        ? '/user'
        : '/elite_registration';

      const payload = type === 'client'
        ? {
            user: {
              ...credentials,
            },
          }
        : {
            elite: {
              ...credentials,
            },
            subscribe_to_marketing_emails_list
          };

      const { email, password } = credentials;

      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create(endpoint, payload);
        localStorage.setItem('jwt', `Jh${data.refresh_token}`);
        localStorage.setItem('auth', `Kn${data.access_token}`);
        dispatch('cards/resetCards', {}, { root: true });
        dispatch('subscriptions/resetSelectedSubscription', {}, { root: true });
        dispatch('login', { credentials, type });
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async requestValidationCode({ state, commit }, phone_number) {
      Vue.set(state, 'isFetchingUser', true);
      const { userType } = state.user;
      try {
        const { data } = await api.create(`/${userType === 'elite' ? 'elite' : 'user'}/phone_number`, {
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
      const { userType } = state.user;
      try {
        const { data } = await api.create(`/${userType === 'elite' ? 'elite' : 'user'}/verify_code`, {
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
    getStatistics: state => state.statistics,
    getToken: state => state.user && state.user.access_token,
    getUser: state => state.user,
    getUserDefaultAddress: state => state.user.default_address,
    getUserType: state => state.user?.userType || localStorage.getItem('userType'),
    isAuthenticated: ({ user }) => user && (user as any)?.id,
  } as GetterTree<State, RootState>,

  mutations: {
    setUser(state: State, data: any) {
      const refreshToken = data?.refresh_token;
      const authToken = data?.access_token;
      if (data && refreshToken) {
        localStorage.setItem('jwt', `Jh${data.refresh_token}`);
        localStorage.setItem('auth', `Kn${data.access_token}`);
        localStorage.setItem('userType', data.userType);
      }
      Vue.set(state, 'user', data);
    },
    setStatistics(state: State, data: any) {
      Vue.set(state, 'statistics', data);
    },
  } as MutationTree<State>,
};
