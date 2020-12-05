import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { RouterView } from '@/components/router-view';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "chunk.view.home" */ '@/views/home').then(({ Home }) => Home),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "chunk.view.home" */ '@/views/about').then(({ About }) => About),
  },
];

export const router = new VueRouter({
  linkActiveClass: 'is-current-route',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
