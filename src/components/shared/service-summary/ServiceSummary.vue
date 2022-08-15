<template>
  <div class="box_order">
    <div class="head">
      <h3>{{ $t('lbl_reservation_details') }}</h3>
    </div>
    <!-- /head -->
    <div class="main">
      <div v-if="eliteId" class="d-flex justify-content-between align-items-center custom-sm-6">
        <h6>Profesionist</h6>
        <div class="d-flex align-items-center">
          <div class="profile-pic-container">
            <figure>
              <img v-if="getElite.avatar_path" :src="getElite.avatar_path" alt="Profile Pic" class="radius-50">
              <img v-else src="@/assets/png/avatar-profesionist.png" alt="Profile Pic">
            </figure>
          </div>
          <div class="d-flex align-getElites-center flex-column ml-2">
            <span class="text-center">{{ getElite.display_name }}</span>
            <div class="ml-2"><i class="icon_star" /><span class="mt-1 ml-2">{{ Number(getElite.rating) > 0 ? getElite.rating : '0.0' }}</span></div>
          </div>
        </div>
      </div>
      <ul>
        <li>{{ $t('generic.date') }}<span>{{ getDate }}</span></li>
        <li>{{ $t('generic.hour') }}<span>{{ getHour }}</span></li>
      </ul>
      <hr>
      <div v-if="getCategoryType() === 'couple'" class="d-flex justify-content-between align-items-center flex-inline">
        <h5>{{ $t('generic.couple_massage') }} {{ getSelectedServices[0].massageForm.duration }} min</h5>
        <h5>{{ time.price }} Lei</h5>
      </div>
      <ul
        v-for="(item, index) in getLocalSelectedServices"
        :key="`${item.id}${index}`"
        class="clearfix"
      >
        <span class="custom-service">Serviciu {{ index + 1 }}</span>
        <div class="d-flex justify-content-between align-items-center flex-inline custom-service-info">
          <div>
            <h6>{{ $t(item.name) }} {{ getCategoryType() === 'single' ? `${item.massageForm.duration} min` : '' }}</h6>
            <div v-if="getCategoryType() === 'couple' || getCategoryType() === 'single'" class="ml-2">
              <span>{{ `Terapeut ${$t(item.massageForm.genre)}` }}</span>
            </div>
          </div>
          <h5 v-if="getCategoryType() !== 'couple'" class="d-flex align-self-start">{{ getServicePrice(item) }} Lei</h5>
        </div>
        <div v-if="item.serviceType !== 'beauty'" class="service-type">
          <li v-if="item.isWithAromaterapeutic" class="ml-2">
            <span>{{ $t('aroma_therapy') }}</span><span>{{ item.terapeuticForm.price }}</span>
          </li>
          <li v-else class="ml-2"> <span>{{ $t('classic') }}</span><span /></li>
        </div>
        <li
          v-for="service in item.services"
          :key="service.id"
        >
          <p class="ml-2"><span>{{ service.selectedCount }} x {{ $t(service.name) }}</span></p>
          <span v-if="service.isFourHands">{{ service.selectedCount * (service.price === '0' ? hourPrice : getServicePrice(item)/2) }} Lei</span>
          <span v-else>{{ service.selectedCount * (service.price === '0' ? hourPrice : service.price) }} Lei</span>
        </li>
      </ul>

      <ul class="clearfix">
        <li v-if="activeSubscription">Discount Ab. {{ activeSubscription.subscription.discount }}%<span>{{ getDiscount }} Lei</span></li>
        <li>{{ $t('bookings.details.subTotal') }}<span>{{ time.price }} Lei</span></li>
        <li v-if="showTotal" class="total">{{ $t('bookings.details.totalCharged') }}<span>{{ getTotal - getDiscount }} Lei</span></li>
      </ul>
    </div>
  </div>
  <!-- /box_booking -->
</template>

<script>
  import Vue from 'vue';
  import { getZonedDate, getHourPrice } from '@/utils/date-helpers';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-service-summary',
    props: {
      date: {
        type: Object,
        required: true,
      },

      time: {
        type: Object,
        required: true,
      },

      showTotal: {
        default: true,
        type: Boolean,
      },

      activeSubscription: {
        type: Object,
        default: null,
      },

      eliteId: {
        default: null,
        type: Number || null,
      },
    },

    data: () => ({
      hourPrice: 0,
    }),

    computed: {
      ...mapGetters({
        getElite: 'elite/getElite',
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
            const isWithAromaterapeutic = item.massageForm && item.massageForm.form === 'aromaterapeutic';
            const terapeuticForm = isWithAromaterapeutic && item.therapeutic_forms[1] || null;
            return {
              name: item.name,
              services: selectedComplementaryServices,
              id: item.id,
              uuid: item.tempServiceId,
              prices: item.price,
              massageType: item.massageType,
              massageForm: item.massageForm,
              isWithAromaterapeutic,
              terapeuticForm,
              serviceType: item.serviceType,
            };
          });
      },
      getDiscount() {
        return (this.activeSubscription ? this.getTotal * (this.activeSubscription.subscription.discount / 100) : 0).toFixed(2);
      },
      getDate() {
        const currentDate = this.date?.date;
        return currentDate
          ? getZonedDate(currentDate)
          : '';
      },
      getHour() {
        const curentTime = this.time && this.time.time;
        return curentTime;
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

    created() {
      if (this.eliteId) {
        this.fetchElite({ id: this.eliteId });
      }
    },

    methods: {
      ...mapActions({
        fetchElite: 'elite/fetchElite',
      }),
      removeService(item, service) {
        const itemId = item.uuid;
        const itemType = item?.massageType;
        const serviceId = service.id;
        let selectedService = null;

        if (itemType) {
          selectedService = this.getSelectedServices
            .filter(item => item.tempServiceId === itemId && item.massageType === itemType)[0];
        } else {
          selectedService = this.getSelectedServices
            .filter(item => item.tempServiceId === itemId)[0];
        }

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
        const isFourHands = selectedServices && selectedServices[0]?.is_four_hands;
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

        if (item.massageForm && item.massageForm.form === 'aromaterapeutic') {
          const aromaterapeuticPrice = item.therapeutic_forms[1].price;
          complementaryTotal += parseInt(aromaterapeuticPrice, 10);
        }
        return complementaryTotal;
      },
      getServicePrice({ uuid }) {
        const selectedService = this.getSelectedServices
          .filter(item => item.tempServiceId === uuid)[0];
        const dateObject = { ...this.time, ...this.date };
        const hourPrice = getHourPrice(dateObject, selectedService.prices);
        this.hourPrice = hourPrice;
        return hourPrice;
      },
    },
  });
</script>

<style type="text/css" scoped>
  i.icon_star {
    color: #fad055;
    font-size: 1.3rem;
  }

  img {
    width: 60px;
    height: 60px;
  }
</style>
