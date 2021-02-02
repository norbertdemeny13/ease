import Vue from 'vue';
import { nanoid } from 'nanoid';
import { Toast } from '@/interfaces/Toasts';

export const toastsMixin = {
  data: () => ({
    toasts: [] as Toast[],
  }), // data

  methods: {
    toast(data: Toast) {
      const toast = { key: nanoid(), ...data };
      const toasts = [...(this as any).toasts] as Toast[];
      // Get previously dispatched toast index
      const previousToastIndex = toasts.findIndex(item => item.id === toast.id);

      // Update existing toast OR create a new one
      if (previousToastIndex >= 0) {
        toasts[previousToastIndex] = toast;
      } else {
        toasts.push(toast);
      }

      Vue.set(this, 'toasts', [...toasts]);
    }, // toast

    onToastDismiss(id: string, callback: any) {
      const index = (this as any).toasts.findIndex(
        (_item: Toast) => _item.id === id,
      );
      (this as any).toasts.splice(index, 1);

      if (callback) {
        callback(id);
      }
    }, // onToastDismiss
  }, // methods
};
