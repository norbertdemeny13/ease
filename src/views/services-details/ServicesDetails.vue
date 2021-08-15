<template>
  <div class="content">
    <div class="container margin_30_20">
      <a class="back-button" href="" @click.prevent="onBack">Inapoi</a>
      <es-address-bar />
      <services-list-skeleton v-if="isFetching" />
      <div
        v-for="serviceType in getServicesByType"
        v-else
        :key="serviceType.name"
        class="row mt-2"
      >
        <div class="col-12"><h2 class="title_small">{{ serviceType.name }}</h2></div>
        <div v-for="service in serviceType.services" :key="service.uuid" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
          <services-list-item
            :image-path="service.absolute_image_url_large"
            :service="service"
            :to="getToRoute(service.uuid)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { ServicesListSkeleton } from '@/components/features/services-list';
  import { ServicesListItem } from '@/components/features/services-list-item';

  export default Vue.extend({
    name: 'es-services-details',

    components: {
      'services-list-item': ServicesListItem,
      'services-list-skeleton': ServicesListSkeleton,
    },

    computed: {
      ...mapGetters({
        getServicesByType: 'services/getServicesByType',
        getSelectedServices: 'services/getSelectedServices',
        isFetching: 'services/isFetching',
      }),

      services(): Record<any, any>[] {
        return this.getServicesByType;
      },
    },

    created(): void {
      const { type } = this.$router.currentRoute.params;
      this.fetchServicesByType({ type });
    },

    methods: {
      ...mapActions({
        fetchServicesByType: 'services/fetchServicesByType',
      }),
      getToRoute(id: string): string {
        const { query } = this.$router.currentRoute;
        const { path, params } = this.$router.currentRoute;
        const { type } = params;
        const isNew = path.includes('new');
        return query?.pro_id
          ? `${isNew ? '/new' : ''}/servicii/${type}/${id}?pro_id=${query.pro_id}`
        : `${isNew ? '/new' : ''}/servicii/${type}/${id}`;
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
          endpoint = '/servicii/';
        }

        if (query && query.pro_id) {
          endpoint += `?pro_id=${query.pro_id}`;
        }

        this.$router.push(endpoint);
      },
    },
  });
</script>
