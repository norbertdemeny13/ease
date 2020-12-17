<template>
  <div class="content">
    <div class="container margin_30_20">
      <router-link class="back-button" :to="`/servicii/${$router.currentRoute.params.type}`">Inapoi</router-link>
      <div class="row my-4">
        <div class="col-xl-4 col-lg-4 col-md-4">
          <img :src="service.absolute_image_url_large" width="300" height="200">
        </div>
        <div class="col-xl-8 col-lg-8 col-md-8">
          <h2>{{ service.name }}</h2>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'es-service-details',

    computed: {
      ...mapGetters({
        getServiceById: 'getServiceById',
        isFetching: 'isFetching',
      }),

      service() {
        return this.getServiceById;
      },
    },

    created() {
      const { type, id } = this.$router.currentRoute.params;
      this.fetchServiceById({ type, id });
    },

    methods: {
      ...mapActions({
        fetchServiceById: 'fetchServiceById',
      }),
    },
  });
</script>
