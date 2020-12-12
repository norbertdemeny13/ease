import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAuth: false,
  },
  mutations: {},
  getters: {
    isAuth: state => state.isAuth,
  },
  actions: {
    setToken({ state }, pass) {
      if (pass === 'qazwsx') {
        Vue.set(state, 'isAuth', true);
      }
    },
  },
  modules: {},
});
