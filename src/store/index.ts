import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services/api';
import { Service } from '@/interfaces/Services';
import { State } from './interfaces';

Vue.use(Vuex);

/* eslint-disable */

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    isFetching: false,
    massageInfo: { duration: 60, terapeut: 'single' },
    services: [],
    selectedServices: [],
    servicesByType: [],
    serviceById: [],
    user: null,
    location: null,
    locationError: false,
  } as State,
  mutations: {
    removeSelectedService(state, service: Service) {
      const serviceIdIndex = state.selectedServices.map(item => item.id).indexOf(service.id)
      serviceIdIndex && state.selectedServices.splice(serviceIdIndex, 1);
    },
    removeSelectedServices(state) {
      Vue.set(state, 'selectedServices', []);
    },

    setMassageInfo(state, data) {
      Vue.set(state, 'massageInfo', data);
    },
    setLocation(state, location) {
      Vue.set(state, 'location', location);
      sessionStorage.setItem('address', location?.formatted_address || null);
      sessionStorage.setItem('city_id', location?.city_id || null);
    },
    setLocationError(state, status) {
      Vue.set(state, 'locationError', status);
    },
    setSelectedService(state, data) {
      const { service, method, type } = data;
      const selectedService = state.selectedServices
        .find(item => item.uuid === service.uuid);
      const services = selectedService?.complementary_services || [];
      const hasComplementaryServices = services
        .filter(service => service.selectedCount! > 0).length;
      const isSameCategory = state.selectedServices.filter(item => item.category === service.category).length;
      let localService = service;

      if (method === 'create') {
        localService = hasComplementaryServices
          ? { ...service, complementary_services: selectedService!.complementary_services }
          : service;
      }

      if (!isSameCategory) {
        Vue.set(state, 'selectedServices', []);
      }

      if (selectedService) {
        const selectedServices = state.selectedServices
          .map(item => (item.uuid === service.uuid ? localService : item));
        Vue.set(state, 'selectedServices', selectedServices);
      } else {
        state.selectedServices.push(service);
      }
    },
    setSelectedMassageService(state, data) {
      const { service, type } = data;
      const selectedService = state.selectedServices
        .find(item => item.uuid === service.uuid && item.massageType === service.massageType);
      const services = selectedService?.complementary_services || [];
      const hasComplementaryServices = services
        .filter(service => service.selectedCount! > 0).length;
      const isSameCategory = state.selectedServices.filter(item => item.category === service.category).length;

      let localService = hasComplementaryServices
        ? { ...service, complementary_services: selectedService!.complementary_services }
        : service;

      if (!isSameCategory) {
        Vue.set(state, 'selectedServices', []);
      }
      if (type === 'single' || service.massageType === 'couple_1') {
        Vue.set(state, 'selectedServices', [localService]);
      } else {
        state.selectedServices.push(localService);
      }
    },
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
    getLocation: state => state.location,
    getLocationError: state => state.locationError,
    getMassageInfo: state => state.massageInfo,
    getSelectedServices: state => state.selectedServices,
    getServices: state => state.services,
    getServicesByType: state => state.servicesByType,
    getServiceById: state => state.serviceById,
    isFetching: state => state.isFetching,
    getUser: state => state.user,
    isAuthenticated: ({ user }) => user && (user as any)?.access_token,
  },
  actions: {
    async fetchLocation({ state, commit }, place) {
      const { location } = place.geometry;
      const lat = location.lat();
      const lng = location.lng();

      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/addresses/geo_location', {
          location: {
            lat,
            lng,
          },
        });
        commit('setLocation', { ...place, ...data });
        commit('setLocationError', false);
      } catch ({ response: reason }) {
        commit('setLocation', null);
        commit('setLocationError', true);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchServices({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/services');
        commit('setServices', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchServicesByType({ state, commit }, { type, query }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/services/${type}`, {
          params: {
            ...query,
          },
        });
        commit('setServicesByType', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchServiceById({ state, commit }, { type, id, duration }) {
      const city_id = state.location
        ? state.location.city_id
        : sessionStorage.getItem('city_id');
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/service/${type}/${id}`, {
          params: {
            city_id,
            duration,
          },
        });
        commit('setServiceById', { ...data, category: type, uuid: id });
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
        await api.create('/users/office_request', {
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
