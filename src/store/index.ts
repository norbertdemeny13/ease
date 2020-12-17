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
    servicesByType: [],
    serviceById: [],
    user: null,
  } as State,
  mutations: {
    setServices(state, data) {
      Vue.set(state, 'services', data);
    },
    setServicesByType(state, data) {
      Vue.set(state, 'servicesByType', data);
    },
    setServiceById(state, data) {
      Vue.set(state, 'serviceById', data);
    },
    setUser(state, data) {
      Vue.set(state, 'user', data);
    },
  },
  getters: {
    isAuth: state => state.isAuth,
    getServices: state => state.services,
    getServicesByType: state => state.servicesByType,
    getServiceById: state => state.serviceById,
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
    async fetchServicesByType({ state, commit }, type) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/services/${type}`);
        commit('setServicesByType', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchServiceById({ state, commit }, { type, id }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/service/${type}/${id}`);
        commit('setServiceById', data);
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
