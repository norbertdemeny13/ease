<template>
  <div class="es-payment-container">
    <div class="box_order_form">
      <div class="head">
        <div class="title">
          <h3>Metoda de plata</h3>
        </div>
      </div>
      <!-- /head -->
      <div class="main p-4">
        <div class="form-group">
          <label>Numarul cardului</label>
          <div class="input-group mb-0">
            <div class="input-group-prepend">
              <span id="basic-addon1" class="input-group-text py-1 px-3">
                <es-icon :name="cardBrandClass" />
              </span>
            </div>
            <input
              id="card_number"
              ref="cardNumInput"
              v-model="cardNumber"
              v-cardformat:formatCardNumber
              :data-error="!!cardErrors.cardNumber"
              type="tel"
              placeholder="#### #### #### ####"
              class="form-control"
              name="card_number"
            >
          </div>
          <div v-if="cardErrors.cardNumber" class="error">
            <small>{{ cardErrors.cardNumber }}</small>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>Data de expirare</label>
            <div class="row">
              <div class="col-md-6 col-6">
                <div class="form-group">
                  <input
                    id="expire_month"
                    ref="cardExpInput"
                    v-model="cardExpiry"
                    v-cardformat:formatCardExpiry
                    :data-error="!!cardErrors.cardExpiry"
                    maxlength="10"
                    type="text"
                    name="expire_month"
                    class="form-control"
                    placeholder="mm/yy"
                  >
                  <div v-if="cardErrors.cardExpiry" class="error">
                    <small>{{ cardErrors.cardExpiry }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>Codul de securitate</label>
              <div class="row">
                <div class="col-md-4 col-6">
                  <div class="form-group">
                    <input
                      id="ccv"
                      ref="cardCvcInput"
                      v-model="cardCvc"
                      v-cardformat:formatCardCVC
                      :data-error="!!cardErrors.cardCvc"
                      type="text"
                      name="ccv"
                      class="form-control"
                      placeholder="CCV"
                    >
                    <div v-if="cardErrors.cardCvc" class="error">
                      <small>{{ cardErrors.cardCvc }}</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 col-6">
                  <img src="@/assets/gif/icon_ccv.gif" width="50" height="29" alt="ccv"><small>Ultimele 3 digite</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--End row -->
        <a href="" @click.prevent="onAddCard">
          Adauga card
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import VueCardFormat from 'vue-credit-card-validation';

  Vue.use(VueCardFormat);

  export default Vue.extend({
    name: 'es-payment',

    data: () => ({
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardErrors: {} as any,
      cardBrand: 'unknown',
      $cardFormat: Vue.prototype.$cardFormat,
    }),

    computed: {
      cardBrandClass() {
        const cardBrandToClass = {
          visa: 'cc-visa',
          mastercard: 'cc-mastercard',
          amex: 'cc-amex',
          discover: 'cc-discover',
          diners: 'cc-diners-club',
          jcb: 'cc-jcb',
          unknown: '',
        } as { [key: string]: string };

        return cardBrandToClass[this.cardBrand];
      },
    },

    watch: {
      cardNumber(val) {
        if (this.$cardFormat.validateCardNumber(val)) {
          (this.$refs.cardExpInput as any).focus();
        }
      },
      cardExpiry(val) {
        if (this.$cardFormat.validateCardExpiry(val)) {
          (this.$refs.cardCvcInput as any).focus();
        }
      },
    },

    mounted() {
      (this.$refs.cardNumInput as any).focus();
    },

    methods: {
      validate(): void {
        // init
        this.cardErrors = {};

        // validate card number
        if (!this.$cardFormat.validateCardNumber(this.cardNumber)) {
          this.cardErrors.cardNumber = 'Invalid Credit Card Number.';
        }

        // validate card expiry
        if (!this.$cardFormat.validateCardExpiry(this.cardExpiry)) {
          this.cardErrors.cardExpiry = 'Invalid Expiration Date.';
        }

        // validate card CVC
        if (!this.$cardFormat.validateCardCVC(this.cardCvc)) {
          this.cardErrors.cardCvc = 'Invalid CVC.';
        }
      },

      onAddCard(): void {
        this.validate();
      },
    },
  });
</script>

<style type="text/css">
  div.error, li.error{
    color: #f00;
  }

  input[data-error="true"] {
    border-color: #dc3545;
    padding-right: calc(1.5em + .75rem);
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
  }
</style>
