/* eslint-disable */
import { USER } from '@/interfaces/user';
import { Service } from '@/interfaces/Services';

export interface State {
  isAuth: boolean;
  isFetching: boolean;
  location: {
    city_id: number;
  } | null;
  locationError: boolean;
  services: Service[];
  selectedServices: Service[];
  servicesByType: Service[];
  serviceById: any;
  user: USER | null;
}
