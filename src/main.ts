import Vue from 'vue';
import Portal from 'portal-vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';

// Application styles
import '@/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(Portal);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
