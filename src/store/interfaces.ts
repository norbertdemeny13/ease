/* eslint-disable */
import { USER } from '@/interfaces/user';

export interface State {
  isAuth: boolean;
  isFetching: boolean;
  services: [];
  user: USER | null;
}
