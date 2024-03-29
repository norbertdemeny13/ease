<!-- eslint-disable -->
<template>
  <div :class="`es_services-list-container ${showServices ? '' : 'disabled'} my-4`">
    <div v-if="service.items.length" v-for="service in services" :key="service.category" class="row mt-4">
      <div v-if="service.category !== 'promotions'" class="col-12"><h2 class="title_small">{{ $t(service.category) }}</h2></div>
      <div v-if="service.description && service.category !== 'promotions'" class="col-12"><p class="text-secondary">{{ $t(service.description) }}</p></div>
        <div v-if="windowWidth < 500 && service.items.length > 1" class="col-12 owl-carousel service-carousel owl-theme categories_carousel_in">
          <services-list-item
            v-for="item in service.items"
            :image-path="getImagePath(item)"
            :key="item.category"
            :service="item"
            :to="getToRoute(item)"
          />
        </div>
        <div v-else-if="service.category === 'promotions'" class="col-12 owl-carousel promo-carousel owl-theme categories_carousel_in">
          <services-list-item
            v-for="item in service.items"
            :image-path="getImagePath(item)"
            :key="item.category"
            :service="item"
            :to="getToRoute(item)"
          />
        </div>
        <div v-else class="col-12 owl-carousel service-carousel owl-theme categories_carousel_in">
          <services-list-item
            v-for="item in service.items"
            :image-path="getImagePath(item)"
            :key="item.category"
            :service="item"
            :to="getToRoute(item)"
          />
        </div>
      <!-- /strip grid -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import { ServicesListItem } from '@/components/features/services-list-item';

  export default Vue.extend({
    name: 'es-services-list',

    components: {
      'services-list-item': ServicesListItem,
    },

    props: {
      services: {
        type: Array,
        required: true,
      },
    },

    data: () => ({
      windowWidth: window.innerWidth,
    }),

    computed: {
      ...mapGetters({
        getLocation: 'address/getLocation',
        getLocationError: 'address/getLocationError',
        isAuthenticated: 'session/isAuthenticated',
        getAddresses: 'address/getAddresses',
      }),

      showServices() {
        const cityId = localStorage.getItem('city_id');
        const addressFromStorage = cityId === 'null' ? null : cityId;
        let hasLocation = false;

        if (this.isAuthenticated && this.getAddresses.length > 0) {
          hasLocation = true;
        } else {
          const location = this.getLocation
            ? this.getLocation
            : addressFromStorage;
          hasLocation = !!location;
        }

        return this.getLocationError
          ? false
          : hasLocation;
      },
    },

    mounted() {
      window.promoCarousel();
      window.serviceCarousel();
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      });
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.onResize);
    },

    methods: {
      onResize() {
        this.windowWidth = window.innerWidth;
      },
      getToRoute(item) {
        if (item.link_to_service) {
          return item.link_to_service;
        }

        const category = item.name;
        const { query } = this.$router.currentRoute;
        let endpoint;

        if (!category) {
          endpoint = '';
        } else if (category === 'single' || category === 'couple') {
          endpoint = query?.pro_id
            ? `/servicii/masaj?type=${category}&pro_id=${query.pro_id}`
          : `/servicii/masaj?type=${category}`;
        } else {
          endpoint = query?.pro_id
            ? `/servicii/${category}?pro_id=${query.pro_id}`
          : `/servicii/${category}`;
        }
        return endpoint;
      },

      getImagePath(item) {
        const path = item.absolute_image_url || item.image.url;
        return path;
      },
    },
  });
</script>
