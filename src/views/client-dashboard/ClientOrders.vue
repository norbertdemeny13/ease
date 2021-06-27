<template>
  <div class="es_client-orders-container content">
    <div class="row">
      <div class="col-md-6">
        <h4>Comenzile mele</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div v-for="item in getGiftCardsHistory" :key="item.id" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
          <h6 class="m-0">{{ item.id }}</h6>
          <div class="m-2">{{ item.created_at.substr(0, 10) }}</div>
          <div class="m-2">{{ item.amount }} Ron</div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click="$router.push('/carduri-cadou')"
          >
            Daruieste un card cadou
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-client-orders',

    computed: {
      ...mapGetters({
        getGiftCardsHistory: 'giftCards/getGiftCardsHistory',
      }),
    },

    created() {
      this.fetchGiftCardsOrderHistory();
    },

    methods: {
      ...mapActions({
        fetchGiftCardsOrderHistory: 'giftCards/fetchGiftCardsOrderHistory',
      }),
    },
  });
</script>
