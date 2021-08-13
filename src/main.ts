/* eslint-disable */

import Vue from 'vue';
import Portal from 'portal-vue';

// Application styles
import '@/styles/main.scss';

// Third parties
import '@fortawesome/fontawesome-free/js/all';
import 'vue-slider-component/theme/default.css';

// FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Plugins
import { ToastPlugin } from '@/plugins/toast';

import 'jquery';
import 'vanilla-lazyload';
import './vendors/common_scripts.min';
import './vendors/common_func';

// Shared components
import VueSlider from 'vue-slider-component';
import { Divider } from '@/components/shared/divider';
import { Skeleton } from '@/components/shared/skeleton';
import { SkeletonItem } from '@/components/shared/skeleton-item';
import { AddressBar } from '@/components/features/address-bar';
import { Toast } from '@/components/shared/toast';
import { ConfirmModal } from '@/components/shared/confirm-modal';
import { Modal } from '@/components/shared/modal';
import { Icon } from '@/components/shared/icon';

// Router and Store
import { router } from './router';
import { store } from './store';

// Default import
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Portal);
Vue.use(ToastPlugin);

Vue.component('es-address-bar', AddressBar);
Vue.component('es-vue-slider', VueSlider);
Vue.component('es-confirm-modal', ConfirmModal);
Vue.component('es-divider', Divider);
Vue.component('es-modal', Modal);
Vue.component('es-skeleton', Skeleton);
Vue.component('es-skeleton-item', SkeletonItem);
Vue.component('es-toast', Toast);
Vue.component('es-icon', Icon);
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
