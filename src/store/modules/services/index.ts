/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { Service } from '@/interfaces/Services';
import { Location } from '@/interfaces/Location';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isFetching: boolean;
  massageInfo: { duration: number; terapeut: string };
  location?: Location | null;
  services: Service[];
  selectedServices: Service[];
  servicesByType: Service[];
  serviceById: any;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    massageInfo: { duration: 60, terapeut: 'single' },
    services: [],
    selectedServices: [],
    servicesByType: [],
    serviceById: [],
  }) as State,

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
  } as ActionTree<State, RootState>,

  getters: {
    getMassageInfo: state => state.massageInfo,
    getSelectedServices: state => state.selectedServices,
    getServices: state => state.services,
    getServicesByType: state => state.servicesByType,
    getServiceById: state => state.serviceById,
    isFetching: state => state.isFetching,
  } as GetterTree<State, RootState>,

  mutations: {
    removeSelectedService(state: State, service: Service) {
      const serviceIdIndex = state.selectedServices.map(item => item.id).indexOf(service.id)
      serviceIdIndex && state.selectedServices.splice(serviceIdIndex, 1);
    },
    removeSelectedServices(state: State) {
      Vue.set(state, 'selectedServices', []);
    },
    setMassageInfo(state: State, data: any) {
      Vue.set(state, 'massageInfo', data);
    },
    setSelectedService(state: State, data: any) {
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
    setSelectedMassageService(state: State, data: any) {
      const { service, type } = data;
      const selectedService = state.selectedServices
        .find(item => item.uuid === service.uuid && item.massageType === service.massageType);
      const services = selectedService?.complementary_services || [];

      const isSameCategory = state.selectedServices.filter(item => item.category === service.category).length;

      if (!isSameCategory) {
        Vue.set(state, 'selectedServices', []);
      }
      if (type === 'single' || service.massageType === 'couple_1') {
        Vue.set(state, 'selectedServices', [service]);
      } else {
        state.selectedServices.push(service);
      }
    },
    setServices(state: State, data: any) {
      Vue.set(state, 'services', data);
    },
    setServicesByType(state: State, data: any) {
      Vue.set(state, 'servicesByType', data);
    },
    setServiceById(state: State, data: any) {
      Vue.set(state, 'serviceById', data);
    },
  } as MutationTree<State>,
};
