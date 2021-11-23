<template>
  <div class="es_client-credits-container content">
    <div class="row">
      <div class="col-md-8">
        <h4>{{ $t('views.client_dashboard.ease_credit.ease_credit') }} {{ parseInt(getUser.ease_credit, 10) }} Lei</h4>
        <es-divider />
        <h6>{{ $t('views.client_dashboard.ease_credit.description') }}</h6>
        <div class="d-flex flex-wrap justify-content-start align-items-center">
          <div>
            <label>{{ $t('views.client_dashboard.ease_credit.gift_card_code') }}</label>
            <input
              id="credit-code"
              v-model="code"
              type="text"
              class="form-control px-3 mr-4"
              name="credit-code"
            >
          </div>
          <div class="row">
            <div class="col">
              <button
                  class="btn btn-sm btn-pink btn-pill my-4 px-6"
                  @click="onValidate()"
              >
                {{ $t('views.client_dashboard.ease_credit.apply') }}
              </button>
              <button
                  class="btn btn-sm btn-pink btn-pill ml-2 my-4 px-6"
                  @click="$router.push('/client/recomandare')"
              >
                {{ $t('generic.recommend') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <es-divider />
    <div class="row">
      <div class="col-md-6">
        <div v-for="item in getCreditEaseHistory" :key="item.id" class="reservation-list-item d-flex align-items-center justify-content-between my-2">
          <h6 class="m-0">{{ item.id }}</h6>
          <div class="m-2">{{ item.created_at.substr(0, 10) }}</div>
          <div class="m-2">{{ item.reason }}</div>
          <div class="m-2">{{ item.amount }} Lei</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { nanoid } from 'nanoid';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'es-client-credits',

    data: () => ({
      code: '',
    }),

    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
        getCreditEaseHistory: 'giftCards/getCreditEaseHistory',
        getAppliedGiftCard: 'giftCards/getAppliedGiftCard',
      }),
    },

    watch: {
      getAppliedGiftCard(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchUser();
          (this as any).$toasts.toast({
            id: nanoid(),
            intent: 'info',
            title: 'Felicitari!',
            message: 'Codul a fost activat cu success!',
          });
        }
      },
    },

    created() {
      this.fetchCreditOrderHistory();
    },

    methods: {
      ...mapActions({
        fetchCreditOrderHistory: 'giftCards/fetchCreditOrderHistory',
        applyGiftCard: 'giftCards/applyGiftCard',
        fetchUser: 'session/getUser',
      }),
      async onValidate() {
        await this.applyGiftCard(this.code);
      },
    },
  });
</script>

<style type="text/css" scoped>
  input {
    width: 120px !important;
  }
</style>
