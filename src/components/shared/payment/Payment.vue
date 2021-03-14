<!-- eslint-disable -->
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
        <div class="card-element-container p-4">
          <div v-if="localIsFetching" class="d-flex justify-content-between">
            <es-skeleton-item heigth="18px" width="40%" />
            <es-skeleton-item heigth="18px" width="25%" />
          </div>
          <div
            id="card-element"
            ref="card-element"
            :style="{ opacity: localIsFetching ? 0 : 1, heigth: localIsFetching ? 0 : 'auto' }"
          />
        </div>
        <!--End row -->
        <div class="payment-actions">
          <a href="" @click.prevent="onAddCard">
            Adauga card
          </a>
          <a href="" class="ml-4" @click.prevent="$emit('on-cancel')">
            Inapoi
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { loadStripe } from '@stripe/stripe-js';
  /* eslint-disable */
  export default Vue.extend({
    name: 'es-payment',

    props: {
      isFetching: Boolean,
      isAuthenticated: Boolean,
    },

    data: () => ({
      publicKey: '',
      clientSecret: '',
      stripe: null,
      card: null,
      isCardMounted: false,
    }),

    created() {
      if (!this.isAuthenticated) {
        this.clientSecret = 'seti_1ISzYdLYIXXW8aZQff9zfz9b_secret_J59syx0aXanqQrvRaTz74pwfsugtQbh';
        this.publicKey = 'pk_test_51Gw03jLYIXXW8aZQIiqpyYWjRlVnOvGLKnd6umWrdSlPQGeBEHMa5ScOYj9JPYIUNvyjs0qOF5MwHX0nyO8tG42L00hDCv6ugt';
        this.setStripe({ publicKey: this.publicKey, clientSecret: this.clientSecret });
      }
    },

    computed: {
      ...mapGetters({
        getCardInfo: 'cards/getCardInfo',
      }),
      localIsFetching(): boolean {
        return this.isFetching || !this.isCardMounted;
      },
    },

    watch: {
      getCardInfo(newVal): void {
        if (newVal) {
          this.clientSecret = newVal.clientSecret;
          this.publicKey = newVal.publicKey;
          this.setStripe(newVal);
        }
      },
    },

    mounted() {
      this.$root.$on('on-create-payment', this.onCreatePayment);
    },

   beforeDestroy () {
      this.$root.$off('on-create-payment', this.onCreatePayment)
    },

    methods: {
      ...mapActions({
        setStripeCard: 'cards/setStripeCard',
      }),

      async onCreatePayment() {
        const { publicKey, clientSecret, card } = this;
        await this.setStripe({ publicKey, clientSecret });

        const data = {
          card,
          billing_details: { name: 'Jancsi'}
        };

        (this.stripe! as any)
          .confirmCardPayment(this.clientSecret, {
            payment_method: data,
            setup_future_usage: 'off_session'
          })
          .then((result: any) => {
            if (result.error) {
              // console.log(result.error, 'error');
            } else {
              (this.stripe! as any).retrievePaymentIntent(clientSecret).then((result: any) => {
                var paymentIntent = result.paymentIntent;
                var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
                // console.log(paymentIntentJson);
              });
            }
          });
      },
      async setStripe({ publicKey, clientSecret }: { publicKey: string; clientSecret: string }): Promise<void> {
        (this.stripe as any) = await loadStripe(publicKey);

        const style = {
          base: {
            iconColor: '#666ee8',
            color: '#31325f',
            fontWeight: 400,
            fontSmoothing: 'antialiased',
            fontSize: '15px',
            '::placeholder': {
              color: '#aab7c4',
            },
            ':-webkit-autofill': {
              color: '#666ee8',
            },
          },
        };

        this.card = (this.stripe! as any).elements().create('card', { hidePostalCode: true, style });
        (this.card! as any).mount('#card-element');
        (this.card! as any).on('ready', (event: any) => {
          this.isCardMounted = true;
        });
      },

      async createToken(): Promise<void> {
        await (this.stripe! as any).createToken(
          this.card,
        )
          .then((result: any) => {
            if (result.error) {
              (this as any).$toasts.toast({
                title: 'Atentie',
                id: 'card',
                message: result.error.message,
                intent: 'error',
              });
            } else {
              const { card } = result.token;
              this.setStripeCard(card);
              this.cardSetup();
            }
          });
      },

      async cardSetup(): Promise<void> {
        await (this.stripe! as any).confirmCardSetup(
          this.clientSecret,
          {
            payment_method: {
              card: this.card,
            },
          },
        )
          .then((result: any) => {
            if (result.error) {
              (this as any).$toasts.toast({
                title: 'Atentie',
                id: 'card',
                message: result.error.message,
                intent: 'error',
              });
            } else {
              this.$emit('on-add-card');
            }
          });
      },

      onAddCard(): void {
        this.createToken();
      },
    },
  });
</script>

<style type="text/css">
  .es-payment-container .main {
    min-height: 150px;
    position: relative;
  }

  .es-payment-container .main .payment-actions {
    bottom: 16px;
    position: absolute;
  }
</style>
