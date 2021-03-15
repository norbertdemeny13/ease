<template>
  <div class="es_client-payments-container content">
    <h4>Carduri</h4>
    <div class="row">
      <div class="col-md-4">
        <div v-for="card in getCards" :key="card.id" :class="`${card.primary ? 'active' : ''} client-payment-card-item`">
          <div class="card-number">
            &#128179; &#10240; {{ card.brand.toUpperCase() }} **** {{ card.last4 }} (exp: {{ card.exp_month }}/{{ card.exp_year }})
          </div>
          <div class="d-flex flex-row align-items-center justify-content-between mt-2">
            <div>
              <span :class="`${card.primary ? 'icon_check_alt' : 'icon_circle-empty'}`" />
              <span class="ml-2">Card principal</span>
            </div>
            <a href="" class="mr-2" @click.prevent>
              <i class="icon_trash_alt" />
              Sterge
            </a>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-sm btn-pink btn-pill my-4 px-6"
          >
            Adauga
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
    name: 'es-client-payments',

    computed: {
      ...mapGetters({ getCards: 'cards/getCards' }),
    },

    created() {
      this.fetchCards();
    },

    methods: {
      ...mapActions({ fetchCards: 'cards/fetchCards' }),
    },
  });
</script>

<style type="text/scss">
  .client-payment-card-item {
    border: 1px solid #cccccc;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    margin: 8px 0;
    border-radius: 8px;
  }

  .client-payment-card-item.active,
  .client-payment-card-item:hover {
    border: 1px solid #d00078;
  }

  .icon_check_alt {
    color: #70d7b7;
  }
</style>
