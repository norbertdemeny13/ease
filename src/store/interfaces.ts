/* eslint-disable */
import { USER } from '@/interfaces/user';
import { Service } from '@/interfaces/Services';

export interface State {
  isAuth: boolean;
  isFetching: boolean;
  isFetchingUser: boolean;
  location: {
    city_id: number;
  } | null;
  locationError: boolean;
  massageInfo: { duration: number; terapeut: string };
  services: Service[];
  selectedServices: Service[];
  servicesByType: Service[];
  serviceById: any;
  user: USER | null;
}
