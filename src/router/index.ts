import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { RouterView } from '@/components/router-view';
import { store } from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "chunk.view.home" */ '@/views/home').then(({ Home }) => Home),
  },
  {
    path: '/servicii',
    name: 'Services',
    component: () => import(/* webpackChunkName: "chunk.view.services" */ '@/views/services').then(({ Services }) => Services),
  },
];

export const router = new VueRouter({
  linkActiveClass: 'is-current-route',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.path === from.path) {
      return;
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },
});

router.beforeEach(async (to, from, next) => {
  const { isAuth } = store.getters;
  if (isAuth) {
    next();
  }
});
