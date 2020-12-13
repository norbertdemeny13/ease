import axios, { AxiosInstance } from 'axios';

export const client: AxiosInstance = axios.create({
  baseURL: 'https://ease-be.herokuapp.com/api/v1',
});
