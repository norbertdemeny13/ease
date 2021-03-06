/* eslint-disable */
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
    path: '/abonamente',
    name: 'Abonamente',
    component: () => import('@/views/subscriptions').then(({ Subscriptions }) => Subscriptions),
  },
  {
    path: '/abonamente/rezerva',
    name: 'Rezerva Abonamente',
    component: () => import('@/views/subscription-payment').then(({ SubscriptionPayment }) => SubscriptionPayment),
  },
  {
    path: '/abonamente/:type',
    name: 'Detalii Abonament',
    component: () => import('@/views/subscription-details').then(({ SubscriptionDetails }) => SubscriptionDetails),
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
    path: '/new/servicii/masaj',
    name: 'Detalii Servicii Masaj Cuplu',
    component: () => import('@/views/reserve-massage').then(({ NewReserveMassage }) => NewReserveMassage),
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
    path: '/servicii/:type/:id/rezerva/plata',
    name: 'Plata rezervare',
    component: () => import('@/views/reserve-service-payment').then(({ ReserveServicePayment }) => ReserveServicePayment),
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
  const isAuth = store.getters['session/isAuth'];
  const getSelectedSubscription = store.getters['subscriptions/getSelectedSubscription'];
  const getSelectedServices = store.getters['services/getSelectedServices'];
  const getLocation = store.getters['address/getLocation'];
  const getToken = store.getters['session/getToken'];
  const hasLocation = getLocation || sessionStorage.getItem('city_id');
  const isNew = path.includes('new');
  const jwtToken = localStorage.getItem('jwt') && !localStorage.getItem('jwt')!.includes('undefined');

  if (!getToken && jwtToken) {
    await store.dispatch('session/jwtLogin', localStorage.getItem('jwt'));
  }

  if (path.includes('/rezerva/plata') && !getSelectedServices.length) {
    next(`/servicii/${params.type}/${params.id}`);
  }

  if (path.includes('/servicii/') && hasLocation === 'null') {
    next('/servicii');
  }

  if (path.includes('abonamente/rezerva') && !getSelectedSubscription) {
   next('/abonamente');
  }

  if (path.includes('/abonamente/rezerva') && !getToken && !jwtToken) {
    next('/abonamente');
  }

  if (isNew && !getSelectedServices.length) {
    const newRoute = path.replace('/new', '');
    next(newRoute);
  }

  if (to.name === 'Rezerva' && !getSelectedServices.length) {
    if (type === 'single' || type === 'couple') {
      next(`/servicii/masaj?type=${type}`);
    } else {
      next(`/servicii/${type}/${id}`);
    }
  }

  if (to.name === 'Detalii Serviciu' || to.name === 'Detalii Serviciu Aditional') {
    await store.dispatch('services/fetchServiceById', { type, id });
    next();
  }

  if (isAuth) {
    next();
  }
});
