import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services/api';
import { State } from './interfaces';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    isFetching: false,
    services: [],
    user: null,
  } as State,
  mutations: {
    setServices(state, data) {
      Vue.set(state, 'services', data);
    },
    setUser(state, data) {
      Vue.set(state, 'user', data);
    },
  },
  getters: {
    isAuth: state => state.isAuth,
    getServices: state => state.services,
    isFetching: state => state.isFetching,
    getUser: state => state.user,
    isAuthenticated: ({ user }) => user && (user as any)?.access_token,
  },
  actions: {
    async fetchServices({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/services');
        commit('setServices', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async login({ state, commit }, credentials) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/sessions', {
          ...credentials,
        });
        commit('setUser', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async officeRequest({ state }, user) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/office_request', {
          ...user,
        });
        console.log(data, 'data');
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    setToken({ state }, pass) {
      if (pass === 'qazwsx') {
        Vue.set(state, 'isAuth', true);
      }
    },
  },
  modules: {},
});
