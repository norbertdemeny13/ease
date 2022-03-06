/* eslint-disable */
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './interfaces';
import instance from '@/main';
import address from './modules/address';
import admin from './modules/admin';
import cards from './modules/cards';
import common from './modules/common';
import elite from './modules/elite';
import giftCards from './modules/gift-cards';
import reservations from './modules/reservations';
import services from './modules/services';
import session from './modules/session';
import subscriptions from './modules/subscriptions';
import phrase from './modules/phrase';
import app from './modules/app';
import appConfig from './modules/app-config';
import verticalMenu from './modules/vertical-menu';
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
    app,
    appConfig,
    address,
    admin,
    cards,
    common,
    elite,
    giftCards,
    phrase,
    reservations,
    session,
    services,
    subscriptions,
    verticalMenu,
  },
};

export const store = new Vuex.Store<RootState>(options);
