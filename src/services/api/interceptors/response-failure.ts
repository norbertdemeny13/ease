import axios, { AxiosError, AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import instance from '@/main';
import { router } from '@/router';

// eslint-disable

enum Source {
  pointer = 'pointer',
  parameter = 'parameter'
}

export interface JsonApiErrorObject {
  status?: string;
  title?: string;
  detail?: string;
  source: Partial<{ [key in Source]: string }>;
  user_visible?: boolean;
}

export interface JsonApiErrorResponse extends AxiosResponse {
  data: {
    errors: Array<JsonApiErrorObject>;
  };
}

const dispatchToast = (
  { title, message }: {
    title: string;
    message: string;
  },
) => {
  (instance as any).$toasts.toast({
    id: nanoid(),
    intent: 'error',
    title,
    message,
  });
};

/* eslint-disable */
export default (reason: AxiosError) => {
  if (axios.isCancel(reason)) {
    return Promise.reject(reason);
  }

  const response = reason.response || { status: 0 };
  const { status, headers = {} } = response as AxiosResponse;

  if (status === 0 || status === 500) {
    dispatchToast({
      title: `api.errors.${status}.title`,
      message: `api.errors.${status}.description`,
    });
  }

  if (status === 401) {
    dispatchToast({
      title: 'Neautorizat',
      message: 'Aceasta solicitare este neautorizata',
    });
  }

  if (status === 403) {
    router.push('/dashboard');
  }

  return Promise.reject(reason);
};
