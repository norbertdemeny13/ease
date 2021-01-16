<template>
  <div class="content">
    <div class="container margin_30_20">
      <router-link class="back-button" href="" to="/servicii">Inapoi</router-link>
      <es-address-bar />
      <!-- /page_header -->
      <div v-if="isFetching">Fetching ...</div>
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
  import { AddressBar } from '@/components/features/address-bar';
  import { ServicesListItem } from '@/components/features/services-list-item';

  export default Vue.extend({
    name: 'es-services-details',

    components: {
      'es-address-bar': AddressBar,
      'services-list-item': ServicesListItem,
    },

    computed: {
      ...mapGetters({
        getServicesByType: 'getServicesByType',
        isFetching: 'isFetching',
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
        fetchServicesByType: 'fetchServicesByType',
      }),
      getToRoute(id: string): string {
        const { path, params } = this.$router.currentRoute;
        const { type } = params;
        const isNew = path.includes('new');
        return `${isNew ? '/new' : ''}/servicii/${type}/${id}`;
      },
    },
  });
</script>
