/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { USER } from '@/interfaces/User';
import { api } from '@/services/api';
import instance from '@/main';
import { nanoid } from 'nanoid';
import { router } from '@/router';
import { getUtcToZonedTime, getDifferenceInMinutes } from '@/utils/date-helpers';

export interface State extends ModuleState {
  isAuth: boolean;
  isFetchingUser: boolean;
  user: USER;
  referralCode: string | null;
}

export default {
  namespaced: true,

  state: () => ({
    isAuth: false,
    isFetchingUser: false,
    user: {},
    referralCode: null,
  }) as State,

  actions: {
    setToken({ state }, pass) {
      if (pass === 'qazwsx') {
        Vue.set(state, 'isAuth', true);
      }
    },
    setReferralCode({ state }, code) {
      Vue.set(state, 'referralCode', code);
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
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
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
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      }  finally {
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
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      }  finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async changePassword({ state, commit }, passwords) {
      Vue.set(state, 'isFetchingUser', true);
      const userType = state.user.user_type;
      try {
        const { data } = await api.create(`/${userType === 'elite' ? 'elite' : 'user'}/change_password`, {
          ...passwords,
        });
        (instance as any).$toasts.toast({
          id: nanoid(),
          title: 'Felicitari!',
          message: 'Parola a fost schimbata cu success!',
          intent: 'success',
        });
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async jwtLogin({ dispatch, state, commit }, jwt) {
      Vue.set(state, 'isFetchingUser', true);
      const refreshToken = localStorage.getItem('jwt');
      const userType = localStorage.getItem('userType');

      const isTokenExpired = localStorage.getItem('expire_at') !== 'undefined'
        ? getUtcToZonedTime(localStorage.getItem('expire_at'))
        : null;

      if (isTokenExpired && getDifferenceInMinutes(isTokenExpired) < 60) {
        dispatch('refreshToken');
      }

      try {
        const { data } = await api.update(`/${userType === 'elite' ? 'elites' : 'users'}/sessions`, {
          refresh_token: jwt.slice(2),
        });
        commit('setUser', data);
      } catch({ response: reason }) {
        // commit('common/setErrors', reason, { root: true });
      }  finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async refreshToken({ state, commit }) {
      Vue.set(state, 'isFetchingUser', true);
      const refreshToken = localStorage.getItem('jwt');
      const userType = localStorage.getItem('userType');

      try {
        const { data } = await api.update(`/${userType === 'elite' ? 'elites' : 'users'}/sessions`, {
          refresh_token: refreshToken!.slice(2),
        });
        commit('setUser', data);
      } catch({ response: reason }) {
        // commit('common/setErrors', reason, { root: true });
      }  finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async getUser({ state, rootState, commit, dispatch }) {
      Vue.set(state, 'isFetchingUser', true);
      const userType = localStorage.getItem('userType');
      const isTokenExpired = localStorage.getItem('expire_at') !== 'undefined'
        ? getUtcToZonedTime(localStorage.getItem('expire_at'))
        : null;

      if (isTokenExpired && getDifferenceInMinutes(isTokenExpired) < 60) {
        dispatch('refreshToken');
        return;
      }
      try {
        const { data } = await api.find(`/${userType === 'elite' ? 'elite' : 'user'}`);
        commit('setUser', data);
        if (data.stripe_account_created) {
          (rootState as any).elite.startPoll = false;
        }
      } catch({ response: reason }) {
        if (!reason.status as unknown as number === 401) {
          commit('common/setErrors', reason, { root: true });
        } else {
          dispatch('jwtLogin');
        }
      }  finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async savePreferences({ state, commit }, config) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('user/preferences', {
          preferences: {
            ...config,
          },
        });
        commit('setUser', data);
        (instance as any).$toasts.toast({
          id: nanoid(),
          title: 'Felicitari!',
          message: 'Preferintele tale au fost salvate cu success!',
          intent: 'success',
        });
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
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
        commit('setUser', data);
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
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
        commit('setUser', data);
        if (!router.currentRoute.fullPath.includes('easepro/cont') && data.user_type === 'elite') {
          const replaceUrl = router.currentRoute.fullPath.includes('easepro') || router.currentRoute.fullPath.includes('pro/');
          const path = replaceUrl ? '/easepro/cont' : 'easepro/cont';
          router.push(path);
        }
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async forgotPassword({ state, commit }, { email, type }) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create(`/${type === 'client' ? 'user' : 'elite'}/forgot_password`, {
          email,
        });
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async resetPassword({ state, dispatch, commit }, { password, token, type }) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create(`/${type}/reset_password`, {
          new_password: password,
          token,
        });
        (instance as any).$toasts.toast({
          id: nanoid(),
          title: 'Felicitari!',
          message: 'Parola a fost schimbata cu success!',
          intent: 'success',
        });
        const path = router.currentRoute.fullPath.includes('user') ? '/' : '/easepro/';
        router.push(path);
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async logout({ state, rootState, commit }) {
      commit('setUser', null);
      localStorage.removeItem('jwt');
      localStorage.removeItem('auth');
      localStorage.removeItem('userType');
      localStorage.removeItem('address');
      localStorage.removeItem('city');
      localStorage.removeItem('city_id');
      commit('cards/resetCards', [], { root: true });
    },
    async signUp({ state, commit, dispatch }, { credentials, subscribe_to_marketing_emails_list, type }) {
      let endpoint = type === 'client'
        ? '/user'
        : '/elite_registration';

      const payload = type === 'client'
        ? {
            user: {
              ...credentials,
              referral_code: state.referralCode,
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
        Vue.set(state, 'referralCode', null);
      }
    },
    async requestValidationCode({ state, commit }, phone_number) {
      Vue.set(state, 'isFetchingUser', true);
      const userType = state.user.user_type;
      try {
        const { data } = await api.create(`/${userType === 'elite' ? 'elite' : 'user'}/phone_number`, {
          phone_number,
        });

        const newData = {
          ...state.user,
          phone_number,
          phone_number_confirmed: false,
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
      const userType = state.user.user_type;
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
    getToken: state => state.user && state.user.access_token,
    getUser: state => state.user,
    getReferralCode: state => state.referralCode,
    getUserDefaultAddress: state => state.user.default_address,
    getUserType: state => state.user?.user_type || localStorage.getItem('userType'),
    isAuthenticated: ({ user }) => user && (user as any)?.id,
  } as GetterTree<State, RootState>,

  mutations: {
    setUser(state: State, data: any) {
      const refreshToken = data?.refresh_token;
      const authToken = data?.access_token;
      const expireAt = data?.expire_at;

      if (data && expireAt) {
        localStorage.setItem('expire_at', expireAt);
      }

      if (data && refreshToken) {
        localStorage.setItem('jwt', `Jh${data.refresh_token}`);
        localStorage.setItem('auth', `Kn${data.access_token}`);
      }
      localStorage.setItem('userType', data?.user_type);
      Vue.set(state, 'user', data);
    },
    setStatistics(state: State, data: any) {
      Vue.set(state, 'statistics', data);
    },
  } as MutationTree<State>,
};
