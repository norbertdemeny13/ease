import { AxiosError } from 'axios';

/* eslint-disable-next-line import/no-default-export */
export default (reason: AxiosError) => Promise.reject(reason);
