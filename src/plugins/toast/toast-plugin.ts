import _Vue from 'vue';
import { Toasts } from '@/components/shared/toast';
import { toastsMixin } from '@/mixins/toasts';

/* eslint-disable */
export default {
  install(Vue: typeof _Vue) {
    const data = new Vue({
      mixins: [
        toastsMixin,
      ],
    });
    Object.defineProperty(Vue.prototype, '$toasts', {
      get() { return data; },
    });
    Vue.component('es-toasts', Toasts);
  },
};
