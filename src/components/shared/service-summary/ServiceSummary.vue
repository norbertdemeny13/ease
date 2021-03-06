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
      <div v-if="getCategoryType() === 'couple'" class="d-flex justify-content-between align-items-center flex-inline">
        <h3>Masaj Cuplu, {{ getSelectedServices[0].duration }} min</h3>
        <h5>{{ time.price }} Ron</h5>
      </div>
      <ul
        v-for="(item, index) in getLocalSelectedServices"
        :key="item.id"
        class="clearfix"
      >
        <span class="text-gray">Serviciu {{ index + 1 }}</span>
        <div class="d-flex justify-content-between align-items-center flex-inline">
          <h3>{{ item.name }}</h3>
          <h5 v-if="getCategoryType() !== 'couple'">{{ getServicePrice(item) }} Ron</h5>
        </div>
        <li
          v-for="service in item.services"
          :key="service.id"
        >
          <p v-if="isPaymentView"><span>{{ service.selectedCount }} x {{ service.name }}</span></p>
          <a v-else href="" @click.prevent="removeService(item, service); service.selectedCount = 0">{{ service.selectedCount }} x {{ service.name }}</a>
          <span>{{ service.selectedCount * (service.price === '0' ? hourPrice : service.price) }} Ron</span>
        </li>
      </ul>

      <ul class="clearfix">
        <li v-if="activeSubscription">Discount Ab. {{ activeSubscription.subscription.discount }}%<span>{{ getDiscount }} Ron</span></li>
        <li>Subtotal<span>{{ getTotal }} Ron</span></li>
        <li class="total">Total<span>{{ getTotal - getDiscount }} Ron</span></li>
      </ul>
    </div>
  </div>
  <!-- /box_booking -->
</template>

<script>
  import Vue from 'vue';
  import { getZonedDate, getHourPrice } from '@/utils/date-helpers';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-service-summary',
    props: {
      isPaymentView: {
        default: false,
        type: Boolean,
      },
      date: {
        type: Object,
        required: true,
      },

      time: {
        type: Object,
        required: true,
      },

      activeSubscription: {
        type: Object,
        default: null,
      },
    },

    data: () => ({
      hourPrice: 0,
    }),

    computed: {
      ...mapGetters({
        getSelectedServices: 'services/getSelectedServices',
      }),

      getLocalSelectedServices() {
        /* eslint-disable */
        return this.getSelectedServices
          .map((item) => {
            const isMassage = item.category === 'single' || item.category === 'couple';
            const selectedComplementaryServices = isMassage
              ? this.getMassageServices(item)
              : this.getBeautyServices(item);
            return {
              name: item.name,
              services: selectedComplementaryServices,
              id: item.id,
              uuid: item.uuid,
              prices: item.price,
              massageType: item.massageType,
            };
          });
      },
      getDiscount() {
        return this.activeSubscription ? this.getTotal * (this.activeSubscription.subscription.discount / 100) : 0;
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
        const { category } = this.getSelectedServices[0];
        const isMassage = category === 'single' || category === 'couple';
        this.getSelectedServices.forEach((item) => {
          let complementaryTotal = isMassage
            ? this.getMassageServicesTotal(item)
            : this.getBeautyServicesTotal(item);
          total += complementaryTotal;
        });
        return total;
      },
    },

    methods: {
      removeService(item, service) {
        const itemId = item.uuid;
        const itemType = item?.massageType;
        const serviceId = service.id;
        const selectedService = this.getSelectedServices
          .filter(item => item.uuid === itemId && item.massageType === itemType)[0];
        const selectedComplementaryService = selectedService.complementary_services
          .filter(item => item.id === serviceId)[0];
        selectedComplementaryService.selectedCount = 0;
      },

      getCategoryType() {
        return this.getSelectedServices[0].category;
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
        return complementaryTotal;
      },
      getMassageServices(service) {
        const services = service?.complementary_services || [];
        const selectedServices = services
          .filter(service => service.selectedCount > 0)
        const isFourHands = selectedServices || selectedServices[0].is_four_hands;
        return selectedServices
          .map(({ uuid, id, name, price }) => ({
            name,
            price,
            uuid,
            id,
            selectedCount: 1,
            isFourHands,
          }));
      },

      getMassageServicesTotal(item) {
        let complementaryTotal = 0;
        const services = item.complementary_services || [];
        const selectedServices = services.filter(item => item.selectedCount > 0);
        selectedServices
          .forEach(service => complementaryTotal += 1 * parseInt(service.price === '0' ?  this.hourPrice : service.price), 10);
        return complementaryTotal;
      },
      getServicePrice({ uuid }) {
        const selectedService = this.getSelectedServices
          .filter(item => item.uuid === uuid)[0];
        const hourPrice = getHourPrice(this.time, selectedService.prices);
        this.hourPrice = hourPrice;
        return hourPrice;
      },
    },
  });
</script>
