import Vue from 'vue';
import Portal from 'portal-vue';

// Application styles
import '@/styles/main.scss';

// Shared components
import { Skeleton } from '@/components/shared/skeleton';
import { SkeletonItem } from '@/components/shared/skeleton-item';

// Router and Store
import { router } from './router';
import { store } from './store';

// Default import
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Portal);

Vue.component('es-skeleton', Skeleton);
Vue.component('es-skeleton-item', SkeletonItem);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
