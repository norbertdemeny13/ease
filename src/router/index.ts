import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { store } from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/not-found').then(
      ({ NotFound }) => NotFound,
    ),
  },

  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home').then(({ Home }) => Home),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact').then(({ Contact }) => Contact),
  },
  {
    path: '/servicii',
    name: 'Servicii',
    component: () => import('@/views/services').then(({ Services }) => Services),
  },
  {
    path: '/companii',
    name: 'Companii',
    component: () => import('@/views/companies').then(({ Companies }) => Companies),
  },
  {
    path: '/servicii/masaj',
    name: 'Detalii Servicii Masaj',
    component: () => import('@/views/reserve-massage').then(({ ReserveMassage }) => ReserveMassage),
  },
  {
    path: '/servicii/:type',
    name: 'Detalii Servicii',
    component: () => import('@/views/services-details').then(({ ServicesDetails }) => ServicesDetails),
  },
  {
    path: '/servicii/:type/:id',
    name: 'Detalii Serviciu',
    component: () => import('@/views/service-details').then(({ ServiceDetails }) => ServiceDetails),
  },
  {
    path: '/new/servicii/:type',
    name: 'Detalii Servicii Aditional',
    component: () => import('@/views/services-details').then(({ ServicesDetails }) => ServicesDetails),
  },
  {
    path: '/new/servicii/:type/:id',
    name: 'Detalii Serviciu Aditional',
    component: () => import('@/views/additional-service-details').then(({ AdditionalServiceDetails }) => AdditionalServiceDetails),
  },
  {
    path: '/servicii/:type/:id/rezerva',
    name: 'Rezerva',
    component: () => import('@/views/reserve-service').then(({ ReserveService }) => ReserveService),
  },
  {
    path: '/intrebari-frecvente',
    name: 'Intrebari frecvente',
    component: () => import('@/views/faq').then(({ Faq }) => Faq),
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
  const { params, path } = to;
  const { type, id } = params;
  const { isAuth, getSelectedServices } = store.getters;
  const isNew = path.includes('new');

  if (isNew && !getSelectedServices.length) {
    const newRoute = path.replace('/new', '');
    next(newRoute);
  }

  if (to.name === 'Rezerva' && !getSelectedServices.length) {
    next(`/servicii/${type}/${id}`);
  }

  if (to.name === 'Detalii Serviciu' || to.name === 'Detalii Serviciu Aditional') {
    await store.dispatch('fetchServiceById', { type, id });
    next();
  }

  if (isAuth) {
    next();
  }
});
