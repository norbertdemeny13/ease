/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';
import instance from '@/main';
import { i18n } from '@/i18n';
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
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
  }) as State,

  actions: {
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
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
  } as GetterTree<State, RootState>,

  mutations: {
    setErrors(state: State, reason: any) {
      const { status, data } = reason;

      if (!data) {
        dispatchToast({
          title: 'Eroare',
          message: 'Din pacate nu putem procesa cererea, te rugam sa incerci din nou',
        });
      }

      const errors = data.errors ? data.errors : data.error;

      if (typeof errors === 'string') {
        dispatchToast({
          title: 'Eroare',
          message: i18n.t(errors).toString(),
        });
      } else if (typeof errors[0] === 'string') {
        dispatchToast({
          title: 'Eroare',
          message: i18n.t(errors[0]).toString(),
        })
      } else {
        const errorObject = [] as any;

        Object.keys(errors).forEach((item: any) => errorObject.push({
          key: item,
          detail: i18n.t(errors[item][0]),
        }));

        errorObject.forEach((item: any) => dispatchToast({
          title: 'Eroare',
          message: `${item.key}: ${i18n.t(item.detail)}`,
        }));
      }
    },
  } as MutationTree<State>,
};
