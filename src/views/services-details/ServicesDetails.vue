<template>
  <div class="content es_services-list-container">
    <div class="container margin_30_20">
      <a class="back-button" href="" @click.prevent="onBack">{{ $t('generic.back') }}</a>
      <es-address-bar @on-address-change="onAddressChange" />
      <services-list-skeleton v-if="isFetching" />
      <div
        v-for="serviceType in getServicesByType"
        v-else
        :key="serviceType.name"
        class="row mt-2"
      >
        <div class="col-12"><h2 class="title_small">{{ $t(serviceType.name) }}</h2></div>
        <div v-for="service in serviceType.services" :key="service.uuid" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
          <services-list-item
            :image-path="service.absolute_image_url_large"
            :service="service"
            :to="getToRoute(service.uuid)"
            :is-details-view="true"
          />
        </div>
      </div>
      <es-banner-as-footer-mobile :mobile-banners="banners" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { ServicesListSkeleton } from '@/components/features/services-list';
  import { ServicesListItem } from '@/components/features/services-list-item';
  import { EsBannersAsFooterMobile } from '@/components/shared/banners-as-footer-mobile';

  export default Vue.extend({
    name: 'es-services-details',

    components: {
      'services-list-item': ServicesListItem,
      'services-list-skeleton': ServicesListSkeleton,
      'es-banner-as-footer-mobile': EsBannersAsFooterMobile,
    },

    computed: {
      ...mapGetters({
        getElite: 'elite/getElite',
        getServicesByType: 'services/getServicesByType',
        getSelectedServices: 'services/getSelectedServices',
        isFetching: 'services/isFetching',
      }),

      services() {
        return this.getServicesByType;
      },

      banners() {
        return this.getServicesByType[0]?.banners || [];
      },
    },

    created() {
      const { type } = this.$router.currentRoute.params;
      const { query } = this.$router.currentRoute;

      if (query && query.pro_id) {
        this.fetchServicesByType({ type, id: this.getElite.id });
      } else {
        this.fetchServicesByType({ type });
      }
    },

    methods: {
      ...mapActions({
        fetchServicesByType: 'services/fetchServicesByType',
        setDefaultAddress: 'address/setDefaultAddress',
      }),
      getToRoute(id) {
        const { query } = this.$router.currentRoute;
        const { path, params } = this.$router.currentRoute;
        const { type } = params;
        const isNew = path.includes('new');
        return query?.pro_id
          ? `${isNew ? '/new' : ''}/servicii/${type}/${id}?pro_id=${query.pro_id}`
        : `${isNew ? '/new' : ''}/servicii/${type}/${id}`;
      },
      async onAddressChange(address) {
        const id = address?.id;
        const city = address.address_components
          ? address.address_components.filter(item => item.types.includes('locality'))
          : address.city;

        let cityId = city.id;
        const { type } = this.$router.currentRoute.params;
        const { query } = this.$router.currentRoute;

        if (cityId) {
          await this.setDefaultAddress({ id, cityId });
        }

        if (!cityId) {
          cityId = city[0]?.short_name?.toLowerCase().includes('cluj') ? 1 : 2;
        }

        if (cityId) {
          localStorage.setItem('city_id', cityId || null);
        }

        if (query && query.pro_id) {
          this.fetchServicesByType({ type, id: this.getElite.id });
        } else {
          this.fetchServicesByType({ type });
        }
      },
      onBack() {
        const { query } = this.$router.currentRoute;
        const isNew = this.$router.currentRoute.path.includes('/new/');
        let endpoint = '';
        if (isNew) {
          const [service] = this.getSelectedServices || [];
          const { category, uuid } = service;
          endpoint = `/servicii/${category}/${uuid}`;
        } else {
          endpoint = '/servicii';
        }

        if (query && query.pro_id) {
          endpoint += `?pro_id=${query.pro_id}`;
        }

        this.$router.push(endpoint);
      },
    },
  });
</script>
