/* eslint-disable */
import { USER } from '@/interfaces/user';

export interface State {
  isAuth: boolean;
  isFetching: boolean;
  location: null;
  services: [];
  servicesByType: [];
  serviceById: any;
  user: USER | null;
}
