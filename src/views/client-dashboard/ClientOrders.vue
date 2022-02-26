<template>
  <div class="es_client-orders-container content">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ $t('generic.my_orders') }}</h2>
      </div>
    </div>
    <div class="row">
      <div v-if="isListView" class="col-md-6">
        <div v-if="getGiftCardsHistory.length">
          <div v-for="item in getGiftCardsHistory" :key="item.id" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
            <h6 class="m-0">{{ $t('generic.gift_card') }}</h6>
            <div class="m-2">{{ item.send_at.substr(0, 10) }}</div>
            <div class="m-2">{{ item.value }} Lei</div>
            <div class="m-2">{{ getStatus(item.payment.status) }}</div>
            <div class="my-4">
              <a class="pricing-plan-link" href="" @click.prevent="onSelect(item)">
                {{ $t('generic.view_details') }}
              </a>
            </div>
          </div>
        </div>
        <div v-else class="d-flex align-items-center justify-content-between">
          <h4>{{ $t('views.client_dashboard.my_orders.no_orders') }}</h4>
        </div>
        <div class="d-flex justify-content-start">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click="$router.push('/carduri-cadou')"
          >
            {{ $t('generic.give_a_gift_card') }}
          </button>
        </div>
      </div>
      <div v-else class="col-md-6">
        <a class="back-button" href="" @click.prevent="onBack()">
          {{ $t('generic.back') }}
        </a>
        <div class="mt-4">
          <figure class="mb-0">
            <img
              :src="selectedCard.card_design.absolute_image_url"
              alt=""
              width="240px"
            >
          </figure>
          <h6 class="mt-4">{{ $t('views.client_dashboard.my_orders.order_nr') }} {{ selectedCard.gift_card_id }}</h6>
          <ul class="summary_list">
            <li><strong>{{ $t('views.client_dashboard.my_orders.sent_on') }}</strong>{{ selectedCard.send_at.substr(0, 10) }}</li>
            <li><strong>{{ $t('generic.total') }}</strong>{{ selectedCard.payment.amount }} Lei</li>
          </ul>
          <h6>{{ $t('generic.order_sum') }}</h6>
          <div class="d-flex flex-inline mt-4">
            <h6 class="mr-5 mb-0">{{ $t('generic.from') }}</h6>
            <p class="mb-0">{{ selectedCard.from_name }}</p>
          </div>

          <div class="d-flex flex-inline mt-4">
            <h6 class="mr-4">{{ $t('generic.for') }}</h6>
            <div class="d-flex flex-column">
              <p class="mb-0">{{ selectedCard.name }}</p>
              <p class="mb-0">{{ selectedCard.email }}</p>
            </div>
          </div>

          <div class="d-flex flex-inline mt-4">
            <h6 class="mr-4">{{ $t('generic.sent') }}</h6>
            <p class="mb-0">{{ getDate }}</p>
          </div>

          <div v-if="selectedCard.message" class="d-flex flex-inline mt-4">
            <h6 class="mr-4">{{ $t('generic.message') }}</h6>
            <div class="d-flex flex-column">
              <p class="mb-0">{{ selectedCard.message }}</p>
            </div>
          </div>

          <ul class="summary_list col-md-6">
            <es-divider />
            <li class="d-flex justify-content-between"><strong>{{ $t('views.client_dashboard.my_orders.total') }}</strong>{{ selectedCard.payment.amount }} Lei</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-client-orders',

    data: () => ({
      isListView: true,
      selectedCard: null,
    }),

    computed: {
      ...mapGetters({
        getGiftCardsHistory: 'giftCards/getGiftCardsHistory',
      }),
      getDate() {
        const date = this.selectedCard.send_at;
        return new Date(date).toISOString().substr(0, 10);
      },
    },

    created() {
      this.fetchGiftCardsOrderHistory();
    },

    methods: {
      ...mapActions({
        fetchGiftCardsOrderHistory: 'giftCards/fetchGiftCardsOrderHistory',
      }),
      getStatus(item) {
        const statuses = {
          succeeded: 'Plasata cu success',
        };
        return statuses[item];
      },
      onBack() {
        this.selectedReservation = null;
        this.isListView = true;
      },

      onSelect(item) {
        this.selectedCard = item;
        this.isListView = false;
      },
    },
  });
</script>
