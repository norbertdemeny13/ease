import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { $themeBreakpoints } from '@/utils/theme-config';
import { ModuleState, RootState } from '@/store/interfaces';

export interface State extends ModuleState {
  windowWidth: number;
  shallShowOverlay: boolean;
}

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
  } as State,
  getters: {
    currentBreakPoint: (state) => {
      const { windowWidth } = state;
      if (windowWidth >= $themeBreakpoints.xl) return 'xl';
      if (windowWidth >= $themeBreakpoints.lg) return 'lg';
      if (windowWidth >= $themeBreakpoints.md) return 'md';
      if (windowWidth >= $themeBreakpoints.sm) return 'sm';
      return 'xs';
    },
  } as GetterTree<State, RootState>,
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val;
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay;
    },
  } as MutationTree<State>,
  actions: {} as ActionTree<State, RootState>,
};
