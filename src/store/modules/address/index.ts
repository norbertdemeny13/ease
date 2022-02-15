/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { Location } from '@/interfaces/Location';
import { Address } from '@/interfaces/Address';
import { api } from '@/services/api';

export interface State extends ModuleState {
  addresses: Address[];
  selectedReservationAddress: Address | null;
  location: Location | null;
  locationById: Location | null;
  locationError: boolean;
  isFetching: boolean;
}

export default {
  namespaced: true,

  state: () => ({
    addresses: [],
    selectedReservationAddress: null,
    location: null,
    locationById: null,
    locationError: false,
    isFetching: false,
  }) as State,

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

    async setAddress({ state, dispatch, commit }, address) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/addresses', {
          address,
        });
        commit('setLocationById', data);
        dispatch('setReservationAddress', data.id);
      } catch ({ response: reason }) {
        commit('setLocationById', null);
        commit('setLocationError', true);
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async setReservationAddress({ state, commit }, addressId) {
      const selectedAddress = state.addresses.find(address => address.id === addressId);
      if (selectedAddress) {
        sessionStorage.setItem('city_id', selectedAddress.city.id);
      }
      Vue.set(state, 'selectedReservationAddress', selectedAddress);
    },

    async updateAddress({ state, commit }, { address, id }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.update(`/users/addresses/${id}`, {
          address,
        });
      } catch ({ response: reason }) {
        commit('setLocationById', null);
        commit('setLocationError', true);
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async setDefaultAddress({ state, commit }, { id, cityId }) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.create(`/users/addresses/${id}/set_default`);
        sessionStorage.setItem('city_id', cityId);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async removeAddress({ state, commit }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.destroy(`/users/addresses/${id}`);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async fetchAddresses({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/users/addresses');
        Vue.set(state, 'addresses', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchLocationById({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      const id = sessionStorage.getItem('city_id');
      try {
        const { data } = await api.find(`/users/addresses/${id}`);
        commit('setLocationById', data);
      } catch ({ response: reason }) {
        commit('setLocationById', null);
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    getReservationAddress: state => state.selectedReservationAddress,
    getAddresses: state => state.addresses,
    getLocation: state => state.location,
    getLocationById: state => state.locationById,
    getLocationError: state => state.locationError,
    isFetching: state => state.isFetching,
  } as GetterTree<State, RootState>,

  mutations: {
    setLocation(state: State, location: Location) {
      Vue.set(state, 'location', location);
      const selectedCity = location?.address_components
        .filter(item => item.types.includes('locality'));
      if (selectedCity) {
        sessionStorage.setItem('city', selectedCity[0].short_name);
      }
      sessionStorage.setItem('address', (location as any)?.formatted_address || null);
      sessionStorage.setItem('city_id', (location as any)?.city_id || null);
    },
    setLocationById(state: State, location: Location) {
      Vue.set(state, 'locationById', location);
    },
    setLocationError(state: State, status: boolean) {
      Vue.set(state, 'locationError', status);
    },
  } as MutationTree<State>,
};
