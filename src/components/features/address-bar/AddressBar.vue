<template>
  <div class="page_header my-4">
    <div class="container">
      <div class="row">
        <div v-if="hasAddress" class="ml-4 mt-2 d-md-block">
          <h1>{{ getLocation.formatted_address }}</h1>
          <a href="" @click.prevent="changeAddress = true">Change address</a>
        </div>
        <es-address-search v-else :is-first-time="isFirstTime" />
      </div>
    <!-- /row -->
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import { AddressSearch } from '@/components/shared/address-search';

  export default Vue.extend({
    name: 'es-address-bar',

    components: {
      'es-address-search': AddressSearch,
    },

    data: () => ({
      changeAddress: false,
      isFirstTime: true,
    }),

    computed: {
      ...mapGetters({
        getLocation: 'getLocation',
      }),
      hasAddress(): boolean {
        return this.getLocation && !this.changeAddress;
      },
    },

    watch: {
      getLocation(newVal) {
        if (newVal) {
          this.changeAddress = false;
          this.isFirstTime = false;
        }
      },
    },
  });
</script>
