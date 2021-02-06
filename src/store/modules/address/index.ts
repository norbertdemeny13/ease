/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { Location } from '@/interfaces/Location';
import { api } from '@/services/api';

export interface State extends ModuleState {
  location: Location | null;
  locationError: boolean;
  isFetching: boolean;
}

export default {
  namespaced: true,

  state: () => ({
    location: null,
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
  } as ActionTree<State, RootState>,

  getters: {
    getLocation: state => state.location,
    getLocationError: state => state.locationError,
  } as GetterTree<State, RootState>,

  mutations: {
    setLocation(state: State, location: Location) {
      Vue.set(state, 'location', location);
      sessionStorage.setItem('address', (location as any)?.formatted_address || null);
      sessionStorage.setItem('city_id', (location as any)?.city_id || null);
    },
    setLocationError(state: State, status: boolean) {
      Vue.set(state, 'locationError', status);
    },
  } as MutationTree<State>,
};
