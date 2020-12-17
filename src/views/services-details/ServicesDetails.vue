<template>
  <div class="content">
    <div class="container margin_30_20">
      <router-link class="back-button" href="" to="/servicii">Inapoi</router-link>
      <div class="page_header my-4">
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-lg-7 col-md-7 d-md-block">
              <h1>145 restaurants in Convent Street 2983</h1>
              <a href="#0">Change address</a>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-5">
              <div class="search_bar_list">
                <input type="text" class="form-control" placeholder="Dishes, restaurants or cuisines">
                <button type="submit"><i class="icon_search" /></button>
              </div>
            </div>
          </div>
        <!-- /row -->
        </div>
      </div>
      <!-- /page_header -->
      <services-list-skeleton v-if="isFetching" />
      <div v-else class="row">
        <div class="col-12"><h2 class="title_small">{{ services[0].category }}</h2></div>
        <div v-for="service in services" :key="service.uuid" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
          <services-list-item :service="service" :to="`/servicii/${service.category}/${service.uuid}`" />
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
        getServicesByType: 'getServicesByType',
        isFetching: 'isFetching',
      }),

      services() {
        return this.getServicesByType;
      },
    },

    created() {
      const { type } = this.$router.currentRoute.params;
      this.fetchServicesByType(type);
    },

    methods: {
      ...mapActions({
        fetchServicesByType: 'fetchServicesByType',
      }),
    },
  });
</script>
