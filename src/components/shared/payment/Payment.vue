<!-- eslint-disable -->
<template>
  <div class="es-payment-container">
    <div class="box_order_form">
      <div class="head">
        <div class="title">
          <h3>{{ $t('generic.add_payment_method') }}</h3>
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
        <div class="d-flex align-items-center justify-content-end">
          <a href="" @click.prevent="$emit('on-cancel')">
            {{ $t('generic.back') }}
          </a>
          <button class="btn btn-sm btn-pink btn-pill my-2 ml-4" @click.prevent="onAddCard">
            {{ $t('generic.save') }}
          </button>
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
      onPayClientSecret: '',
      stripe: null,
      card: null,
      isCardMounted: false,
      localCard: null,
    }),

    created() {
      this.fetchGiftCardPaymentSetup();
    },

    computed: {
      ...mapGetters({
        getPaymentSetup: 'giftCards/getPaymentSetup',
        getCardInfo: 'cards/getCardInfo',
      }),
      localIsFetching(): boolean {
        return this.isFetching || !this.isCardMounted;
      },
    },

    watch: {
      getPaymentSetup(newVal): void {
        if (newVal) {
          this.clientSecret = newVal.clientSecret;
          this.publicKey = newVal.publicKey;
          this.setStripe(newVal);
        }
      },
      getCardInfo(newVal): void {
        if (newVal) {
          this.clientSecret = newVal.clientSecret;
          this.publicKey = newVal.publicKey;
          this.setStripe(newVal);
        }
      },
    },

    methods: {
      ...mapActions({
        fetchGiftCardPaymentSetup: 'giftCards/fetchGiftCardPaymentSetup',
        setStripeCard: 'cards/setStripeCard',
        setSelectedCard: 'cards/setSelectedCard',
      }),

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
                title: this.$t('toast.error_title'),
                id: 'card',
                message: this.$t('expired_card'),
                intent: 'error',
              });
            } else {
              const { card, id } = result.token;
              this.setStripeCard({ ...card, token_id: id });
              this.localCard = { ...card, token_id: id };
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
                title: this.$t('toast.error_title'),
                id: 'card',
                message: this.$t('payment_failed'),
                intent: 'error',
              });
            } else {
              this.setSelectedCard(this.localCard);
              this.$emit('on-add-card', this.localCard);
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
  .es-payment-container .head h3 {
    color: #222;
  }

  .es-payment-container .main {
    min-height: 150px;
    position: relative;
  }
</style>
