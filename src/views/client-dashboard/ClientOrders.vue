<template>
  <div class="es_client-orders-container content">
    <div class="row">
      <div class="col-md-6">
        <h4>Comenzile mele</h4>
      </div>
    </div>
    <div class="row">
      <div v-if="isListView" class="col-md-6">
        <div v-if="getGiftCardsHistory.length">
          <div v-for="item in getGiftCardsHistory" :key="item.id" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
            <h6 class="m-0">Card cadou</h6>
            <div class="m-2">{{ item.send_at.substr(0, 10) }}</div>
            <div class="m-2">{{ item.value }} Lei</div>
            <div class="m-2">{{ getStatus(item.payment.status) }}</div>
            <div class="my-4">
              <a class="pricing-plan-link" href="" @click.prevent="onSelect(item)">
                Vezi detalii
              </a>
            </div>
          </div>
        </div>
        <div v-else class="d-flex align-items-center justify-content-between">
          <h4>Momentan nu exista nici o comanda activa</h4>
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
      <div v-else class="col-md-6">
        <a class="back-button" href="" @click.prevent="onBack()">
          Inapoi
        </a>
        <div class="mt-4">
          <figure class="mb-0">
            <img
              :src="selectedCard.card_design.absolute_image_url"
              alt=""
              width="240px"
            >
          </figure>
          <h6 class="mt-4">Comanda Nr. {{ selectedCard.gift_card_id }}</h6>
          <ul class="summary_list">
            <li><strong>Plasata pe</strong>{{ selectedCard.send_at.substr(0, 10) }}</li>
            <li><strong>Total</strong>{{ selectedCard.payment.amount }} Lei</li>
          </ul>
          <h6>Sumar comanda</h6>
          <div class="d-flex flex-inline mt-4">
            <h6 class="mr-5 mb-0">De la</h6>
            <p class="mb-0">{{ selectedCard.from_name }}</p>
          </div>

          <div class="d-flex flex-inline mt-4">
            <h6 class="mr-4">Pentru</h6>
            <div class="d-flex flex-column">
              <p class="mb-0">{{ selectedCard.name }}</p>
              <p class="mb-0">{{ selectedCard.email }}</p>
            </div>
          </div>

          <div class="d-flex flex-inline mt-4">
            <h6 class="mr-4">Trimis</h6>
            <p class="mb-0">{{ getDate }}</p>
          </div>

          <div v-if="selectedCard.message" class="d-flex flex-inline mt-4">
            <h6 class="mr-4">Mesaj</h6>
            <div class="d-flex flex-column">
              <p class="mb-0">{{ selectedCard.message }}</p>
            </div>
          </div>

          <ul class="summary_list col-md-6">
            <es-divider />
            <li class="d-flex justify-content-between"><strong>Total de plata Ease</strong>{{ selectedCard.payment.amount }} Lei</li>
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
          succeeded: 'Plata cu success',
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
