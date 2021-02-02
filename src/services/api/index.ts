import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { instance as client } from './client';

const api = {
  request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return client.request(config);
  }, // request

  create(
    url: string,
    data: Array<object> | object = {},
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse> {
    return this.request({
      method: 'post',
      url,
      data,
      ...config,
    });
  }, // create

  destroy(
    url: string,
    data?: Array<object> | object,
    config: AxiosRequestConfig = { },
  ): Promise<AxiosResponse> {
    let deleteConfig: AxiosRequestConfig = {};

    if (!data) {
      deleteConfig = { headers: { 'content-type': 'application/json' }, ...config };
    }
    return this.request({
      method: 'delete',
      url,
      data: data || {},
      ...deleteConfig,
    });
  }, // destroy

  find(
    url: string,
    config: AxiosRequestConfig = {},
    method: 'get'|'head' = 'get',
  ): Promise<AxiosResponse> {
    return this.request({
      method,
      url,
      ...config,
    });
  }, // find

  update(
    url: string,
    data: Array<object> | object = {},
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse> {
    return this.request({
      method: 'patch',
      url,
      data,
      ...config,
    });
  }, // update
};

export { api };
