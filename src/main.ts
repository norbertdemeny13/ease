/* eslint-disable */

import Vue from 'vue';
import Portal from 'portal-vue';

// Application styles
import '@/styles/main.scss';

// Third parties
// import '@fortawesome/fontawesome-free/js/all';

// Plugins
import { ToastPlugin } from '@/plugins/toast';

import 'jquery';
import 'vanilla-lazyload';
import './vendors/common_scripts.min';
import './vendors/common_func';

// Shared components
import { Skeleton } from '@/components/shared/skeleton';
import { SkeletonItem } from '@/components/shared/skeleton-item';
import { Toast } from '@/components/shared/toast';
import { Modal } from '@/components/shared/modal';

// Router and Store
import { router } from './router';
import { store } from './store';

// Default import
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Portal);
Vue.use(ToastPlugin);

Vue.component('es-modal', Modal);
Vue.component('es-skeleton', Skeleton);
Vue.component('es-skeleton-item', SkeletonItem);
Vue.component('es-toast', Toast);

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
