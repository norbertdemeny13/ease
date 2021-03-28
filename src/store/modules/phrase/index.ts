/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import phrase from './phrase-ro.json';

export default {
  namespaced: true,
  getters: {
    getPhrase: () => phrase,
  } as GetterTree<any, RootState>,
};
