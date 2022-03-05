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

import VueSocialSharing from 'vue-social-sharing'

import 'jquery';
import 'vanilla-lazyload';
import './vendors/common_scripts.min';
import './vendors/common_func';

// Internationalization
import { i18n } from '@/i18n';

import FileSelector from 'vue-file-selector';

// Shared components
import StarRating from 'vue-star-rating';
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
import VueCalendly from 'vue-calendly';
import Zendesk from '@dansmaculotte/vue-zendesk';

// Admin Dashboard template
import FeatherIcon from '@/core/components/feather-icon/FeatherIcon.vue'

import { ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

// BSV Plugin Registration
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);
Vue.component(FeatherIcon.name, FeatherIcon);

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@/core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@/core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false;

Vue.use(Zendesk, {
  key: '4591939b-c8e2-4d8c-b9db-bb9e1b531846',
  disabled: true,
  hideOnLoad: true,
  settings: {
    webWidget: {
      color: {
        theme: '#78a300'
      }
    }
  }
});

Vue.use(VueSocialSharing);

Vue.use(Portal);
Vue.use(ToastPlugin);
Vue.use(FileSelector);
Vue.use(VueCalendly);

Vue.component('es-address-bar', AddressBar);
Vue.component('es-star-rating', StarRating);
Vue.component('es-vue-slider', VueSlider);
Vue.component('es-confirm-modal', ConfirmModal);
Vue.component('es-divider', Divider);
Vue.component('es-modal', Modal);
Vue.component('es-skeleton', Skeleton);
Vue.component('es-skeleton-item', SkeletonItem);
Vue.component('es-toast', Toast);
Vue.component('es-icon', Icon);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('es-vue-calendly', VueCalendly);

export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
