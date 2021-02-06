/* eslint-disable */
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './interfaces';
import instance from '@/main';
import session from './modules/session';
import services from './modules/services';
import address from './modules/address';
import common from './modules/common';
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

Vue.use(Vuex);

const options: StoreOptions<RootState> = {
  state: {},
  modules: {
    common,
    address,
    services,
    session,
  },
};

export const store = new Vuex.Store<RootState>(options);
