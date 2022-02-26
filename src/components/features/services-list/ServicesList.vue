<!-- eslint-disable -->
<template>
  <div :class="`es_services-list-container ${showServices ? '' : 'disabled'} my-4`">
    <div v-if="service.items.length" v-for="service in services" :key="service.category" class="row mt-4">
      <div v-if="service.category !== 'promotions'" class="col-12"><h2 class="title_small">{{ $t(service.category) }}</h2></div>
      <div v-if="service.description && service.category !== 'promotions'" class="col-12"><p class="text-secondary">{{ $t(service.description) }}</p></div>
        <div v-if="service.items.length > 4" class="col-12 owl-carousel owl-theme categories_carousel_in">
          <services-list-item
            v-for="item in service.items"
            :image-path="getImagePath(item)"
            :key="item.category"
            :service="item"
            :to="getToRoute(item)"
          />
        </div>
        <template v-else>
          <div v-for="item in service.items" :key="item.category" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
            <services-list-item
              :image-path="getImagePath(item)"
              :service="item"
              :to="getToRoute(item)"
            />
         </div>
        </template>
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

    computed: {
      ...mapGetters({
        getLocation: 'address/getLocation',
        getLocationError: 'address/getLocationError',
        isAuthenticated: 'session/isAuthenticated',
        getAddresses: 'address/getAddresses',
      }),

      showServices() {
        const cityId = sessionStorage.getItem('city_id');
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

    methods: {
      getToRoute(item) {
        if (item.link_to_service) {
          return item.link_to_service;
        }

        const category = item.name;
        const { query } = this.$router.currentRoute;
        let endpoint = '';
        if (category === 'single' || category === 'couple') {
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
