<template>
  <div class="content">
    <div class="container margin_30_20">
      <router-link class="back-button" href="" to="/servicii">Inapoi</router-link>
      <es-address-bar />
      <!-- /page_header -->
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
            :to="`/servicii/${service.category}/${service.uuid}`"
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
  import { ServicesListSkeleton } from '@/components/features/services-list';
  import { ServicesListItem } from '@/components/features/services-list-item';

  export default Vue.extend({
    name: 'es-services-details',

    components: {
      'es-address-bar': AddressBar,
      'services-list-item': ServicesListItem,
      'services-list-skeleton': ServicesListSkeleton,
    },

    computed: {
      ...mapGetters({
        getServicesByType: 'getServicesByType',
        isFetching: 'isFetching',
      }),

      services() {
        return this.getServicesByType;
      },
    },

    created() {
      const { type } = this.$router.currentRoute.params;
      const { query } = this.$router.currentRoute;
      this.fetchServicesByType({ type, query });
    },

    methods: {
      ...mapActions({
        fetchServicesByType: 'fetchServicesByType',
      }),
    },
  });
</script>
