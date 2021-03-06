/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { Service, ComplementaryService } from '@/interfaces/Services';
import { Location } from '@/interfaces/Location';
import { ReservationDetails } from '@/interfaces/ReservationDetails';
import { api } from '@/services/api';

export interface State extends ModuleState {
  activePayment: boolean;
  isFetching: boolean;
  massageInfo: { duration: number; terapeut: string, genre: string; };
  location?: Location | null;
  reservationDetails: ReservationDetails | null;
  serviceCategory: string;
  services: Service[];
  selectedServices: Service[];
  servicesByType: Service[];
  selectedDate: any;
  selectedTime: any;
  serviceById: any;
}

const createMassageReservationForm = (service: Service) => {
  const { massageForm } = service;
  const { duration, genre, form } = massageForm;
  const complementary_massage_ids = service.complementary_services
    .filter((item: any) => item.selectedCount! > 0)
    .map(({ uuid }) => uuid);

  const therapeutic_form_id = form === 'classic'
    ? service.therapeutic_forms[0].id
    : service.therapeutic_forms[1].id;

  return {
    uuid: service.uuid,
    elite_gender: genre,
    therapeutic_form_id,
    duration,
    complementary_massage_ids,
  };
};

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    massageInfo: { duration: 60, terapeut: 'single', genre: 'any_gender' },
    reservationDetails: null,
    serviceCategory: '',
    services: [],
    selectedServices: [],
    servicesByType: [],
    serviceById: [],
    selectedDate: {},
    selectedTime: {},
    activePayment: false,
  }) as State,

  actions: {
    setActivePayment({ state, commit }, status) {
      Vue.set(state, 'activePayment', status);
    },
    async fetchServices({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/services');
        commit('setServices', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async createMassageReservation({ state, dispatch, commit }) {
      Vue.set(state, 'isFetching', true);
      const isSingle = state.selectedServices.some(item => item.category === 'single');
      const isSingleTerapeut = state.massageInfo.terapeut === 'single';
      const firstService = state.selectedServices[0];

      let reservation = {};

      if (isSingle) {
        const selectedService = state.selectedServices.find(item => item.category === 'single')!;

        reservation = {
          type: 'single',
          massage: createMassageReservationForm(selectedService),
        };
      } else {
        reservation = {
          type: isSingleTerapeut ? 'couple_1' : 'couple_2',
          massage: {
            massage_one: createMassageReservationForm(firstService),
          },
        };
        dispatch('createCoupleMassageReservation', { reservation, method: 'create' });
        return;
      }

      try {
        const { data } = await api.create('users/massage_reservations', {
          reservation,
        });
        Vue.set(state, 'reservationDetails', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async createCoupleMassageReservation({ state, dispatch, commit }, { reservation, method }) {
      const mainServiceId = state.reservationDetails ? state.reservationDetails!.id : null;
      const url = 'users/massage_reservations';

      try {
        const { data } = await api.create(url, {
          reservation,
        });
        Vue.set(state, 'reservationDetails', data);
        await dispatch('addExtraCoupleMassageReservation');
      } finally {}
    },
    async addExtraCoupleMassageReservation({ state, dispatch, commit }) {
      const mainServiceId = state.reservationDetails?.id;
      const url = `users/massage_reservations/${mainServiceId}`;

      const isSingleTerapeut = state.massageInfo.terapeut === 'single';
      const secondService = state.selectedServices[1];

      const reservation = {
        type: isSingleTerapeut ? 'couple_1' : 'couple_2',
        massage: {
          massage_two: createMassageReservationForm(secondService),
        },
      };

      try {
        const { data } = await api.update(url, {
          reservation,
        });
        Vue.set(state, 'reservationDetails', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async createReservation({ state, rootState, dispatch, commit }) {
      Vue.set(state, 'isFetching', true);
      const reservationAddress = (rootState as any).address.selectedReservationAddress;
      const isMassage = !!state.selectedServices.find(({ type }) => type.includes('Massage'));

      if (isMassage) {
        dispatch('createMassageReservation');
      } else {
        const selectedService = state.selectedServices.filter(item => item.serviceCategory === 'main')[0];

        const complementaries = selectedService.complementary_services
          ? selectedService.complementary_services
              .filter(item => item.selectedCount! > 0)
              .map(item => ({ uuid: item.complementary_service.uuid, count: item.selectedCount }))
          : [];

        const complementaryServices = state.selectedServices.filter(item => item.serviceCategory !== 'main');

        try {
          const { data } = await api.create(`/users/${selectedService.serviceType}_reservations`, {
            reservation: {
              uuid: selectedService.uuid,
              complementaries,
            },
          });
          Vue.set(state, 'reservationDetails', data);
        } finally {
          Vue.set(state, 'isFetching', false);
        }
      }
    },
    async setReservationAddress({ state, commit }, { address }) {
      const reservationId = state.reservationDetails!.id;
      const selectedService = state.selectedServices.filter(item => item.serviceCategory === 'main')[0];
      const serviceType = selectedService ? selectedService.serviceType : 'massage';

      try {
        const { data } = await api.create(`/users/${serviceType}_reservations/${reservationId}/address`, {
          user_address_id: address.id,
        });
      } finally {};
    },

    async createExtraServiceReservation({ state, dispatch, commit }) {
      if (state.serviceCategory === 'massages') {
        return;
      }

      const mainServiceId = state.reservationDetails!.id;
      const complementaryServices = state.selectedServices.filter(item => item.serviceCategory !== 'main');

      await complementaryServices.forEach(item => dispatch('addExtraServiceReservation', { id: mainServiceId, service: item }));
      Vue.set(state, 'isFetching', false);
    },

    async getReservationCalendar({ state, commit }) {
      const reservationId = state.reservationDetails!.id;
      const selectedDate = state.selectedDate?.date;
      const type = state.selectedServices[0].serviceType || 'massage';

      if (!selectedDate) {
        return;
        Vue.set(state, 'isFetching', false);
      }

      const booking_date = selectedDate;

      try {
        const { data } = await api.find(`/users/${type}_reservations/${reservationId}/reservation_calendar?date=${booking_date}`);
        const newData = { ...state.reservationDetails, reservation_calendar: data.reservation_calendar };
        Vue.set(state, 'reservationDetails', newData);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async addServiceReservationDate({ state, commit }) {
      const mainServiceId = state.reservationDetails!.id;
      const selectedDate = state.selectedDate?.date;
      const selectedTime = state.selectedTime?.time;
      const type = state.selectedServices[0].serviceType || 'massage';

      if (!selectedDate) {
        return;
        Vue.set(state, 'isFetching', false);
      }

      const booking_date = selectedDate;
      const start_time = selectedTime;

      try {
        const { data } = await api.create(`/users/${type}_reservations/${mainServiceId}/date`, {
          reservation: {
            booking_date,
            start_time,
          },
        });

        const newData = { ...state.reservationDetails, ...data };
        Vue.set(state, 'reservationDetails', newData);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async addExtraServiceReservation({ state, commit }, { id, service }) {
      const complementaries = service.complementary_services
        ? service.complementary_services
          .filter((item: ComplementaryService) => item.selectedCount! > 0)
          .map((item: ComplementaryService) => ({ uuid: item.complementary_service.uuid, count: item.selectedCount }))
         : [];

      try {
        const { data } = await api.create(`/users/beauty_reservations/${id}/add_service`, {
          reservation: {
            uuid: service.uuid,
            complementaries,
          },
        });

        Vue.set(state, 'reservationDetails', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },

    async removeExtraServiceReservation({ state, commit }, { id }) {
      const reservationId = state.reservationDetails!.id;
      const serviceId = state.reservationDetails!.reservation_service.beauty_service_reservations.find(({ service }) => service.id === id)!.id;

      try {
        const { data } = await api.create(`/users/beauty_reservations/${reservationId}/remove_service`, {
          reservation: {
            service_id: serviceId,
          },
        });

        Vue.set(state, 'reservationDetails', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async payServiceReservation({ state, rootState, commit }) {
      const { payment_method_id } = rootState.cards.selectedCard;
      const serviceCategory = state.serviceCategory === 'massages' ? 'massage': state.serviceCategory;

      const paymentId = state.reservationDetails?.id;

      Vue.set(state, 'isFetching', true);

      try {
        const { data } = await api.create(`users/${serviceCategory}_reservations/${paymentId}/payment`, {
          payment: {
            payment_method_id,
          },
        });
        Vue.set(state, 'reservationDetails', data);
      } catch (reason) {
        commit('common/setErrors', reason, { root: true });
      }
      finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchServicesByType({ state, commit }, { type, query }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/services/${type}`, {
          params: {
            ...query,
          },
        });
        commit('setServicesByType', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchServiceById({ state, rootState, commit }, { type, id, duration, terapeut }) {
      let city_id: string | null = '';

      city_id = state.location
        ? state.location.city_id
        : sessionStorage.getItem('city_id');

      Vue.set(state, 'isFetching', true);

      try {
        const { data } = await api.find(`/service/${type}/${id}`, {
          params: {
            city_id,
            duration,
            type: terapeut === 'double' ? 'couple_2' : 'couple_1',
          },
        });
        commit('setServiceById', { ...data, category: type, uuid: id });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    setServiceCategory({ state }, category) {
      Vue.set(state, 'serviceCategory', category);
    },
    setSelectedTime({ state }, time) {
      Vue.set(state, 'selectedTime', time);
    },
    setSelectedDate({ state }, date) {
      Vue.set(state, 'selectedDate', date);
    },
  } as ActionTree<State, RootState>,

  getters: {
    getMassageInfo: state => state.massageInfo,
    getActivePayment: state => state.activePayment,
    getReservationDetails: state => state.reservationDetails,
    getReservationServices: (state, { getReservationDetails }) => getReservationDetails?.reservation_service,
    getSelectedDate: state => state.selectedDate,
    getSelectedServices: state => state.selectedServices,
    getSelectedTime: state => state.selectedTime,
    getServices: state => state.services,
    getServicesByType: state => state.servicesByType,
    getServiceById: state => state.serviceById,
    isFetching: state => state.isFetching,
  } as GetterTree<State, RootState>,

  mutations: {
    removeSelectedService(state: State, service: Service) {
      const serviceIdIndex = state.selectedServices
        .map(item => item.tempServiceId).indexOf(service.tempServiceId)
      serviceIdIndex && state.selectedServices.splice(serviceIdIndex, 1);
    },
    removeSelectedServices(state: State) {
      Vue.set(state, 'selectedServices', []);
      Vue.set(state, 'reservationDetails', null);
    },
    removeReservationDetails(state: State) {
      Vue.set(state, 'reservationDetails', null);
    },
    setMassageInfo(state: State, data: any) {
      Vue.set(state, 'massageInfo', data);
    },
    setSelectedService(state: State, data: any) {
      const { service, method, type } = data;
      const selectedService = state.selectedServices
        .find(item => item.tempServiceId === service.tempServiceId);
      const services = selectedService?.complementary_services || [];
      const hasComplementaryServices = services
        .filter(service => service.selectedCount! > 0).length;
      const isSameCategory = state.selectedServices.filter(item => item.category === service.category).length;
      let localService = service;

      if (method === 'create') {
        localService = hasComplementaryServices
          ? { ...service, complementary_services: selectedService!.complementary_services }
          : service;
      }

      if (method === 'new') {
        state.selectedServices.push(service);
        return;
      }

      if (!isSameCategory) {
        Vue.set(state, 'selectedServices', []);
      }

      if (selectedService) {
        const selectedServices = state.selectedServices
          .map(item => (item.tempServiceId === service.tempServiceId ? localService : item));
        Vue.set(state, 'selectedServices', selectedServices);
      } else {
        state.selectedServices.push(service);
      }
    },
    setSelectedMassageService(state: State, data: any) {
      const { service, type } = data;
      const selectedService = state.selectedServices
        .find(item => item.uuid === service.uuid && item.massageType === service.massageType);
      const services = selectedService?.complementary_services || [];

      const isSameCategory = state.selectedServices.filter(item => item.category === service.category).length;

      if (!isSameCategory) {
        Vue.set(state, 'selectedServices', []);
      }
      if (type === 'single' || service.massageType === 'couple_1') {
        Vue.set(state, 'selectedServices', [service]);
      } else {
        state.selectedServices.push(service);
      }
    },
    setServices(state: State, data: any) {
      Vue.set(state, 'services', data);
    },
    setServicesByType(state: State, data: any) {
      Vue.set(state, 'servicesByType', data);
    },
    setServiceById(state: State, data: any) {
      Vue.set(state, 'serviceById', data);
    },
  } as MutationTree<State>,
};
