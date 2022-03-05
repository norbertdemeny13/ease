import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { $themeConfig } from '@/utils/theme-config';
import { ModuleState, RootState } from '@/store/interfaces';

export interface State extends ModuleState {
  isVerticalMenuCollapsed: boolean;
}

/* eslint-disable */
export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
  } as State,
  getters: {} as GetterTree<State, RootState>,
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val;
    },
  } as MutationTree<State>,
  actions: {} as ActionTree<State, RootState>,
};
