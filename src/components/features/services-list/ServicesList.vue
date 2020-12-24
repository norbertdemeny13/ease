<!-- eslint-disable -->
<template>
  <div :class="`es_services-list-container ${!getLocation || isDisabled ? 'disabled' : ''} my-4`">
    <div v-if="service.items.length" v-for="service in services" :key="service.category" class="row mt-4">
      <div class="col-12"><h2 class="title_small">{{ service.category }}</h2></div>
      <div v-if="service.description" class="col-12"><p class="text-secondary">{{ service.description }}</p></div>
        <div v-if="service.items.length > 4" class="col-12 owl-carousel owl-theme categories_carousel_in">
          <services-list-item
            v-for="item in service.items"
            :image-path="item.absolute_image_url"
            :key="item.category"
            :service="item"
            :to="getToRoute(service.category, item.name)"
          />
        </div>
        <template v-else>
          <div v-for="item in service.items" :key="item.category" class="col-xl-3 col-lg-4 col-md-4 col-sm-4">
            <services-list-item
              :image-path="item.absolute_image_url"
              :service="item"
              :to="getToRoute(item.name)"
            />
         </div>
        </template>
      <!-- /strip grid -->
    </div>
  </div>
</template>

<script lang="ts">
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
      isDisabled: false,
    }),

    computed: {
      ...mapGetters({
        getLocation: 'getLocation',
      }),
    },

    watch: {
      getLocation(newVal) {
        if (!['Cluj-Napoca', 'Bucharest'].includes(newVal.vicinity)) {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
      },
    },

    methods: {
      getToRoute(category: string): string {
        return `/servicii/${category}`;
      },

    },
  });
</script>
