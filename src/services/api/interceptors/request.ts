/* eslint-disable */
import { AxiosRequestConfig } from 'axios';
import { store } from '@/store';

/* eslint-disable-next-line import/no-default-export */
export default (request: AxiosRequestConfig) => {
  /* eslint-disable no-param-reassign */
  request.baseURL = 'https://ease-be.herokuapp.com/api/v1';

  const token = store.getters['session/getToken'] || localStorage.getItem('jwt');
  if (token) {
    request.headers = {
      // accept: request.headers?.accept,
      // 'content-type': request.headers?.['content-type'],
      // 'access-control-allow-origin': '*',
      Authorization: `Bearer ${token}`,
    };
  }

  /* eslint-enable no-param-reassign */
  return request;
};
