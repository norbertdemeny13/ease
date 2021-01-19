<template>
  <div class="ml-2 box_order">
    <div class="head">
      <h3>DETALII REZERVARE</h3>
    </div>
    <!-- /head -->
    <div class="main">
      <ul>
        <li>Data<span>{{ getDate }}</span></li>
        <li>Ora<span>{{ getHour }}</span></li>
      </ul>
      <hr>
      <ul
        v-for="(item, index) in getLocalSelectedServices"
        :key="item.id"
        class="clearfix"
      >
        <span class="text-gray">Serviciu {{ index + 1 }}</span>
        <div class="d-flex justify-content-between align-items-center flex-inline">
          <h3>{{ item.name }}</h3>
          <h5>{{ getServicePrice(item) }} Ron</h5>
        </div>
        <li
          v-for="service in item.services"
          :key="service.id"
        >
          <a href="" @click.prevent="removeService(item.id, service.id); service.selectedCount = 0">{{ service.selectedCount }} x {{ service.name }}</a>
          <span>{{ service.selectedCount * (service.price === '0' ? hourPrice : service.price) }} Ron</span>
        </li>
      </ul>

      <ul class="clearfix">
        <li>Subtotal<span>{{ getTotal }} Ron</span></li>
        <li class="total">Total<span>{{ getTotal }} Ron</span></li>
      </ul>
    </div>
  </div>
  <!-- /box_booking -->
</template>

<script>
  import Vue from 'vue';
  import { getZonedDate, getHourPrice } from '@/utils/date-helpers';

  export default Vue.extend({
    name: 'es-service-summary',
    props: {
      selectedServices: {
        type: Array,
        required: true,
      },
      date: {
        type: Object,
        required: true,
      },

      time: {
        type: Object,
        required: true,
      },
    },

    data: () => ({
      hourPrice: 0,
    }),

    computed: {
      getLocalSelectedServices() {
        /* eslint-disable */
        return this.selectedServices
          .map((item) => {
            const isMassage = item.category === 'single' || item.category === 'couple';
            const selectedComplementaryServices = isMassage
              ? this.getMassageServices(item)
              : this.getBeautyServices(item);
            return {
              name: item.name,
              services: selectedComplementaryServices,
              id: item.id,
              prices: item.price,
            };
          });
      },
      getDate() {
        const { date } = this.date;
        return getZonedDate(date);
      },
      getHour() {
        const { hour, minute } = this.time;
        return `${hour}:${minute === 0 ? '00': minute}`;
      },
      getTotal() {
        let total = parseInt(this.time.price, 10);
        const { category } = this.selectedServices[0];
        const isMassage = category === 'single' || category === 'couple';
        this.selectedServices.forEach((item) => {
          let complementaryTotal = isMassage
            ? this.getMassageServicesTotal(item)
            : this.getBeautyServicesTotal(item);
          total += complementaryTotal;
        });
        return total;
      },
    },
    methods: {
      removeService(itemId, serviceId) {
        const selectedService = this.selectedServices
          .filter(item => item.id === itemId)[0];

        const selectedComplementaryService = selectedService.complementary_services
          .filter(item => item.id === serviceId)[0];

        selectedComplementaryService.selectedCount = 0;
      },
      getBeautyServices(service) {
        const services = service?.complementary_services || [];

        return services
          .filter(service => service.selectedCount > 0)
          .map(({ id, complementary_service, selectedCount }) => ({
            name: complementary_service.name,
            price: complementary_service.price,
            id,
            selectedCount,
          }));
      },

      getBeautyServicesTotal(item) {
        let complementaryTotal = 0;
        const services = item.complementary_services || [];
        services
          .filter(service => service.selectedCount > 0)
          .forEach(service => complementaryTotal += service.selectedCount * parseInt(service.complementary_service.price), 10);
        console.log(complementaryTotal, 'fff');
        return complementaryTotal;
      },
      getMassageServices(service) {
        const isFourHands = service.selectedComplementaryServices.find(item => item.is_four_hands);
        const selectedServices = service.selectedComplementaryServices.map(item => item.uuid);
        const services = service?.complementary_services || [];
        return services
          .filter(item => selectedServices.includes(item.uuid))
          .map(({ id, name, price }) => ({
            name,
            price,
            id,
            selectedCount: 1,
            isFourHands,
          }));
      },

      getMassageServicesTotal(item) {
        let complementaryTotal = 0;
        const isFourHands = item.selectedComplementaryServices.find(item => item.is_four_hands);
        const selectedServices = item.selectedComplementaryServices.map(item => item.uuid);
        const services = item.complementary_services || [];
        services
          .filter(item => selectedServices.includes(item.uuid))
          .forEach(service => complementaryTotal += 1 * parseInt(service.price === '0' ?  this.hourPrice : service.price), 10);
        return complementaryTotal;
      },
      getServicePrice({ id }) {
        const selectedService = this.selectedServices
          .filter(item => item.id === id)[0];
        const hourPrice = getHourPrice(this.time, selectedService.prices);
        this.hourPrice = hourPrice;
        return hourPrice;
      },
    },
  });
</script>
