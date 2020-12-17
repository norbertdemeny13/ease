/* eslint-disable */
import { USER } from '@/interfaces/user';

export interface State {
  isAuth: boolean;
  isFetching: boolean;
  services: [];
  servicesByType: [];
  serviceById: any;
  user: USER | null;
}
