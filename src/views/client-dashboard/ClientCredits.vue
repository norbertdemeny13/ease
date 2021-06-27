<template>
  <div class="es_client-credits-container content">
    <div class="row">
      <div class="col-md-8">
        <h4>Credit ease: {{ parseInt(getUser.ease_credit, 10) }} Ron</h4>
        <es-divider />
        <h6>Castiga credite Ease invitand prieteni sau introdu codul cardului cadou</h6>
        <div class="d-flex justify-content-start align-items-center">
          <div>
            <label>Cod card cadou</label>
            <input
              id="credit-code"
              v-model="code"
              type="text"
              class="form-control px-3 mr-4"
              name="credit-code"
            >
          </div>
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
            @click="onValidate()"
          >
            Valorifica
          </button>
          <button
            class="btn btn-sm btn-pink btn-pill ml-2 my-4 px-6"
            @click="$router.push('/client/recomandare')"
          >
            Recomanda
          </button>
        </div>
      </div>
    </div>
    <es-divider />
    <div class="row">
      <div class="col-md-6">
        <div v-for="item in getGiftCardsHistory" :key="item.id" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
          <h6 class="m-0">{{ item.id }}</h6>
          <div class="m-2">{{ item.created_at.substr(0, 10) }}</div>
          <div class="m-2">{{ item.amount }} Ron</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-client-credits',

    data: () => ({
      code: '',
    }),

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
        getGiftCardsHistory: 'giftCards/getGiftCardsHistory',
      }),
    },

    created() {
      this.fetchGiftCardsOrderHistory();
    },

    methods: {
      ...mapActions({
        fetchGiftCardsOrderHistory: 'giftCards/fetchGiftCardsOrderHistory',
        applyGiftCard: 'giftCards/applyGiftCard',
      }),
      async onValidate() {
        await this.applyGiftCard(this.code);
      },
    },
  });
</script>

<style type="text/css">
  input {
    width: 120px !important;
  }
</style>
