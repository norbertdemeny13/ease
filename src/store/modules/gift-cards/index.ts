/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';
import instance from '@/main';
import { nanoid } from 'nanoid';

const dispatchToast = (
  { title, message }: {
    title: string;
    message: string;
  },
) => {
  (instance as any).$toasts.toast({
    id: nanoid(),
    intent: 'error',
    title,
    message,
  });
};

export interface State extends ModuleState {
  isFetching: boolean;
  selectedGiftCard: any;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    selectedGiftCard: {},
  }) as State,

  actions: {
    async createGiftCard({ state }, form) {
      console.log(form, 'form');
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.create('/users/virtual_gift_cards', {
          gift_card: {
            ...form,
            from_name: form.name,
          },
        });
        Vue.set(state, 'selectedGiftCard', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getSelectedGiftCard: state => state.selectedGiftCard,
  } as GetterTree<State, RootState>,

  mutations: {

  } as MutationTree<State>,
};
