import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import {
  onResponse,
  onResponseFailure,
  onRequest,
  onRequestFailure,
} from './interceptors';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://ease-be.herokuapp.com/api/v1',
});

instance.interceptors.request.use(
  (request: AxiosRequestConfig) => onRequest(request),
  (reason: AxiosError) => onRequestFailure(reason),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => onResponse(response),
  (reason: AxiosError) => onResponseFailure(reason),
);

export { instance };
